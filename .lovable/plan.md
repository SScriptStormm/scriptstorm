## Reality check: does it work for new subscribers today?

No. There are three structural gaps that mean a brand-new client who buys "Scale Annual" will not see the right plan on the dashboard:

1. **Checkout is anonymous.** `create-checkout` hardcodes `userEmail = "billing@scriptstorm.org"` and `userId = "guest"`. The Stripe customer is shared, and the Supabase user_id is never attached to the Stripe subscription. There is no way to map back from Stripe to the buyer.
2. **Nothing writes a `subscribers` row at purchase.** No `checkout.session.completed` webhook, no insert in `create-checkout`, no insert on the Thank You page. So a new buyer has zero rows in `subscribers`.
3. **`check-subscription` only updates an existing row.** It does `.update().eq("user_id", userId)`, so even if Stripe has the subscription, the dashboard row stays empty for new users. The email fallback also collapses everyone to the shared `billing@scriptstorm.org` Stripe customer.

Result: a new Scale Annual buyer would land on the dashboard with no plan, or with whatever the shared Stripe customer happens to resolve to — definitely not guaranteed to show "Scale Annual".

## Plan

### 1. Tie checkout to the signed-in user
File: `src/components/Pricing.tsx` and `src/components/EnterprisePackageCard.tsx`
- Before invoking `create-checkout`, fetch the current Supabase session. If there is no user, route them to `/auth` first (or a guest-blocked toast).
- Pass `userId` and `userEmail` in the request body.

File: `supabase/functions/create-checkout/index.ts`
- Validate the JWT (same pattern as `customer-portal`/`check-subscription`), drop the hardcoded `billing@scriptstorm.org`.
- Use the authenticated user's email for the Stripe customer lookup/creation.
- Set `client_reference_id: userId` and `subscription_data.metadata.user_id` on the session so the subscription itself carries the Supabase user id.

### 2. Write the subscriber row at purchase via webhook
New file: `supabase/functions/stripe-webhook/index.ts` (public, no JWT)
- Verify the Stripe signature (`STRIPE_WEBHOOK_SECRET`).
- Handle:
  - `checkout.session.completed` → upsert into `subscribers` keyed on `user_id` (read from `client_reference_id` / metadata) with: `email`, `stripe_customer_id`, `subscription_tier`, `billing_cycle`, `subscription_end`, `subscribed=true`. Use the same `PRICE_TO_TIER` map already in `check-subscription`, plus `price.recurring.interval` for cycle.
  - `customer.subscription.updated` / `customer.subscription.deleted` → update the same fields (handles upgrade/downgrade/cancel).
- Add `STRIPE_WEBHOOK_SECRET` as a Supabase secret. Configure the webhook URL in the Stripe Dashboard.
- Mark `verify_jwt = false` for this function in `supabase/config.toml`.

### 3. Make `check-subscription` self-healing
File: `supabase/functions/check-subscription/index.ts`
- Change the `.update()` to an `.upsert()` keyed on `user_id`, so it also creates the row if missing.
- Keep the Stripe interval → `billing_cycle` mapping already in place.

### 4. Sync immediately after redirect
File: `src/pages/ThankYou.tsx`
- On mount, call `supabase.functions.invoke('check-subscription')` so the dashboard reflects the new plan even if the webhook arrives a few seconds later.
- Show a brief "Activating your Scale Annual plan…" toast while it runs.

### 5. Verification

End-to-end checks I will run after implementation:
- Sign in as a fresh test user, buy **Scale Annual** in Stripe test mode → dashboard shows: Tier badge "Scale", cycle badge "ANNUAL" (cyan + crown), radial arc near-full, renewal ~365d out. Account Settings billing line says "Annual · $12,450/yr".
- Same user upgrades to **Authority Monthly** in the Stripe portal → after refresh: tier "Authority", cycle "MONTHLY" (rose + refresh), radial arc tied to a 30-day cycle, price `$1,797/mo`.
- Cancel subscription → `subscribed=false`, status badge flips to INACTIVE.
- Confirm the existing test account (`ethaprotect@gmail.com`, Scale Annual) still shows correctly.

## Out of scope
- Redesigning the pricing page or checkout UI.
- Changing tier prices or Stripe price IDs.
- Anything related to add-ons (`selectedAddOns` is currently unused on the backend).
