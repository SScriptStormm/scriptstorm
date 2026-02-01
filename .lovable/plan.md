
# Remove Hover Effect from Content Brief Form

## Overview
Remove the hover effect from the Content Brief submission form to match the other display-only widgets we just updated. Since this is a form container (not a clickable card), it should not have interactive hover styling.

## Changes

### File: `src/components/MultiStepContentBriefForm.tsx`

**Line 382** - Add `hover={false}` to the GlassCard wrapping the form:

```tsx
// Before
<GlassCard variant="default" className="overflow-hidden bg-black/50 backdrop-blur-xl border-white/15">

// After
<GlassCard variant="default" hover={false} className="overflow-hidden bg-black/50 backdrop-blur-xl border-white/15">
```

## Summary

| File | Change |
|------|--------|
| `src/components/MultiStepContentBriefForm.tsx` | Add `hover={false}` prop to GlassCard (line 382) |

## Result
The Content Brief form will retain its glassmorphic styling but will no longer scale or glow when hovered, providing a cleaner user experience consistent with the dashboard widgets.
