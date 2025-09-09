-- STEP 1: Clean up ALL existing policies completely
DO $$ 
DECLARE
    pol_name TEXT;
BEGIN
    -- Drop all policies on contact_submissions
    FOR pol_name IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'contact_submissions'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.contact_submissions', pol_name);
    END LOOP;
    
    -- Drop all policies on edge_function_tokens  
    FOR pol_name IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'edge_function_tokens'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.edge_function_tokens', pol_name);
    END LOOP;
    
    -- Drop all policies on subscription_rate_limits
    FOR pol_name IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'subscription_rate_limits'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.subscription_rate_limits', pol_name);
    END LOOP;
END $$;