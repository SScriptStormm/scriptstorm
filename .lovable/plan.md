

# Update Pricing Cards for Full Automation Alignment

## Overview
Remove features that require human intervention and update descriptions to reflect automation capabilities across all five tiers.

## Changes (all in `src/components/Pricing.tsx`)

### 1. Starter Package
No changes needed.

### 2. Growth Package
**Modify** the "Automated Content Calendar" feature in both `features` and `annualFeatures` arrays:
- **Current**: "Automated Content Calendar: A strategic, monthly plan that aligns all content with your business goals for maximum impact."
- **New**: "Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences."

### 3. Scale Package
**Modify** the "Advanced Keyword & Competitor Annihilation" feature in both `features` and `annualFeatures` arrays:
- **Current**: "Advanced Keyword & Competitor Annihilation: We don't just analyze competitors; we identify and exploit their weaknesses to steal their market share."
- **New**: "Advanced Competitor & Keyword Analysis: AI-powered analysis that identifies competitor content gaps and keyword opportunities."

### 4. Authority Package
**Delete** these two features from both `features` and `annualFeatures` arrays:
1. "Strategic Keyword & Topic Mapping: We map the entire competitive landscape..."
2. "Competitor Gap Exploitation: In-depth analysis that reveals and attacks..."

All other features (30 articles, 90 social, 30 product descriptions, 24h delivery, 3 revisions, priority support, plagiarism scan) remain unchanged.

### 5. Dominance Package
**Delete** these two features from both `features` and `annualFeatures` arrays:
1. "AI-Driven Performance Dashboard: Real-time analytics on content performance..."
2. "Market Dominance Roadmap: A strategic, quarterly plan to systematically dismantle..."

All other features (50 articles, 150 social, unlimited descriptions, 12h delivery, unlimited revisions, enterprise keyword intelligence, priority workspace, plagiarism scan) remain unchanged.

---

## Technical Details

- **File**: `src/components/Pricing.tsx`
- **Locations**:
  - Growth: line 173-174 (monthly and annual features)
  - Scale: line 190-191
  - Authority: line 209-210
  - Dominance: line 227 and the corresponding annualFeatures
- **Type**: String edits and array item removals
- **Count**: 2 string modifications + 4 feature deletions (each in both monthly and annual arrays = 12 total edits)
- No structural or logic changes

