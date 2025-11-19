-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Competitors Table
create table competitors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  color text,
  website_url text
);

-- Keywords Table
create table keywords (
  id uuid primary key default uuid_generate_v4(),
  text text not null unique,
  category text not null, -- 'Buying', 'Selling', 'Market Data', etc.
  monthly_volume int default 0,
  created_at timestamp with time zone default now()
);

-- LLM Models Enum
create type llm_model as enum ('GPT-5.1', 'Sonnet 4.5', 'Perplexity', 'Gemini 2.5 Pro');

-- Rankings / Scans Table (The "Mystery Shopper" results)
create table rankings (
  id uuid primary key default uuid_generate_v4(),
  keyword_id uuid references keywords(id),
  model llm_model not null,
  scanned_at timestamp with time zone default now(),
  
  -- Metrics
  boligsiden_mentioned boolean default false,
  boligsiden_rank int, -- Null if not ranked
  primary_recommendation_id uuid references competitors(id), -- Who was #1?
  
  -- Raw Data
  raw_response text,
  sentiment_score float -- -1.0 to 1.0
);

-- Daily Aggregates (For fast charting)
create table daily_stats (
  date date primary key,
  boligsiden_share_of_voice float, -- 0-100
  competitor_shares jsonb, -- {'Nybolig': 20, 'EDC': 15}
  total_scans int
);

-- Seed Data (Example)
insert into competitors (name, color) values 
  ('Boligsiden', '#3b82f6'),
  ('Nybolig', '#8b5cf6'),
  ('EDC', '#10b981'),
  ('Boliga', '#f59e0b');
