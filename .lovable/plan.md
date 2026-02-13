

# Add Features to Scale, Authority, and Dominance Pricing Cards

## Overview
Add "Automated Content Scheduling" and "Strategic Keyword Insights" features to the Scale, Authority, and Dominance tiers to ensure consistent, fully automatable feature sets across all packages.

## Changes (all in `src/components/Pricing.tsx`)

### 1. Scale Package (lines 190-191)
**Add 1 feature** after "75 Social & Video Content" and before "25 Product/Service Descriptions" in both `features` and `annualFeatures`:
- "Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences."

Result: 8 features becomes 9 features.

### 2. Authority Package (lines 209-210)
**Add 2 features** after "3 Revision Rounds" and before "Plagiarism & AI Scan Guarantee" in both `features` and `annualFeatures`:
1. "Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences."
2. "Strategic Keyword Insights: AI-powered research that uncovers high-potential topics and search terms aligned with your market."

Result: 7 features becomes 9 features.

### 3. Dominance Package (lines 227-228)
**Add 1 feature** after "150 Social & Video Content" and before "Unlimited Product/Service Descriptions*" in both `features` and `annualFeatures`:
- "Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences."

Result: 8 features becomes 9 features.

## Final Feature Counts
- Starter: 7 (unchanged)
- Growth: 8 (unchanged)
- Scale: 9
- Authority: 9
- Dominance: 9

## Technical Details
- **File**: `src/components/Pricing.tsx`
- **Type**: Array element insertions only -- no deletions, no structural changes
- **Edits**: 6 array modifications (3 tiers x 2 arrays each: `features` + `annualFeatures`)

