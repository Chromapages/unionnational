# Shop Page Redesign - Expanded Implementation Plan

**Goal:** Polished shop experience with category filtering, search, and 3D dimensional product cards.

---

## Task Breakdown

### Task 1: Layout Cleanup
- Remove redundant stats section from `src/app/shop/page.tsx` (Lines 33-52).
- Prepare page for client-side filtering.

### Task 2: Create ShopClient
- Container for `CategoryFilter`, `SearchBar`, and `ProductGrid`.
- State management for filtering logic.

### Task 3: Create CategoryFilter & SearchBar
- Tab selectors for categories.
- Real-time search input with Lucide icon.

### Task 4: Create StarRating
- Reusable UI component for 1-5 star display.

### Task 5: Enhance ProductCard (3D Dimensional)
- Add 3D tilt effect using `framer-motion`.
- Implement dynamic badges (Bestseller, New, Limited).
- Integrate StarRating.
- Add "Quick View" interaction.

### Task 6: Update queries.ts
- Modify `ALL_PRODUCTS_QUERY` to include `category`, `badge`, and `rating`.

### Task 7: Verification
- Test filtering & search.
- Test 3D interactions.
- Test responsive stacking.

---

## New Components

| Component | Purpose |
|-----------|---------|
| `ShopClient` | Filter state manager |
| `CategoryFilter` | Category selection tabs |
| `SearchBar` | Product search input |
| `StarRating` | Visual trust signals |
| `ProductCard` | Premium dimensional card |
