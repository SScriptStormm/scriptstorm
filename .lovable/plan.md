

# Align Enterprise Comparison Table Research Row

## Overview
Update the Research row in the Enterprise Comparison Table to display the full, updated research labels instead of abbreviated terms.

## Change

### File: `src/components/Pricing.tsx` (lines 427-432)

**Current:**
```
<tr className="border-b border-border/50">
  <td className="py-2 px-2">🎯 Research</td>
  <td className="py-2 px-2 text-center">Advanced</td>
  <td className="py-2 px-2 text-center">Keyword Insights</td>
  <td className="py-2 px-2 text-center">Enterprise</td>
</tr>
```

**Updated:**
```
<tr className="border-b border-border/50">
  <td className="py-2 px-2">🎯 Research</td>
  <td className="py-2 px-2 text-center text-xs">Advanced Competitor & Keyword Analysis</td>
  <td className="py-2 px-2 text-center text-xs">Strategic Keyword & Topic Intelligence</td>
  <td className="py-2 px-2 text-center text-xs">Enterprise Keyword Intelligence + Trend Prediction</td>
</tr>
```

The `text-xs` class is added to keep the longer labels from overwhelming the table layout. This ensures the research row matches the exact feature names used in the pricing cards and dashboard widget.

## Scope
- 1 file, 3 cell text updates
- No structural or logic changes

