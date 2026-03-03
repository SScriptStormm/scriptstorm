

## Fix Account Settings Background & Back Button Consistency

### Background Fix
The Account Settings page (`min-h-screen bg-gradient-hero`) is missing two properties the Dashboard has:
- `bg-fixed` — prevents gradient from shifting on scroll
- A `fixed inset-0 bg-black/20 pointer-events-none` overlay — darkens the background to match

**Change in `src/pages/AccountSettings.tsx`:**
1. Line 254: Add `bg-fixed` to the outer div: `"min-h-screen bg-gradient-hero bg-fixed relative overflow-hidden"`
2. After line 261 (after the neural network overlay div): Add `<div className="fixed inset-0 bg-black/20 pointer-events-none" />`

### Back to Dashboard Button Restyle
Replace the plain ghost button with a bordered glassmorphic style matching the dashboard header buttons (SYNC/ACCOUNT style).

**Change in `src/pages/AccountSettings.tsx`:**
Lines 273-280: Replace the current Button with:
```tsx
<Button
  onClick={() => navigate("/dashboard")}
  size="sm"
  className="mb-6 bg-primary/10 backdrop-blur-sm text-primary-glow border border-primary-glow/40 hover:border-primary-glow hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(221_83%_53%/0.3)] font-mono text-xs sm:text-sm transition-all duration-300 gap-2"
>
  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
  BACK TO DASHBOARD
</Button>
```

This gives it the same blue-bordered, glowing hover style as the dashboard's SYNC button — uppercase mono text, primary glow border, and hover effects. Two changes, one file.

