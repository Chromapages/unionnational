# Partner Programs Section Redesign - Implementation Plan

**Goal:** Enhanced Partner Program cards with background images, featured badge, and animated stats.

---

## Task Breakdown

### Task 1: Create PartnerProgramCard Component
- Background image with gradient overlay
- "Featured Program" badge
- Animated stat counters
- Props: title, description, icon, accentColor, stats, ctaUrl, backgroundImage, isFeatured

### Task 2: Create AnimatedStat Component
- Count-up animation on scroll
- Uses useInView from framer-motion

### Task 3: Generate Background Images
- Construction site imagery
- Restaurant/kitchen imagery

### Task 4: Update Services Page
- Replace inline JSX with new component
- Add isFeatured to Construction card

### Task 5: Verification
- Test animations
- Test responsive
- Test hover states
