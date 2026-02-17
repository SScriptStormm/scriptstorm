

# Add Hover Scale Effect to Submit New Brief Button

## Summary
Re-add the `hover:scale-105` effect to the "Submit New Brief" button so it slightly grows when hovered, matching the previous CTA behavior.

## What Changes

### File: `src/pages/Dashboard.tsx` (line 658)

Add `transform hover:scale-105` to the button's className. The only change is inserting these two utility classes before `transition-all`:

**Before:**
```
transition-all duration-300 animate-glow-pulse-soft
```

**After:**
```
transform hover:scale-105 transition-all duration-300 animate-glow-pulse-soft
```

No other files or logic changes needed.

