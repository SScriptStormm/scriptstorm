## Goal

On the Stripe Checkout page, the **Contact email** field must be empty and editable so each customer types their own personal email. Today it's pre-filled (and effectively locked to) `hello@scriptstorm.org` because:

1. `Pricing.tsx` blocks checkout unless the visitor is signed in, then forwards their session email.
2. `create-checkout/index.ts` requires a JWT, reads the email from the token, and passes it to Stripe as `customer_email` (or reuses the matching Stripe Customer, which also pins the email).

This is incompatible with the new flow you described:

> Customer pays first (with their own email) → Gumloop receives the webhook → Gumloop creates the account + sends welcome email → user logs in and can change email/password later.

So we need to make checkout **anonymous-friendly** and let Stripe own the email field.

## Changes

### 1. `supabase/functions/create-checkout/index.ts`
- Remove the `Authorization` header requirement and the `getClaims` block.
- Remove the `stripe.customers.list({ email })` lookup and the `customer` / `customer_email` parameters from `stripe.checkout.sessions.create`.
- Add `customer_creation: "always"` so Stripe creates a fresh customer per checkout, using whatever email the buyer types.
- Drop `client_reference_id` and the `user_id` / `user_email` entries from `metadata` and `subscription_data.metadata` (we don't have a Supabase user yet). Keep `package_type` and `billing` in metadata so the webhook + Gumloop know what was bought.

### 2. `src/components/Pricing.tsx` and `src/components/EnterprisePackageCard.tsx`
- Remove the "require signed-in session / redirect to /auth" guard before calling `create-checkout`.
- Stop passing `userId` / `userEmail` in the invoke body.
- The "Subscribe" buttons go straight to Stripe Checkout for anyone.

### 3. `supabase/functions/stripe-webhook/index.ts`
- Today it keys the `subscribers` row on `user_id` from `client_reference_id`. After this change there is no `user_id` at checkout time, so:
  - On `checkout.session.completed` / `customer.subscription.*`, read the buyer email from `session.customer_details.email` (or `customer.email`) and the Stripe `customer` ID.
  - Upsert `subscribers` keyed on `email` (not `user_id`) with `stripe_customer_id`, `subscription_tier`, `billing_cycle`, `subscription_end`, `subscribed`. Leave `user_id` null until Gumloop (or `check-subscription` after first login) backfills it.

### 4. `supabase/functions/check-subscription/index.ts`
- When called by a logged-in user, look up the `subscribers` row by `email` if `user_id` is missing and **stamp** `user_id` onto it (the "claim" step). This is what links a Gumloop-provisioned account to the Stripe customer that paid.

### 5. DB
- Add a partial unique index on `subscribers(email)` so the email-keyed upsert in the webhook is safe:
  ```sql
  create unique index if not exists subscribers_email_unique
    on public.subscribers (lower(email));
  ```
- No schema column changes needed — `email` already exists.

## Out of scope (for this step)
- Wiring Gumloop itself (that's "step 2" — separate task once this checkout flow is live).
- Letting users edit email/password from Account Settings (already supported by Supabase auth UI; no change needed here).
- Pricing copy / layout.

## Test plan after deploy
1. Open the site in an **incognito** window (not logged in).
2. Click "Subscribe" on Scale Annual → Stripe Checkout opens, **email field is empty and editable**.
3. Enter a brand-new email (e.g. `test+stripe@yourdomain.com`), pay with `4242 4242 4242 4242`.
4. In Stripe Dashboard → Customers, the new customer's email matches what was typed (not `hello@scriptstorm.org`).
5. In Supabase → `subscribers` table, a row exists with that email, correct `subscription_tier`, `billing_cycle`, and `subscription_end`, `user_id` null.
6. Sign up in your app using the same email → call `check-subscription` → row gets `user_id` stamped and dashboard shows Scale + ANNUAL.