## What this plan does

Implements the subscription sync fix from `.lovable/plan.md` so a brand-new buyer who checks out (e.g. Scale Annual) lands on the dashboard with the correct tier, cycle, and renewal date.

## Steps

1. **Deploy `stripe-webhook` edge function** (public, `verify_jwt = false`)
   - Verifies Stripe signature using `STRIPE_WEBHOOK_SECRET`
   - Handles `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Upserts `subscribers` row keyed on `user_id` (read from `client_reference_id` / subscription metadata) with: `email`, `stripe_customer_id`, `subscription_tier`, `billing_cycle`, `subscription_end`, `subscribed`
   - Reuses the existing `PRICE_TO_TIER` map

2. **Tie checkout to the signed-in user**
   - `Pricing.tsx` + `EnterprisePackageCard.tsx`: require an authenticated session; redirect guests to `/auth`; pass `userId`/`userEmail` to `create-checkout`
   - `create-checkout/index.ts`: validate JWT, drop the hardcoded `billing@scriptstorm.org`, set `client_reference_id: userId` and `subscription_data.metadata.user_id`

3. **Make `check-subscription` self-healing**
   - Switch the `.update()` to an `.upsert()` keyed on `user_id` so a missing row gets created on first dashboard load

4. **Sync after Stripe redirect**
   - `ThankYou.tsx`: on mount call `supabase.functions.invoke('check-subscription')` with a brief "Activating your plan…" toast

5. **Config**
   - Add `[functions.stripe-webhook] verify_jwt = false` to `supabase/config.toml`
   - Request `STRIPE_WEBHOOK_SECRET` from you after you create the destination in Stripe and copy the `whsec_…` value

## After deploy — what you do in Stripe

1. Create the destination in Stripe with URL:
   `https://akqbsuvbammezjyeospk.supabase.co/functions/v1/stripe-webhook`
2. Copy the `whsec_…` signing secret Stripe shows you
3. Paste it into the secret prompt I'll send → I'll then run an end-to-end test (fresh user buys Scale Annual → dashboard shows Scale + ANNUAL badge + correct renewal date)

## Out of scope
- Pricing page redesign, price changes, add-ons logic
