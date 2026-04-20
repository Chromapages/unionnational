# Union National Tax — Lead Magnet Strategy

## Purpose

This document defines the lead magnet strategy for Union National Tax based on:

- the firm’s advisory-led positioning
- the existing books and authority assets
- the website offer architecture
- the website service hierarchy
- the current tech stack of **Next.js frontend + GoHighLevel (GHL) CRM/automation**

The goal is to create a lead magnet system that:

1. segments visitors by need
2. routes them into the correct automation path
3. qualifies them for the correct service offer
4. supports an advisory-led premium brand position

---

# Core Strategy

Union National Tax should **not** rely on random freebies or one generic PDF.

The lead magnet system should be directly tied to the firm’s three main website paths:

- Reduce Taxes
- Gain Financial Control
- Industry-Specific Advisory

This keeps the strategy aligned with the broader offer architecture.

---

# Lead Magnet Objectives

Each lead magnet should do at least one of the following:

- create immediate perceived value
- diagnose a business owner’s problem
- segment the lead by intent or niche
- qualify the lead for a specific offer
- move the lead into a tailored GHL nurture workflow

The lead magnet system should attract:

- business owners
- self-employed professionals
- growth-minded operators
- owners who want strategy, not just compliance
- people who are likely overpaying in taxes or operating without strong financial visibility

It should **not** be designed primarily for:

- low-intent tax prep shoppers
- refund-seekers
- bargain hunters
- generic “I just need someone cheap” leads

---

# Core Lead Magnet Stack

## 1. Primary Lead Magnet — S-Corp Savings Estimator

This should be the main broad-market lead magnet.

### Why it should lead
- easy to understand
- tied directly to tax savings
- high perceived value
- naturally qualifies interest
- strong bridge into the S-Corp Tax Advantage Program

### Best-fit audience
- owner-operators
- self-employed professionals
- LLC owners
- service businesses
- businesses in the “might need an S-Corp” stage

### Primary goal
Move the lead toward:
- S-Corp Tax Strategy
- Tax Planning Consulting
- Discovery Evaluation

---

## 2. Secondary Lead Magnet — Proactive CFO Assessment

This should be the main lead magnet for the financial control path.

### Why it matters
Many owners are not just trying to save taxes. They are trying to understand:
- why cash flow feels tight
- why they feel unclear on their numbers
- why profit does not feel visible
- why the business depends on them too heavily

### Best-fit audience
- growing business owners
- owners with bookkeeping issues
- owners with weak KPI visibility
- operators who may need CFO support

### Primary goal
Move the lead toward:
- Fractional CFO Services
- Strategic Bookkeeping
- Tax Planning Consulting
- Discovery Evaluation

---

## 3. Construction-Specific Lead Magnet

### Recommended format
Construction Profitability Assessment

### Focus areas
- job costing discipline
- margin visibility
- estimating accuracy
- cash flow compression
- project financial control

### Primary goal
Move the lead toward:
- Construction CFO Partnership
- niche-specific consultation
- tailored construction nurture

---

## 4. Restaurant-Specific Lead Magnet

### Recommended format
Restaurant Profit Leak Assessment

### Focus areas
- prime cost
- labor control
- food cost discipline
- margin visibility
- weekly financial rhythm

### Primary goal
Move the lead toward:
- Restaurant CFO Partnership
- restaurant-specific consultation
- tailored restaurant nurture

---

## 5. Authority Asset Lead Magnets — Books

The books should be used as authority-based lead magnets, but not as the only lead magnet system.

### Best use cases
- follow-up nurture asset after a calculator or assessment
- downloadable guide on resource pages
- retargeting offer
- trust builder for warm leads
- deeper education after form submission

### Recommended use
The books should support conversion, not replace a segmented lead magnet system.

---

# How the Books Map to the Lead Magnet System

## The S-Corp Playbook
Supports:
- S-Corp strategy
- tax savings conversations
- entity optimization
- compensation planning

## The Proactive CFO Solution
Supports:
- CFO authority
- financial clarity
- cash flow education
- strategic business-owner nurture

## The Money-Making Blueprint for Construction Companies
Supports:
- construction niche positioning
- contractor-specific financial pain points
- construction nurture sequences

## The Restaurant Profit Blueprint
Supports:
- restaurant niche positioning
- restaurant owner pain points
- restaurant nurture sequences

## Why the Rich Don’t Pay Taxes — And Why Real Estate Is the Reason
Supports:
- higher-end tax strategy
- wealth-building positioning
- real estate / advanced strategy conversations

## Unlocking Business Success with the 3 M’s
Supports:
- broad SMB authority
- educational nurture
- business-owner trust building

---

# Funnel Strategy

## Funnel A — Tax Savings Path

### Traffic sources
- homepage
- S-Corp service page
- Google Ads / Meta Ads
- organic search
- social content

### Lead magnet
S-Corp Savings Estimator

### Next step
- results page
- lead capture form
- GHL workflow entry
- invitation to book Discovery Evaluation

### Offer path
- S-Corp Tax Strategy
- Tax Planning Consulting
- Strategic Bookkeeping
- Fractional CFO upsell

---

## Funnel B — Financial Control Path

### Traffic sources
- Fractional CFO page
- Strategic Bookkeeping page
- financial thought leadership content
- educational content about cash flow, clarity, and profit

### Lead magnet
Proactive CFO Assessment

### Next step
- score or diagnostic result
- lead capture form
- GHL workflow entry
- CTA to book a financial clarity call or Discovery Evaluation

### Offer path
- Fractional CFO Services
- Strategic Bookkeeping
- Tax Planning Consulting

---

## Funnel C — Industry-Specific Path

### Traffic sources
- industry pages
- niche content
- niche organic search
- targeted ads
- industry-specific social content

### Lead magnet
- Construction Profitability Assessment
- Restaurant Profit Leak Assessment

### Next step
- segment by niche
- pass to GHL
- route to niche nurture sequence
- CTA to book industry-specific consultation

### Offer path
- Construction CFO Partnership
- Restaurant CFO Partnership

---

# Tech Stack Strategy — Next.js + GHL

Because the public website is a **Next.js web app**, GHL should not be the public-facing website frontend.

## Recommended stack split

### Next.js should handle:
- public website pages
- SEO
- branding and design experience
- calculators and assessments UI
- custom interactive lead magnet experiences
- resource pages and content pages

### GHL should handle:
- CRM records
- form intake or webhook intake
- tagging
- workflows
- email nurture
- SMS nurture
- pipeline stages
- calendar booking
- follow-up automation

---

# Recommended GHL Data Model

For each lead magnet submission, pass the following into GHL when possible:

- first name
- last name
- email
- phone
- business name
- website URL
- business type / niche
- annual revenue band
- lead magnet source
- page source
- lead magnet type
- primary pain point
- primary service interest
- assessment score or calculator estimate
- ad source / campaign if applicable

---

# Recommended GHL Tags

## Lead magnet tags
- LM_SCorp
- LM_CFO
- LM_Construction
- LM_Restaurant
- LM_Book_SCorp
- LM_Book_CFO
- LM_Book_Construction
- LM_Book_Restaurant
- LM_Book_Wealth
- LM_Book_3Ms

## Interest tags
- Interest_TaxPlanning
- Interest_SCorp
- Interest_CFO
- Interest_Bookkeeping
- Interest_Construction
- Interest_Restaurant
- Interest_WealthStrategy

## Qualification tags
- Qualified_HighIntent
- Qualified_MidMarket
- Qualified_HighRevenue
- Qualified_BookkeepingNeed
- Qualified_CFOFit

---

# Recommended Workflow Logic

## Workflow 1 — S-Corp Estimator Leads
Sequence focus:
- what S-Corp savings actually mean
- who qualifies
- common mistakes
- salary vs. distributions
- why structure matters
- CTA to book a review

## Workflow 2 — Proactive CFO Assessment Leads
Sequence focus:
- why owners feel unclear on their numbers
- cash flow vs. profit
- why bookkeeping alone is not enough
- what proactive CFO support actually does
- CTA to book evaluation

## Workflow 3 — Construction Leads
Sequence focus:
- margin leaks
- job costing
- project cash flow
- estimating discipline
- contractor-specific financial control
- CTA to book construction consultation

## Workflow 4 — Restaurant Leads
Sequence focus:
- prime cost
- labor discipline
- food cost leakage
- weekly financial rhythm
- CTA to book restaurant consultation

## Workflow 5 — Book Download Leads
Sequence focus:
- educational trust building
- authority reinforcement
- transition from content to service
- CTA to assessment or Discovery Evaluation

---

# Recommended Lead Magnet Hierarchy

If implementing in phases, prioritize in this order:

## Phase 1
1. S-Corp Savings Estimator
2. Proactive CFO Assessment

## Phase 2
3. Construction Profitability Assessment
4. Restaurant Profit Leak Assessment

## Phase 3
5. Book landing pages
6. Book download nurture flows
7. Advanced wealth / investor lead magnets

---

# Landing Page Recommendations

Each major lead magnet should have its own landing page.

## Required landing pages
- S-Corp Savings Estimator page
- Proactive CFO Assessment page
- Construction Profitability Assessment page
- Restaurant Profit Leak Assessment page

## Optional supporting landing pages
- The S-Corp Playbook
- The Proactive CFO Solution
- Construction book page
- Restaurant book page
- Wealth strategy book page
- 3 M’s book page

Each landing page should include:
- pain-driven headline
- short explanation of what the lead magnet helps solve
- who it is for
- simple intake form
- trust elements
- CTA
- clear next step

---

# What Not To Do

Do not:
- rely on one generic “contact us” magnet
- make the books the only lead magnet system
- send every lead into the same nurture sequence
- lead with tax prep
- create a low-intent generic PDF funnel
- treat all business owners the same in automation

That would weaken the advisory-led positioning and reduce lead quality.

---

# Strategic Summary

The lead magnet strategy for Union National Tax should be:

**interactive first, segmented second, authority-backed third**

In plain English:
- use calculators and assessments to capture real intent
- use Next.js to deliver a premium front-end experience
- use GHL to segment, nurture, and automate follow-up
- use the books to deepen trust and support conversion
- route every lead into the correct service lane based on actual need

This creates a much stronger system than simply offering a generic downloadable guide.

The lead magnet system should ultimately feel like this:

**Find your problem → get insight → enter the right workflow → book the right next step**
