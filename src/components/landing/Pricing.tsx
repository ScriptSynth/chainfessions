'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function PricingCard() {
    return (
        <div className="max-w-md mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 hover:border-red-500/50 transition-colors duration-300 shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-3xl font-bold text-white">Pro Growth</h3>
                        <div className="text-sm text-gray-400 mt-2">Perfect for SaaS & Content Sites</div>
                    </div>
                    <div className="text-right">
                        <div className="text-5xl font-bold text-white">$49.99</div>
                        <div className="text-sm text-gray-500 mt-1">/month</div>
                    </div>
                </div>

                <div className="h-px bg-gray-800 my-8"></div>

                <ul className="space-y-5 mb-10">
                    {[
                        "30 AI-Generated Articles / mo",
                        "20+ Organic Backlinks / mo",
                        "Full Dashboard Access",
                        "Competitor Gap Analysis",
                        "Priority Support"
                    ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-red-400" />
                            </div>
                            <span className="text-gray-300 text-lg">{feature}</span>
                        </li>
                    ))}
                </ul>

                <button className="w-full py-5 bg-red-600 hover:bg-red-500 text-white font-bold text-lg rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-red-600/30 cursor-pointer">
                    Get Started Now
                </button>
                <p className="text-center text-sm text-gray-500 mt-6">Cancel anytime. No hidden fees.</p>
            </div>
        </div>
    );
}

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-black text-white relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[128px]" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-400 text-xl">One plan. Everything you need to dominate the SERPs.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <PricingCard />
                </motion.div>
            </div>
        </section>
    );
}
