

# Research Label Differentiation Enhancement

## Overview
Strengthen the tiered branding ladder for keyword research labels to create clearer differentiation and justify each tier's value jump.

## Changes Summary

| Tier | Current | Updated |
|------|---------|---------|
| Scale | Advanced Competitor & Keyword Analysis | No change (already aligned) |
| Authority | Strategic Keyword Insights | Strategic Keyword & Topic Intelligence |
| Dominance | Enterprise Keyword Intelligence | Enterprise Keyword Intelligence + Trend Prediction |

## Technical Details

Three files need updates:

### 1. `src/components/Pricing.tsx`
- **Authority tier** (features + annualFeatures): Update label from "Strategic Keyword Insights" to "Strategic Keyword & Topic Intelligence" (keep the existing description after the colon)
- **Dominance tier** (features + annualFeatures): Update label from "Enterprise Keyword Intelligence" to "Enterprise Keyword Intelligence + Trend Prediction" (keep the existing description)

### 2. `src/components/dashboard/PackageFeaturesWidget.tsx`
- Update the `getKeywordResearchLabel()` switch for authority and dominance cases
- Update the `getKeywordResearchDescription()` switch if needed to match

### 3. `src/components/MultiStepContentBriefForm.tsx`
- Update the content brief form labels for authority ("Strategic Keyword & Topic Intelligence Included") and dominance ("Enterprise Keyword Intelligence + Trend Prediction Included")

## Why This Works
- **Authority** gains "Intelligence" (stronger than "Insights") and "Topic" implies broader strategic scope beyond just keywords
- **Dominance** adds "Trend Prediction" to justify the enterprise label and premium pricing
- Scale remains unchanged as it already uses the suggested format

