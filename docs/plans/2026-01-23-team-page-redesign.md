# Team Page Redesign - Implementation Plan

**Goal:** Executive Team Showcase with dark hero, trust metrics, enhanced founder section, interactive team cards, and values section.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Sanity CMS

---

## Task Breakdown

### Task 1: Create Dark Hero Section
- Full-width `bg-brand-900`
- Trust metrics: EA Badge, Years, Clients

### Task 2: Create Enhanced Founder Section
- Split layout with large photo
- Quote/mission + EA badge

### Task 3: Create Interactive Team Cards
- Hover scale + shadow
- Click → Modal with full bio

### Task 4: Create Values Section
- 3 pillars: Precision, Integrity, Partnership

### Task 5: Enhance Hiring Section
- Glassmorphism background

### Task 6: Update Page Layout
- Integrate all sections

### Task 7: Verification
- Test modal, responsive, accessibility

---

## New Components

| Component | Purpose |
|-----------|---------|
| `TeamHero.tsx` | Dark hero with trust metrics |
| `FounderSpotlight.tsx` | Enhanced founder section |
| `TeamMemberCard.tsx` | Interactive team card |
| `TeamMemberModal.tsx` | Full bio modal overlay |
| `ValuesSection.tsx` | 3 value pillars |
