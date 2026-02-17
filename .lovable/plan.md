

# Fix Scanning Lines Position in "Ready to See the Difference" CTA

## Problem
The scanning lines are positioned at `top-0` and `top-2` inside the CTA section, but because the section has `pt-0`, they overlap with the stars and content instead of sitting at the section's top border.

## Solution

### File: `src/pages/WhyChooseUs.tsx`

**Line 421**: Change `pt-0 pb-24` to `py-24` on the CTA section. This restores top padding so the content (stars, heading, etc.) is pushed down, while the scanning lines remain at `top-0` -- right at the section border where they belong.

This single change fixes both issues:
- Scanning lines stay at the top edge of the section
- Stars and content have proper spacing below the scanning lines

