# Mobile-First App-Like Experience Implementation

## Overview
This implementation transforms the Union National Tax website into a mobile-first, app-like experience with native fintech aesthetics similar to Robinhood, Chime, or Wealthfront.

## Key Features Implemented

### 1. Fixed Bottom Tab Navigation (T1)
**File:** `src/components/ui/MobileTabBar.tsx`

- 5 primary destinations: Home, Services, Calculator, Contact, More
- Fixed bottom position with safe area handling
- Hidden when keyboard opens to prevent UI conflicts
- Auto-hides on scroll down, reappears on scroll up
- "More" sheet opens with secondary navigation items
- Touch targets minimum 48px for optimal accessibility

### 2. Touch-Optimized Form Inputs (T5)
**File:** `src/components/ui/MobileInput.tsx`

Components:
- `MobileInput`: Touch-optimized text inputs with floating labels
- `MobileTextarea`: Mobile-friendly textarea
- `MobileSelect`: Custom select with mobile keyboard optimization

Features:
- `inputmode` attributes for numeric keyboards
- 48px minimum touch targets
- 16px font size to prevent iOS zoom
- Floating labels for space efficiency
- Real-time validation with visual feedback
- Tap feedback animations

### 3. Sheet Modal System (T3)
**File:** `src/components/ui/BottomSheet.tsx`

Components:
- `BottomSheet`: Full-featured bottom sheet with drag-to-close
- `QuickSheet`: Simplified sheet for quick actions

Features:
- Smooth spring animations
- Swipe gesture to close
- Backdrop blur effect
- Safe area padding for iPhone notch
- Focus trap for accessibility
- Body scroll lock when open

### 4. Swipeable Carousels
**File:** `src/components/ui/SwipeableCarousel.tsx`

Features:
- Embla Carousel integration
- Touch-friendly swipe gestures
- Auto-play support
- Dot navigation
- Drag-free scrolling option
- Mobile swipe hints

### 5. Safe Area Handling (T2)
**Files:** 
- `src/components/ui/SafeAreaProvider.tsx`
- `src/styles/globals.css` (mobile tokens)

CSS Utilities Added:
```css
.safe-area-top      /* env(safe-area-inset-top) */
.safe-area-bottom   /* env(safe-area-inset-bottom) */
.safe-area-x        /* Left/right insets */
.touch-target       /* 44px minimum */
.touch-target-pref  /* 48px preferred */
.input-mobile      /* iOS zoom prevention */
.no-tap-highlight  /* Native app feel */
```

### 6. Updated Components

#### FloatingNavbar (T4)
**File:** `src/components/layout/FloatingNavbar.tsx`
- Removed hamburger menu on mobile (replaced with bottom tabs)
- Mobile CTA button for quick access to "Book a Call"
- Compact header (56px on mobile)

#### VideoHero (T6)
**File:** `src/components/home/VideoHero.tsx`
- Full-bleed mobile viewport (100dvh)
- Touch-optimized input with `inputMode="decimal"`
- Enhanced touch targets on buttons (48px min)

#### TestimonialsSection (T14)
**File:** `src/components/home/TestimonialsSection.tsx`
- Swipeable carousel on mobile
- Marquee scroll maintained on desktop
- Touch-friendly card interactions

## Integration Guide

### Step 1: Add SafeAreaProvider
Wrap your root layout with the SafeAreaProvider:

```tsx
// src/app/[locale]/layout.tsx
import { SafeAreaProvider } from "@/components/ui/SafeAreaProvider";

export default function Layout({ children }) {
  return (
    <SafeAreaProvider>
      {children}
    </SafeAreaProvider>
  );
}
```

### Step 2: Add MobileTabBar
Include the MobileTabBar in your layout:

```tsx
// src/app/[locale]/layout.tsx or page component
import { MobileTabBar } from "@/components/ui/MobileTabBar";

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <MobileTabBar />
    </>
  );
}
```

### Step 3: Update Translations
Add mobile-specific translation keys:

```json
// messages/en.json
{
  "Header": {
    "home": "Home",
    "services": "Services",
    "calculator": "Calc",
    "contact": "Contact",
    "more": "More",
    "moreOptions": "More Options",
    "bookCall": "Book a Call",
    "shop": "Shop",
    "healthCheck": "Health",
    "about": "About",
    "team": "Team",
    "blog": "Blog",
    "newsletter": "Newsletter"
  }
}
```

### Step 4: Use MobileInput Components
Replace standard inputs with mobile-optimized versions:

```tsx
import { MobileInput, MobileTextarea, MobileSelect } from "@/components/ui/MobileInput";

// Text input
<MobileInput
  label="Email"
  type="email"
  inputMode="email"
  error={errors.email}
  icon={<Mail className="w-5 h-5" />}
/>

// Textarea
<MobileTextarea
  label="Message"
  rows={4}
  error={errors.message}
/>

// Select
<MobileSelect
  label="Service Type"
  options={[
    { value: "tax", label: "Tax Preparation" },
    { value: "cfo", label: "Fractional CFO" }
  ]}
/>
```

## Touch Standards

| Element | Minimum Size | Preferred Size | Spacing |
|---------|-------------|----------------|---------|
| Touch targets | 44×44px | 48×48px | 8px+ |
| Input height | 44px | 48px | - |
| Button height | 44px | 48px | 12px+ |
| Tab bar items | 44px | 48px | Equal |

## Accessibility

- All interactive elements have minimum 44px touch targets
- Focus visible states maintained
- Screen reader labels on all icon buttons
- Reduced motion support via `prefers-reduced-motion`
- Keyboard navigation support in modals

## Mobile Design Tokens

```css
/* In globals.css */
--color-primary: #F59E0B    /* CTAs, active states */
--color-secondary: #FBBF24  /* Highlights */
--color-cta: #8B5CF6        /* Book Call buttons */
--color-bg-dark: #0F172A    /* Dark mode */
--color-text: #F8FAFC       /* Primary text */
```

## Testing Checklist

- [ ] Tab bar navigation works on iPhone 15
- [ ] Safe areas visible on notch devices
- [ ] Touch targets easy to tap
- [ ] Horizontal swipe works smoothly
- [ ] Form keyboards appropriate per field type
- [ ] Sheet modals swipe to close
- [ ] No zoom on iOS input focus
- [ ] Landscape mode displays correctly
- [ ] Bottom tabs hidden when keyboard opens

## Target Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Mobile Score | ≥ 90 |
| Touch Target Pass Rate | 100% |
| FCP on 3G | < 2.5s |
| CLS | < 0.1 |

## Dependencies

Already installed:
- `embla-carousel-react` ✅
- `framer-motion` ✅

No additional installations required.

## Browser Support

- iOS Safari 14+
- Chrome Android 90+
- Safari macOS 14+
- Chrome Desktop 90+

## Future Enhancements

1. PWA support (add to homescreen)
2. Pull-to-refresh
3. Haptic feedback (vibration API)
4. Gesture navigation edge cases
5. Offline state handling
