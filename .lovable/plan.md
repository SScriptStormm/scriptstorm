
# Connect Account Settings Buttons to Stripe Customer Portal

## Overview
Create a new Supabase Edge Function (`customer-portal`) that generates a Stripe Customer Portal session URL for the logged-in user, then wire up the relevant buttons in `AccountSettings.tsx` to redirect there.

## How the Stripe Customer Portal Works
When a user clicks "Update Payment", "Cancel Subscription", or "View Billing History", the app calls the edge function, which:
1. Looks up the user's Stripe Customer ID (from the `subscribers` table)
2. Asks Stripe to create a short-lived portal session URL for that customer
3. Returns the URL and the browser redirects the user to it

The customer lands on your fully branded Stripe portal (which you've already configured), does what they need, and Stripe redirects them back to the Account Settings page.

## Technical Changes

### 1. New File: `supabase/functions/customer-portal/index.ts`
A new edge function that:
- Reads the user's auth token from the `Authorization` header to identify who they are
- Queries the `subscribers` table to get their `stripe_customer_id`
- Calls `stripe.billingPortal.sessions.create()` with a `return_url` pointing back to `/account-settings`
- Returns the portal session URL

### 2. Modified File: `src/pages/AccountSettings.tsx`

**New `handleOpenPortal` function** replaces the three stub handlers (`handleUpdatePayment`, `handleCancelSubscription`):
```
const handleOpenPortal = async () => {
  setPortalLoading(true);
  // call the customer-portal edge function
  // redirect to the returned URL
  setPortalLoading(false);
};
```

**New `portalLoading` state** to disable buttons while the redirect is being prepared (prevents double-clicks).

**Wire up buttons:**
| Button | Current | After |
|---|---|---|
| "Update" (Payment Method) | toast.info | `handleOpenPortal()` |
| "Cancel Subscription" (confirm dialog → Yes, Cancel) | toast.info | `handleOpenPortal()` |
| "View Full Billing History →" | toast.info | `handleOpenPortal()` |
| "Download PDF" buttons | nothing | `handleOpenPortal()` |

The "Upgrade Plan" button keeps navigating to `/` (the pricing page) — this is intentional and correct.

## Edge Cases Handled
- **No Stripe Customer ID**: If the user has no `stripe_customer_id` in the database (e.g. they signed up but never completed checkout), the function returns a clear error and the UI shows a toast explaining they don't have an active subscription to manage.
- **Loading state**: Buttons show a loading spinner/disabled state while the portal URL is being fetched.
- **Auth**: The edge function validates the user's session token — anonymous users cannot access it.

## File Summary
```text
supabase/functions/customer-portal/index.ts   ← NEW edge function
src/pages/AccountSettings.tsx                 ← Wire up buttons + new handler
```
