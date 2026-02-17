

# Fix: Make Scanning Lines Visible at Dotted Background Border

## Problem
The scanning lines were moved inside the dotted background wrapper, but they're invisible because they're nested inside a `container mx-auto px-4` div (line 80) that clips overflow. The `w-screen` on the scanning lines extends beyond the container, but the container constrains them.

## Solution
Add `overflow-visible` to the container div at line 80, OR move the scanning lines outside the container but still inside the section, positioned absolutely at the correct vertical position.

The cleaner approach: move the scanning lines out of the container div entirely and place them directly inside the `<section>` element, absolutely positioned to align with where the dotted background ends.

### Changes in `src/pages/WhyChooseUs.tsx`:

1. **Remove scanning lines from inside the container wrapper** (lines 418-422) -- delete the scanning line block from its current position inside the dotted background wrapper.

2. **Add scanning lines directly inside the `<section>` tag** (after line 67, the section opening) -- place them as absolutely positioned elements. Since the dotted background wrapper ends at the bottom of the container content, we need to calculate the right position. Instead, we can place them at the bottom of the entire first section using `absolute bottom-0`.

   However, the section has `pb-0` or similar padding that may not align. A simpler approach:

3. **Actually, the simplest fix**: Just add `overflow-visible` to the container div at line 80 so the `w-screen` scanning lines can extend beyond it and be visible.

### Final approach (single line change):

**Line 80**: Add `overflow-visible` to the container div.

```
Before: <div className="container mx-auto px-4 relative z-10">
After:  <div className="container mx-auto px-4 relative z-10 overflow-visible">
```

This allows the scanning lines (which use `w-screen` and `left-1/2 -translate-x-1/2`) to extend beyond the container and be visible across the full viewport width, just like the dotted background elements on lines 84-85 that use the same technique.

