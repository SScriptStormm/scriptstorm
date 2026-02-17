

# Fix: Scanning Lines Not Visible

## Problem
The scanning lines were placed inside a nested `div` that closes at line 420, but they need to be direct children of the dotted background wrapper (line 82) which has `position: relative`. Currently they're buried inside an inner div without proper positioning context, so `absolute bottom-0` doesn't resolve to the right container.

## Solution

### File: `src/pages/WhyChooseUs.tsx`

1. **Remove the scanning lines from their current location** (lines 415-419) inside the inner nested div.

2. **Add the scanning lines as direct children of the dotted background wrapper** (line 82's div). Place them right before the closing `</div>` of that wrapper (line 421), so they are direct children of the `relative` container and `absolute bottom-0` works correctly.

The wrapper at line 82 has `className="relative -mt-16 pt-16 pb-20 mb-0"` -- since it already has `relative`, the `absolute bottom-0` on the scanning lines will correctly anchor them to its bottom edge.

### Structure after fix:
```
<div className="relative -mt-16 pt-16 pb-20 mb-0">   <!-- line 82, dotted bg wrapper -->
  <div className="absolute ...dotted bg..." />          <!-- line 84 -->
  <div className="absolute ...dotted bg..." />          <!-- line 85 -->
  <div className="relative">                            <!-- line 88, content -->
    ... all chart/testimonial content ...
  </div>                                                 <!-- closes content div -->
  <!-- Scanning lines HERE, direct child of wrapper -->
  <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
    <div className="absolute bottom-0 h-px w-full bg-gradient-neural animate-scan-line opacity-30" />
    <div className="absolute bottom-2 h-px w-full bg-gradient-cyber animate-scan-line opacity-25" style={{ animationDelay: '2s' }} />
  </div>
</div>                                                   <!-- closes wrapper -->
```

This ensures the lines sit at the exact bottom edge of the dotted background.
