# Services Page Redesign - Implementation Plan

**Goal:** Rebuild the Services page as a "Fintech Hub" with sticky navigation, category filtering, process timeline, and pricing indicators.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Sanity CMS

---

## Task Breakdown

### Task 1: Add Category & Pricing Fields to Service Schema
- Add `category` field (tax, bookkeeping, cfo)
- Add `startingPrice` field
- Update SERVICES_QUERY

### Task 2: Create Sticky Service Navigation
- Component: `StickyServiceNav.tsx`
- Appears after scrolling past hero
- Highlights active section

### Task 3: Create Service Filter Bar
- Component: `ServiceFilterBar.tsx`
- Filter buttons: All, Tax, Bookkeeping, CFO

### Task 4: Create Process Timeline
- Component: `ProcessTimeline.tsx`
- 4 steps: Discovery → Strategy → Implementation → Review

### Task 5: Create Services Client Component
- Component: `ServicesClient.tsx`
- Handles filter state
- Displays pricing indicators on cards

### Task 6: Update Services Page
- Import new components
- Add section IDs for sticky nav
- Integrate timeline and filters

### Task 7: Verification
- Test all interactions
- Responsive testing
- Lint and build checks
