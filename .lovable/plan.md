
# Fix the Stripe Customer Portal — Email Mismatch

## The Problem (in plain terms)

When someone buys a subscription on ScriptStorm, the checkout function registers them in Stripe using a **hardcoded email** (`billing@scriptstorm.org`) instead of the actual customer's email. So in Stripe's records, every customer is stored under `billing@scriptstorm.org`.

When you then try to open the Customer Portal, the edge function tries to find your Stripe account by searching for your real email (`ethaprotect@gmail.com`). That email doesn't exist in Stripe — so the portal returns "No active subscription found."

## The Fix — Two-Part Solution

### Part 1: Add `billing@scriptstorm.org` as a Final Fallback in the Portal Function

The `customer-portal/index.ts` already tries:
1. `stripe_customer_id` from the database (null — never saved)
2. The subscriber's email from the database (`ethaprotect@gmail.com` — not in Stripe)

We need to add a **third fallback**: also try searching Stripe for `hello@scriptstorm.org` (the auth email) and then as a last resort try `billing@scriptstorm.org` — the actual email used during checkout.

This will unblock the portal immediately.

### Part 2: Fix the Checkout Function to Use Real Customer Emails

The `create-checkout/index.ts` hardcodes `billing@scriptstorm.org` as the customer email. This means:
- Every subscriber appears as the same Stripe customer
- The `stripe_customer_id` is never linked back to the real user in the database
- The customer portal can never find the right customer

The fix: remove the hardcoded email. Since checkout doesn't require auth (it's a guest checkout by design), we'll **collect the customer's email during checkout** by passing it in from the frontend, or by using Stripe's built-in email collection on the checkout page (`customer_email: undefined` so Stripe asks for it).

For now (to unblock the portal immediately without changing the checkout flow), we focus on Part 1.

## Technical Changes

### File: `supabase/functions/customer-portal/index.ts`

Update the email fallback logic to try multiple emails in sequence:

```
1. stripe_customer_id from subscribers table  → (null currently)
2. subscriber.email from DB (ethaprotect@gmail.com) → (not in Stripe)  
3. userEmail from auth claims (hello@scriptstorm.org) → (not in Stripe)
4. billing@scriptstorm.org → (THIS IS WHERE YOUR STRIPE CUSTOMER IS)
```

This will find the Stripe customer and open the portal correctly.

### Note on the Bigger Fix

The real long-term solution is to fix `create-checkout` so it:
- Uses the actual customer's email (passed from the frontend or collected by Stripe)
- Saves the `stripe_customer_id` back to the `subscribers` table after a successful payment (via a Stripe webhook)

But that's a separate task. The portal fallback fix above will get the portal working for you right now.

## Files Changed
```text
supabase/functions/customer-portal/index.ts  ← Add billing@scriptstorm.org as final fallback
```
