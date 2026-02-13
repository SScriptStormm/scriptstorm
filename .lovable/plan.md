

# Align Remaining Public Pages with Updated Pricing Features

## Overview
After a thorough review of every page on the ScriptStorm website (outside the client login area), almost everything is already aligned. Only two minor copy issues were found that reference outdated or removed feature concepts.

## Audit Results

The following public pages were reviewed and confirmed **already aligned** (no changes needed):
- Hero.tsx -- generic marketing copy, no tier-specific features
- FAQ.tsx -- revision rounds correctly listed, no removed features referenced
- WhyChooseUs.tsx -- comparison tables use generic language, all accurate
- OnboardingProcess.tsx -- process steps and FAQ accurate (revision rounds match)
- AboutUs.tsx -- generic brand copy, no feature-specific references
- Contact.tsx -- no feature references
- Support.tsx -- no feature references
- Footer.tsx -- generic marketing copy
- ThankYou.tsx -- no feature references
- TermsOfService.tsx -- legal copy, no feature references
- RefundPolicy.tsx -- legal copy, no feature references
- PrivacyPolicy.tsx -- legal copy, no feature references
- Pricing.tsx comparison table -- already updated in previous round

## Changes Needed (2 edits in 2 files)

### 1. Services.tsx (line 12)
**Current**: `"Strategic Keyword Research & Mapping"`
**New**: `"Strategic Keyword Research & Integration"`

Why: The word "Mapping" echoes the removed "Strategic Keyword & Topic Mapping" feature from the old Authority tier. Changing to "Integration" keeps the meaning (keywords are woven into content) while avoiding confusion with the deleted feature label.

### 2. HelpCenter.tsx (lines 129-131)
**Current**: `"Do you provide content analytics?"` with answer: `"Our higher-tier plans include high-level performance insights and SEO scoring to help you measure content success."`

**New answer**: `"All content is delivered with built-in SEO scoring and optimization metrics. Your client dashboard provides visibility into your content pipeline, delivery status, and revision history."`

Why: The current answer implies "performance insights" which could be confused with the removed "AI-Driven Performance Dashboard." The new answer focuses on what actually exists (SEO scoring, dashboard pipeline tracking) without referencing removed features.

## Technical Details
- **File 1**: `src/components/Services.tsx` -- line 12, single string change
- **File 2**: `src/pages/HelpCenter.tsx` -- lines 129-131, question answer text update
- No structural or logic changes
- No dependencies between edits

