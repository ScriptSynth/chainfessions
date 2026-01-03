'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Network, FileText, Settings, LogOut, BarChart, KeyRound, ChevronUp, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    const getLinkClass = (path: string) => {
        const active = isActive(path);
        return `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                ? 'text-red-400 bg-red-500/10 border border-red-500/20 font-medium'
                : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
            }`;
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const handleResetPassword = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
            const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });
            if (error) {
                alert('Error sending reset email: ' + error.message);
            } else {
                alert('Password reset email sent to ' + user.email);
            }
        } else {
            alert('Could not identify user for password reset.');
        }
    };

    return (
        <aside className="w-64 h-screen bg-black border-r border-gray-800 flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    Chainfessions
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Overview</span>
                </Link>

                <Link href="/dashboard/network" className={getLinkClass('/dashboard/network')}>
                    <Network className="w-5 h-5" />
                    <span>Link Network</span>
                </Link>

                <Link href="/dashboard/content" className={getLinkClass('/dashboard/content')}>
                    <FileText className="w-5 h-5" />
                    <span>Content Queue</span>
                    {/* Badge logic placeholder - could be dynamic later */}
                    <span className="ml-auto bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">3</span>
                </Link>

                <Link href="/dashboard/analytics" className={getLinkClass('/dashboard/analytics')}>
                    <BarChart className="w-5 h-5" />
                    <span>Analytics</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="relative">
                    <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors mb-2 justify-between ${isSettingsOpen ? 'bg-white/5 text-white' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5" />
                            <span className="font-medium">Settings</span>
                        </div>
                        {isSettingsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>

                    {isSettingsOpen && (
                        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-2">
                            <button
                                onClick={handleResetPassword}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left text-sm"
                            >
                                <KeyRound className="w-4 h-4" />
                                <span>Reset Password</span>
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
