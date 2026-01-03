
'use client';

import React from 'react';
import { Zap, Globe, ShieldCheck, UserCheck, Lock, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Zap,
        title: "Zero-Outreach Backlinks",
        description: "Stop wasting months on cold emails that get ignored. Our 'Exchange Engine' connects your site with high-DR relevant partners automatically. You host quality content for them, they host for you, and the entire network grows together without the 'begging' ritual.",
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "hover:border-red-500/30"
    },
    {
        icon: UserCheck,
        title: "Human-Edited Editorial Content",
        description: "We don't just dump raw AI text on your site. Our team researches your competitors' top pages to identify 'keyword gaps' and crafts 30 high-intent articles every month. Every piece is human-vetted for flow and accuracy, ensuring it captures real traffic and attracts natural links.",
        color: "text-white",
        bg: "bg-white/10",
        border: "hover:border-white/30"
    },
    {
        icon: ShieldCheck,
        title: "Footprint-Free \"ABC\" Patterns",
        description: "Direct link swaps (A → B) are a red flag for search engines. Our network enforces complex triangular exchange patterns (A → B → C → A) so your links always appear natural and editorial. No PBNs, no spam, and zero footprints—just pure authority growth on auto-pilot.",
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "hover:border-red-500/30"
    }
];

export default function ValueProps() {
    return (
        <section id="features" className="py-32 bg-black text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
            <div className="absolute -left-40 top-40 w-80 h-80 bg-red-900/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                        Stop Begging for Backlinks. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Start Commanding Authority.</span>
                    </h2>
                    <p className="text-gray-400 text-xl leading-relaxed">
                        Chainfessions replaces the broken manual outreach model with a self-sustaining peer-to-peer exchange engine.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className={`p-8 rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 transition-all duration-300 hover:bg-gray-900 group ${feature.border} hover:-translate-y-2 hover:shadow-2xl`}
                        >
                            <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-100">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
