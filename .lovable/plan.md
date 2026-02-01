

# Remove Hover Effects from Display-Only Dashboard Widgets

## Overview
Remove the hover effects (scale, glow, border brightening) from dashboard widgets that are not interactive buttons. This improves UX by reserving hover states for clickable elements only.

## Affected Widgets

The following display-only widgets currently have hover effects enabled and will be updated:

1. **Account Status Card** - Shows subscription tier and days remaining
2. **Monthly Usage Card** - Displays quota usage for articles, social posts, and product descriptions
3. **Content Queue Card** - Shows content status breakdown and content mix statistics
4. **Content Pipeline Card** - Displays project progress stages
5. **Content Calendar** - Shows scheduled content events (in the Calendar tab)

## Changes

### 1. Account Status Card
**File:** `src/components/dashboard/AccountStatusCard.tsx`

Change `hover` prop from true to false:
```tsx
// Before
<GlassCard variant={variant} glow hover className="h-fit">

// After
<GlassCard variant={variant} glow hover={false} className="h-fit">
```

### 2. Monthly Usage Card
**File:** `src/components/dashboard/MonthlyUsageCard.tsx`

Change `hover` prop from true to false:
```tsx
// Before
<GlassCard variant="default" glow hover className="h-fit">

// After
<GlassCard variant="default" glow hover={false} className="h-fit">
```

### 3. Content Queue Card
**File:** `src/components/dashboard/ContentQueueCard.tsx`

Change `hover` prop from true to false:
```tsx
// Before
<GlassCard variant="default" glow hover>

// After
<GlassCard variant="default" glow hover={false}>
```

### 4. Content Pipeline Card
**File:** `src/components/dashboard/ContentPipelineCard.tsx`

Change `hover` prop from true to false:
```tsx
// Before
<GlassCard variant="success" glow hover>

// After
<GlassCard variant="success" glow hover={false}>
```

### 5. Content Calendar
**File:** `src/components/dashboard/ContentCalendar.tsx`

Add explicit `hover={false}` to both GlassCard instances (empty state and populated state):
```tsx
// Empty state (line 80) - Before
<GlassCard variant="default" glow>

// After
<GlassCard variant="default" glow hover={false}>

// Populated state (line 95) - Before
<GlassCard variant="default" glow>

// After
<GlassCard variant="default" glow hover={false}>
```

## Files to Modify
1. `src/components/dashboard/AccountStatusCard.tsx` (1 change)
2. `src/components/dashboard/MonthlyUsageCard.tsx` (1 change)
3. `src/components/dashboard/ContentQueueCard.tsx` (1 change)
4. `src/components/dashboard/ContentPipelineCard.tsx` (1 change)
5. `src/components/dashboard/ContentCalendar.tsx` (2 changes)

## Result
After these changes, the display-only widgets will retain their beautiful glassmorphic styling and glow effects, but will no longer scale or brighten on hover. This creates a cleaner, more intuitive experience where only truly interactive elements (buttons, links, clickable rows) respond to cursor movement.

