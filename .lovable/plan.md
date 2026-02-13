

# Align Entire ScriptStorm Website with Updated Pricing Features

## Overview
The pricing cards were recently updated (added Automated Content Scheduling to Scale/Authority/Dominance, added Strategic Keyword Insights to Authority, removed Performance Dashboard and Market Roadmap from Dominance). Several other pages still reference the old feature set and need to be synchronized.

## Changes by File

### 1. PackageFeaturesWidget.tsx (Package Details page)

**A. Enable Automated Content Scheduling for Scale, Authority, and Dominance**
- Currently `hasContentCalendar` is `true` only for Growth and `false` for Scale, Authority, and Dominance
- Change `hasContentCalendar: false` to `hasContentCalendar: true` for Scale (line 68), Authority (line 81), and Dominance (line 94)

**B. Update Authority keyword research label**
- Currently line 124 returns `"Advanced Competitor & Keyword Analysis"` for Authority
- Change to `"Strategic Keyword Insights"` to match the pricing card
- Update description (line 142) from `"AI-powered competitor content gap & keyword analysis"` to `"AI-powered research for high-potential topics and search terms"`

**C. Remove Dominance-exclusive "Performance Dashboard" and "Market Roadmap"**
- Delete the two feature blocks at lines 358-382 (Performance Dashboard and Market Roadmap with EXCLUSIVE badges)
- Keep the "White-Glove Revision Handling" exclusive feature -- it is still valid

### 2. Dashboard.tsx

**A. Expand Calendar tab access to all tiers with Automated Content Scheduling**
- Currently the Calendar tab only shows for `hasGrowth` (which is `tier === 'growth'` -- excludes higher tiers)
- Change `hasGrowth` definition (line 302) to: `const hasGrowth = tier === 'growth' || tier === 'scale' || tier === 'authority' || tier === 'dominance';`
- This makes the Calendar tab and content available to Growth, Scale, Authority, and Dominance (all tiers that now have "Automated Content Scheduling")

**B. Remove Performance Dashboard tab (Dominance feature was deleted)**
- Remove the Performance tab trigger (line 747-750)
- Remove the Performance tab content (lines 1309-1312)

**C. Remove Market Roadmap tab (Dominance feature was deleted)**
- Remove the Roadmap tab trigger (lines 760-763)
- Remove the Roadmap tab content (lines 1319-1322)

**D. Update Dominance welcome message**
- Line 651: Change `"12-hour delivery . Unlimited revisions . Priority support"` to remove any reference to performance dashboard or roadmap (current text is fine -- no changes needed here)

### 3. MultiStepContentBriefForm.tsx (Content Brief page)

**A. Update keyword research labels to match pricing cards**
- Line 136 (Scale): Change `"Advanced Keyword & Competitor Annihilation Included"` to `"Advanced Competitor & Keyword Analysis Included"`
- Line 138 (Authority): Change `"Strategic Keyword & Topic Mapping Included"` to `"Strategic Keyword Insights Included"`

**B. Update keyword research descriptions**
- Line 153 (Scale): Change to `"AI-powered analysis that identifies competitor content gaps and keyword opportunities."`
- Line 155 (Authority): Change to `"AI-powered research that uncovers high-potential topics and search terms aligned with your market."`

**C. Update Performance Dashboard reference**
- Line 756: Change `"We'll include these metrics in your AI-Driven Performance Dashboard"` to a generic label like `"We'll use these metrics to optimize your content strategy"` (since the Performance Dashboard feature was removed)

### 4. Enterprise Comparison Table (Pricing.tsx)

**Add a row for Automated Content Scheduling** to the comparison table (after the Product/Service Descriptions row, around line 420):
- New row: "Automated Content Scheduling" with checkmarks for all three tiers (Scale, Authority, Dominance)

**Update Research row label for Authority**:
- Line 424: Change Authority's research label from `"Strategic"` to `"Keyword Insights"` to better match "Strategic Keyword Insights"

---

## Summary of Alignment

| Feature | Starter | Growth | Scale | Authority | Dominance |
|---|---|---|---|---|---|
| Automated Content Scheduling | -- | Yes | Yes (NEW) | Yes (NEW) | Yes (NEW) |
| Keyword Research Label | Standard | Advanced | Advanced Competitor & Keyword Analysis | Strategic Keyword Insights | Enterprise Keyword Intelligence |
| Performance Dashboard | -- | -- | -- | -- | REMOVED |
| Market Roadmap | -- | -- | -- | REMOVED | REMOVED |

## Files Modified
- `src/components/dashboard/PackageFeaturesWidget.tsx` -- 6 edits
- `src/pages/Dashboard.tsx` -- 5 edits
- `src/components/MultiStepContentBriefForm.tsx` -- 5 edits
- `src/components/Pricing.tsx` -- 2 edits (comparison table only)

## No Changes Needed
- `src/pages/AccountSettings.tsx` -- no feature-specific copy found
- `src/components/Services.tsx` -- uses generic labels, already aligned
- `src/pages/OnboardingProcess.tsx` -- references delivery times only, still accurate
- `src/components/Footer.tsx` -- generic marketing copy, no changes needed

