'use client';

import React from 'react';
import { Gift, CalendarClock } from 'lucide-react';

export default function FoundingMemberDashboard() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mb-8 relative">
                <CalendarClock className="w-12 h-12 text-red-500" />
                <div className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg">
                    <Gift className="w-5 h-5" />
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Welcome, Founding Member
            </h1>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                We are currently in our founding phase. All user plans will officially start in <span className="text-white font-bold">1 week</span>.
            </p>

            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
                <p className="text-gray-400 mb-4">
                    We apologize for the delay. To make up for this, we have upgraded your account:
                </p>
                <ul className="space-y-3 text-left max-w-sm mx-auto">
                    <li className="flex items-center gap-3 text-white">
                        <Gift className="w-5 h-5 text-red-500" />
                        <span>Extra <span className="text-red-400 font-bold">1 Week</span> of subscription free</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                        <Gift className="w-5 h-5 text-red-500" />
                        <span><span className="text-red-400 font-bold">2 Bonus Articles</span> added to your quota</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
