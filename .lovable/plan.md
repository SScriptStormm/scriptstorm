

## Make First Square More Visible

Increase the border opacity of the first (left) square from `/30` to `/40` across all pages that have these decorative elements. This makes it more prominent against the background while keeping it lighter than a fully opaque border.

### Files to Update
- `src/pages/Dashboard.tsx` — first square `border-primary-glow/30` → `border-primary-glow/40`
- `src/pages/ContentBrief.tsx` — same change
- `src/pages/AccountSettings.tsx` — same change
- `src/pages/PackageDetails.tsx` — same change
- `src/pages/Auth.tsx` — same change

