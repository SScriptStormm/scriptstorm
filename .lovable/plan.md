

# Align Package Details Widget with Pricing Cards

## Problem
The "Your Package Details" page (PackageFeaturesWidget) has simplified, generic labels that don't match the pricing cards on the homepage. Most notably, the Growth tier's social media line is missing YouTube video script outlines entirely, and all tiers use generic "Social Media Posts" instead of their unique labels.

## Changes

### File: `src/components/dashboard/PackageFeaturesWidget.tsx`

Update `getFeaturesByTier()` to include richer, tier-specific data that matches the pricing cards:

**1. Social Media labels and descriptions per tier:**
- **Starter**: "15 Ready-to-Post Social Media Captions" -- subtitle: "LinkedIn, X (Twitter), Instagram"
- **Growth**: "30 High-Engagement Social & Video Assets" -- subtitle: "LinkedIn, X, Instagram + YouTube video script outlines"
- **Scale**: "75 Strategic Social Media Posts" -- subtitle: "Multi-channel campaign"
- **Authority**: "90 Targeted Social Media Campaign Posts" -- subtitle: "Community-building campaigns"
- **Dominance**: "150 Viral-Ready Social Media Posts" -- subtitle: "Maximum shareability and brand recall"

**2. Article labels per tier:**
- **Starter/Growth**: "Foundational Blog Articles"
- **Scale**: "Foundational Blog Articles" (2,000-3,000 words)
- **Authority**: "Industry-Leading Blog Articles"
- **Dominance**: "Unbeatable Cornerstone Assets"

**3. Product description labels per tier:**
- **Starter**: "Persuasive Product Descriptions"
- **Growth**: "High-Converting Product/Service Descriptions"
- **Scale**: "High-Conversion Product/Service Pages"
- **Authority**: "Premium Product/Service Descriptions"
- **Dominance**: "Unlimited Product Descriptions*"

**4. Add missing Growth feature:**
- "Automated Content Calendar" -- subtitle: "Strategic monthly plan aligned with business goals"

**5. Revision labels per tier:**
- **Starter**: "1 Dedicated Revision Round"
- **Growth**: "2 Priority Revision Rounds"
- **Scale**: "2 Rounds of Priority Revisions"
- **Authority**: "3 Rounds of Priority Revisions"
- **Dominance**: "Unlimited White-Glove Revisions*"

## Technical Approach

Expand the return object from `getFeaturesByTier()` to include string fields for each label and subtitle (e.g., `socialLabel`, `socialSubtitle`, `articleLabel`, `productLabel`, `revisionLabel`, `hasContentCalendar`), then use those in the JSX instead of the current generic text. This keeps the component data-driven and easy to maintain.

