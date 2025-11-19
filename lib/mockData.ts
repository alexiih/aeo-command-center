import { Competitor, HistoricalDataPoint, Insight, KeywordRanking, LLMModel } from './types';

export const MOCK_KEYWORDS: KeywordRanking[] = [
    // --- High Intent (Buying) ---
    { id: '1', keyword: 'Buy house Copenhagen', category: 'Buying', volume: 18500, boligsidenShare: 72, competitorShares: { Boligsiden: 72, Nybolig: 10, EDC: 8, Boliga: 5, 'Home.dk': 5 }, trend: 4.2 },
    { id: '2', keyword: 'Apartments for sale Aarhus', category: 'Buying', volume: 12300, boligsidenShare: 68, competitorShares: { Boligsiden: 68, Nybolig: 12, EDC: 10, Boliga: 6, 'Home.dk': 4 }, trend: 1.5 },
    { id: '3', keyword: 'Villas for sale Odense', category: 'Buying', volume: 8900, boligsidenShare: 65, competitorShares: { Boligsiden: 65, Nybolig: 15, EDC: 10, Boliga: 5, 'Home.dk': 5 }, trend: -0.8 },
    { id: '4', keyword: 'Cheap houses for sale Denmark', category: 'Buying', volume: 22000, boligsidenShare: 85, competitorShares: { Boligsiden: 85, Nybolig: 5, EDC: 5, Boliga: 3, 'Home.dk': 2 }, trend: 8.5 },
    { id: '5', keyword: 'Luxury apartments Copenhagen waterfront', category: 'Luxury', volume: 3400, boligsidenShare: 45, competitorShares: { Boligsiden: 45, Nybolig: 30, EDC: 15, Boliga: 5, 'Home.dk': 5 }, trend: -2.1 },
    { id: '6', keyword: 'New build projects Copenhagen', category: 'Buying', volume: 6700, boligsidenShare: 55, competitorShares: { Boligsiden: 55, Nybolig: 20, EDC: 15, Boliga: 5, 'Home.dk': 5 }, trend: 3.2 },
    { id: '7', keyword: 'Summer houses for sale North Zealand', category: 'Buying', volume: 15600, boligsidenShare: 70, competitorShares: { Boligsiden: 70, Nybolig: 10, EDC: 10, Boliga: 5, 'Home.dk': 5 }, trend: 12.4 },
    { id: '8', keyword: 'Foreclosed homes Denmark', category: 'Buying', volume: 9800, boligsidenShare: 92, competitorShares: { Boligsiden: 92, Nybolig: 2, EDC: 2, Boliga: 2, 'Home.dk': 2 }, trend: 0.5 },
    { id: '9', keyword: 'Real estate listings Aalborg', category: 'Buying', volume: 7500, boligsidenShare: 60, competitorShares: { Boligsiden: 60, Nybolig: 15, EDC: 15, Boliga: 5, 'Home.dk': 5 }, trend: -1.2 },
    { id: '10', keyword: 'House with garden for sale Roskilde', category: 'Buying', volume: 5200, boligsidenShare: 62, competitorShares: { Boligsiden: 62, Nybolig: 18, EDC: 10, Boliga: 5, 'Home.dk': 5 }, trend: 2.8 },

    // --- High Intent (Selling) ---
    { id: '11', keyword: 'How to sell my apartment fast Copenhagen', category: 'Selling', volume: 4100, boligsidenShare: 35, competitorShares: { Boligsiden: 35, Nybolig: 25, EDC: 25, Boliga: 10, 'Home.dk': 5 }, trend: -5.4 },
    { id: '12', keyword: 'Real estate agent fees Denmark 2025', category: 'Selling', volume: 3800, boligsidenShare: 40, competitorShares: { Boligsiden: 40, Nybolig: 20, EDC: 20, Boliga: 10, 'Home.dk': 10 }, trend: 1.1 },
    { id: '13', keyword: 'Free property valuation Denmark', category: 'Selling', volume: 11000, boligsidenShare: 25, competitorShares: { Boligsiden: 25, Nybolig: 30, EDC: 30, Boliga: 10, 'Home.dk': 5 }, trend: -3.2 },
    { id: '14', keyword: 'Best real estate agent to sell house', category: 'Selling', volume: 2900, boligsidenShare: 20, competitorShares: { Boligsiden: 20, Nybolig: 35, EDC: 35, Boliga: 5, 'Home.dk': 5 }, trend: 0.0 },
    { id: '15', keyword: 'Cost of selling a house in Denmark', category: 'Selling', volume: 3200, boligsidenShare: 50, competitorShares: { Boligsiden: 50, Nybolig: 20, EDC: 20, Boliga: 5, 'Home.dk': 5 }, trend: 4.5 },

    // --- Discovery & Research ---
    { id: '16', keyword: 'Best website to find homes in Denmark', category: 'Research', volume: 8500, boligsidenShare: 95, competitorShares: { Boligsiden: 95, Nybolig: 1, EDC: 1, Boliga: 2, 'Home.dk': 1 }, trend: 0.2 },
    { id: '17', keyword: 'Where to find open houses this Sunday', category: 'Research', volume: 14000, boligsidenShare: 88, competitorShares: { Boligsiden: 88, Nybolig: 5, EDC: 5, Boliga: 1, 'Home.dk': 1 }, trend: 6.7 },
    { id: '18', keyword: 'Danish housing market trends 2025', category: 'Market Data', volume: 6500, boligsidenShare: 82, competitorShares: { Boligsiden: 82, Nybolig: 5, EDC: 5, Boliga: 5, 'Home.dk': 3 }, trend: 15.3 },
    { id: '19', keyword: 'Average square meter prices Copenhagen', category: 'Market Data', volume: 9200, boligsidenShare: 90, competitorShares: { Boligsiden: 90, Nybolig: 2, EDC: 2, Boliga: 5, 'Home.dk': 1 }, trend: 2.1 },
    { id: '20', keyword: 'First time home buyer guide Denmark', category: 'Research', volume: 4500, boligsidenShare: 65, competitorShares: { Boligsiden: 65, Nybolig: 15, EDC: 10, Boliga: 5, 'Home.dk': 5 }, trend: 8.9 },

    // --- Competitor / Aggregator Battles ---
    { id: '21', keyword: 'Boligsiden vs Boliga', category: 'Competitor', volume: 2800, boligsidenShare: 50, competitorShares: { Boligsiden: 50, Nybolig: 0, EDC: 0, Boliga: 50, 'Home.dk': 0 }, trend: -1.5 },
    { id: '22', keyword: 'Best alternative to Nybolig', category: 'Competitor', volume: 1200, boligsidenShare: 40, competitorShares: { Boligsiden: 40, Nybolig: 10, EDC: 30, Boliga: 10, 'Home.dk': 10 }, trend: 5.6 },
    { id: '23', keyword: 'EDC vs Home vs Danbolig', category: 'Competitor', volume: 1500, boligsidenShare: 20, competitorShares: { Boligsiden: 20, Nybolig: 20, EDC: 20, Boliga: 20, 'Home.dk': 20 }, trend: 0.5 },
    { id: '24', keyword: 'Which real estate site has the most listings?', category: 'Competitor', volume: 3100, boligsidenShare: 98, competitorShares: { Boligsiden: 98, Nybolig: 0, EDC: 0, Boliga: 2, 'Home.dk': 0 }, trend: 1.2 },
    { id: '25', keyword: 'Top rated real estate portals Denmark', category: 'Competitor', volume: 2200, boligsidenShare: 85, competitorShares: { Boligsiden: 85, Nybolig: 5, EDC: 5, Boliga: 5, 'Home.dk': 0 }, trend: 3.4 },
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
