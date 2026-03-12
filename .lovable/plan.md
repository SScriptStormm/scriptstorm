

## Add 5 Floating Squares to Auth Page (Matching Services Section)

Currently the Auth page has 2 floating squares. The Services section ("Content That Converts") has 5. We'll update the Auth page to have 5 squares with matching styles, while keeping the existing left square's position (`top-20 left-10`, `w-16 h-16`) and right square's position (`top-40 right-20`, `w-12 h-12`) unchanged.

### Changes in `src/pages/Auth.tsx` (line 228-229)

Replace the 2 existing squares with 5, matching the Services section pattern:

1. **Top-left** — `top-20 left-10 w-16 h-16` border-2 border-primary-glow/30 rotate-45 (existing, adjusted opacity)
2. **Top-right** — `top-40 right-20 w-12 h-12` border-2 border-primary-glow/25 rotate-12, delay 2s (existing)
3. **Bottom-left** — `bottom-40 left-20 w-10 h-10` border-2 border-primary-glow/35 rotate-45, delay 4s (new)
4. **Mid-right** — `top-60 right-40 w-8 h-8` border border-primary-glow/20 rotate-90, delay 1s (new)
5. **Bottom-right** — `bottom-60 right-10 w-14 h-14` border border-primary-glow/25 rotate-12, delay 3s (new)

All squares use `animate-float shadow-cyber` consistent with the Services section.

