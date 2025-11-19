export type LLMModel = 'GPT-5.1' | 'Sonnet 4.5' | 'Perplexity' | 'Gemini 2.5 Pro';

export type Competitor = 'Boligsiden' | 'Nybolig' | 'EDC' | 'Boliga' | 'Home.dk';

export type KeywordCategory = 'Buying' | 'Selling' | 'Market Data' | 'Luxury' | 'Rentals' | 'Research' | 'Competitor';

export interface KeywordRanking {
  id: string;
  keyword: string;
  category: KeywordCategory;
  volume: number; // Monthly search volume estimate
  boligsidenShare: number; // % of times Boligsiden is the primary recommendation
  competitorShares: Record<Competitor, number>;
  trend: number; // % change from last week
}

export interface HistoricalDataPoint {
  date: string;
  boligsiden: number;
  nybolig: number;
  edc: number;
  boliga: number;
  home: number;
}

export interface Insight {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  llm: LLMModel;
}
