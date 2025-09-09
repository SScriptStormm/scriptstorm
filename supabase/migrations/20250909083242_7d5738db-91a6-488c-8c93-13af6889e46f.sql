-- Add DELETE policies for articles table
CREATE POLICY "Users can delete their own articles" 
ON public.articles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add DELETE policies for subscribers table  
CREATE POLICY "Users can delete their own subscription" 
ON public.subscribers 
FOR DELETE 
USING (auth.uid() = user_id);

-- Fix subscription RLS policy to be more restrictive (remove email-based access)
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;
CREATE POLICY "select_own_subscription" 
ON public.subscribers 
FOR SELECT 
USING (user_id = auth.uid());

-- Create contact_submissions table for secure form processing
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  project_details TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed BOOLEAN DEFAULT false
);

-- Enable RLS on contact submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Admin-only access to contact submissions (for future admin panel)
CREATE POLICY "contact_submissions_admin_access" 
ON public.contact_submissions 
FOR ALL 
USING (false); -- Will be updated when admin roles are implemented

-- Allow edge functions to insert contact submissions
CREATE POLICY "contact_submissions_insert" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);