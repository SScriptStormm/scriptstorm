

# Stop Animations When Quota Limits Are Reached

## What Changes
When a usage bar or ring reaches 100% (the user has used up their monthly quota), the shimmer, glow, and pulse animations will stop. This creates a clear, static "maxed out" visual that reinforces the limit has been hit, rather than the bar continuing to shimmer as if things are still active.

## Why This Is a Good Idea
- A static bar at 100% feels "locked" and signals clearly that the quota is used up
- It creates a visual contrast between active (still has quota) and maxed-out categories
- It draws the user's attention to which quotas are still available vs. exhausted
- Subtle but meaningful UX improvement -- no code complexity added

## What Gets Updated

### File: `src/components/dashboard/MonthlyUsageCard.tsx`

Three changes -- each `NeonProgress` bar gets a conditional `animated` prop instead of always-on:

**Articles bar (line ~85):**
- Before: `animated`
- After: `animated={articlesUsed < limits.articles}`

**Social Posts bar (line ~113):**
- Before: `animated`
- After: `animated={socialPostsUsed < limits.socialPosts}`

**Product Descriptions bar (line ~138):**
- Before: `animated`
- After: `animated={productDescUsed < limits.productDesc}`

### What stays the same
- The RadialProgress ring (overall usage) keeps animating since it's an aggregate and never truly "maxes out" unless all three categories hit 100%
- The AccountStatusCard ring keeps animating since it shows days remaining, not a quota
- All colors, sizes, glow effects, warning messages, and layout remain unchanged
- The count-up entrance animation still plays on page load -- only the ongoing shimmer/glow loop stops at the limit
