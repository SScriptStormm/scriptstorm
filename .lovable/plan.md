

## Dashboard Mobile Fixes

### 1. Reduce Monthly Usage label text size on mobile

**File: `src/components/dashboard/MonthlyUsageCard.tsx`**

The labels "Articles", "Social Posts", and "Product Desc" currently use `text-xs sm:text-sm`. On mobile they render at `text-xs` (12px) which is fine, but the numbers next to them (`text-sm font-bold`) sit very close.

- Lines 75, 104, 133: Change the label `text-xs sm:text-sm` to `text-[10px] sm:text-sm` to make labels slightly smaller on mobile
- Lines 77, 106, 135: Add `gap-1` or reduce spacing between label row and number by changing the parent `justify-between` wrapper to also include `gap-1 sm:gap-2`
- Lines 72, 101, 130: Add `gap-1 sm:gap-2` to the flex row containers to create more breathing room between label and number on mobile

### 2. Improve Brief Details dialog close button

**File: `src/components/ui/dialog.tsx`**

The close button (line 45) is currently a tiny `h-4 w-4` X icon with `opacity-70` that fades in/out. It needs to be more visible and persistently styled while keeping the same design language.

- Line 45: Update the `DialogPrimitive.Close` className to add a visible circular background, larger hit target, and always-visible styling:
  - Change from `rounded-sm opacity-70` to `rounded-full opacity-100 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 p-1.5`
  - Change the X icon from `h-4 w-4` to `h-4 w-4` (keep size but the padding makes it feel bigger)
  - This creates a persistent, visible circular close button that matches the glassmorphic aesthetic

