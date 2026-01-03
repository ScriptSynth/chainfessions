
import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

const mockLinks = [
    { id: 1, url: 'techcrunch.com/startups/antigravity...', dr: 92, anchor: 'automated seo tools', date: '2m ago', status: 'Verified' },
    { id: 2, url: 'searchengineland.com/future-of-link...', dr: 88, anchor: 'backlink exchange network', date: '45m ago', status: 'Verified' },
    { id: 3, url: 'ahrefs.com/blog/link-building-stra...', dr: 91, anchor: 'organic growth strategies', date: '2h ago', status: 'Verified' },
    { id: 4, url: 'indiehackers.com/products/anti...', dr: 65, anchor: 'saas growth tools', date: '5h ago', status: 'Pending' },
];

export default function BacklinkFeed() {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Backlink Feed</h3>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20 animate-pulse">
                    ● Live Network
                </span>
            </div>

            <div className="overflow-y-auto flex-1 p-0">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-950 text-gray-500 text-xs uppercase sticky top-0 z-10">
                        <tr>
                            <th className="p-4 font-medium">Placement URL</th>
                            <th className="p-4 font-medium">DR</th>
                            <th className="p-4 font-medium">Anchor Text</th>
                            <th className="p-4 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {mockLinks.map((link) => (
                            <tr key={link.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm text-indigo-300 truncate max-w-[180px]">{link.url}</span>
                                        <ExternalLink className="w-3 h-3 text-gray-600" />
                                    </div>
                                    <div className="text-[10px] text-gray-500 mt-1">{link.date}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-0.5 rounded textxs font-bold ${link.dr > 80 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-gray-800 text-gray-400'}`}>
                                        {link.dr}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-300 font-medium">
                                    "{link.anchor}"
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                        {link.status === 'Verified' ? (
                                            <>
                                                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                                <span className="text-xs text-green-400">Active</span>
                                            </>
                                        ) : (
                                            <span className="text-xs text-yellow-500">Crawling...</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
