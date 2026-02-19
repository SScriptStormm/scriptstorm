
# Remove "Manage Subscription" from Dashboard's Inline Dropdown

## Problem
The previous fix only removed "Manage Subscription" from `DashboardHeader.tsx`, but the dashboard page (`Dashboard.tsx`) has its own inline header with a duplicate account dropdown that still contains the "Manage Subscription" menu item.

## What Changes

### File: `src/pages/Dashboard.tsx`

**Step 1 — Remove the "Manage Subscription" menu item** (lines 616-619):
```tsx
// DELETE these lines:
<DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20" onClick={() => window.open('https://billing.stripe.com/p/login/test_your_link', '_blank')}>
  <CreditCard className="h-4 w-4 mr-2" />
  Manage Subscription
</DropdownMenuItem>
```

**Step 2 — Remove `CreditCard` from the lucide-react imports** at the top of the file, since it will no longer be used.

No other files or logic are affected.
