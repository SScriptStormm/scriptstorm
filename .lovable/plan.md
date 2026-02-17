

# Fix: Align Scanning Line with Dotted Background Border

## What's Happening

The dotted background lives inside a wrapper div (line 82) that has `pb-20` padding. Below that, the testimonial card has `mb-12 md:mb-20` bottom margin. These create a large white gap between where the dotted background visually ends and where the CTA section (with scanning lines) begins. The `-mt-px` fix only addresses a 1px gap, but the actual gap is much larger.

## The Fix

Move the scanning lines out of the CTA section and place them as an absolutely positioned element right at the bottom edge of the dotted background wrapper. This way they'll always sit exactly at the border regardless of spacing.

### Changes in `src/pages/WhyChooseUs.tsx`:

1. **Remove scanning lines from the CTA section** (lines 435-439) -- delete the scanning line div block from inside the CTA section.

2. **Add scanning lines at the bottom of the dotted background wrapper** (after line 85, inside the div at line 82) -- place them as absolute-positioned elements at `bottom-0` of the dotted background container, so they sit precisely at its lower edge.

3. **Remove the `-mt-px` hack** from the CTA section (line 421) since it's no longer needed.

4. **Remove `mt-16`** from the CTA content container (line 441) since the scanning lines are no longer at the top of this section.

### Result
The scanning lines will be anchored to the bottom edge of the dotted background, sitting exactly at its border -- no matter what margins or padding exist between sections.
