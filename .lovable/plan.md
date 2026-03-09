

## Fix: Scrollbar Track Still Appears White

### Root Cause

The scrollbar track uses `rgba(0, 0, 0, 0.3)` — a **semi-transparent** black. On pages where the underlying background is white (the CSS variable `--background: 0 0% 100%`), this renders as light gray/white. The `color-scheme: dark` only affects the browser's *native* scrollbar fallback, not the custom `-webkit-scrollbar` styles which take priority.

### Fix

**File: `src/index.css`**

Change the scrollbar track background from semi-transparent to fully opaque dark:

- Line 199: `rgba(0, 0, 0, 0.3)` → `rgb(15, 15, 20)` (solid near-black)
- Line 226 (Firefox): `rgba(0, 0, 0, 0.3)` → `rgb(15, 15, 20)`

This ensures the track is always dark regardless of what's behind it.

