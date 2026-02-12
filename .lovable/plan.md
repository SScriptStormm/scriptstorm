
# Standardize Revision Labels in Pricing Cards

## Problem
The pricing cards on the homepage use inconsistent wording for revision features (e.g., "Dedicated Revision Round", "Priority Revision Rounds", "Rounds of Priority Revisions", "White-Glove Revisions"). These need to match the standardized format already applied to the Package Details widget.

## Changes

### File: `src/components/Pricing.tsx`

Update the revision feature strings in both `features` and `annualFeatures` arrays for all 5 tiers:

| Tier | Current Wording | New Wording |
|------|----------------|-------------|
| Starter | "1 Dedicated Revision Round: We fine-tune..." | "1 Revision Round: We fine-tune..." |
| Growth | "2 Priority Revision Rounds: Get your content..." | "2 Revision Rounds: Get your content..." |
| Scale | "2 Rounds of Priority Revisions: Refine content..." | "2 Revision Rounds: Refine content..." |
| Authority | "3 Rounds of Priority Revisions: Enhanced revision..." | "3 Revision Rounds: Enhanced revision..." |
| Dominance | "Unlimited White-Glove Revisions*: Perfection, on demand." | "Unlimited Revisions*: Perfection, on demand." |

10 string replacements total (each tier has both `features` and `annualFeatures` arrays). The description text after the colon stays the same -- only the label portion before the colon changes.

No structural, layout, or logic changes needed.
