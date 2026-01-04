import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Initialize admin client for bypassing RLS to update profiles
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Needs service role key for admin access
);

const NOWPAYMENTS_IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET!;

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get('x-nowpayments-sig');
        const body = await req.json();

        // 1. Verify Signature
        if (NOWPAYMENTS_IPN_SECRET) {
            const hmac = crypto.createHmac('sha512', NOWPAYMENTS_IPN_SECRET);
            hmac.update(JSON.stringify(body, Object.keys(body).sort()));
            const generatedSignature = hmac.digest('hex');

            if (signature !== generatedSignature) {
                return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
            }
        }

        // 2. Check payment status
        // NOWPayments sends various statuses: 'finished', 'confirmed', etc.
        const { payment_status, payment_id, order_id, order_description } = body;

        console.log('NOWPayments Webhook:', { payment_status, payment_id, order_id });

        if (payment_status === 'finished' || payment_status === 'confirmed') {
            // We need to identify the user. 
            // Strategy: order_id could be the user ID, or we could pass user email in order_description
            // Assuming order_description contains user email or ID for this implementation.

            // For now, let's look for a user where the email matches order_description (simple case)
            // In production, pass userId as order_id in the payment link param: &order_id=USER_ID

            // If we have order_id as user id:
            let userId = order_id;

            // Update profile
            if (userId) {
                const { error } = await supabaseAdmin
                    .from('profiles')
                    .update({ is_paid: true, payment_id: payment_id.toString() })
                    .eq('id', userId);

                if (error) {
                    console.error('Error updating profile:', error);
                    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
                }
            } else {
                console.warn('No order_id (userId) found in webhook');
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
