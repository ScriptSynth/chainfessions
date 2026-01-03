'use client';

import React from 'react';
import { PricingCard } from '@/components/landing/Pricing';

export default function RestrictedDashboard() {
    return (
        <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] text-center">

            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Please purchase the plan to boost your site <span className="text-red-500">SEO</span>
                </h1>
                <p className="text-gray-400 text-lg">Access to this dashboard is restricted to premium members.</p>
            </div>

            <PricingCard />
        </div>
    );
}
