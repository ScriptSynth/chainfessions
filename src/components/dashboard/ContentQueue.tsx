
import React from 'react';
import { PenTool, Clock, MoreHorizontal } from 'lucide-react';

const mockArticles = [
    { id: 1, title: "10 Proven Strategies for Semantic SEO in 2026", keywords: "semantic seo, ai content", date: "Scheduled Today", type: "Blog Post" },
    { id: 2, title: "How Peer-to-Peer Link Exchange Beats PBNs", keywords: "link exchange, pbn alternatives", date: "Tomorrow, 9:00 AM", type: "Case Study" },
    { id: 3, title: "Optimizing Core Web Vitals for Next.js Apps", keywords: "core web vitals, nextjs seo", date: "Jan 12, 2026", type: "Technical Guide" },
];

export default function ContentQueue() {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl flex flex-col h-full">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-white">Content Queue</h3>
                    <p className="text-xs text-gray-500">Upcoming AI-generated articles</p>
                </div>
                <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors">
                    + Generate New
                </button>
            </div>

            <div className="p-4 space-y-3">
                {mockArticles.map((article) => (
                    <div key={article.id} className="p-4 bg-black/40 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium tracking-wide">
                                {article.type}
                            </span>
                            <button className="text-gray-600 hover:text-white transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>

                        <h4 className="text-sm font-semibold text-gray-200 mb-1 leading-snug group-hover:text-indigo-400 transition-colors cursor-pointer">
                            {article.title}
                        </h4>

                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] text-gray-500 uppercase font-semibold">Targets:</span>
                            <span className="text-[10px] text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">{article.keywords}</span>
                        </div>

                        <div className="flex items-center gap-4 pt-3 border-t border-gray-800/50">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Clock className="w-3.5 h-3.5" />
                                {article.date}
                            </div>
                            <button className="ml-auto text-xs text-white hover:text-indigo-400 font-medium flex items-center gap-1 transition-colors">
                                <PenTool className="w-3 h-3" />
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
