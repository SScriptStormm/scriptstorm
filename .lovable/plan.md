

# Extend Dotted Background to the Moving Line

## Problem
The dotted background wrapper (line 82) has `pb-20` bottom padding, but the scanning/moving lines sit at the top of a separate CTA section below. There's a visible gap between where the dotted background ends and where the moving line begins.

## Solution
Two small changes in `src/pages/WhyChooseUs.tsx`:

1. **Move the scanning lines into the dotted background wrapper** (from lines 435-439 to just before the closing of the wrapper at line 415). Position them at `bottom-0` and `bottom-2` instead of `top-0` and `top-2`, so they sit at the very bottom edge of the dotted background.

2. **Remove the scanning lines block from the CTA section** (lines 435-439) since they now live in the dotted background wrapper.

3. **Remove `-mt-px`** from the CTA section (line 421) since the gap hack is no longer needed.

This way the dotted background naturally covers the area behind the moving lines, and they sit right at the dotted background's bottom edge.

