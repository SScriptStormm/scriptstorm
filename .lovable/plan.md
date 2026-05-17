Add a weekend availability note between the business hours line and the existing "clients outside Asia" note in `src/components/dashboard/PrioritySupport.tsx`.

## Change

In `src/components/dashboard/PrioritySupport.tsx`, insert a new `<p>` between the two existing paragraphs:

> No human responses on weekends (Saturday–Sunday). Inquiries submitted on weekends will be handled on the next business day (Monday). Our AI assistant remains available 24/7.

Styled to match the surrounding small muted mono text (e.g. `text-white/70 font-mono text-xs mt-2`).