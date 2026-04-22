

## Brighten Support Tab Text for Readability

The Support tab copy is using low-opacity whites (`text-white/70`, `text-white/60`, `text-white/50`) that wash out against the glass background. Bumping these up will restore legibility while keeping the dashboard's glassmorphic look.

### Changes to `src/components/dashboard/PrioritySupport.tsx`

**Card subtitle (under title)**
- `text-white/70` → `text-white/80`

**AI Assistant block**
- Heading "24/7 AI Assistant": already `text-white` ✓
- Description paragraph: `text-white/70` → `text-white/85`
- Footer note (📧 Need human help…): `text-white/60` → `text-white/80`

**Human Support block**
- Heading "Human Support Team": already `text-white` ✓
- Description paragraph: `text-white/70` → `text-white/85`
- Response-time table header labels (Plan / Human Response Time): `text-white/60` → `text-white/75`
- Non-current tier rows:
  - Remove `opacity-60` (it dims the entire row)
  - Plan label: `text-white/70` → `text-white/85`
  - Time value: `text-white/60` → `text-white/80`
- Current tier row stays as-is (already bright: `text-white` + `text-primary-glow`)
- Business-hours footnote: `text-white/50` → `text-white/75`

**Contact Action block**
- Dominance priority note: keep `text-amber-300` (already bright) ✓

**Footer block**
- "Support Email:" label: `text-white/70` → `text-white/85`
- Email address: keep `text-primary-glow` ✓

### Result
All secondary text moves from the 50–70% opacity range into the 75–85% range, matching the readability of sibling dashboard tabs without changing the glassmorphic aesthetic, layout, copy, or hover behavior.

### Scope
- 1 file edited (`PrioritySupport.tsx`) — opacity-only tweaks
- No memory updates, no DB, no edge functions, no routing changes

