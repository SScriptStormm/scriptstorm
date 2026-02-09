

# Unify Growth Tier Branding Across All Pages

## Problem
The Growth tier badge/icon appears differently in three places:
- **Dashboard (AccountStatusCard)**: Shows the fire emoji with HoloBadge -- "🔥 Growth"
- **Account Settings page**: Shows HoloBadge but with NO emoji -- just "Growth"
- **Package Details (PackageFeaturesWidget)**: Uses its own inline color styling instead of HoloBadge, but does include "🔥"

This inconsistency applies to ALL tiers, not just Growth.

## Solution
Make the Account Settings page include the tier emoji, matching how the Dashboard and Package Details already display it.

The PackageFeaturesWidget already matches the same emoji and color scheme as HoloBadge, so it just needs a minor visual check -- no changes needed there.

## Technical Details

### File: `src/pages/AccountSettings.tsx`

Add a `tierEmojis` map (same as in AccountStatusCard) and prepend the emoji to the HoloBadge on the page header (around line 266):

```
Before:  Growth
After:   🔥 Growth
```

This is a single-line change: update the HoloBadge content from `{getTierDisplayName(...)}` to `{tierEmoji} {getTierDisplayName(...)}`, using the same emoji mapping already used in `AccountStatusCard.tsx`:

```
starter: "🚀"
growth: "🔥"
scale: "⚡"
authority: "👑"
dominance: "💎"
```

### Files Changed
- `src/pages/AccountSettings.tsx` -- add emoji map and update the header HoloBadge content

### No Changes Needed
- `AccountStatusCard.tsx` -- already correct
- `PackageFeaturesWidget.tsx` -- already uses matching emojis and colors

