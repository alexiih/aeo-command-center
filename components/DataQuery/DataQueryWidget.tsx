'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles } from 'lucide-react';

const PRESET_QUESTIONS = [
    "How are we performing in GPT-5.1 for listings in Copenhagen?",
    "Which competitor is winning in 'Luxury' searches?",
    "Show me the trend for 'Selling' keywords this week.",
    "What is our share of voice on Perplexity vs Sonnet?"
];

const DataQueryWidget = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const handleAsk = (q: string) => {
        setQuery(q);
        setResponse(null);
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            setIsTyping(false);
            setResponse(generateMockResponse(q));
        }, 1500);
    };

    const generateMockResponse = (q: string) => {
        if (q.includes('Copenhagen')) {
            return "In **Copenhagen**, Boligsiden appears in **78%** of GPT-5.1 responses for listing queries. However, Nybolig is strong in 'Nordhavn' specific searches (45% share).";
        }
        if (q.includes('Luxury')) {
            return "For **Luxury** searches, **Nybolig** is currently leading with a **35%** share, followed by Boligsiden at 30%. The AI models often cite Nybolig's 'Premium' listing pages.";
        }
        if (q.includes('Selling')) {
            return "The trend for **Selling** keywords is **up 2.5%** this week. This is largely driven by improved rankings on 'vurdering' (valuation) related terms.";
        }
        return "Based on the latest scan, Boligsiden holds a **52%** share on Perplexity, compared to **48%** on Sonnet 4.5. Perplexity favors your structured data, while Sonnet prefers editorial content.";
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Ask the Data</h3>
            </div>

            <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
                {!response && !isTyping && (
                    <div className="grid grid-cols-1 gap-3">
                        {PRESET_QUESTIONS.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleAsk(q)}
                                className="text-left p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/30 transition-all text-sm text-slate-300 hover:text-white"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {isTyping && (
                    <div className="flex items-start gap-3 animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="bg-slate-800 rounded-lg p-3 rounded-tl-none text-sm text-slate-300">
                            Analyzing 500+ keywords across 4 models...
                        </div>
                    </div>
                )}

                {response && (
                    <div className="space-y-4">
                        <div className="flex items-end justify-end gap-3">
                            <div className="bg-blue-600 text-white rounded-lg p-3 rounded-tr-none text-sm">
                                {query}
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="bg-slate-800 rounded-lg p-4 rounded-tl-none text-sm text-slate-300 leading-relaxed">
                                <div dangerouslySetInnerHTML={{ __html: response.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
                            </div>
                        </div>
                        <button
                            onClick={() => setResponse(null)}
                            className="text-xs text-slate-500 hover:text-blue-400 ml-11"
                        >
                            Ask another question
                        </button>
                    </div>
                )}
            </div>

            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a custom question..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk(query)}
                />
                <button
                    onClick={() => handleAsk(query)}
                    className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default DataQueryWidget;
