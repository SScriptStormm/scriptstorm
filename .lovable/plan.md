

## Fix: Dashboard Squares, Missing Squares on Content Brief & Account Settings, Loading Screen Background

### Issues Found

1. **Dashboard squares too dim**: The two floating squares use `border-primary-glow/10` and `border-primary-glow/15` — barely visible. Other pages like About Us, Support, etc. use `border-2 border-primary-glow/30` with `shadow-cyber`, which is the standard.

2. **One square covered**: The squares use `absolute` positioning without `z-10`, so the `fixed inset-0 bg-black/20` overlay sits on top and dims them further. They need `fixed` positioning with a z-index or be placed inside a fixed container above the overlay.

3. **Content Brief page**: Has only blurred circles (`blur-3xl`), no floating squares.

4. **Account Settings page**: Same — only blurred circles and a spinning circle, no floating squares.

5. **Loading Screen too bright**: Uses `bg-gradient-hero` without the `bg-black/20` darkening overlay that the Dashboard and Account Settings apply.

### Changes

**File: `src/pages/Dashboard.tsx` (~lines 576-580)**
Replace the current dim squares with the standard pattern used across the app, wrapped in a fixed container above the overlay:
```jsx
{/* Floating geometric elements */}
<div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
  <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" />
  <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
</div>
```

**File: `src/pages/ContentBrief.tsx` (~lines 14-18)**
Add floating squares alongside the existing blurred circles:
```jsx
<div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
  <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
  <div className="absolute bottom-40 left-10 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl" />
  <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" />
  <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
</div>
```

**File: `src/pages/AccountSettings.tsx` (~lines 267-271)**
Add floating squares to the existing container:
```jsx
<div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
  ...existing blurred circles...
  <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" />
  <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
</div>
```

**File: `src/components/ui/LoadingScreen.tsx` (line 7)**
Add the darkening overlay to match Dashboard/Account Settings:
```jsx
<div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
  {/* Darkening overlay to match main pages */}
  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
  ...rest unchanged...
```

### Summary
- 4 files changed
- Dashboard: brighten squares from `/10`–`/15` to `/25`–`/30` with `border-2` and `shadow-cyber`, fix z-index
- Content Brief + Account Settings: add matching floating squares for consistency
- Loading Screen: add `bg-black/20` overlay to darken background to match app pages

