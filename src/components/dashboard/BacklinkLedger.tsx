
import { Backlink } from "@/types/database";
import { ExternalLink } from "lucide-react";

export default function BacklinkLedger({ backlinks }: { backlinks: Backlink[] }) {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden h-full">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-white font-bold">Backlink Ledger</h3>
                <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20">
                    {backlinks.length} Active
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-900 text-zinc-500 font-medium">
                        <tr>
                            <th className="p-4">Source URL</th>
                            <th className="p-4">DR</th>
                            <th className="p-4">Anchor</th>
                            <th className="p-4 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-zinc-300">
                        {backlinks.length === 0 ? (
                            <tr><td colSpan={4} className="p-8 text-center text-zinc-500">No backlinks confirmed yet.</td></tr>
                        ) : (
                            backlinks.map((link) => (
                                <tr key={link.id} className="hover:bg-zinc-800/30 transition-colors group">
                                    <td className="p-4">
                                        <a href={link.source_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                                            <div className="max-w-[200px] truncate">{link.source_url}</div>
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 font-bold text-xs">
                                            {link.dr_score}
                                        </div>
                                    </td>
                                    <td className="p-4 text-zinc-400 italic">"{link.anchor_text}"</td>
                                    <td className="p-4 text-right text-zinc-500">
                                        {new Date(link.acquired_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
