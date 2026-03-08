

## Fix: Floating Squares — Stop Fixed Positioning, Match Working Pages

### Root Cause

The working pages (About Us, Support, Contact, Help Center, etc.) all use **`absolute`** positioned squares inside their page's `relative` container — they naturally scroll with the page and sit behind content. No `fixed`, no `z-[15]`.

The broken pages (Dashboard, ContentBrief, AccountSettings, PackageDetails, Auth) use **`fixed inset-0 z-[15]`** — this causes two problems:
1. Squares stay viewport-fixed while content scrolls (looks like they "move" relative to content)
2. `z-[15]` puts them above `z-10` content, causing overlap

### Fix

Replace all `fixed inset-0 overflow-hidden pointer-events-none z-[15]` square containers with the same pattern used on working pages — **`absolute`** squares directly inside the page's root `relative` container, no wrapper div, no z-index override.

**Standard pattern (matches About Us, Support, Contact, etc.):**
```jsx
{/* Floating geometric elements */}
<div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" />
<div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
```

### Files to Update (5 files)

1. **`src/pages/Dashboard.tsx`** (lines 576-580): Remove the `fixed` wrapper div. Place two `absolute` squares directly after the darkening overlay div.

2. **`src/pages/ContentBrief.tsx`** (lines 20-24): Same — remove `fixed` wrapper, place `absolute` squares directly in the root div.

3. **`src/pages/AccountSettings.tsx`** (lines 273-277): Same change.

4. **`src/pages/PackageDetails.tsx`** (lines 70-74): Same change.

5. **`src/pages/Auth.tsx`** (lines 227-231): Same change.

All squares will use the exact same opacity values as the working pages (`/30` and `/25`) instead of the elevated `/40` and `/35`.

