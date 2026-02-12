

# Standardize Revision Labels + Add White-Glove Feature for Dominance

## Overview
Two changes to the PackageFeaturesWidget: standardize all revision labels to a consistent format, and add a separate "White-Glove Revision Handling" feature line exclusively for the Dominance tier.

## Changes

### File: `src/components/dashboard/PackageFeaturesWidget.tsx`

**1. Standardize revision labels in `getFeaturesByTier()`:**

| Tier | Current | New |
|------|---------|-----|
| Starter | "1 Dedicated Revision Round" | "1 Revision Round" |
| Growth | "2 Priority Revision Rounds" | "2 Revision Rounds" |
| Scale | "2 Rounds of Priority Revisions" | "2 Revision Rounds" |
| Authority | "3 Rounds of Priority Revisions" | "3 Revision Rounds" |
| Dominance | "Unlimited White-Glove Revisions*" | "Unlimited Revisions*" |
| Default (fallback) | "1 Dedicated Revision Round" | "1 Revision Round" |

**2. Add a new "White-Glove Revision Handling" feature line for Dominance only:**
- Displayed in the **Delivery and Support** accordion section (where the other Dominance-exclusive features like Performance Dashboard and Market Roadmap already live)
- Will include an "EXCLUSIVE" badge to match the existing style of the other Dominance-only items
- Subtitle: "Personalized revision handling through your dedicated workspace"

