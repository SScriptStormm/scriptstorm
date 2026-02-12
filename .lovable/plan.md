

# Make Pricing Cards Client-Ready: Hybrid Standardization with Premium Positioning

## Overview
Standardize all feature labels across all five pricing tiers so clients can easily compare plans, while preserving premium prefixes on the top two tiers (Authority and Dominance) to justify their higher price points.

## Changes (all in `src/components/Pricing.tsx`)

### 1. Blog Articles -- Hybrid Labels

Consistent base label "SEO Blog Articles" across all tiers. Authority and Dominance add premium prefixes.

| Tier | Current | New |
|------|---------|-----|
| Starter | 5 Foundational Blog Articles (1,500-2,000 words each) | 5 SEO Blog Articles (1,500-2,000 words each) |
| Growth | 10 Foundational Blog Articles (1,500-2,000 words each) | 10 SEO Blog Articles (1,500-2,000 words each) |
| Scale | 25 Foundational Blog Articles (2,000-3,000 words each) | 25 SEO Blog Articles (2,000-3,000 words each) |
| Authority | 30 Industry-Leading Blog Articles (2,000-3,000 words each) | 30 Industry-Leading SEO Blog Articles (2,000-3,000 words each) |
| Dominance | 50 Unbeatable Cornerstone Assets (2,000-5,000 words each) | 50 Unbeatable Cornerstone SEO Blog Articles (2,000-5,000 words each) |

Use the same description for all: "Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise."

### 2. Social Media -- Clean Labels

Starter gets "Social Media Posts." Growth and above get "Social and Video Content" (no "Strategic," "Targeted Campaign," "Viral-Ready" in the label -- save that for the description).

| Tier | Current | New |
|------|---------|-----|
| Starter | 15 Ready-to-Post Social Media Captions | 15 Social Media Posts |
| Growth | 30 High-Engagement Social and Video Assets | 30 Social and Video Content |
| Scale | 75 Strategic Social Media Posts | 75 Social and Video Content |
| Authority | 90 Targeted Social Media Campaign Posts | 90 Social and Video Content |
| Dominance | 150 Viral-Ready Social Media Posts | 150 Social and Video Content |

Descriptions:
- Starter: "Engaging posts tailored for LinkedIn, X (Twitter), and Instagram to drive discussion and promote your articles."
- Growth and above: "A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority."

### 3. Product Descriptions -- Clean Labels

All tiers use "Product/Service Descriptions." Move "Premium," "High-Converting," etc. to the description text only.

| Tier | Current | New |
|------|---------|-----|
| Starter | 5 Persuasive Product Descriptions | 5 Product/Service Descriptions |
| Growth | 10 High-Converting Product/Service Descriptions | 10 Product/Service Descriptions |
| Scale | 25 High-Conversion Product/Service Pages | 25 Product/Service Descriptions |
| Authority | 30 Premium Product/Service Descriptions | 30 Product/Service Descriptions |
| Dominance | Unlimited Product Descriptions* | Unlimited Product/Service Descriptions* |

Use the same description for all: "Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings."

### 4. Plagiarism Guarantee -- Identical Across All Tiers

Standardize to the same label and description everywhere, and add the missing line to Dominance.

All tiers: "Plagiarism and AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks."

### 5. Keyword Research -- No Change

These represent genuinely different service levels. Keep them differentiated as-is.

### 6. Section Headers -- Standardize

| Tier | Current Monthly Header | New |
|------|----------------------|-----|
| Starter | "Your Monthly Content Engine Includes:" | "Your Monthly Content Package Includes:" |
| Growth | "Your Scalable Content Dominance System Includes:" | "Your Monthly Content Package Includes:" |

| Tier | Current Annual Header | New |
|------|---------------------|-----|
| Starter | "Your Annual Content Foundation Includes:" | "Your Annual Content Package Includes:" |
| Growth | "Your Annual Content Dominance System Includes:" | "Your Annual Content Package Includes:" |

(Scale, Authority, and Dominance use the EnterprisePackageCard component which does not render section headers, so no change needed there.)

---

## Scope

- **File**: `src/components/Pricing.tsx`
- **Type**: String replacements only in `features` and `annualFeatures` arrays, plus `sectionHeader` / `annualSectionHeader` fields
- **Count**: Approximately 40 string edits across both monthly and annual feature arrays for all 5 tiers
- **No structural, layout, or logic changes**

