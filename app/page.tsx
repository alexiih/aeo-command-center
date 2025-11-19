import React from 'react';
import BattlefieldHeatmap from '@/components/Dashboard/BattlefieldHeatmap';
import TrendChart from '@/components/Dashboard/TrendChart';
import InsightCard from '@/components/Dashboard/InsightCard';
import KeywordMonitor from '@/components/Dashboard/KeywordMonitor';
import DataQueryWidget from '@/components/DataQuery/DataQueryWidget';
import { MOCK_INSIGHTS } from '@/lib/mockData';

export default function Home() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Command Center</h1>
          <p className="text-slate-400">Real-time intelligence on Boligsiden's AI visibility.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            + Add Monitor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart />
        </div>
        <div className="h-full">
          <DataQueryWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BattlefieldHeatmap />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Live Insights</h3>
          <div className="space-y-3">
            {MOCK_INSIGHTS.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </div>

      <KeywordMonitor />
    </div>
  );
}
