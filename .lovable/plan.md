

# Redesign Welcome Section Into a Smart Status Bar

## Summary
Replace the generic "Command Center Active / Welcome back / email" block with a compact, high-value welcome strip that gives clients instant situational awareness when they log in.

## What Changes

### Current (Remove)
- "Command Center Active" label
- "Welcome back" heading
- Raw email display
- "Your content production command center" subtitle
- The entire tall GlassCard welcome block

### New Design: Compact Smart Welcome Strip

A single streamlined GlassCard with two rows:

**Row 1 (Top):** Personalized greeting + tier badge
- Time-based greeting: "Good morning" / "Good afternoon" / "Good evening"
- User's email (smaller, secondary text)
- Tier badge pulled inline (e.g., the HoloBadge showing "GROWTH" or "SCALE")

**Row 2 (Bottom):** Live content snapshot — 3 small inline stats
- "X In Progress" (with clock icon, amber color)
- "X Pending Review" (with eye icon, blue color)  
- "X Completed This Month" (with check icon, green color)

These stats are derived from the existing `articles` array already available in Dashboard state — no new data fetching needed.

The Dominance tier notice stays as-is (conditionally shown below).

## Technical Details

### File: `src/pages/Dashboard.tsx` (lines 624-657)

Replace the existing GlassCard welcome block with:

```tsx
<GlassCard className="mb-6 sm:mb-8 p-0 relative overflow-hidden" hover={false}>
  {/* Accent glow line */}
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-glow to-primary/50" />
  
  <div className="p-5 sm:p-6 pl-5 sm:pl-10">
    {/* Row 1: Greeting + Tier */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono tracking-wide">
          {timeGreeting}
        </h2>
        <p className="text-white/40 font-mono text-xs sm:text-sm tracking-wide">
          {user?.email}
        </p>
      </div>
      <HoloBadge variant="tier" size="sm">
        {subscriber?.subscription_tier?.toUpperCase() || 'STARTER'}
      </HoloBadge>
    </div>
    
    {/* Row 2: Live content snapshot */}
    <div className="flex flex-wrap gap-4 sm:gap-6 pt-3 border-t border-white/[0.08]">
      <div className="flex items-center gap-2">
        <Clock className="h-3.5 w-3.5 text-amber-400" />
        <span className="text-white/70 font-mono text-xs sm:text-sm">
          <span className="text-white font-semibold">{inProgressCount}</span> In Progress
        </span>
      </div>
      <div className="flex items-center gap-2">
        <AlertCircle className="h-3.5 w-3.5 text-blue-400" />
        <span className="text-white/70 font-mono text-xs sm:text-sm">
          <span className="text-white font-semibold">{pendingCount}</span> Pending
        </span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-white/70 font-mono text-xs sm:text-sm">
          <span className="text-white font-semibold">{completedThisMonth}</span> Completed
        </span>
      </div>
    </div>

    {/* Dominance tier notice (unchanged) */}
    {hasDominance && (
      <div className="mt-4 pt-4 border-t border-white/[0.1]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
          <p className="text-yellow-400/90 font-mono text-sm">
            <strong>Dominance Tier:</strong> 12-hour delivery . Unlimited revisions . Priority support
          </p>
        </div>
      </div>
    )}
  </div>
</GlassCard>
```

### New Variables (add near line 322, using existing data)

```tsx
// Time-based greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
const timeGreeting = getGreeting();

// Quick counts for welcome strip (from existing articles array)
const inProgressCount = articles.filter(a => a.status === 'in_progress').length;
const pendingCount = articles.filter(a => a.status === 'pending').length;
const completedThisMonth = articlesThisMonth.filter(a => a.status === 'completed').length;
```

Note: `inProgressCount` and `pendingCount` are simple counts across all articles (not just this month), giving an accurate "right now" picture. `completedThisMonth` uses the existing `articlesThisMonth` variable.

### No new dependencies or components needed
Everything uses existing imports (HoloBadge, GlassCard, Clock, AlertCircle, CheckCircle icons).
