
# Wire "Upgrade Plan" to Stripe Customer Portal + Fix Return URL

## Current State

All subscription management buttons are already wired to `handleOpenPortal` except one:

| Button | Current behaviour | Target |
|---|---|---|
| Update (Payment Method) | ✅ `handleOpenPortal()` | No change |
| PDF (Invoice download) | ✅ `handleOpenPortal()` | No change |
| View Full Billing History | ✅ `handleOpenPortal()` | No change |
| Yes, Cancel (Subscription) | ✅ `handleOpenPortal()` | No change |
| **Upgrade Plan** | ❌ `navigate("/")` | `handleOpenPortal()` |

## Changes

### 1. `src/pages/AccountSettings.tsx` — Wire "Upgrade Plan"

Replace the `onClick={() => navigate("/")}` on the Upgrade Plan button with `onClick={handleOpenPortal}` and add `disabled={portalLoading}`. Also update the button label to show a loading state while the portal is being prepared.

Before:
```tsx
<Button
  onClick={() => navigate("/")}
  className="flex-1 bg-gradient-to-r from-primary to-primary-glow ..."
>
  <Zap className="h-4 w-4 mr-2" />
  Upgrade Plan
</Button>
```

After:
```tsx
<Button
  onClick={handleOpenPortal}
  disabled={portalLoading}
  className="flex-1 bg-gradient-to-r from-primary to-primary-glow ..."
>
  <Zap className="h-4 w-4 mr-2" />
  {portalLoading ? "Opening portal..." : "Upgrade Plan"}
</Button>
```

### 2. `supabase/functions/customer-portal/index.ts` — Fix Return URL

The return URL currently falls back dynamically to the request's `origin` header. This works in most cases but should be hardcoded to the production domain to be reliable across all environments.

Before:
```typescript
const origin = req.headers.get("origin") || "https://scriptstorm.lovable.app";
const returnUrl = `${origin}/account-settings`;
```

After:
```typescript
const returnUrl = "https://scriptstorm.org/account-settings";
```

## Files Changed
```text
src/pages/AccountSettings.tsx                ← Wire Upgrade Plan button
supabase/functions/customer-portal/index.ts  ← Hardcode return URL
```
