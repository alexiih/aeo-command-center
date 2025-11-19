'use client';

import React, { useState } from 'react';
import { ArrowRight, Trophy, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { MOCK_KEYWORDS } from '@/lib/mockData';

export default function CompetitorAnalysis() {
    const [selectedCompetitor, setSelectedCompetitor] = useState('Nybolig');

    const competitors = ['Nybolig', 'EDC', 'Boliga', 'Home.dk'];

    // Calculate Win/Loss stats
    const totalKeywords = MOCK_KEYWORDS.length;
    const boligsidenWins = MOCK_KEYWORDS.filter(k => k.boligsidenShare > k.competitorShares[selectedCompetitor as keyof typeof k.competitorShares]).length;
    const competitorWins = totalKeywords - boligsidenWins;
    const winRate = Math.round((boligsidenWins / totalKeywords) * 100);

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Competitor Analysis</h1>
                    <p className="text-slate-400">Head-to-head performance comparison.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    {competitors.map((comp) => (
                        <button
                            key={comp}
                            onClick={() => setSelectedCompetitor(comp)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${selectedCompetitor === comp
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            {comp}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Trophy className="w-10 h-10 text-yellow-500 mb-3" />
                    <h3 className="text-3xl font-bold text-white mb-1">{winRate}%</h3>
                    <p className="text-sm text-slate-400">Win Rate vs {selectedCompetitor}</p>
                    <div className="mt-4 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full transition-all duration-500" style={{ width: `${winRate}%` }}></div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Target className="w-10 h-10 text-emerald-500 mb-3" />
                    <h3 className="text-3xl font-bold text-white mb-1">{boligsidenWins}</h3>
                    <p className="text-sm text-slate-400">Keywords Won</p>
                    <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +5 this week
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
                    <h3 className="text-3xl font-bold text-white mb-1">{competitorWins}</h3>
                    <p className="text-sm text-slate-400">Opportunities Lost</p>
                    <button className="mt-4 text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                        View Keywords <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h3 className="text-lg font-semibold text-white">Category Breakdown</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        {['Buying', 'Selling', 'Market Data', 'Luxury', 'Rentals'].map((category) => {
                            // Mock calculation for category share
                            const randomShare = Math.floor(Math.random() * 40) + 30;
                            return (
                                <div key={category} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-white">{category}</span>
                                        <span className="text-slate-400">Boligsiden vs {selectedCompetitor}</span>
                                    </div>
                                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                        <div
                                            className="h-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white/80"
                                            style={{ width: `${randomShare}%` }}
                                        >
                                            {randomShare}%
                                        </div>
                                        <div
                                            className="h-full bg-slate-600 flex items-center justify-center text-[10px] font-bold text-white/80"
                                            style={{ width: `${100 - randomShare}%` }}
                                        >
                                            {100 - randomShare}%
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
