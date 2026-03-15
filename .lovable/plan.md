

## Fix: Actions Column Alignment

### Problem
The `<th>` header has `pr-2` but the `<td>` cell does not, causing the Info icon to sit further right than the "Actions" text.

### Fix in `src/pages/Dashboard.tsx`
- **Line 1202**: Add `pr-2` to the `<td>` className so the cell content has the same right padding as the header
- This ensures the `justify-end` flex container aligns its right edge with the header text's right edge

