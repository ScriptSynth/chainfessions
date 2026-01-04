'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Mail, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResetPasswordModal({ isOpen, onClose }: ResetPasswordModalProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const handleReset = async () => {
        setStatus('loading');
        setErrorMessage('');

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user?.email) {
                throw new Error('User email not found.');
            }

            const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });

            if (error) throw error;

            setStatus('success');
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Failed to send reset email.');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-gray-900 border border-gray-800 w-full max-w-md p-6 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-6">
                        {status === 'success' ? (
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        ) : status === 'error' ? (
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        ) : (
                            <Mail className="w-8 h-8 text-red-500" />
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>

                    {status === 'success' ? (
                        <p className="text-gray-400 mb-8">
                            We've sent a password reset link to your email address. Please check your inbox.
                        </p>
                    ) : (
                        <p className="text-gray-400 mb-8">
                            Are you sure? We will send a secure password reset link to the email connected to this account.
                        </p>
                    )}

                    {status === 'error' && (
                        <div className="w-full bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-sm text-red-400">
                            {errorMessage}
                        </div>
                    )}

                    {status === 'success' ? (
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-colors"
                        >
                            Close
                        </button>
                    ) : (
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReset}
                                disabled={status === 'loading'}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                            >
                                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                                Send Link
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
