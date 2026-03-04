

## Dashboard Text Readability Analysis — All Screen Settings

### Summary of Findings

After reviewing every dashboard component, the text is **generally well-structured** but has **5 specific problem areas** that could cause readability issues under low brightness, night light (warm/yellow filter), or low-resolution screens.

---

### Problem Areas Identified

**1. `text-white/30` and `text-white/40` — Too faint**
These appear in multiple places and represent only 30-40% opacity white text. On a dimmed screen or with night light enabled, these become nearly invisible.

- `ContentPipelineCard.tsx` line 76: `text-white/40` for submission date
- `ContentPipelineCard.tsx` line 110: `text-white/30` for inactive stage descriptions
- `ContentPipelineCard.tsx` line 167: `text-white/40` for footer hint text
- `Dashboard.tsx` line 651: `text-white/40` for user email
- `AccountStatusCard.tsx` lines 85, 104: `text-white/50` for labels (borderline)

**2. `text-white/50` labels — Borderline**
Used for section labels like "Current Plan", "Renews On", "Progress", etc. These are acceptable on normal brightness but strain under night light or low brightness.

- `MonthlyUsageCard.tsx` lines 74, 103, 132: `text-white/80` for category labels (these are fine)
- `ContentQueueCard.tsx` lines 99, 139: `text-white/50` for section headers

**3. Small font sizes on low-resolution screens**
`text-xs` (12px) is used extensively for labels and metadata. On 720p or lower-resolution monitors, these can be hard to read, especially in monospace (`font-mono` makes characters narrower).

**4. `text-primary-glow/80` in header — Night light concern**
The blue `primary-glow` color at 80% opacity in the header subtitle ("CLIENT DASHBOARD") will shift to a muddy green under night light filters, reducing contrast against the dark background.

**5. Low-opacity borders as visual separators**
`border-white/10` and `border-white/[0.08]` are used as section dividers. Under low brightness these disappear entirely, making content sections blur together.

---

### Recommended Fixes

| Issue | Current | Proposed | File(s) |
|-------|---------|----------|---------|
| Faint body text | `text-white/30`, `text-white/40` | Bump to `text-white/50` and `text-white/60` | ContentPipelineCard, Dashboard |
| Faint labels | `text-white/50` | Bump to `text-white/60` | AccountStatusCard, ContentQueueCard, ContentPipelineCard |
| User email | `text-white/40` | `text-white/60` | Dashboard.tsx |
| Footer hints | `text-white/40` | `text-white/50` | ContentPipelineCard |
| Section borders | `border-white/10`, `border-white/[0.08]` | `border-white/[0.12]` and `border-white/[0.15]` | ContentQueueCard, ContentPipelineCard, Dashboard |

### What stays the same
- `text-white` for primary headings — already full opacity, excellent readability
- `text-white/80` for category labels — good contrast ratio
- Colored text (`text-emerald-400`, `text-amber-400`, `text-primary-glow`) — these are vivid enough to survive brightness/night light changes
- Font sizes above `text-sm` — no changes needed

### Scope
~15-20 small opacity value changes across 4-5 files. No layout or structural changes. Purely a contrast/accessibility improvement.

