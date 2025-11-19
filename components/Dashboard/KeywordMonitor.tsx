import React from 'react';
import { MOCK_KEYWORDS } from '@/lib/mockData';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const KeywordMonitor = () => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Golden Keywords</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All (500+)</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-900/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Keyword</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Volume</th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Boligsiden Share</th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Trend</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {MOCK_KEYWORDS.map((keyword) => (
                            <tr key={keyword.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                    {keyword.keyword}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                    <span className="px-2 py-1 rounded-full bg-slate-800 text-xs border border-slate-700">
                                        {keyword.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 text-right">
                                    {keyword.volume.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${keyword.boligsidenShare}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-bold text-white">{keyword.boligsidenShare}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className={`flex items-center justify-end gap-1 text-sm font-medium ${keyword.trend > 0 ? 'text-emerald-400' : keyword.trend < 0 ? 'text-red-400' : 'text-slate-400'
                                        }`}>
                                        {keyword.trend > 0 ? <ArrowUp className="w-3 h-3" /> : keyword.trend < 0 ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                        {Math.abs(keyword.trend)}%
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KeywordMonitor;
