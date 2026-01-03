
import { Article } from "@/types/database";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContentCalendar({ articles }: { articles: Article[] }) {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-zinc-800">
                <h3 className="text-white font-bold">Content Strategy</h3>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[400px] p-4 space-y-3">
                {articles.length === 0 ? (
                    <div className="text-center py-10 text-zinc-500">
                        <Calendar className="w-8 h-8 mx-auto mb-3 opacity-50" />
                        No articles in production yet.
                    </div>
                ) : (
                    articles.map((article) => (
                        <div key={article.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center justify-between hover:border-zinc-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    article.status === 'Live' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-yellow-500"
                                )} />
                                <div>
                                    <div className="font-medium text-zinc-200 text-sm">{article.title}</div>
                                    <div className="text-xs text-zinc-500 mt-0.5">{article.status}</div>
                                </div>
                            </div>
                            {article.status === 'Live' && article.live_url && (
                                <a
                                    href={article.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                                >
                                    View Live
                                </a>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
