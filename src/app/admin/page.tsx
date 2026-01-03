
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Site, Profile, Backlink, Article } from '@/types/database';
import { Loader, Search, Plus, ExternalLink, RefreshCw, CheckCircle, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types for joined data
type SiteWithProfile = Site & { profiles: Profile };

const PHASES = [
    { id: 1, label: 'Analysis', color: 'bg-zinc-500' },
    { id: 2, label: 'Keywords', color: 'bg-blue-500' },
    { id: 3, label: 'Writing', color: 'bg-purple-500' },
    { id: 4, label: 'Live', color: 'bg-emerald-500' },
];

export default function AdminDashboard() {
    const [sites, setSites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSite, setSelectedSite] = useState<any | null>(null);

    // Data Entry States
    const [backlinkForm, setBacklinkForm] = useState({ source_url: '', dr_score: 0, anchor_text: '' });
    const [articleForm, setArticleForm] = useState({ title: '', live_url: '' });

    const fetchSites = async () => {
        setLoading(true);
        // Fetch sites and join with profiles
        const { data: sitesData, error } = await supabase
            .from('sites')
            .select('*, profiles(email)');

        if (error) console.error('Error fetching sites:', error);
        else setSites(sitesData || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchSites();
    }, []);

    const updatePhase = async (siteId: string, newItem: number) => {
        const { error } = await supabase
            .from('sites')
            .update({ current_phase: newItem })
            .eq('id', siteId);

        if (!error) {
            setSites(sites.map(s => s.id === siteId ? { ...s, current_phase: newItem } : s));
        }
    };

    const handleAddBacklink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSite) return;

        const { error } = await supabase.from('backlinks').insert({
            site_id: selectedSite.id,
            source_url: backlinkForm.source_url,
            dr_score: backlinkForm.dr_score,
            anchor_text: backlinkForm.anchor_text
        });

        if (!error) {
            alert('Backlink added!');
            setBacklinkForm({ source_url: '', dr_score: 0, anchor_text: '' });
        } else {
            alert('Error adding backlink');
        }
    };

    const handleAddArticle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSite) return;

        const { error } = await supabase.from('articles').insert({
            site_id: selectedSite.id,
            title: articleForm.title,
            live_url: articleForm.live_url || null,
            status: articleForm.live_url ? 'Live' : 'In Editorial Review',
            published_at: new Date().toISOString()
        });

        if (!error) {
            alert('Article added!');
            setArticleForm({ title: '', live_url: '' });
        } else {
            alert('Error adding article');
        }
    };

    const filteredSites = sites.filter(s =>
        s.domain_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Master Control</h1>
                    <button onClick={fetchSites} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                        <RefreshCw className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search users or domains..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* User Table */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden mb-10">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-medium">
                            <tr>
                                <th className="p-4">User / Domain</th>
                                <th className="p-4">Current Phase</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {loading ? (
                                <tr><td colSpan={3} className="p-8 text-center text-zinc-500">Loading users...</td></tr>
                            ) : filteredSites.length === 0 ? (
                                <tr><td colSpan={3} className="p-8 text-center text-zinc-500">No sites found. Users must create a site first.</td></tr>
                            ) : (
                                filteredSites.map(site => (
                                    <tr key={site.id} className={cn("hover:bg-zinc-800/50 transition-colors", selectedSite?.id === site.id ? "bg-zinc-800/80" : "")}>
                                        <td className="p-4">
                                            <div className="font-medium text-white">{site.domain_url}</div>
                                            <div className="text-sm text-zinc-500">{site.profiles?.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={site.current_phase}
                                                onChange={(e) => updatePhase(site.id, parseInt(e.target.value))}
                                                className={cn(
                                                    "bg-zinc-950 border border-zinc-700 rounded px-3 py-1.5 text-sm font-medium focus:outline-none",
                                                    PHASES.find(p => p.id === site.current_phase)?.color || "bg-zinc-800"
                                                )}
                                            >
                                                {PHASES.map(phase => (
                                                    <option key={phase.id} value={phase.id} className="bg-zinc-900">
                                                        {phase.id}. {phase.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => setSelectedSite(site)}
                                                className="text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors border border-zinc-700"
                                            >
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Management Panel */}
                {selectedSite && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-5 fade-in duration-300">

                        {/* Backlink Manager */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-500/10 rounded-lg"><ExternalLink className="w-5 h-5 text-emerald-500" /></div>
                                <h2 className="text-xl font-bold text-white">Add Backlink</h2>
                            </div>

                            <form onSubmit={handleAddBacklink} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Source URL</label>
                                    <input
                                        required
                                        type="url"
                                        placeholder="https://example.com/blog-post"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-sm focus:border-emerald-500 focus:outline-none"
                                        value={backlinkForm.source_url}
                                        onChange={e => setBacklinkForm({ ...backlinkForm, source_url: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">DR Score</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="45"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-sm focus:border-emerald-500 focus:outline-none"
                                            value={backlinkForm.dr_score}
                                            onChange={e => setBacklinkForm({ ...backlinkForm, dr_score: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Anchor Text</label>
                                        <input
                                            type="text"
                                            placeholder="organic seo"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-sm focus:border-emerald-500 focus:outline-none"
                                            value={backlinkForm.anchor_text}
                                            onChange={e => setBacklinkForm({ ...backlinkForm, anchor_text: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors">
                                    Log Backlink
                                </button>
                            </form>
                        </div>

                        {/* Article Manager */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500/10 rounded-lg"><FileText className="w-5 h-5 text-purple-500" /></div>
                                <h2 className="text-xl font-bold text-white">Add Article</h2>
                            </div>

                            <form onSubmit={handleAddArticle} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Article Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="10 Ways to Scale SEO..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-sm focus:border-purple-500 focus:outline-none"
                                        value={articleForm.title}
                                        onChange={e => setArticleForm({ ...articleForm, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Live URL (Optional)</label>
                                    <input
                                        type="url"
                                        placeholder="Leave empty if still in review"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-sm focus:border-purple-500 focus:outline-none"
                                        value={articleForm.live_url}
                                        onChange={e => setArticleForm({ ...articleForm, live_url: e.target.value })}
                                    />
                                    <p className="text-xs text-zinc-500 mt-2">
                                        If URL is provided, status will be set to <span className="text-emerald-500 font-medium">Live</span>.
                                        Otherwise <span className="text-yellow-500 font-medium">In Review</span>.
                                    </p>
                                </div>
                                <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors">
                                    Add to Content Calendar
                                </button>
                            </form>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
