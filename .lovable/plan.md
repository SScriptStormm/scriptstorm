## Update Plagiarism & AI Scan Guarantee Copy

Replace the existing tagline on the "Plagiarism & AI Scan Guarantee" bullet across all five pricing tiers in `src/components/Pricing.tsx` to clarify that scanning only applies to content over 100 words.

### Change

**Old text:**
> Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.

**New text:**
> Plagiarism & AI Scan Guarantee: Every piece over 100 words is scanned for originality and AI detection. Shorter content (social posts, etc.) is generated with the same strict quality standards but not scanned due to length limitations.

### Files

- `src/components/Pricing.tsx` — 10 occurrences total (one in `features` and one in `annualFeatures` for each of the 5 tiers: Starter, Growth, Scale, Authority, Dominance). Lines 150, 151, 173, 174, 190, 191, 209, 210, 227, 228.

### Out of scope / not touched

- `src/pages/OnboardingProcess.tsx` line 68 (`"Plagiarism and AI-detection screening"`) — different shorter bullet, no claim about benchmarks, leave as-is.
- No other file contains this phrase. `AccountSettings.tsx` does not duplicate the feature list bullets, so the pricing-sync rule is not triggered.
- No memory updates, DB, edge functions, or routing changes.