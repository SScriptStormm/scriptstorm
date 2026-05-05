
## Redesign Thank You Page

The current `/thank-you` page uses a plain light card on a generic gradient background with outdated copy ("SurferSEO API key", "native editing priority list"). It needs to match ScriptStorm's dark neon-futuristic aesthetic and reflect the actual product experience.

### Design Changes (1 file: `src/pages/ThankYou.tsx`)

**Background**: Replace `bg-gradient-to-br from-background to-muted` with `bg-gradient-hero bg-fixed` plus the standard `bg-black/20` darkening overlay, matching the Dashboard.

**Card**: Replace the plain `bg-card` div with a `GlassCard` component (variant="success", glow enabled, hover disabled) for the glassmorphic look.

**Logo**: Import and display the ScriptStorm logo at the top of the card, consistent with the Dashboard header.

**Success icon**: Keep the green checkmark but style it with a neon glow ring (emerald, matching the "completed" pipeline stage color).

**Info rows**: Replace the two outdated info blocks (SurferSEO / Priority Queue) with relevant next-steps:
1. "Your Dashboard Is Ready" -- Your content pipeline and brief form are now active.
2. "Submit Your First Brief" -- Head to your dashboard to submit a content brief and get your first draft.
3. "Fully Automated Delivery" -- Our AI stack handles everything. No calls, no delays.

**Order ID block**: Keep it but restyle with glassmorphic `bg-white/[0.05]` and `border-white/[0.1]`.

**Billing note**: Change from "Billed monthly in USD" to a generic "Billed in USD - Cancel anytime" (since both monthly and annual land here).

**CTA button**: Primary gradient button "Go to My Dashboard" linking to `/dashboard` (instead of landing page). Add a secondary ghost link "Back to Homepage" below it.

**Typography**: White text with `text-white/60` for secondary text, `font-mono` on headings, matching the dashboard pattern.

### Content Alignment
- Remove all references to "SurferSEO", "native editing", and "ScriptStorm Premium" (not a real tier name)
- Heading: "Welcome to ScriptStorm!"  
- Subheading: "Your subscription is now active."
- Messaging emphasizes the 100% automated AI workflow with no human intervention language
