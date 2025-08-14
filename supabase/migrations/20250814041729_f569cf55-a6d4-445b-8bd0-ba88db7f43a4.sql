-- Fix security vulnerability in subscribers table RLS policies
-- Remove the overly permissive policies
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "update_subscription" ON public.subscribers;

-- Create secure INSERT policy - users can only create their own subscriptions
CREATE POLICY "Users can create their own subscription" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create secure UPDATE policy - users can only update their own subscriptions
CREATE POLICY "Users can update their own subscription" 
ON public.subscribers 
FOR UPDATE 
USING (auth.uid() = user_id);