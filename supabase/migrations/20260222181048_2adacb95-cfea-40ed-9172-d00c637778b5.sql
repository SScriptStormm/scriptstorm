SET LOCAL app.bypass_subscriber_validation = 'true';
UPDATE subscribers SET subscription_tier = 'scale', updated_at = now() WHERE user_id = '84c8a788-f4a7-48b1-9136-bf8e8fd36c61';