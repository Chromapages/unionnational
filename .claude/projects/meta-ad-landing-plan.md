# CRO Implementation Plan — Meta Ad → Landing Page Deep Audit
**Based on:** Meta Ad → Landing Page Deep CRO Audit · June 2026
**Status:** ✅ Fully Implemented

---

## Pre-Implementation Review: What's Already Done ✅

The following items from the previous plan are already complete:

| Item | Status |
|------|--------|
| P0.1: Pre-select Bundle format in buy box | ✅ Done |
| P0.2: Dynamic CTA copy in buy box | ✅ Done |
| P0.3: Inline guarantee under buy button | ✅ Done |
| P0.4: Remove mid-page Assessment CTA | ✅ Done |
| P0.5: Surface credentials in hero | ✅ Done |
| P1.1: Page section reorder (TrustBar + Chapters before Letter) | ✅ Done |
| P1.2: Upgrade testimonials to 6 in 3-col grid | ✅ Done |
| P1.3: Rewrite hero headline to outcome-first | ✅ Done |
| P1.4: Move $20K S-Corp bullet to #1 | ✅ Done |
| P1.5: Move Call Booking into Author Bio + remove standalone | ✅ Done |
| P2.1: Rolling session-based countdown timer | ✅ Done |
| P2.2: Dollar-amount save badge ("Save $22 Today") | ✅ Done |
| P2.3: Order bump anchor ("Jason's private clients pay $500/hr") | ✅ Done |
| P3.2: Math calculator default revenue → $500K | ✅ Done (audit recommends $750K — update) |

---

## New Items from Meta Ad Audit

### NEW-1 — Mobile Sticky CTA: Add Price
**File:** `MobileStickyCta.tsx`
**Current:** Button says "Get the Blueprint" — no price visible
**Issue:** Mobile visitor has no idea what they're being asked to pay until they scroll past the buy box (~2000px)

**Fix:**
```tsx
// Line 14-15 — add price to the sub-line:
<p className="text-sm font-black text-white leading-tight">
    Get It Now · $27
</p>

// Line 22 — update button text:
Get the Blueprint · $27
```

---

### NEW-2 — Hero Mobile: Swap Column Order (Video First)
**File:** `page.tsx` (hero section)
**Issue:** On mobile, the two-column layout stacks: copy on top, video below. The VSL — the single strongest conversion tool — is completely below the fold on mobile.
**Fix:** Use Tailwind `order-first` on the video column for mobile so video appears above copy

```tsx
{/* Right: Video — order-first on mobile so VSL is above fold */}
<div className="w-full order-first lg:order-last">
```

And the left/copy column gets `order-last lg:order-first`.

---

### NEW-3 — Hero Mobile: Reduce Height
**File:** `page.tsx` (hero section)
**Issue:** Hero is ~1800px on mobile (stacked layout). Pushing the buy box below the fold kills momentum.
**Fix:**
1. Remove the in-hero testimonial card on mobile (`hidden sm:block`)
2. Keep only 2 bullets on mobile (already have 4 — keep the top 2)
3. Remove the second CTA ("Take the Assessment") — already removed in P0.4
4. The single CTA button + 2 bullets + headline fits in ~900px on mobile

Current hero bullets (4 items):
```tsx
[
    "The S-Corp strategy that saves $20K/year in taxes",   // KEEP
    "Job costing systems that surface losing jobs early",    // KEEP
    "Cash flow forecasting to stop payroll surprises",       // DROP on mobile
    "Pricing discipline that protects every bid",            // DROP on mobile
]
```

**On mobile (`hidden sm:block` for bullets 3-4), show only bullets 1-2.**

---

### NEW-4 — Mobile Thumbnail Touch Targets
**File:** `ConstructionBookSalesSection.tsx`
**Issue:** 64×80px tap targets on mobile may be too small for fat thumbs
**Fix:** Increase to `min-w-[72px] min-h-[88px]` on the thumbnail divs (lines 375 and 409 area)

```tsx
className={cn(
    "min-w-[72px] min-h-[88px] w-16 h-20 shrink-0 relative rounded-lg border-2 bg-white overflow-hidden cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-gold-500",
    activeMediaUrl === mediaUrl
        ? "border-gold-500 shadow-md scale-105"
        : "border-slate-200 hover:border-slate-400"
)}
```

(Apply to both the mobile gallery div at ~line 375 and the desktop gallery div at ~line 409)

---

### NEW-5 — Add "Most Popular" Badge on Bundle in Buy Box
**File:** `ConstructionBookSalesSection.tsx`
**Issue:** Bundle is pre-selected but not visually marked as the most popular choice
**Fix:** Add a "Most Popular" badge to the Bundle card (already has a "Best Value" badge — verify it's prominent enough)

Check line ~493 — the bundle card already has:
```tsx
{ed.format === "bundle" && (
    <div className="absolute top-0 right-0 p-1.5 bg-gold-500 text-white rounded-bl-lg text-[9px] font-black uppercase tracking-wider">
        Best Value
    </div>
)}
```

Change "Best Value" to "Most Popular" or keep as-is since it's already there.

---

### NEW-6 — Math Slider Default → $750K
**File:** `MathSection.tsx`
**Current:** `useState(500000)` — was changed from $1.5M to $500K in the previous round
**Audit recommendation:** $750K is the ideal default — most contractors are $500K–$1M, so $750K is the midpoint
**Fix:** Update to `$750,000`

```tsx
const [revenue, setRevenue] = useState(750000);
```

---

### NEW-7 — Shorten Sales Letter by 40%
**File:** `SalesLetterSection.tsx`
**Issue:** ~2,500 words. At $27, the barrier is low — readers need permission, not persuasion.
**Fix:** Cut these sections:
1. "Why This Book Works When Most Don't" — redundant with chapter breakdown
2. "What's Inside" — redundant (chapter breakdown shows this)
3. First author pull-quote — margin data duplicated in math section
4. Second author pull-quote — keep but tighten to 2 lines

**Keep:**
- Opening gap paragraph ("There's a number that lives...")
- Systems diagnosis ("It's Not a Work Ethic Problem. It's a Systems Problem.")
- Margin data (5% vs 15-25%)
- "Picture This: 12 Months From Now"
- Option 1 / Option 2 close

---

### NEW-8 — Fix Author Bio Credential Text (Invisible on Dark)
**File:** `BlueprintAuthorBio.tsx`
**Issue:** `text-slate-600` on dark `#0B1210` background is unreadable — looks like placeholder text
**Fix:** Change to `text-slate-400` for better readability on the dark background

Around line ~140 (the "Methodology" disclaimer):
```tsx
<p className="text-slate-400 text-[10px] sm:text-[11px] leading-relaxed max-w-xl">
```

Also: The credential description line added in the previous round (line ~101):
```tsx
<p className="text-slate-600 text-[10px] leading-relaxed max-w-sm">
```
Should be `text-slate-400` to be readable on the dark background.

---

### NEW-9 — Add 2 FAQ Questions
**File:** `BlueprintFAQ.tsx`
**Issue:** Missing two high-value objections: time and "not a numbers person"
**Fix:** Add to the `faqs` array:

```tsx
{
    q: "What if I don't have time to read it?",
    a: "The book is designed to be read in one Saturday morning — about 3 hours. The implementation checklists at the end of each chapter take 15 minutes each to apply. Most contractors start with Chapter 2 (Pricing) because it gives them an immediate win on their next bid.",
},
{
    q: "I'm not a 'numbers person' — is this too technical?",
    a: "Every formula in the book comes with a step-by-step example from a real contractor. If you can read a job estimate, you can follow this book. The systems are designed to be implemented without a CPA or CFO — just you, the book, and your numbers.",
},
```

---

## Implementation Order

1. **NEW-1** — Mobile sticky CTA add price (5 min)
2. **NEW-6** — Math default $750K (1 min)
3. **NEW-4** — Thumbnail touch targets (2 min)
4. **NEW-9** — Add 2 FAQ items (5 min)
5. **NEW-8** — Fix author bio credential text color (2 min)
6. **NEW-7** — Shorten sales letter (30-60 min)
7. **NEW-2** — Hero mobile video column order swap (10 min)
8. **NEW-3** — Hero mobile height reduction (10 min)
9. **NEW-5** — Verify "Most Popular" badge on Bundle (2 min)

---

## Summary of Changes by File

| File | Changes |
|------|---------|
| `MobileStickyCta.tsx` | Add "$27" price to sticky bar |
| `MathSection.tsx` | Default revenue: $750K |
| `ConstructionBookSalesSection.tsx` | Larger touch targets on thumbnails |
| `BlueprintFAQ.tsx` | +2 FAQ items |
| `BlueprintAuthorBio.tsx` | Fix credential text color on dark bg |
| `SalesLetterSection.tsx` | Cut 40% (remove redundant sections) |
| `page.tsx` | Hero mobile video order-first + reduce bullets on mobile |
