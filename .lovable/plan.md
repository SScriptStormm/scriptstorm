

## Update Stripe to Live Mode

### Changes

**1. `supabase/functions/create-checkout/index.ts`** — Replace all 10 test-mode price IDs with the provided live-mode IDs:

| Package | Monthly | Annual |
|---------|---------|--------|
| starter | `price_1SZEevH0XahPXnwCMlxyP8FE` | `price_1SZEslH0XahPXnwC72g9KwsS` |
| growth | `price_1SZEgtH0XahPXnwCP6q7zf31` | `price_1SZEwLH0XahPXnwCCA9fv6XP` |
| starter-enterprise (Scale) | `price_1SZEhcH0XahPXnwCyzrMLV2Z` | `price_1SZExYH0XahPXnwC8DWfKLLt` |
| growth-enterprise (Authority) | `price_1SZEjcH0XahPXnwC4DhIic4L` | `price_1SZEzbH0XahPXnwCVDnWINbi` |
| authority-enterprise (Dominance) | `price_1SZEnZH0XahPXnwCZbQeBQPM` | `price_1SZF0ZH0XahPXnwCr9QNOkD1` |

**2. Update `STRIPE_SECRET_KEY` secret** — Replace with the provided key so it matches the live-mode price IDs.

### Note
The provided key (`mk_1RvaeQH0XahPXnwCtNpPLnIh`) has an unusual prefix. Standard Stripe live secret keys start with `sk_live_`. Please confirm this is the correct key before I proceed, as a mode mismatch between the key and price IDs will cause checkout failures.

