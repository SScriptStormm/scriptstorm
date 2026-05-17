## Problem

Checkout fails with:
> `customer_creation` can only be used in `payment` mode.

In `subscription` mode, Stripe always creates a Customer automatically, so `customer_creation: "always"` is rejected.

## Fix

In `supabase/functions/create-checkout/index.ts`, delete the single line:

```ts
customer_creation: "always",
```

from the `stripe.checkout.sessions.create({ ... })` call.

Nothing else changes. Because we already removed `customer` and `customer_email`, Stripe Checkout will still render an empty, editable email field, and a fresh Customer will be created per session using whatever email the buyer types.

## Test

1. Incognito → click Subscribe on any tier.
2. Stripe Checkout opens with a blank email field.
3. Enter a test email + `4242 4242 4242 4242` → payment succeeds.
4. Stripe Dashboard → Customers shows the new customer with the typed email.
