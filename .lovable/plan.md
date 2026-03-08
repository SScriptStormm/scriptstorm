

## Fix: Floating Squares Consistency, Visibility, and Loading Screen

### Issues

1. **Auth page**: Squares use thin `border` at `/15`–`/25` opacity with no `shadow-cyber` — too dim and inconsistent with the rest of the app.
2. **Dashboard**: Squares are at `z-[1]` but the main content is at `z-10`, so the welcome card covers the top-left square. The `shadow-cyber` glow on the smaller square doesn't add much at current opacity.
3. **Package Details page**: No squares, no darkening overlay — completely missing decorative elements.
4. **Account Settings**: Squares container uses `absolute` instead of `fixed`, so they scroll with content instead of staying fixed like other pages.
5. **All pages**: Squares at `/25`–`/30` opacity are still too dim overall.

### Proposed Changes

**Standardized square pattern** (used consistently across all pages):
```jsx
<div className="fixed inset-0 overflow-hidden pointer-events-none z-[5]">
  <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/40 rotate-45 animate-float shadow-cyber" />
  <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/35 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
</div>
```

Key changes from current: bump opacity from `/25`–`/30` to `/35`–`/40`, raise z-index from `z-[1]` to `z-[5]` so they float above overlays but below interactive content (`z-10`).

**Files to update:**

1. **`src/pages/Auth.tsx` (~lines 227-230)**: Replace the three thin, dim squares with the standard two-square pattern above. Remove the third square at `bottom-40` since no other page uses three.

2. **`src/pages/Dashboard.tsx` (~lines 577-580)**: Update opacity from `/30`→`/40` and `/25`→`/35`, change `z-[1]` to `z-[5]`.

3. **`src/pages/ContentBrief.tsx` (~lines 15-20)**: Update opacity from `/30`→`/40` and `/25`→`/35`, change `z-[1]` to `z-[5]`.

4. **`src/pages/AccountSettings.tsx` (~lines 267-273)**: Change container from `absolute` to `fixed`, update opacity, change `z-[1]` to `z-[5]`.

5. **`src/pages/PackageDetails.tsx` (~lines 60-65)**: Add the darkening overlay (`bg-black/20`) and the standard floating squares block. Add `z-[5]` to the squares container.

### Summary
- 5 files updated
- Squares brightened from `/25`–`/30` to `/35`–`/40` across all pages
- Z-index raised to `z-[5]` so squares aren't covered by overlays but remain behind UI
- Auth page squares upgraded from thin `border` to `border-2` with `shadow-cyber`
- Package Details page gets squares and darkening overlay
- Account Settings squares container changed from `absolute` to `fixed`

