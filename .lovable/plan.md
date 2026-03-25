

## Fix: Consistent Field Spacing in Content Brief Form (Step 1)

### Problem
The spacing between fields on Step 1 of the content brief form is visually inconsistent. The "Article Title" field includes a character count `<div>` below the input that adds extra vertical space before the next field. The "Content Type" and "Target Keywords" fields have different internal structures (no char count, or a keyword research info box), making the gaps between fields appear uneven.

### Solution
In `src/components/MultiStepContentBriefForm.tsx`, normalize the internal spacing of all Step 1 fields:

1. **Title field (lines 415-417)**: The character count div sits between the input and `FormMessage`, adding uncontrolled space. Tighten it by adding `mt-1` and removing the implicit gap from `space-y-6` parent by keeping the char count closer to the input.

2. **Target Keywords field (lines 474-479)**: The keyword research info box has `mt-2` which adds extra spacing within the FormItem. This is fine but should be consistent.

3. **Wrap all FormItems consistently**: Ensure each `FormItem` produces a similar visual height footprint. The fix is to keep the `space-y-6` on the parent container but adjust internal element margins so each field block has consistent internal spacing:
   - Title field: change char count wrapper from standalone div to a tighter `<p>` with `text-right mt-1` (remove the wrapping div's default flex gap)
   - Content Type field: no changes needed
   - Target Keywords field: keep `mt-2` on the info box — this is consistent with FormDescription-style spacing

### File changed
- `src/components/MultiStepContentBriefForm.tsx` — Step 1 field internal margins adjusted for visual consistency across all layouts

