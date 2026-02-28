

## Fix Account Settings Portal Buttons

### Problem Analysis
- **Upgrade Plan 500 error**: Stripe's Customer Portal configuration has "subscription updates" disabled. The edge function should gracefully fall back to the generic portal instead of crashing with a 500.
- **All buttons loading together**: Single `portalLoading` boolean state shared by all buttons.
- **Billing History & Invoice PDF same page**: Both call `handleOpenPortal()` without differentiation.

### Changes

#### 1. `supabase/functions/customer-portal/index.ts`
- When `flow_data` causes a Stripe error (e.g. subscription_update disabled), catch it and retry without `flow_data` to fall back to the generic portal instead of returning a 500.

#### 2. `src/pages/AccountSettings.tsx`
- Replace single `portalLoading` boolean with a string tracking which action is loading (e.g. `"upgrade"`, `"cancel"`, `"payment"`, `"history"`, `"invoice"`, or `null`).
- Each button checks only its own loading key, so clicking one doesn't affect others.
- "View Full Billing History" opens portal with no flow (generic portal -- Stripe shows billing history on the main page).
- "Invoice PDF" button: since Stripe doesn't have a direct "invoice PDF" flow, this should also open the generic portal (where invoices are accessible). Alternatively, we can label it more accurately.

### Technical Detail

**Edge function fallback logic:**
```typescript
try {
  session = await stripe.billingPortal.sessions.create(portalParams);
} catch (err) {
  // If flow_data caused the error, retry without it
  if (portalParams.flow_data) {
    delete portalParams.flow_data;
    session = await stripe.billingPortal.sessions.create(portalParams);
  } else {
    throw err;
  }
}
```

**Loading state refactor:**
```typescript
const [portalLoading, setPortalLoading] = useState<string | null>(null);
// Each button: disabled={portalLoading === "upgrade"} or disabled={!!portalLoading}
```

### Important Note for User
The "Upgrade Plan" button will work but will land on the generic portal page until you enable "Subscription updates" in your **Stripe Dashboard > Settings > Billing > Customer Portal**. The code fix prevents the 500 error by falling back gracefully.

