

## Add "View Brief" Detail Icon to Projects

### What
Add an info/eye icon button to each project row (mobile cards and desktop table) that opens a dialog showing the original content brief details the user submitted. This helps clients review their requests without leaving the dashboard.

### UI Behavior
- **Icon**: `Info` icon (from lucide-react) — appears on every project row, regardless of status
- **Mobile cards**: Small icon button in the top-right corner of each card
- **Desktop table**: Icon button in the Actions column (before Download/Revision buttons, or as the sole action for non-completed items)
- **Click**: Opens a `Dialog` showing the brief details in a clean, readable layout

### Dialog Content ("Brief Details")
Display the following fields from the article record (only show fields that have values):

| Label | Field |
|-------|-------|
| Content Goal | `content_goal` |
| Target Audience | `target_audience` |
| Target Keywords | `target_keywords` (array → comma-separated) |
| Tone | `tone` |
| Brand Voice | `brand_voice` |
| Key Points | `key_points` |
| Style Preferences | `style_preferences` |
| Competitor URLs | `competitor_urls` |
| Reference Links | `reference_links` |
| Avoid Topics | `avoid_topics` |
| Specific Instructions | `specific_instructions` |
| Word Count | `word_count` |
| Content Type | `content_type` |
| YouTube Script Length | `youtube_script_length` (if youtube) |
| Strategic Goals | `strategic_goals` (array) |
| KPIs to Track | `kpis_to_track` (array) |

### File Changes
**`src/pages/Dashboard.tsx`**:
1. Add `Info` to lucide imports
2. Add `briefDetailArticle` state (`Article | null`) and `briefDialogOpen` boolean state
3. Add a `handleViewBrief` handler that sets both states
4. **Mobile cards**: Add an `Info` icon button in the card header area (top-right)
5. **Desktop table**: Add an `Info` icon button in the Actions cell for all statuses
6. Add a new `Dialog` at the bottom (alongside the revision dialog) that renders the brief fields in a scrollable, styled layout matching the existing dark/glass aesthetic

### Styling
- Icon button: `ghost` variant, `text-primary-glow/70 hover:text-primary-glow`, subtle border
- Dialog: Same dark glass style as the revision dialog — `bg-[#0a0a1a] border-primary-glow/30`
- Brief fields: Label/value pairs in a grid, `font-mono`, matching dashboard typography

