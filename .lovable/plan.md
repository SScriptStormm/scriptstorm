

## Fix: Center and Enlarge Mobile Tab Icons

On mobile, the icon-only tabs appear small and left-aligned. We'll center them within the `TabsList` and bump up the icon size on mobile, without affecting `sm:` and above.

### Changes in `src/pages/Dashboard.tsx`

1. **TabsList (line 722)**: Add `justify-center w-full` so the tab buttons are centered on mobile.

2. **Each TabsTrigger (lines 723, 728, 733, 739)**: Change icon size from `h-4 w-4` to `h-5 w-5 sm:h-4 sm:w-4` — larger on mobile, normal on tablet/desktop. Also increase mobile padding slightly: `px-3 sm:px-4`.

This is purely a mobile visual tweak — tablet and desktop layouts remain identical.

