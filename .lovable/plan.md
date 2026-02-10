
# Add Title Search to Content Projects

## What This Does
Adds a search bar above the existing filters in the "YOUR CONTENT PROJECTS" section so clients can quickly find a specific project by typing part of its title. The search works alongside the existing month, status, and content type filters.

## How It Works
- A search input appears between the section header and the month filter
- As the client types, the project list filters in real-time to show only matching titles (case-insensitive)
- A small "X" button inside the input clears the search
- Pagination resets to page 1 when the search text changes
- The search combines with all existing filters (month, status, content type)

## Visual Style
- Matches the existing glassmorphic dark theme with a Search icon on the left
- Uses the same `font-mono` text style and border/glow effects as the other filter controls
- Placeholder text: "Search project titles..."

## Technical Details

### File: `src/pages/Dashboard.tsx`

**1. Add state variable** (near other filter states ~line 68):
```
const [searchQuery, setSearchQuery] = useState<string>('');
```

**2. Add search to the filter chain** (after contentType filtering ~line 377):
```
const searchFilteredArticles = searchQuery.trim() === ''
  ? filteredArticles
  : filteredArticles.filter(a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
```
Then replace `filteredArticles` with `searchFilteredArticles` in the pagination calculations (totalPages, paginatedArticles, results counter).

**3. Reset page when search changes** (add `searchQuery` to the useEffect dependency ~line 388):
```
useEffect(() => {
  setCurrentPage(1);
}, [statusFilter, monthFilter, contentTypeFilter, searchQuery]);
```

**4. Add search input UI** between the header and the month filter (~line 775), with a Search icon, glassmorphic styling, and an X button to clear.

**5. Add import** for `Search` and `X` icons from `lucide-react` (if not already imported).
