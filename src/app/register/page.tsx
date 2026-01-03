
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Github, Chrome, AlertCircle, Loader, Check } from 'lucide-react';
import Login3D from '@/components/auth/Login3D';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSocialLogin = async (provider: 'github' | 'google') => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || `Failed to sign in with ${provider}`);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            });

            if (error) throw error;

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">

            {/* 3D Background */}
            <Login3D />

            {/* Glass Overlay Content */}
            <div className="relative z-10 w-full max-w-md p-8">
                <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Join Chainfessions
                        </h1>
                        <p className="text-gray-400 text-sm mt-2">Start your zero-outreach growth journey.</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="text-center py-10">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                <Check className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
                            <p className="text-gray-400 text-sm">We've sent a verification link to <br /> <span className="text-white font-medium">{email}</span></p>
                            <div className="mt-8">
                                <Link href="/login" className="text-red-500 hover:text-red-400 text-sm font-medium">
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-gray-600"
                                        placeholder="you@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-gray-600"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Create Account'}
                                </button>
                            </form>

                            <p className="text-center text-gray-500 text-sm mt-8">
                                Already have an account?{' '}
                                <Link href="/login" className="text-red-500 hover:text-red-400 font-medium">
                                    Sign In
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
