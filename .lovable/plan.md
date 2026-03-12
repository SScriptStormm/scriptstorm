

## Darken Left-Side Floating Squares

The two left-positioned squares (lines 228 and 230) need more visual weight. Add a semi-transparent background fill to both without changing their border opacity.

### Changes in `src/pages/Auth.tsx`

- **Line 228** (top-left square): Add `bg-primary-glow/15`
- **Line 230** (bottom-left square): Add `bg-primary-glow/15`

This gives them a filled appearance so they stand out more against the dark background, while keeping borders unchanged.

