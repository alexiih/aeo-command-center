import { supabase } from './supabaseClient';
import { KeywordRanking, HistoricalDataPoint, Competitor, KeywordCategory } from './types';
import { MOCK_KEYWORDS, MOCK_HISTORY } from './mockData';

// Helper to calculate trend (mock logic for now, but structure is ready for real data comparison)
const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
};

export const api = {
    // Fetch latest keyword rankings
    getKeywords: async (): Promise<KeywordRanking[]> => {
        try {
            // In a real scenario, we would fetch from the 'rankings' table
            // and aggregate by keyword to get the latest stats.
            // For now, we'll check if we have real data, otherwise fallback to mock.

            const { data, error } = await supabase
                .from('rankings')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) throw error;

            if (!data || data.length === 0) {
                console.log('No real data found, using mock data');
                return MOCK_KEYWORDS;
            }

            // Transform DB data to KeywordRanking type
            // Note: This is a simplified transformation. 
            // Real implementation would need complex aggregation if storing raw individual LLM checks.
            // Assuming 'rankings' table has columns that map roughly to our needs or we aggregate here.

            // For this MVP, if we have raw data, we might need to process it.
            // Let's return MOCK_KEYWORDS for now until we have enough real data to aggregate,
            // OR we can try to map the latest scan.

            return MOCK_KEYWORDS;
        } catch (error) {
            console.error('Error fetching keywords:', error);
            return MOCK_KEYWORDS;
        }
    },

    // Fetch historical trend data
    getHistory: async (days: number = 30): Promise<HistoricalDataPoint[]> => {
        try {
            const { data, error } = await supabase
                .from('daily_stats')
                .select('*')
                .order('date', { ascending: true })
                .limit(days);

            if (error) throw error;

            if (!data || data.length === 0) {
                return MOCK_HISTORY.slice(-days);
            }

            return data.map(d => ({
                date: d.date,
                boligsiden: d.boligsiden_share,
                nybolig: d.nybolig_share,
                edc: d.edc_share,
                boliga: d.boliga_share,
                home: d.home_share
            }));
        } catch (error) {
            console.error('Error fetching history:', error);
            return MOCK_HISTORY.slice(-days);
        }
    },

    // Trigger a new scan via Edge Function
    triggerScan: async (keyword: string) => {
        const { data, error } = await supabase.functions.invoke('mystery-shopper', {
            body: { keyword }
        });
        if (error) throw error;
        return data;
    }
};
