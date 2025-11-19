import React from 'react';
import { MOCK_KEYWORDS } from '@/lib/mockData';
import { Competitor } from '@/lib/types';

const BattlefieldHeatmap = () => {
    const categories = Array.from(new Set(MOCK_KEYWORDS.map((k) => k.category)));
    const competitors: Competitor[] = ['Boligsiden', 'Nybolig', 'EDC', 'Boliga', 'Home.dk'];

    // Calculate average share per category per competitor
    const heatMapData = categories.map((category) => {
        const keywords = MOCK_KEYWORDS.filter((k) => k.category === category);
        const scores = competitors.map((comp) => {
            const avg =
                keywords.reduce((acc, curr) => acc + (curr.competitorShares[comp] || 0), 0) /
                keywords.length;
            return { competitor: comp, score: avg };
        });
        return { category, scores };
    });

    const getColor = (score: number) => {
        if (score >= 60) return 'bg-emerald-500/90 text-white';
        if (score >= 40) return 'bg-emerald-500/40 text-emerald-100';
        if (score >= 20) return 'bg-slate-700 text-slate-300';
        if (score >= 10) return 'bg-red-500/20 text-red-200';
        return 'bg-red-500/40 text-white';
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">The Battlefield</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div>Dominant</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-700 rounded-full"></div>Contested</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Losing</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-4">Category</th>
                            {competitors.map((comp) => (
                                <th key={comp} className="text-center text-xs font-medium text-slate-500 uppercase tracking-wider pb-4">
                                    {comp}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="space-y-2">
                        {heatMapData.map((row) => (
                            <tr key={row.category} className="group">
                                <td className="py-2 text-sm font-medium text-slate-300">{row.category}</td>
                                {row.scores.map((score) => (
                                    <td key={score.competitor} className="p-1">
                                        <div
                                            className={`h-10 rounded-md flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-105 cursor-default ${getColor(
                                                score.score
                                            )}`}
                                        >
                                            {Math.round(score.score)}%
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BattlefieldHeatmap;
