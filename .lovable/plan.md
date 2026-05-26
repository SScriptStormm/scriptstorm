# Align Auth + Dashboard with Enterprise Support Center Design

## Design language to propagate

Distilled from `PrioritySupport.tsx`:

- **Card shell**: `GlassCard` with `bg-white/[0.04]` panels, `border-white/[0.08]`, `rounded-2xl`, generous `p-5 sm:p-6` padding.
- **Section header**: small icon inside `p-2 rounded-lg bg-primary/15 border border-primary-glow/20` + a mono uppercase title `text-xs tracking-[0.2em] font-bold text-white`.
- **Eyebrow / micro-labels**: `font-mono text-[10-11px] uppercase tracking-[0.2em] text-primary-glow font-bold`.
- **Body copy**: `text-white/95` (never below `/80`) at `text-sm` / `text-base` with `leading-relaxed`.
- **Primary CTA**: `bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-bold uppercase tracking-widest`, generous vertical padding (`py-5/6`).
- **Status dot**: ping-animated `bg-primary-glow` indicator.
- **Accents**: `text-primary-glow` for links, key data, icons in section headers.

## Scope

Two phases — auth surfaces first (small, isolated), then logged-in surfaces.

### Phase 1 — Auth surfaces
1. `src/pages/Auth.tsx` — login + signup forms + reset-password view. Wrap form in `GlassCard`, swap labels/buttons/links to the mono-uppercase + primary-glow system, add the icon-tile section header ("SECURE LOGIN" / "RESET PASSWORD"), tighten input styling (dark glass inputs with `border-white/[0.08]`, focus ring `primary-glow`).

### Phase 2 — Logged-in surfaces
Audit and harmonize these to use the same header pattern, eyebrow labels, button styling, and text contrast (most already use `GlassCard`; gap is typography/CTAs/labels):

- `src/pages/Dashboard.tsx`
- `src/pages/AccountSettings.tsx`
- `src/pages/ContentBrief.tsx`
- `src/pages/HelpCenter.tsx`
- `src/pages/Support.tsx`
- `src/pages/OnboardingProcess.tsx`
- `src/pages/PackageDetails.tsx`
- Dashboard widgets in `src/components/dashboard/*` (header, status, pipeline, queue, calendar, usage, package features, performance, research, roadmap) — normalize titles to `font-mono uppercase tracking-[0.2em]`, eyebrows to `text-primary-glow`, body text to `text-white/95`, buttons to the mono primary style.

Marketing/public pages (Index, AboutUs, Contact, WhyChooseUs, Privacy, Terms, Refund, ThankYou) are **not in scope** per the request ("pages that require login").

## Approach

1. Read each target file, identify the heading / label / CTA primitives that diverge.
2. Apply consistent class swaps — no logic changes, no copy changes.
3. Where many widgets repeat the same pattern (icon-tile + uppercase title), keep the change localized per file (no new shared component) to minimize blast radius.
4. Verify build after each phase.

## Out of scope
- No copy edits.
- No layout restructuring beyond what's needed for the header/CTA pattern.
- No changes to public marketing pages or `index.css`/Tailwind tokens (existing tokens already cover everything).
