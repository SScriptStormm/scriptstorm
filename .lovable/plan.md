

# Why Choose Us + Our Process Page Fixes

## 1. Add Dotted Background to Key Advantages and Testimonial Sections (WhyChooseUs.tsx)

The dotted crosshatch background currently only wraps the two comparison chart sections (lines 82-85). We will extend it to also cover the "Our Key Advantages" section (line 360) and the "Coming Soon" testimonial card (line 397).

**Approach:** Move the closing tags of the dotted background wrapper to encompass the Key Advantages grid and the testimonial card, so they share the same dotted crosshatch pattern as the comparison tables above.

## 2. Make "Ready to See the Difference" CTA Consistent with Hero (WhyChooseUs.tsx)

Currently the CTA (line 420) uses a dark `bg-gradient-hero` background, which clashes with the page's light hero section. We will restyle it to match the hero's design pattern:
- Light background with `bg-gradient-mesh`, `bg-gradient-neural` overlays
- Grid dot pattern overlay
- Floating geometric border elements
- Scanning line effects
- Dark text instead of white text
- Buttons styled with primary color scheme instead of white-on-dark

## 3. Shorten Step 1 Description (OnboardingProcess.tsx)

Current description (line 27) is too long: *"You submit your detailed content brief directly through your secure Client Dashboard. The moment you hit 'Submit,' our automated workflow is triggered. The 24-hour countdown officially begins."*

**Proposed replacement:** `"Submit your brief, and our system instantly:"`

This mirrors the concise pattern used by Steps 2-5 (e.g., "Our system autonomously:", "Industry-trained AI drafts:", "Every piece undergoes:"). The bullet points below already cover the details.

## 4. Make "Ready to Experience AI Content" CTA Consistent with Hero (OnboardingProcess.tsx)

Same issue as WhyChooseUs -- the CTA section (line 314) uses a dark `bg-gradient-hero` while the hero section above uses a light background with mesh/neural overlays. We will restyle the CTA to match the hero's light design pattern with the same decorative elements (grid dots, floating shapes, scanning lines) and dark text with primary-colored buttons.

---

## Technical Summary

### File: `src/pages/WhyChooseUs.tsx`
- **Lines 357-358**: Move the closing `</div>` tags for the dotted background wrapper to after the testimonial section (after line 417), so Key Advantages and testimonial are inside the dotted area
- **Lines 420-463**: Replace the dark CTA styling with the hero's light pattern (gradient-mesh, neural overlays, grid dots, floating elements, dark text, primary-colored buttons)

### File: `src/pages/OnboardingProcess.tsx`
- **Line 27**: Change description to `"Submit your brief, and our system instantly:"`
- **Lines 314-352**: Replace the dark CTA styling with the hero's light pattern (matching the "How Our AI Process Works" hero section design)

