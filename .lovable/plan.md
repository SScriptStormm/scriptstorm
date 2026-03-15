

## Fix: Align Info Icon with "Actions" Column Header

### Problem
The Info icon button in the Actions column appears slightly offset to the right compared to the "Actions" header text. This is caused by the `border-r-2` on the `<td>` adding 2px of visual width that the `<th>` doesn't have, plus potential padding inconsistencies.

### Fix
Add matching `pr-2` padding to the Actions `<th>` header, and ensure the `<td>` also uses `pr-2` to account for the border width pushing content. Alternatively, add the same `border-r-2 border-transparent` to the `<th>` so both cells have identical box sizing.

### File: `src/pages/Dashboard.tsx`
- **Line 1130**: Add `pr-2` to the Actions `<th>` to match the td's effective right padding
- **Line 1202**: Ensure the Actions `<td>` has consistent `pr-2` padding so the icon centers under the header text

