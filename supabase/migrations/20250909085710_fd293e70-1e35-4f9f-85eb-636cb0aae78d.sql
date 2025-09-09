-- Critical Security Fix: Protect subscriber data and prevent NULL user_id vulnerabilities
-- This addresses the security issue where subscriber records with NULL user_id are not properly protected

-- Step 1: Make user_id NOT NULL to prevent future security issues
-- This ensures every subscriber record is tied to a specific user
ALTER TABLE public.subscribers 
ALTER COLUMN user_id SET NOT NULL;

-- Step 2: Drop all existing policies to recreate them with better security
DROP POLICY IF EXISTS "Users can create their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can delete their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_select_own" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_insert_authenticated" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_insert_service" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_update_own" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_update_service" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_delete_own" ON public.subscribers;

-- Step 3: Create comprehensive and secure RLS policies
-- SELECT: Users can only view their own subscription data
CREATE POLICY "secure_subscribers_select" ON public.subscribers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- INSERT: Only allow authenticated users to create their own subscriptions
CREATE POLICY "secure_subscribers_insert_user" ON public.subscribers
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- INSERT: Allow service role for edge functions (with validation)
CREATE POLICY "secure_subscribers_insert_service" ON public.subscribers
FOR INSERT
TO service_role
WITH CHECK (user_id IS NOT NULL);

-- UPDATE: Users can only update their own subscription
CREATE POLICY "secure_subscribers_update_user" ON public.subscribers
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- UPDATE: Allow service role for edge functions (with validation)
CREATE POLICY "secure_subscribers_update_service" ON public.subscribers
FOR UPDATE
TO service_role
USING (user_id IS NOT NULL)
WITH CHECK (user_id IS NOT NULL);

-- DELETE: Users can only delete their own subscription
CREATE POLICY "secure_subscribers_delete" ON public.subscribers
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Step 4: Add email validation constraint
ALTER TABLE public.subscribers 
ADD CONSTRAINT IF NOT EXISTS subscribers_email_not_empty 
CHECK (email IS NOT NULL AND trim(email) != '');

-- Step 5: Create security index for performance
CREATE INDEX IF NOT EXISTS idx_subscribers_security 
ON public.subscribers (user_id) 
WHERE user_id IS NOT NULL;