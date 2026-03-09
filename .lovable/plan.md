

## Fix: First Square Getting Covered by Header

### Problem
The first square is positioned at `top-20` (80px). With `rotate-45` and `animate-float` moving it up by 10px, the square enters the header zone. Since the header uses `z-10` with `backdrop-blur-xl`, the square gets visually clipped/covered when it floats upward.

### Fix
Move both squares lower so the first one clears the header even at peak float animation:

- First square: `top-20` → `top-40` (160px — safely below the ~80px header)
- Second square: `top-40` → `top-60` (maintains spacing between squares)

### Files (2)

1. **`src/pages/Dashboard.tsx`** (line 577-578): Update square positions to `top-40` and `top-60`
2. **`src/pages/ContentBrief.tsx`** (lines 21-22): Same position update

