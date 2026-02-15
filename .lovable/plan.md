
# Redesign Enterprise Comparison Table

## Overview
Transform the plain comparison table into a premium, color-coded design that matches the enterprise package cards above it.

## Current State
The table uses basic `bg-muted/30` background with plain text, no color differentiation between tiers, and simple borders -- it looks generic and disconnected from the visually rich enterprise cards.

## Proposed Design

### Container
- Replace `bg-muted/30` with a subtle gradient background and styled border matching the site's premium aesthetic
- Add a more prominent heading with gradient text or accent styling

### Column Headers
- Color-code each tier header to match its package card color:
  - **Scale**: Purple (`#8B5CF6`)
  - **Authority**: Red (`#E74C3C`)
  - **Dominance**: Gold (`#F59E0B`)
- Add colored top borders or background tints to each column header

### Table Body
- Add subtle column background tints so each tier's column has a faint wash of its color
- Alternate row styling with slightly more contrast
- Style the Dominance column values with extra emphasis (bold, gold accents) to reinforce it as the top tier
- Add colored dots or accent markers next to key differentiators (like "12h" delivery, "Unlimited" revisions)

### Specific Styling
- Header row: Each tier name gets its color as text color with a faint colored background pill
- Data cells: Dominance column values in bold, key standout values (Unlimited, 150, 12h) get subtle highlight badges
- Bottom border of container uses a gradient spanning all three tier colors

## Technical Details

### File: `src/components/Pricing.tsx` (lines 378-441)
- Replace the outer `div` wrapper with premium styling (gradient border, backdrop blur or deeper background)
- Update `thead` to use colored backgrounds per column
- Update `tbody` cells to include subtle column tinting using inline styles with the package colors
- Highlight standout values (Unlimited, 12h, 150) with small colored badges or bold + color treatment
- Keep the table responsive with `overflow-x-auto`

### No new files or dependencies needed
All changes are contained within the existing Pricing.tsx comparison table section.
