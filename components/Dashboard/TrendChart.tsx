'use client';

import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { api } from '@/lib/api';
import { HistoricalDataPoint } from '@/lib/types';

const TrendChart = () => {
    const [range, setRange] = useState('30');
    const [data, setData] = useState<HistoricalDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const history = await api.getHistory(parseInt(range));
            setData(history);
            setLoading(false);
        };
        fetchData();
    }, [range]);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-[400px]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Share of Voice Trend</h3>
                    <p className="text-sm text-slate-400">Historical visibility across all LLMs</p>
                </div>
                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1 outline-none focus:border-blue-500 cursor-pointer"
                >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 90 Days</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorBoligsiden" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorNybolig" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#64748b"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis stroke="#64748b" tick={{ fontSize: 12 }} unit="%" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0f172a',
                            borderColor: '#1e293b',
                            color: '#f1f5f9',
                        }}
                        itemStyle={{ color: '#e2e8f0' }}
                        formatter={(value: number) => `${value.toFixed(1)}%`}
                    />
                    <Area
                        type="monotone"
                        dataKey="boligsiden"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorBoligsiden)"
                        name="Boligsiden"
                    />
                    <Area
                        type="monotone"
                        dataKey="nybolig"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorNybolig)"
                        name="Nybolig"
                    />
                    <Area
                        type="monotone"
                        dataKey="edc"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="none"
                        name="EDC"
                        strokeDasharray="5 5"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;
