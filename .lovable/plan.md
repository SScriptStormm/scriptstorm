

## Fix Portal Buttons to Deep-Link to Correct Stripe Pages

Currently all three actions (Upgrade Plan, Cancel Subscription, Update Payment) call `handleOpenPortal` which opens the same generic Stripe portal home page. We'll use Stripe's `flow_data` parameter to route each button to its specific page.

### 1. Update `customer-portal` Edge Function

Accept a `flow_type` body parameter (`subscription_update`, `subscription_cancel`, `payment_method_update`). When provided:
- Look up the customer's active subscription via `stripe.subscriptions.list({ customer: customerId, status: 'active', limit: 1 })`
- Pass `flow_data` to `stripe.billingPortal.sessions.create()` with the appropriate type and subscription ID
- If no `flow_type` is sent, behave as before (generic portal)

### 2. Update `AccountSettings.tsx`

- Refactor `handleOpenPortal` to accept an optional `flowType` parameter
- **Upgrade Plan** button → calls with `flow_type: "subscription_update"`
- **Cancel Subscription** confirm button → calls with `flow_type: "subscription_cancel"`
- **Update Payment** button → calls with `flow_type: "payment_method_update"`

### Technical Detail

Stripe's `flow_data` object structure:
```typescript
// For subscription update/cancel:
flow_data: {
  type: "subscription_update", // or "subscription_cancel"
  subscription_update: { subscription: "sub_xxx" } // or subscription_cancel
}

// For payment method:
flow_data: {
  type: "payment_method_update"
}
```

This requires looking up the subscription ID in the edge function, which adds one Stripe API call but ensures buttons go directly to the right page.

