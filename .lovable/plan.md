
# Fix Transparent Square Corners on Radial Progress Ring

## The Problem
The radial progress rings in the Account Status and Monthly Usage widgets show visible transparent square corners. This is caused by the CSS `drop-shadow` filter being applied directly to the SVG `<circle>` element. Browsers render the filter's bounding box as a rectangle, creating visible square corners around the circular ring.

## Root Cause
In `RadialProgress.tsx`, the glow effect (e.g., `drop-shadow-[0_0_8px_hsl(221_83%_53%/0.6)]`) is applied to the progress `<circle>` element on line 155-159. CSS filters on individual SVG child elements use rectangular filter regions, which become visible as transparent square artifacts.

## Solution
Move the `drop-shadow` glow class from the `<circle>` element to the parent `<svg>` element. When `drop-shadow` is applied at the `<svg>` level, the browser correctly traces the alpha channel of all visible SVG content, producing a clean circular glow with no rectangular artifacts.

## Technical Changes

### File: `src/components/ui/RadialProgress.tsx`

1. **Add the glow class to the `<svg>` element** (around line 138-141):

```tsx
// Before
<svg
  className="transform -rotate-90"
  width={config.size}
  height={config.size}
>

// After
<svg
  className={cn("transform -rotate-90", animated && styles.glow)}
  width={config.size}
  height={config.size}
>
```

2. **Remove the glow class from the progress `<circle>` element** (around line 154-159):

```tsx
// Before
<circle
  className={cn(
    "transition-all duration-500 ease-out",
    styles.stroke,
    animated && styles.glow
  )}

// After
<circle
  className={cn(
    "transition-all duration-500 ease-out",
    styles.stroke
  )}
```

## Impact

| Widget | Before | After |
|--------|--------|-------|
| Account Status (270 days ring) | Transparent square corners visible | Clean circular glow |
| Monthly Usage (76% ring) | Transparent square corners visible | Clean circular glow |

## Summary
A single-file fix in `RadialProgress.tsx` -- moving the `drop-shadow` filter from the `<circle>` to the `<svg>` element eliminates the rectangular filter artifacts and produces a proper circular glow.
