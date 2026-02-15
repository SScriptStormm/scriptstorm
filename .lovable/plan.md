

# Improve Content Queue Card — Make It Distinct and Professional

## Problem
The Content Queue card currently shows vague status counts (completed/in progress/pending) and a "Content Mix" section with inconsistent detail -- blog articles show word counts but social posts and product descriptions just say "submitted." This overlaps heavily with the Projects tab and feels unprofessional.

## Solution
Redesign the Content Queue card to become a **"This Month's Production Summary"** — a focused, at-a-glance overview of the current billing month that provides unique value the Projects tab does not.

## Key Changes

### 1. Rename to "MONTHLY PRODUCTION SUMMARY"
Clearly distinguishes it from the Projects tab which shows all-time/filtered project lists.

### 2. Scope to Current Month Only
All stats reflect the current billing month, making it a quick pulse check rather than a duplicate of the full project list.

### 3. Consistent Word Counts for All Content Types
- Blog Articles: show count + total word count (already exists)
- Social Posts: show count + total word count (add word count calculation)
- Product Descriptions: show count + total word count (add word count calculation)

### 4. Add Completion Rate
Show a percentage-based completion metric (e.g., "8 of 12 completed — 67%") with a NeonProgress bar, giving instant insight into how the month is progressing.

### 5. Status Breakdown Stays but Gets Context
Keep the completed/in progress/pending counters but add "this month" context so they clearly differ from the all-time project list.

## Technical Details

### File: `src/components/dashboard/ContentQueueCard.tsx`

**Changes:**
- Rename title from "CONTENT QUEUE" to "MONTHLY PRODUCTION SUMMARY"
- Add `youtube_script` to the Article interface for proper type filtering
- Calculate word counts for all content types (social posts + product descriptions), not just blogs
- Add a completion rate section with NeonProgress bar at the top
- Update Content Mix labels to show word counts for every type instead of "submitted"
- Add "This Month" context label to the status overview section
- Import NeonProgress component (already available)

### File: `src/pages/Dashboard.tsx`

**Changes:**
- Pass only current month articles to ContentQueueCard instead of all articles (change `articles={articles}` to `articles={articlesThisMonth}`)
- This ensures the widget only reflects the current billing cycle

### No new files or dependencies needed

## Visual Structure (Updated Card)

```text
+------------------------------------------+
| MONTHLY PRODUCTION SUMMARY               |
+------------------------------------------+
| Completion Rate: 8/12 (67%)              |
| [============================--------]   |
+------------------------------------------+
| This Month's Status                      |
| [v] 8 Completed | [~] 3 In Progress     |
|                  | [!] 1 Pending         |
+------------------------------------------+
| Content Breakdown                        |
| Blog Articles:  5  |  12,400 words       |
| Social Posts:   4  |   2,100 words       |
| Product Desc:   3  |   1,800 words       |
+------------------------------------------+
```

