'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { KeywordRanking } from '@/lib/types';
import { ArrowUp, ArrowDown, Minus, Search, Filter, Download } from 'lucide-react';

export default function KeywordMonitorPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [keywords, setKeywords] = useState<KeywordRanking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await api.getKeywords();
            setKeywords(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const categories = ['All', ...Array.from(new Set(keywords.map(k => k.category)))];

    const filteredKeywords = keywords.filter(keyword => {
        const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || keyword.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Keyword Monitor</h1>
                    <p className="text-slate-400">Tracking {keywords.length} high-impact keywords across all LLMs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700">
                        <Download size={16} />
                        <span className="text-sm font-medium">Export CSV</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-lg shadow-blue-900/20">
                        <Search size={16} />
                        <span className="text-sm font-medium">Scan Now</span>
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Filter size={16} className="text-slate-500 mr-1" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all ${selectedCategory === cat
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-950/50 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Keyword</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Volume</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Boligsiden Share</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend (7d)</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredKeywords.map((keyword) => (
                                <tr key={keyword.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {keyword.keyword}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs border border-slate-700">
                                            {keyword.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 text-right font-mono">
                                        {keyword.volume.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${keyword.boligsidenShare > 50 ? 'bg-emerald-500' : keyword.boligsidenShare > 20 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                                    style={{ width: `${keyword.boligsidenShare}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-bold text-white w-8">{keyword.boligsidenShare}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className={`flex items-center justify-end gap-1 text-sm font-medium ${keyword.trend > 0 ? 'text-emerald-400' : keyword.trend < 0 ? 'text-red-400' : 'text-slate-400'
                                            }`}>
                                            {keyword.trend > 0 ? <ArrowUp className="w-3 h-3" /> : keyword.trend < 0 ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                            {Math.abs(keyword.trend)}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        {keyword.boligsidenShare > 60 ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                Dominant
                                            </span>
                                        ) : keyword.boligsidenShare < 20 ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                                At Risk
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                Competitive
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredKeywords.length === 0 && (
                        <div className="p-12 text-center text-slate-500">
                            No keywords found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
