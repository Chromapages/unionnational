# Service Detail Page Redesign - Implementation Plan

**Goal:** Two-Column Dashboard Layout with sticky sidebar, comparison table, and service-specific FAQ.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Sanity CMS

---

## Task Breakdown

### Task 1: Update Service Schema
- Add `faq` array field (question/answer pairs)
- Add `comparisonPoints` array field

### Task 2: Update SERVICE_QUERY
- Include new fields in query

### Task 3: Create ServiceSidebar
- Sticky sidebar with icon, title, pricing
- Primary CTA + trust badges
- Anchor navigation to sections

### Task 4: Create ComparisonTable
- 4-column: Feature | DIY | Big Firm | Union National
- Checkmarks/X for yes/no values
- Highlight "Union National" column

### Task 5: Create ServiceFAQ
- Accordion component
- Service-specific questions from Sanity

### Task 6: Rebuild ServiceDetailClient
- Shorter hero (60vh)
- Two-column layout
- Integrate all new components

### Task 7: Verification
- Test sticky sidebar
- Test mobile behavior
- Test comparison table
- Test FAQ accordion
