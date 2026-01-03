
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqData = [
    {
        category: "General Questions",
        items: [
            {
                question: "What exactly is Chainfessions?",
                answer: "Chainfessions is an automated SEO growth platform. We combine human-edited content creation with a private, organic backlink exchange network to help you rank higher on Google without the manual grind of outreach or writing."
            },
            {
                question: "How is this different from a PBN (Private Blog Network)?",
                answer: "Unlike PBNs, which are fake sites built only for links, our network consists of real, active businesses and blogs owned by real people. We facilitate a \"peer-to-peer\" exchange where everyone provides value, making the links natural and safe."
            }
        ]
    },
    {
        category: "Content & Quality",
        items: [
            {
                question: "Is the content written by AI or Humans?",
                answer: "We use a hybrid approach. AI identifies keyword gaps and generates the initial draft, but every article is reviewed and polished by a human editor. This ensures the content is factually accurate, flows naturally, and meets Google’s \"Helpful Content\" standards."
            },
            {
                question: "How many articles do I get per month?",
                answer: "On the standard plan, you receive 30 high-quality, long-form articles (approx. 1,000–1,500 words each). This is designed to give you one fresh piece of content every single day to build topical authority."
            }
        ]
    },
    {
        category: "Backlinks & Safety",
        items: [
            {
                question: "Will Google penalize me for exchanging links?",
                answer: "Google penalizes \"excessive\" and \"irrelevant\" link swaps. We avoid this by using a Triangular (ABC) Exchange pattern. Instead of Site A linking to Site B, we ensure a complex loop (Site A → Site B → Site C → Site A) so there is no direct footprint for algorithms to flag."
            },
            {
                question: "Can I choose which sites link to me?",
                answer: "Our \"Entity-Smart\" matching algorithm automatically pairs you with sites in your niche or related categories. You can view all your active backlinks in your dashboard, including the site URL and its Domain Rating (DR)."
            }
        ]
    },
    {
        category: "Pricing & Setup",
        items: [
            {
                question: "What does the $49.99/month include?",
                answer: "Everything. You get 30 human-edited articles, ~20 organic backlinks from our network, and access to your 3D performance dashboard. There are no hidden \"per-link\" fees."
            },
            {
                question: "How long does it take to see results?",
                answer: "SEO is a marathon. Most users see an increase in \"Keyword Coverage\" within the first 30 days, while significant movements in Domain Authority and Page 1 rankings typically occur between months 3 and 6."
            }
        ]
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleFAQ = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <section className="py-32 bg-black text-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[128px]" />

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400 text-lg">Detailed answers to your most burning questions.</p>
                </div>

                <div className="space-y-10">
                    {faqData.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wider">{category.category}</h3>
                            <div className="space-y-4">
                                {category.items.map((item, itemIndex) => {
                                    const id = `${catIndex}-${itemIndex}`;
                                    const isOpen = openIndex === id;

                                    return (
                                        <div
                                            key={itemIndex}
                                            className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'bg-gray-900 border-red-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                        >
                                            <button
                                                onClick={() => toggleFAQ(id)}
                                                className="w-full text-left px-6 py-5 flex items-center justify-between group"
                                            >
                                                <span className={`text-lg font-medium pr-8 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                                    {item.question}
                                                </span>
                                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400 group-hover:bg-white/20'}`}>
                                                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed">
                                                            {item.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Schema Markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqData.flatMap(cat => cat.items.map(item => ({
                            "@type": "Question",
                            "name": item.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.answer
                            }
                        })))
                    })
                }}
            />
        </section>
    );
}
