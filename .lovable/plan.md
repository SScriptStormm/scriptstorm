

# Boost Animation Intensity on All Usage Bars

## The Problem
All three progress bars (Articles, Social Posts, Product Descriptions) use the same animation settings, but bars with lower fill percentages look visually weaker because the shimmer effect sweeps across less area. This makes the Social Posts bar appear less animated compared to Product Descriptions when both are green.

## The Fix
Add `glowIntensity="high"` to all three `NeonProgress` bars. This increases the glow opacity from the default 50% to 70%, making the shimmer, inner glow, and underneath glow effect more pronounced and visually consistent across all bars -- even when one bar is less full than another.

## Technical Changes

### File: `src/components/dashboard/MonthlyUsageCard.tsx`

**Articles bar (~line 80-86):** Add `glowIntensity="high"`
```tsx
<NeonProgress 
  value={articlesUsed} 
  max={limits.articles} 
  variant="tier" 
  size="sm"
  glowIntensity="high"
  animated={articlesUsed < limits.articles}
/>
```

**Social Posts bar (~line 108-114):** Add `glowIntensity="high"`
```tsx
<NeonProgress 
  value={socialPostsUsed} 
  max={limits.socialPosts} 
  variant="tier" 
  size="sm"
  glowIntensity="high"
  animated={socialPostsUsed < limits.socialPosts}
/>
```

**Product Descriptions bar (~line 133-139):** Add `glowIntensity="high"`
```tsx
<NeonProgress 
  value={productDescUsed} 
  max={limits.productDesc} 
  variant="tier" 
  size="sm"
  glowIntensity="high"
  animated={productDescUsed < limits.productDesc}
/>
```

## What This Changes Visually
- The glow opacity goes from 50% to 70% on all three bars
- The shimmer overlay and the glow underneath both become more visible
- All three bars will look equally vibrant when they are green (below 75% usage)
- No changes to colors, sizes, layout, or the conditional stop-at-limit behavior

