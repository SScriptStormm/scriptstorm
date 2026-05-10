## Why it's saying MONTHLY again

Your subscriber row is set to:
- `subscription_tier`: scale
- `subscription_end`: 2026-11-04 (~178 days from today)

The dashboard and Account Settings currently guess monthly vs annual from `daysRemaining >= 180`. 178 < 180, so the badge keeps flipping back to MONTHLY. The threshold approach is fundamentally fragile — as time passes on any annual plan it will eventually drop under 180 days and silently become "MONTHLY".

## Fix: read billing cycle from Stripe (source of truth)

Stop guessing from the renewal date. Have the backend ask Stripe what the actual subscription interval is and store it on the subscriber.

### Database
- Add a `billing_cycle` column to `public.subscribers` (text, nullable, allowed values `monthly` / `annual`).

### Edge function: `check-subscription` (new)
- Authenticated function that:
  1. Looks up the user's Stripe customer (using the same fallback chain as `customer-portal`).
  2. Fetches the active subscription and reads `items.data[0].price.recurring.interval` (`month` → `monthly`, `year` → `annual`).
  3. Updates the user's `subscribers` row with `subscription_tier`, `subscription_end`, `subscribed`, and the new `billing_cycle`.
- The Dashboard's existing "Refresh" button already calls `check-subscription`, so this slots in cleanly.

### Edge function: `create-checkout`
- After creating a checkout session, no change needed at checkout time, but on success the customer-portal/check-subscription path will populate `billing_cycle` from Stripe.

### Frontend
- `src/components/dashboard/AccountStatusCard.tsx`
  - Accept `billingCycle?: 'monthly' | 'annual' | null` prop.
  - Use it directly for the ANNUAL/MONTHLY badge and for `cycleTotal` (365 vs 30).
  - Fallback: if `billingCycle` is missing, fall back to the current `daysRemaining >= 180` heuristic so existing accounts don't break.
- `src/pages/Dashboard.tsx`
  - Include `billing_cycle` in the `subscribers` select and pass it to `AccountStatusCard`.
- `src/pages/AccountSettings.tsx`
  - Same: read `billing_cycle`; use it in `getBillingInfo()` and `generateBillingHistory()` instead of the day-count guess. Keep the same fallback.

### Backfill the test account
- Set `billing_cycle = 'annual'` on `ethaprotect@gmail.com`'s subscriber row so the dashboard shows ANNUAL immediately, before Stripe sync runs.

## Result
- Switching plans in Stripe (monthly ↔ annual) will be reflected accurately on both Dashboard and Account Settings after a refresh.
- No more drift as the renewal date counts down.
- Account Status badge, radial arc, billing cycle line, price, and history all read from one source.
