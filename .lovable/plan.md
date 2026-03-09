

## Fix: Tablet Layout for Content Projects

The table currently switches from card layout to table layout at `md` (768px), but the table columns are too cramped on tablet screens. The breakpoint should be `lg` (1024px) so tablets get the spacious card layout instead.

### Changes in `src/pages/Dashboard.tsx`

Update all `md:` breakpoint references in the projects section to `lg:`:

1. **Mobile card layout** (~line 1005): `block md:hidden` → `block lg:hidden`
2. **Desktop table layout** (~line 1099): `hidden md:block` → `hidden lg:block`
3. **Mobile search input** (~line 768): `md:hidden` → `lg:hidden`
4. **Desktop search input** (if separate): `hidden md:block` → `hidden lg:block`
5. **Pagination responsive classes**: Update `md:flex`, `md:hidden` references in the pagination section to `lg:flex`, `lg:hidden`

This ensures tablet users (768-1023px) see the card-based layout, and only desktop users (1024px+) see the full table.

