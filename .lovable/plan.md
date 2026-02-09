

# Add Unique Billing Cycle Badge Colors (Zero Tier Overlap)

## Problem
Current billing cycle badges share colors with subscription tier badges, causing visual confusion.

## Solution
1. Create a new **`premium`** HoloBadge variant in **cyan/teal** for the ANNUAL badge
2. Use the existing **`danger`** (rose/red) variant for the MONTHLY badge

Neither cyan nor rose is used by any subscription tier, so there's zero overlap.

## Color Map After Change

| Badge | Color |
|-------|-------|
| Starter tier | Blue |
| Growth tier | Emerald |
| Scale tier | Purple |
| Authority tier | Orange |
| Dominance tier | Gold |
| **ANNUAL cycle** | **Cyan/Teal (new)** |
| **MONTHLY cycle** | **Rose/Red** |

## Technical Details

### 1. Add `premium` variant to HoloBadge (`src/components/ui/HoloBadge.tsx`)

Add to the `HoloBadgeVariant` type and `variantStyles` map:

```
premium: {
  bg: "bg-cyan-500/20",
  border: "border-cyan-400/50",
  text: "text-cyan-300",
  glow: "shadow-[0_0_15px_hsl(185_70%_50%/0.3)]"
}
```

### 2. Update AccountStatusCard (`src/components/dashboard/AccountStatusCard.tsx`)

Change the billing badge variant:

```
Before:  variant={isAnnual ? "success" : "warning"}
After:   variant={isAnnual ? "premium" : "danger"}
```

Icons stay the same: Crown for ANNUAL, RefreshCw for MONTHLY.

