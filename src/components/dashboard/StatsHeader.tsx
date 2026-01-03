
import { Activity, FileText, ShieldCheck } from "lucide-react";

interface StatsHeaderProps {
    articleCount: number;
    backlinkCount: number;
    domainHealth: number;
}

export default function StatsHeader({ articleCount, backlinkCount, domainHealth }: StatsHeaderProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-zinc-800 rounded-lg">
                    <FileText className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                    <div className="text-3xl font-bold text-white">{articleCount}</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Articles Published</div>
                </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-zinc-800 rounded-lg">
                    <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                    <div className="text-3xl font-bold text-white">{backlinkCount}</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Active Backlinks</div>
                </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-zinc-800 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                    <div className="text-3xl font-bold text-white">{domainHealth}%</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Domain Health</div>
                </div>
            </div>
        </div>
    );
}
