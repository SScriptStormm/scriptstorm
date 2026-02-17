

# Remove Gap Between Dotted Background and Scanning Line

## Problem
The testimonial card wrapper (line 394) has `mb-12 md:mb-20`, creating a large empty space at the bottom of the dotted background section. The scanning lines sit at `top-0` of the next section. This means: testimonial card -> big empty dotted space -> scanning line -> CTA content. The user wants the scanning line right where the dotted background ends.

## Solution

### File: `src/pages/WhyChooseUs.tsx`

**Line 394**: Remove the bottom margin from the testimonial wrapper.

Change:
```
<div className="mb-12 md:mb-20">
```
To:
```
<div>
```

This eliminates the empty space between the last visible content in the dotted section and the scanning line at the top of the CTA section. The `-mt-px` already on the CTA section handles any remaining hairline gap.

Single-line change. Nothing else needs to move.

