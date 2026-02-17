

# Remove Gap Between Scanning Line and Dotted Background

## Problem
There's a small gap between the bottom of the dotted background section and the top of the CTA section where the scanning line lives. Even though both sections have zero padding at their shared border, internal margins (like the `mb-12 md:mb-20` on the testimonial card wrapper at line 394) create residual space.

## Solution

### File: `src/pages/WhyChooseUs.tsx`

**Line 421**: Add `-mt-px` (negative 1px top margin) to the CTA section to pull it up and eliminate the hairline gap between sections.

Change:
```
<section className="relative pt-0 pb-24 overflow-hidden">
```
To:
```
<section className="relative pt-0 pb-24 overflow-hidden -mt-px">
```

This is a single-line change that closes the tiny gap without affecting any other spacing.
