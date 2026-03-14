

## Make Mobile Layout Match Tablet Layout

The dashboard currently has many `sm:` breakpoint-driven differences between mobile (<640px) and tablet (≥640px). The goal is to unify them so mobile uses the same layout as tablet, just on a narrower screen.

### Key differences to eliminate

| Area | Mobile (current) | Tablet (target) |
|------|-----------------|-----------------|
| **Tab navigation** | Large icons only, no text | Icons + text labels |
| **Header** | Stacked (logo above buttons) | Side-by-side row |
| **Welcome strip** | Stacked (greeting above CTA) | Side-by-side row |
| **Production Summary icons** | 32px circles | 40px circles |
| **Production Summary dividers** | Hidden | Visible vertical lines |
| **Content Breakdown grid** | 1 column | 2 columns |
| **RadialProgress size** | `md` (80px) | `lg` (120px) |
| **GlassCard padding** | `p-4` | `p-6` |
| **Various spacing** | Tighter gaps/margins | Larger gaps/margins |

### Changes by file

**`src/pages/Dashboard.tsx`**
- Header: Remove `flex-col sm:flex-row` → always `flex-row`, keep smaller text sizes for space
- Welcome strip: Remove `flex-col sm:flex-row` → always `flex-row`
- Tab triggers: Remove `hidden sm:inline` from text labels, use smaller icon size (`h-4 w-4`) always
- Remove mobile-specific text/spacing overrides where they differ from tablet (`sm:` prefixed values become the default)

**`src/components/dashboard/AccountStatusCard.tsx`**
- RadialProgress: Remove `isMobile` conditional, use `md` size always (since mobile can't fit `lg` at 375px but `md` is the compromise)

**`src/components/dashboard/MonthlyUsageCard.tsx`**
- Same RadialProgress change as above

**`src/components/dashboard/ContentQueueCard.tsx`**
- Show vertical dividers on all sizes (remove `hidden sm:block`)
- Use 2-col grid on all sizes for Content Breakdown (`grid-cols-2` instead of `grid-cols-1 sm:grid-cols-2`)
- Use tablet icon sizes (40px circles) on all sizes

**`src/components/ui/GlassCard.tsx`**
- Unify padding: Use the `sm:` values as default (e.g., `p-6 pb-4` instead of `p-4 pb-3 sm:p-6 sm:pb-4`)

### What stays the same
- Desktop (`lg:`) breakpoints remain untouched — 2-column grid for top cards, table layout for projects
- The project card layout (used on both mobile and tablet) is already identical
- Pagination controls already work the same on mobile and tablet

### Sizing note
Some elements will be proportionally tighter on a ~375px phone vs ~768px tablet, but the structural layout will be identical. Text and icons will use the tablet's sizes.

