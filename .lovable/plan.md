

## Fix: "Why Choose Us" and "Client Login" Button Hover Effect

### Problem
Both buttons use the `ghost-white` variant which applies `hover:bg-white/20` on hover. The inline className sets `bg-black/30` for the default state, but on hover the variant's `hover:bg-white/20` overrides it, causing the button background to shift from dark to a white tint — looking jarring against the dark hero section.

### Solution
Add `hover:bg-black/40` to both buttons' inline classNames to override the variant's `hover:bg-white/20`, keeping the dark translucent background on hover while still showing a subtle brightness change.

### Changes
**File: `src/components/Hero.tsx`**

- Line 86 (Why Choose Us button): Add `hover:bg-black/40` to the className
- Line 97 (Client Login button): Add `hover:bg-black/40` to the className

This keeps the dark glass aesthetic on hover, with the border glow (`hover:border-white/60`) and shadow (`hover:shadow-hologram`) providing the interactive feedback instead.

### Scope
- Single file: `src/components/Hero.tsx`
- Two className changes
- All layouts affected equally

