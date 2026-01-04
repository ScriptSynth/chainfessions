'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import RestrictedDashboard from './RestrictedDashboard';
import FoundingMemberDashboard from './FoundingMemberDashboard';
import { Loader } from 'lucide-react';

export default function DashboardGuard() {
    const [loading, setLoading] = useState(true);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        checkPaymentStatus();
    }, []);

    const checkPaymentStatus = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('is_paid')
                .eq('id', user.id)
                .single();

            if (data?.is_paid) {
                setIsPaid(true);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader className="w-8 h-8 text-red-600 animate-spin" />
            </div>
        );
    }

    if (isPaid) {
        return <FoundingMemberDashboard />;
    }

    return <RestrictedDashboard />;
}
