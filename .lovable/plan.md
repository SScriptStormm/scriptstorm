
# Polish Project Titles in the Content Projects Table

## Problem
The project titles in the "YOUR CONTENT PROJECTS" section (both mobile cards and desktop table) look plain and unprofessional -- like plain text on a Word document. They use basic `font-mono` styling with no visual hierarchy or polish.

## Solution
Add subtle visual enhancements to make project titles feel like proper project names rather than raw text:

1. **Truncate long titles** with ellipsis instead of letting them wrap awkwardly
2. **Add a subtle gradient text effect** so titles catch the eye
3. **Show a hover glow** on the title text for interactivity feedback
4. **Slightly increase letter spacing** for a cleaner look

## Technical Details

### File: `src/pages/Dashboard.tsx`

**Mobile card title (around line 969):**

Change from:
```
<h3 className="text-white font-mono tracking-wide font-semibold text-sm mb-1 break-words">
  {article.title}
</h3>
```

To:
```
<h3 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 font-mono tracking-wider font-bold text-sm mb-1 line-clamp-2">
  {article.title}
</h3>
```

**Desktop table title (around line 1074):**

Change from:
```
<h3 className="text-white font-mono tracking-wide font-semibold text-xs md:text-sm lg:text-base">
  {article.title}
</h3>
```

To:
```
<h3 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 font-mono tracking-wider font-bold text-xs md:text-sm lg:text-base truncate max-w-[300px] lg:max-w-[400px]" title={article.title}>
  {article.title}
</h3>
```

### What changes visually
- Titles get a subtle white-to-faded gradient that looks polished, not flat
- Wider letter spacing (`tracking-wider`) gives a cleaner, more designed feel
- Bold weight (`font-bold` instead of `font-semibold`) adds visual authority
- Long titles truncate cleanly with ellipsis (desktop) or clamp to 2 lines (mobile) instead of wrapping endlessly
- Full title visible on hover via the `title` attribute (desktop)
