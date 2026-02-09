

# Make ANNUAL / MONTHLY Billing Badge More Vibrant

## Problem
The ANNUAL and MONTHLY badges in the Account Status widget both use `variant="default"` (muted blue), making them look dull and indistinguishable from each other.

## Solution
Give each billing cycle its own distinct, vibrant styling:

- **ANNUAL**: Emerald green (`variant="success"`) with a Crown icon -- signals premium/reward
- **MONTHLY**: Amber (`variant="warning"`) with a RefreshCw icon -- signals recurring cycle

## Technical Details

### File: `src/components/dashboard/AccountStatusCard.tsx`

1. Add `Crown` and `RefreshCw` to the lucide-react imports (replace `Calendar`)
2. Update the billing badge (around lines 83-88):

```
Before:
  <HoloBadge variant="default" size="sm">
    <Calendar className="h-3 w-3 mr-1" />
    {isAnnual ? 'ANNUAL' : 'MONTHLY'}
  </HoloBadge>

After:
  <HoloBadge variant={isAnnual ? "success" : "warning"} size="sm" animated>
    {isAnnual
      ? <Crown className="h-3 w-3 mr-1" />
      : <RefreshCw className="h-3 w-3 mr-1" />}
    {isAnnual ? 'ANNUAL' : 'MONTHLY'}
  </HoloBadge>
```

### Result
- ANNUAL: Glowing emerald badge with crown icon
- MONTHLY: Warm amber badge with refresh icon
- Both are now visually distinct and match the premium feel of the rest of the dashboard

