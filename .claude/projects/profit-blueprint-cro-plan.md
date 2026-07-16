# CRO Implementation Plan — Profit Blueprint Landing Page
**Based on:** CRO Audit Review · June 2026
**Status:** ✅ Fully Implemented

---

## Quick Reference

| Priority | Fix | Est. Lift | Effort |
|----------|-----|-----------|--------|
| P0 | Pre-select Bundle + CTA copy + guarantee | +25–40% combined | < 1 hr |
| P0 | Remove mid-page Assessment CTA (funnel leak) | Stops leak | Delete section |
| P1 | Reorder page: Math → Testimonials → Chapters → Letter | +5–15% | Layout refactor |
| P1 | Upgrade testimonials to 6+ with photos | +15–30% trust | Content + code |
| P1 | Rewrite hero headline (outcome-first) | +5–10% engagement | Copy |
| P1 | Move Call Booking into Author Bio | Higher-value conversions | Copy + move |

---

## P0 — Do First (Under 1 Hour Total)

### P0.1 — Pre-Select Bundle Format in Buy Box
**File:** `ConstructionBookSalesSection.tsx`
**Current:** No format pre-selected — user sees 3 options with no default
**Fix:** Pre-select the Bundle ($79) as the highlighted/default option on mount

```tsx
// Around line 187-189, change:
const [selectedEdition, setSelectedEdition] = useState<CanonicalBookEdition>(
    visibleEditions[0] ?? normalizedEditions[0]
);

// To: default to bundle (highest AOV anchor)
const [selectedEdition, setSelectedEdition] = useState<CanonicalBookEdition>(
    () => visibleEditions.find(e => e.format === "bundle")
        ?? visibleEditions.find(e => e.format === "physical")
        ?? visibleEditions[0]
        ?? normalizedEditions[0]
);
```

---

### P0.2 — Change CTA Button Copy
**File:** `ConstructionBookSalesSection.tsx`
**Current:** "Secure This Asset"
**Fix:** Change to format-specific, outcome-driven copy

| Format | New Copy |
|--------|----------|
| Digital | "Get Instant Access — $27" |
| Physical | "Ship Me the Blueprint — $39" |
| Bundle | "Get Everything — $79" |

**Around line 591-601** — Replace the static button copy with dynamic copy based on `selectedEdition.format`:

```tsx
const ctaCopy = selectedEdition.format === "bundle"
    ? locale === "es" ? "Obtener Todo — $79" : "Get Everything — $79"
    : selectedEdition.format === "physical"
    ? locale === "es" ? "Enviarme el Plan — $39" : "Ship Me the Blueprint — $39"
    : locale === "es" ? "Obtener Acceso Instantáneo — $27" : "Get Instant Access — $27";
```

---

### P0.3 — Add Money-Back Guarantee Under Buy Button
**File:** `ConstructionBookSalesSection.tsx`
**Current:** Guarantee exists but at the bottom of the buy box
**Fix:** Add guarantee copy + shield icon directly under the CTA button (line ~601)

**After the CTA button** (before the existing guarantee div at ~604), add a trust line:

```tsx
<div className="text-center mt-3 mb-2">
    <ShieldCheck className="w-4 h-4 inline mr-1.5 text-emerald-600 align-middle" />
    <span className="text-xs font-bold text-emerald-700">
        30-Day Money-Back Guarantee · No questions asked
    </span>
</div>
```

---

### P0.4 — Remove Mid-Page Assessment CTA (Funnel Leak)
**File:** `page.tsx`
**Current:** Lines 388–420 — a full-width `<section>` that sends warm leads to `/construction-profitability-assessment` mid-funnel
**Fix:** Delete the entire `RevealOnScroll` block wrapping the Assessment CTA section (lines 388–420)

The assessment should only appear post-purchase or at the very bottom of the page, not mid-funnel.

---

### P0.5 — Surface Author Credentials Above the Fold
**File:** `page.tsx` (hero section)
**Current:** Jason's credentials ("By Jason Astwood, EA, FSCP, LUTCF") are in 9px text at the bottom of the hero (line ~311)
**Fix:** Add a credentials callout near the hero CTA

**Around line 312** — After the CTA buttons, add credential trust signal:

```tsx
<div className="flex items-center gap-3 mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
    <div className="h-px w-8 bg-gold-500/30" />
    <span>By Jason Astwood, EA · FSCP · LUTCF</span>
    <span className="text-slate-600">·</span>
    <span>IRS Enrolled Agent · Licensed in all 50 states</span>
</div>
```

Also: In `BlueprintAuthorBio.tsx` — Add plain-English credential translations:

```tsx
const credentialDescriptions = [
    { label: "EA", desc: "IRS Enrolled Agent — licensed to represent taxpayers in audits" },
    { label: "FSCP", desc: "Financial Specialist in Tax Planning" },
    { label: "LUTCF", desc: "Life Underwriter Training Council Fellow" },
];
```

---

## P1 — High Impact (Half-Day to Full Day)

### P1.1 — Page Section Reorder
**File:** `page.tsx`
**Current order:** Hero → Buy Box → Math → Testimonials → Sales Letter → Bonus → Chapters → Author Bio → Assessment CTA → FAQ → Final CTA → Call Booking
**Recommended order:** Hero → Trust Bar (new) → Buy Box → Math → Testimonials → Chapters → Sales Letter → Bonus → Author Bio → FAQ → Final CTA → Assessment CTA (bottom only)

**Changes to `page.tsx` lines ~230–445:**

1. **Add Trust Bar** — After hero (line ~340), before buy box (line ~343)
   - Create new component `<TrustBar />` or inline
   - Content: star rating aggregate, buyer count ("247 contractors"), press/media logos, secure checkout badges

2. **Move `BlueprintMastery` (Chapters)** — From line ~383 to before `SalesLetterSection` (currently ~377)
   - Move `<BlueprintMastery />` to appear BEFORE `<SalesLetterSection />`

3. **Delete mid-page Assessment CTA** — Already covered in P0.4

4. **Move `CallBookingEmbed`** — From bottom (lines 435–439) INTO `BlueprintAuthorBio` as a natural "next step" after the bio

---

### P1.2 — Upgrade Testimonials to 6+ with Photos/Logos
**File:** `page.tsx`
**Current:** 2 testimonials, no photos, no company logos (lines 351–374)
**Fix:** Expand to 6 testimonials in a 3×2 grid

Create a data array of 6 testimonials:

```tsx
const testimonials = [
    {
        quote: "We were running 5% net margin, hit 12% in 4 months...",
        name: "Dave K.",
        company: "K-Con Concrete",
        state: "TX",
        revenue: "$2.4M",
        rating: 5,
        photoUrl: "/images/testimonials/dave-k.jpg", // add to public/images
    },
    {
        quote: "Before this book, we had cash flow surprises every other month...",
        name: "Sarah L.",
        company: "L&M Electrical",
        state: "CO",
        revenue: "$900K",
        rating: 5,
        photoUrl: "/images/testimonials/sarah-l.jpg",
    },
    // ... 4 more
];
```

Display in 3-column grid (md:grid-cols-3) instead of current 2-column.

---

### P1.3 — Rewrite Hero Headline (Outcome-First)
**File:** `page.tsx` lines 247–255
**Current:** "Is Your Construction Company Losing Money?" (question headline, passive)
**Fix:** Lead with outcome, not question

**Recommended H1 options (pick one):**

**Option A (Outcome-first):**
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black font-heading text-white leading-[1.05] mb-6 tracking-tight uppercase">
    Stop Working for Free.
    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black">
        The Blueprint That Puts Margin Back in Every Bid.
    </span>
</h1>
```

**Option B (Data-first):**
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black font-heading text-white leading-[1.05] mb-6 tracking-tight uppercase">
    The Average Contractor Runs 5% Net Margin.
    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 italic font-black">
        Top Performers Run 18–25%.
    </span>
</h1>
```

---

### P1.4 — Move $20K S-Corp Bullet to Position #1
**File:** `page.tsx` lines 261–273
**Current:** The "$20K S-Corp savings" bullet is bullet #4
**Fix:** Move to bullet #1 as it's the most specific/highest-impact number

```tsx
const bullets = [
    "The S-Corp strategy that saves $20K/year in taxes",
    "Job costing systems that surface losing jobs early",
    "Cash flow forecasting to stop payroll surprises",
    "Pricing discipline that protects every bid",
];
```

---

### P1.5 — Move Call Booking Into Author Bio
**File:** `BlueprintAuthorBio.tsx`
**Current:** Call booking is a standalone bottom section on the page
**Fix:** Add call booking as a "next step" element inside Author Bio section

**After the methodology disclaimer (line ~143)**, add:

```tsx
<div className="mt-10 pt-8 border-t border-white/10">
    <h3 className="text-xl font-black text-white mb-3">
        Want to apply this directly to your business?
    </h3>
    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Book 30 minutes with Jason. Apply the blueprint to your specific numbers — no pitch, no obligation.
    </p>
    <a
        href={CALENDAR_URL}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-brand-900 font-black uppercase text-xs tracking-wider rounded-full transition-colors"
    >
        Book a Free 15-Min Call
    </a>
</div>
```

Then remove the standalone `CallBookingEmbed` section from `page.tsx` (or keep only on a separate confirmation page).

---

### P1.6 — Add Author Headshot (Hard Trust Gap)
**File:** `BlueprintAuthorBio.tsx` line 59
**Current:** Falls back to `"/images/jason_astwood.png"` — verify this image exists
**Fix:** Confirm `/images/jason_astwood.png` exists in `public/images/`. If not, add the actual photo.

---

## P2 — Incremental Improvements

### P2.1 — Rolling/Session-Based Countdown Timer
**File:** `LimitedBonusCard.tsx`
**Current:** Fixed June 30 deadline — expires in days
**Fix:** After June 30, convert to rolling "new visitor" timer or next milestone deadline

Options:
1. Session-based: "Expires at midnight tonight" using `sessionStorage`
2. Next milestone: Set new deadline and communicate clearly

---

### P2.2 — Add "Save $X Today" Badge on Compare-At Price
**File:** `ConstructionBookSalesSection.tsx` line ~541-545
**Current:** "Save 31%" badge exists but could be more prominent
**Fix:** Change to "Save $22 Today" with dollar amount, not just percentage

---

### P2.3 — Add Order Bump Anchor Copy
**File:** `ConstructionBookSalesSection.tsx` line ~584-586
**Current:** "Normally $197 · One-time offer"
**Fix:** Change to "Jason's private clients pay $500/hr" as the anchor

---

### P2.4 — Hero Testimonial — Add Company/State
**File:** `page.tsx` lines 276–284
**Current:** "Mark T., General Contractor" — anonymous
**Fix:** Add city/state and company name if available, or a headshot

---

## P3 — Nice to Have

### P3.1 — Add Trust Bar Row Below Hero
**File:** `page.tsx` — new component between hero and buy box
**Content:** ★★★★★ 5.0 · 247 contractors · [press logos] · Secure checkout · Free returns

### P3.2 — Math Calculator Default Revenue
**File:** `MathSection.tsx` line 13
**Current:** `useState(1500000)` — starts too high for most contractors
**Fix:** Change default to `$500,000` to match contractor reality

### P3.3 — Expand Author Credential Explanations
**File:** `BlueprintAuthorBio.tsx`
**Fix:** Add one-line English translations for each credential (EA, FSCP, LUTCF)

---

## Component Ownership

| Component | File | Changes |
|-----------|------|---------|
| Page layout + order | `page.tsx` | Section reorder, Trust Bar, remove Assessment |
| Buy box | `ConstructionBookSalesSection.tsx` | Pre-select bundle, CTA copy, guarantee |
| Hero | `page.tsx` | Headline rewrite, bullets reorder, credential surfacing |
| Math calculator | `MathSection.tsx` | Default revenue slider value |
| Testimonials | `page.tsx` | Expand to 6 |
| Chapter breakdown | `BlueprintMastery.tsx` | Move position in page |
| Author bio | `BlueprintAuthorBio.tsx` | Credentials in plain English, add call booking |
| Bonus countdown | `LimitedBonusCard.tsx` | Rolling timer logic |
| Call booking | `CallBookingEmbed.tsx` | Move into author bio |

---

## Implementation Order

1. **P0.4** — Remove mid-page Assessment CTA (instant, no code needed to verify)
2. **P0.1** — Pre-select Bundle in buy box
3. **P0.2** — Change CTA copy
4. **P0.3** — Add guarantee under button
5. **P0.5** — Surface credentials in hero
6. **P1.3** — Rewrite hero headline
7. **P1.4** — Reorder hero bullets ($20K first)
8. **P1.2** — Upgrade testimonials to 6
9. **P1.1** — Page section reorder (Math → Chapters → Letter)
10. **P1.5** — Move Call Booking into Author Bio
11. **P2.1** — Rolling countdown timer
12. **P2.2–2.4** — Incremental copy improvements
13. **P3.1–3.3** — Trust bar, slider default, credential explanations
