

## Change Left Square Border Opacity Back to 40%

Update `src/pages/Dashboard.tsx` line 577: change `border-primary-glow/50` to `border-primary-glow/40`.

### Why the right square looks darker

Both squares have `shadow-cyber` which produces a large blue glow (60px + 120px blur). Neither square has a background color — they are transparent bordered divs. The right square appears darker because:

1. It is smaller (12x12 vs 16x16), so the glow concentrates more within its interior
2. Its lower border opacity (25%) makes the border less distinct, so the pooled glow inside becomes more visually dominant

If you want them to look more uniform, the right square's `shadow-cyber` could be removed or replaced with a lighter shadow.

