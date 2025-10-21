-- Create content calendar events table for Growth package
CREATE TABLE public.content_calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'article', -- article, social_post, etc.
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, published, cancelled
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_calendar_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own calendar events"
  ON public.content_calendar_events
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own calendar events"
  ON public.content_calendar_events
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calendar events"
  ON public.content_calendar_events
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calendar events"
  ON public.content_calendar_events
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create research reports table for Scale, Authority, and Dominance packages
CREATE TABLE public.research_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  report_type TEXT NOT NULL, -- keyword_research, competitor_analysis, gap_analysis
  file_url TEXT,
  file_name TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.research_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own research reports"
  ON public.research_reports
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all research reports"
  ON public.research_reports
  FOR ALL
  USING (current_user_is_admin())
  WITH CHECK (current_user_is_admin());

-- Create market roadmaps table for Dominance package
CREATE TABLE public.market_roadmaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  quarter TEXT NOT NULL, -- Q1 2025, Q2 2025, etc.
  file_url TEXT,
  file_name TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active, archived
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.market_roadmaps ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own market roadmaps"
  ON public.market_roadmaps
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all market roadmaps"
  ON public.market_roadmaps
  FOR ALL
  USING (current_user_is_admin())
  WITH CHECK (current_user_is_admin());

-- Add trigger for updated_at columns
CREATE TRIGGER update_content_calendar_events_updated_at
  BEFORE UPDATE ON public.content_calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_market_roadmaps_updated_at
  BEFORE UPDATE ON public.market_roadmaps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();