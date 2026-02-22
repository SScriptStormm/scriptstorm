

# Update Subscription Tier: Growth to Scale

## Change

Update the `subscribers` table for `ethaprotect@gmail.com` (user_id: `84c8a788-f4a7-48b1-9136-bf8e8fd36c61`) to change `subscription_tier` from `growth` to `scale`.

## SQL to execute

```sql
UPDATE subscribers
SET subscription_tier = 'scale', updated_at = now()
WHERE user_id = '84c8a788-f4a7-48b1-9136-bf8e8fd36c61';
```

## What changes on the dashboard

- Account Status card: "Growth" badge becomes "Scale"
- Monthly Usage quotas: 25 articles, 75 social posts, 25 product descriptions
- Word count range: 2,000-3,000 words per article
- Revisions on new articles: 2 rounds
- Package Features widget: Scale features displayed
- Delivery & Support section appears (24-Hour Orchestrated Delivery + Efficient Support Portal)

## Files Changed

No code changes -- data-only update using the insert/update tool.

