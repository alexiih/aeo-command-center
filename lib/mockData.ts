import { Competitor, HistoricalDataPoint, Insight, KeywordRanking, LLMModel } from './types';

export const MOCK_KEYWORDS: KeywordRanking[] = [
    {
        id: '1',
        keyword: 'buy house copenhagen',
        category: 'Buying',
        volume: 12000,
        boligsidenShare: 65,
        competitorShares: {
            Boligsiden: 65,
            Nybolig: 15,
            EDC: 10,
            Boliga: 5,
            'Home.dk': 5,
        },
        trend: 2.5,
    },
    {
        id: '2',
        keyword: 'sell apartment aarhus',
        category: 'Selling',
        volume: 5400,
        boligsidenShare: 42,
        competitorShares: {
            Boligsiden: 42,
            Nybolig: 25,
            EDC: 20,
            Boliga: 8,
            'Home.dk': 5,
        },
        trend: -1.2,
    },
    {
        id: '3',
        keyword: 'house prices denmark 2025',
        category: 'Market Data',
        volume: 8500,
        boligsidenShare: 88,
        competitorShares: {
            Boligsiden: 88,
            Nybolig: 2,
            EDC: 3,
            Boliga: 5,
            'Home.dk': 2,
        },
        trend: 5.0,
    },
    {
        id: '4',
        keyword: 'luxury villas north zealand',
        category: 'Luxury',
        volume: 2100,
        boligsidenShare: 30,
        competitorShares: {
            Boligsiden: 30,
            Nybolig: 35,
            EDC: 15,
            Boliga: 10,
            'Home.dk': 10,
        },
        trend: -5.5,
    },
    {
        id: '5',
        keyword: 'cheap rentals odense',
        category: 'Rentals',
        volume: 6700,
        boligsidenShare: 15,
        competitorShares: {
            Boligsiden: 15,
            Nybolig: 5,
            EDC: 5,
            Boliga: 60,
            'Home.dk': 15,
        },
        trend: 0.5,
    },
];

export const MOCK_HISTORY: HistoricalDataPoint[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
        date: date.toISOString().split('T')[0],
        boligsiden: 45 + Math.random() * 10 - 5,
        nybolig: 20 + Math.random() * 5 - 2.5,
        edc: 15 + Math.random() * 5 - 2.5,
        boliga: 10 + Math.random() * 3 - 1.5,
        home: 10 + Math.random() * 3 - 1.5,
    };
});

export const MOCK_INSIGHTS: Insight[] = [
    {
        id: '1',
        type: 'success',
        title: 'Market Data Dominance',
        description: 'GPT-5.1 cites Boligsiden as the primary source for "price trends" in 92% of queries.',
        impact: 'High',
        llm: 'GPT-5.1',
    },
    {
        id: '2',
        type: 'warning',
        title: 'Losing "Luxury" Ground',
        description: 'Sonnet 4.5 prefers Nybolig for luxury listings due to their richer image descriptions.',
        impact: 'Medium',
        llm: 'Sonnet 4.5',
    },
    {
        id: '3',
        type: 'danger',
        title: 'Rental Confusion',
        description: 'Perplexity often confuses Boligsiden with Boligportal for rental queries.',
        impact: 'High',
        llm: 'Perplexity',
    },
];
