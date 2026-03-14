

## Compact Dashboard for Mobile

All changes use `sm:` breakpoints so tablet (≥640px) and desktop layouts remain untouched.

### 1. GlassCard base padding (`src/components/ui/GlassCard.tsx`)
- Header: `p-6 pb-4` → `p-4 pb-3 sm:p-6 sm:pb-4`
- Content: `p-6 pt-0` → `p-4 pt-0 sm:p-6 sm:pt-0`
- Footer: `p-6 pt-0` → `p-4 pt-0 sm:p-6 sm:pt-0`

### 2. AccountStatusCard (`src/components/dashboard/AccountStatusCard.tsx`)
- RadialProgress: `size="lg"` → `size="md"` with wrapping `sm:hidden`/`hidden sm:block` pattern, or use `useIsMobile()` hook to pick `"md"` on mobile, `"lg"` on larger
- Container gap: `gap-6` → `gap-4 sm:gap-6`

### 3. MonthlyUsageCard (`src/components/dashboard/MonthlyUsageCard.tsx`)
- Container gap: `gap-6` → `gap-4 sm:gap-6`
- Usage items: `space-y-5` → `space-y-3 sm:space-y-5`

### 4. ContentQueueCard (`src/components/dashboard/ContentQueueCard.tsx`)
- Status circles: `w-10 h-10` → `w-8 h-8 sm:w-10 sm:h-10`, icons `h-5 w-5` → `h-4 w-4 sm:h-5 sm:w-5`
- Status section padding: `p-4` → `p-3 sm:p-4`
- Status section gap: `gap-4 sm:gap-8` → `gap-3 sm:gap-8`
- Status section margin: `mb-6` → `mb-4 sm:mb-6`
- Content breakdown grid items: `p-4` → `p-3 sm:p-4`
- Icon containers: `w-8 h-8` → `w-7 h-7 sm:w-8 sm:h-8`
- AnimatedStat in breakdown: use `size="sm"` on all (already `"md"` which shows `text-3xl` — too large for mobile grid)

### 5. ContentPipelineCard (`src/components/dashboard/ContentPipelineCard.tsx`)
- Stage icon circles: `w-8 h-8` → `w-7 h-7 sm:w-8 sm:h-8`
- Pipeline spacing: `space-y-6` → `space-y-4 sm:space-y-6`
- Empty state icon: `w-20 h-20` → `w-16 h-16 sm:w-20 sm:h-20`, inner icon `h-10 w-10` → `h-8 w-8 sm:h-10 sm:w-10`
- Empty state text: `text-xl` → `text-lg sm:text-xl`

### 6. Welcome Strip (`src/pages/Dashboard.tsx`)
- CTA button: `px-5 py-3` → `px-4 py-2.5 sm:px-5 sm:py-3`
- Plus icon container: `h-8 w-8` → `h-7 w-7 sm:h-8 sm:w-8`

### Files to edit
`GlassCard.tsx`, `AccountStatusCard.tsx`, `MonthlyUsageCard.tsx`, `ContentQueueCard.tsx`, `ContentPipelineCard.tsx`, `Dashboard.tsx`

