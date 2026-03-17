

## Fix: Dialog Close Button Color

The X icon on the close button inherits the default text color (grey) instead of matching the blue/white theme.

### Change in `src/components/ui/dialog.tsx`, line 46

**Current:** `<X className="h-4 w-4" />`
**New:** `<X className="h-4 w-4 text-white" />`

This makes the X icon white, matching the blue-white glassmorphic design of the dialog.

