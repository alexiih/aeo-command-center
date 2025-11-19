import React from 'react';
import { Insight } from '@/lib/types';
import { AlertTriangle, CheckCircle, Info, XCircle, ArrowRight } from 'lucide-react';

const InsightCard = ({ insight }: { insight: Insight }) => {
    const getIcon = () => {
        switch (insight.type) {
            case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
            case 'danger': return <XCircle className="w-5 h-5 text-red-400" />;
            default: return <Info className="w-5 h-5 text-blue-400" />;
        }
    };

    const getBorderColor = () => {
        switch (insight.type) {
            case 'success': return 'border-emerald-500/20 hover:border-emerald-500/40';
            case 'warning': return 'border-amber-500/20 hover:border-amber-500/40';
            case 'danger': return 'border-red-500/20 hover:border-red-500/40';
            default: return 'border-blue-500/20 hover:border-blue-500/40';
        }
    };

    return (
        <div className={`bg-slate-900 border rounded-xl p-5 transition-all duration-300 hover:bg-slate-800/50 group ${getBorderColor()}`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    {getIcon()}
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{insight.llm}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${insight.impact === 'High' ? 'bg-slate-800 text-slate-300' : 'bg-slate-800/50 text-slate-500'
                    }`}>
                    {insight.impact} Impact
                </span>
            </div>

            <h4 className="text-base font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {insight.title}
            </h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                {insight.description}
            </p>

            <button className="text-sm font-medium text-blue-400 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                View Analysis <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default InsightCard;
