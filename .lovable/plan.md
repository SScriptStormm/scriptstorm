

## Fix: Floating Squares — Scrolling, Covered, Missing

### Root Causes

1. **ContentBrief squares moving with scroll**: The root `div` has `overflow-hidden` which can interfere with `fixed` child positioning in certain browser/rendering contexts. The squares container should be moved to be a truly independent fixed layer, and `overflow-hidden` should be removed from the root or the squares separated from it.

2. **Square getting covered**: The header is at `z-10` with `bg-black/30 backdrop-blur-xl`. Squares at `z-[5]` get hidden behind it when `animate-float` moves them into the header area. Fix: reposition the top-left square lower (e.g., `top-32` instead of `top-20`) so it doesn't overlap with the header.

3. **PackageDetails squares not showing**: The code has squares but they share a container with large blurred circles. The squares may be rendering but not visible due to the `opacity-[0.03]` neural overlay and other layers stacking. Will separate the squares into their own dedicated container above the overlays.

4. **Dashboard square covered by welcome section**: Same z-index issue — the top-left square at `top-20 left-10` overlaps with the welcome card at `z-10`. Needs repositioning.

### Changes

**All pages with squares** — Standardize square positions to avoid header/content overlap:
- Top-left square: `top-[30vh] left-10` (moved below header zone)  
- Top-right square: `top-[45vh] right-20` (moved to mid-page)

**`src/pages/ContentBrief.tsx`**:
- Remove `overflow-hidden` from root div (not needed since the fixed overlays handle their own clipping)
- Separate squares into their own `fixed z-[15]` container (above content z-10) so they always float visibly on top

**`src/pages/PackageDetails.tsx`**:
- Separate the squares out of the shared container with blurred circles into their own dedicated `fixed z-[15]` container

**`src/pages/Dashboard.tsx`**:
- Move squares to a `z-[15]` container and reposition to avoid welcome card overlap

**`src/pages/AccountSettings.tsx`**:
- Same z-index and position updates for consistency

**`src/pages/Auth.tsx`**:
- Same z-index and position updates for consistency

### Summary
- 5 files updated
- Squares repositioned to `top-[30vh]` and `top-[45vh]` to avoid header/card overlap
- Z-index raised from `z-[5]` to `z-[15]` so squares float above content cards
- Squares separated into dedicated containers on pages where they share with blurred circles
- `overflow-hidden` removed from ContentBrief root to fix fixed positioning

