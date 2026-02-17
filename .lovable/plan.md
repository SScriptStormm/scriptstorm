

# Close Gap Between Scanning Line and CTA Content

## Problem
The scanning lines sit at `top-0` of the CTA section, but the content container has `mt-16` (4rem), creating a large empty space between the moving line and the stars/heading. The user wants the scanning line to sit right against the top of the visible CTA content.

## Solution

### File: `src/pages/WhyChooseUs.tsx`

**Line 441**: Reduce `mt-16` to `mt-4` on the content container so the stars and heading sit close to the scanning line.

Change:
```
<div className="container mx-auto px-4 text-center relative z-10 mt-16">
```
To:
```
<div className="container mx-auto px-4 text-center relative z-10 mt-4">
```

Single-line change. The scanning line will appear right above the star rating and heading.
