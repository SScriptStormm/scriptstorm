

# Fix Scanning Line Position at Section Border

## Problem
The CTA section has `py-24` (6rem top padding), creating a visible gap between the dotted background section above and where the CTA content begins. The scanning lines are at `top-0` of the section, but the large top padding makes them appear disconnected from the visible content boundary.

## Solution

### File: `src/pages/WhyChooseUs.tsx`

1. **Line 421**: Change CTA section padding from `py-24` to `pt-0 pb-24` -- this removes the top padding gap entirely, making the scanning lines flush against the previous section.

2. **Line 441**: Add `mt-16` to the content container (`<div className="container ...">`) so the stars/heading/buttons still have breathing room below the scanning lines, without creating a gap above the section itself.

This way:
- The scanning lines sit right at the section's top edge with zero gap from the section above
- The actual content (stars, heading, buttons) is pushed down by the container's top margin
- No visible gap between the dotted background and the CTA section

