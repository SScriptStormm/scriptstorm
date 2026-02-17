

# Fix: Move Scanning Lines to the Dotted Background Border

## Problem
The scanning lines are inside the CTA section (a separate `<section>` element), but there's a large gap between the dotted background section and the CTA section caused by:
- `pb-20` padding on the dotted background wrapper (line 82)
- `mb-12 md:mb-20` margin on the testimonial card (line 394)
- The natural section break between the two `<section>` elements

No amount of negative margin on the CTA section will close this gap properly.

## Solution
Move the scanning lines out of the CTA section and anchor them to the bottom edge of the dotted background wrapper using absolute positioning.

### Changes in `src/pages/WhyChooseUs.tsx`:

1. **Add `relative` to the dotted background wrapper** (line 82) if not already present, so absolute children position relative to it.

2. **Add scanning lines inside the dotted background wrapper** (before the closing `</div>` at line 415) -- two absolutely positioned lines at `bottom-0`, sitting exactly on the dotted background's lower edge.

3. **Remove scanning lines from the CTA section** (lines 435-439) -- delete the entire scanning lines block from the CTA section since they now live in the dotted background wrapper.

4. **Clean up CTA section classes** (line 421) -- remove `-mt-px` hack since it's no longer needed.

5. **Remove `mt-16` from CTA content container** (line 441) -- no longer needed since scanning lines aren't at the top of this section. Restore appropriate padding on the CTA section itself.

### Result
The scanning lines will be anchored to the exact bottom edge of the dotted background, sitting precisely at its border regardless of any margins or padding between sections.

