-- First, let's create a proper admin role system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  );
$$;

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin(auth.uid());
$$;

-- Drop the problematic admin access policy
DROP POLICY IF EXISTS "contact_submissions_admin_access" ON public.contact_submissions;

-- Create proper admin-only SELECT policy for contact submissions
CREATE POLICY "contact_submissions_admin_select" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (public.current_user_is_admin());

-- Create admin-only UPDATE and DELETE policies for contact submissions
CREATE POLICY "contact_submissions_admin_update" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated
USING (public.current_user_is_admin());

CREATE POLICY "contact_submissions_admin_delete" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated
USING (public.current_user_is_admin());

-- Allow users to view their own roles
CREATE POLICY "users_can_view_own_roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

-- Only admins can manage roles
CREATE POLICY "admins_can_manage_roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();