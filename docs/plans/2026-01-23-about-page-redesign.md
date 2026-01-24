# About Page Redesign - Expanded Implementation Plan

**Goal:** Enhanced About page with company timeline, trust credentials bar, client logos, and premium visual polish.

---

## New Components to Create

### 1. CompanyTimeline
- Horizontal timeline (desktop), vertical (mobile)
- Animated milestone nodes with year labels
- Gold accent connecting line

### 2. TrustCredentialsBar
- Dark bar with credential badges
- EA, MBA, FSCP, LUTCF badges
- Icon + label + sublabel format

### 3. ClientLogosSection
- "Trusted By" header
- Grayscale logos, color on hover
- Optional marquee for many logos

---

## Enhancements to Existing Sections

### Leadership Section
- Larger photo with premium border
- "Watch Video" CTA button
- Credential badges row below name
- Enhanced EA explainer card

### Values Section
- Larger gradient-bg icons
- Hover lift + shadow + glow
- Optional number indicators (01, 02, 03)

### Origin Story Section
- Parallax image effect
- Animated gradient background
- Enhanced quote styling

---

## Updated Page Order

1. AboutHero ✅
2. MissionStatement ✅
3. AnimatedStat grid ✅
4. **CompanyTimeline** (NEW)
5. Leadership (ENHANCED)
6. **TrustCredentialsBar** (NEW)
7. Values (ENHANCED)
8. Origin Story (ENHANCED)
9. **ClientLogosSection** (NEW)
10. CTASection ✅

---

## Sanity Schema Updates (Optional)

- `timeline` array (year, title, description)
- `clientLogos` array (name, logo)
- `founderVideoUrl` (url)

---

## Verification

- [ ] Timeline animates on scroll
- [ ] Credentials bar displays correctly
- [ ] Values cards have hover effects
- [ ] Client logos section works
- [ ] Test responsive behavior
- [ ] Run lint and build checks
