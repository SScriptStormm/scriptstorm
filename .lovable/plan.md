

# Fix Enterprise Comparison Table Alignment

## Problem
The Enterprise Comparison table has two issues:
1. **Research mismatch**: Dominance shows "Expert" but the card uses "Enterprise Keyword Intelligence" -- should say "Enterprise"
2. **Missing rows**: Social and Video Content (75/90/150) and Product/Service Descriptions (25/30/Unlimited*) are not in the table

## Changes

### File: `src/components/Pricing.tsx`

**1. Fix Research row (line 413)**

Change "Expert" to "Enterprise" for Dominance tier.

**2. Add two new rows after the Revisions row (after line 408)**

Insert these rows between the Revisions and Research rows:

| Feature | Scale | Authority | Dominance |
|---------|-------|-----------|-----------|
| Social and Video Content | 75 | 90 | 150 |
| Product/Service Descriptions | 25 | 30 | Unlimited* |

The new rows will use the same styling pattern (emoji + label, centered values, border-b border-border/50) as the existing rows.

---

## Technical Detail

- **File**: `src/components/Pricing.tsx` (lines 408-414)
- **Scope**: 1 text fix + 2 new table rows inserted
- No structural or logic changes

