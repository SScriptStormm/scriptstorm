-- Add new columns for tier-specific features
ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS competitor_urls TEXT,
ADD COLUMN IF NOT EXISTS strategic_goals TEXT[],
ADD COLUMN IF NOT EXISTS kpis_to_track TEXT[];

-- Add comments for documentation
COMMENT ON COLUMN public.articles.competitor_urls IS 'Competitor URLs for analysis (Growth+ feature)';
COMMENT ON COLUMN public.articles.strategic_goals IS 'Strategic content goals like thought leadership, competitor keywords, etc. (Authority+ feature)';
COMMENT ON COLUMN public.articles.kpis_to_track IS 'Key Performance Indicators to track (Dominance feature)';