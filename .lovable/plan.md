

# Fix Gaps in "Why Choose Us" CTA Section

## Problem
1. There is a visible gap between the dotted background section and the "Ready to See the Difference" CTA section, caused by the `py-16` bottom padding on the main content section (line 74) plus the `py-24` top padding on the CTA section (line 421).
2. The scanning lines at the top of the CTA section may show a clipped gap since the section no longer has `overflow-hidden` but the scanning lines wrapper (line 436) still does.

## Changes (File: `src/pages/WhyChooseUs.tsx`)

1. **Remove the gap between sections**: Change the CTA section's padding from `py-24` to `pt-0 pb-24` and remove the `-mt-px` hack. Also remove the bottom padding from the main content section by changing `py-16` (line 74) to `pt-16 pb-0`.

2. **Fix scanning line gap**: Add `overflow-hidden` back to the CTA section itself (line 421) so the scanning lines and decorative elements don't overflow, while keeping them flush against the top.

### Specific edits

- **Line 74**: Change `py-16` to `pt-16 pb-0` on the main content section
- **Line 421**: Change `relative py-24 -mt-px` to `relative pt-0 pb-24 overflow-hidden` on the CTA section

