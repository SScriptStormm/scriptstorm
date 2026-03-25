

## Fix: Consistent Field Spacing in Content Brief Step 1

### Problem
The spacing between fields looks uneven because each field has different internal content heights:
- **Title field**: has a character counter `<p>` below the input, adding ~20px of extra height
- **Content Type field**: just a select dropdown, no extra elements
- **Target Keywords field**: has a keyword research info box below the input, adding ~40px of extra height

The parent container's `space-y-6` creates equal gaps between the *FormItem boundaries*, but since each FormItem has different internal height, the visual gap between the bottom of one input and the top of the next label varies.

### Solution
Make the character counter on the Title field **absolutely positioned** so it doesn't affect the FormItem's flow height. This keeps the counter visible but removes its impact on spacing.

### Changes in `src/components/MultiStepContentBriefForm.tsx`

**Title field (lines 406-417)**: Wrap the Input and char counter in a `relative` container, then position the char counter absolutely at the bottom-right of the input area:

```tsx
<FormItem>
  <FormLabel ...>...</FormLabel>
  <FormControl>
    <div className="relative">
      <Input ... />
      <span className="absolute -bottom-5 right-0 text-xs text-white/50">
        {getCharCount(field.value, 200)}
      </span>
    </div>
  </FormControl>
  <FormMessage />
</FormItem>
```

This removes the char counter from the normal document flow, so all three fields will have the same effective height pattern (label → input → FormMessage), and `space-y-6` will produce visually even gaps.

The keyword research info box under Target Keywords is intentionally styled as a feature callout and sits consistently below that field on all layouts, so it does not need adjustment.

### Scope
- Single file change: `src/components/MultiStepContentBriefForm.tsx`
- Affects all layouts equally (desktop, tablet, mobile)

