

# Our Process Page -- Dotted Background, CTA Expansion, and Scanning Line Fix

## 1. Add Dotted Crosshatch Background to Process Steps and FAQ Sections

The same dotted crosshatch pattern used on the Why Choose Us page will be added to two sections:
- **Process Steps section** (lines 162-240) -- the 5-step process
- **Common Questions / FAQ section** (lines 281-311)

Each section gets two absolute-positioned full-width divs with the repeating linear gradients (horizontal and vertical lines at 2px intervals).

## 2. Expand the "Ready to Experience AI Content" CTA Section

The bottom CTA (lines 314-358) currently has minimal padding (`py-16`). It will be expanded:
- Increase vertical padding to `py-24`
- Add more breathing room with larger text sizing and spacing
- Add a subtitle or trust badge element for visual weight

## 3. Move Scanning Lines to the Top

In both CTA sections:

**OnboardingProcess.tsx (line 330-333):** The scanning lines are positioned at `top-0` and `bottom-0`. The user wants them both at the **top**. Change the second line from `bottom-0` to `top-0` with a slight offset or different delay so both animate across the top area.

**WhyChooseUs.tsx (lines 434-437):** Same fix -- move the `bottom-0` scanning line to `top-0`.

## Technical Details

### File: `src/pages/OnboardingProcess.tsx`

**Process Steps section (line 163):** Add two dotted background divs inside the section:
```
<div className="absolute left-1/2 -translate-x-1/2 w-screen top-0 bottom-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--primary-glow)/0.03)_2px,hsl(var(--primary-glow)/0.03)_4px)] pointer-events-none" />
<div className="absolute left-1/2 -translate-x-1/2 w-screen top-0 bottom-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,hsl(var(--primary-glow)/0.03)_2px,hsl(var(--primary-glow)/0.03)_4px)] pointer-events-none" />
```

**FAQ section (line 283):** Add the same two dotted background divs.

**CTA section (line 314):** Change `py-16` to `py-24`. Move the second scanning line from `bottom-0` to `top-0` (with slight offset via `top-2`).

### File: `src/pages/WhyChooseUs.tsx`

**CTA section (line 436):** Move the second scanning line from `bottom-0` to `top-0` with a slight offset.

