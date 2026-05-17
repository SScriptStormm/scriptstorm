## Plan

Update the Enterprise Support Center in the dashboard Support tab so it matches the approved Unified Mono Header direction much more closely than the current implementation.

### What I’ll change
1. Rework the section hierarchy in `PrioritySupport.tsx` so the layout reads as a cleaner mono-led information panel rather than a standard card stack.
2. Tighten the typography system for clarity: stronger header row, clearer label/value separation, more readable body copy, and more disciplined spacing without changing any wording.
3. Redesign the response-time area and policy notes to feel more editorial and less blocky, so the same text looks lighter and easier to scan.
4. Keep the existing actions and business logic exactly the same — this is a presentation-only redesign.

### Technical details
- Edit only `src/components/dashboard/PrioritySupport.tsx`.
- Preserve all current text content.
- Preserve existing click handlers (`handleLaunchAIChat`, `handleContactSupport`) and tier logic.
- Use the project’s existing semantic styling tokens and dashboard visual language.
- Avoid changing surrounding dashboard tabs or unrelated support pages.

### Expected result
The Support tab will look noticeably closer to the chosen preview direction: more structured, less wordy at a glance, and significantly easier to read while keeping the exact same copy.