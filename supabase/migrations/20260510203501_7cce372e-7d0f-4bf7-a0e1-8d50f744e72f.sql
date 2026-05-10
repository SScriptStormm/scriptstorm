ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS billing_cycle text;
SET LOCAL app.bypass_subscriber_validation = 'true';
UPDATE public.subscribers SET billing_cycle = 'annual' WHERE email = 'ethaprotect@gmail.com';