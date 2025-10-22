-- Add missing content brief fields to articles table
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS content_type TEXT,
ADD COLUMN IF NOT EXISTS target_audience TEXT,
ADD COLUMN IF NOT EXISTS content_goal TEXT,
ADD COLUMN IF NOT EXISTS key_points TEXT,
ADD COLUMN IF NOT EXISTS tone TEXT,
ADD COLUMN IF NOT EXISTS brand_voice TEXT,
ADD COLUMN IF NOT EXISTS style_preferences TEXT,
ADD COLUMN IF NOT EXISTS specific_instructions TEXT,
ADD COLUMN IF NOT EXISTS reference_links TEXT,
ADD COLUMN IF NOT EXISTS avoid_topics TEXT;