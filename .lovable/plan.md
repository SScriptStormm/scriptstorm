

# Improve "No Results" Message for Search

## Problem
When a client searches for a project title that doesn't exist, the empty state message says something like "No projects" and "Try selecting a different filter" -- it doesn't acknowledge that they typed a search query, which feels confusing and unhelpful.

## Solution
Update the empty state message to be search-aware:
- When a search query is active, show: **"No projects matching '[query]'"** with the suggestion **"Try a different search term or clear the search"**
- When only filters are active (no search), keep the current filter-based message

## Technical Details

### File: `src/pages/Dashboard.tsx` (~lines 962-972)

Replace the current empty state block so it checks `searchQuery` first:

- **If `searchQuery` is not empty**: Show "No projects matching '[truncated query]'" with "Try a different search term or clear the search"
- **Otherwise**: Keep the existing filter-aware message ("No projects in [month]", "Try selecting a different filter")

This is a small wording change -- just updating the two `<p>` tags inside the empty state `<div>` to be conditional on `searchQuery.trim()`.

