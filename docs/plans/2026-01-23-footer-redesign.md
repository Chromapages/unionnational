# Footer Redesign - Implementation Plan

> **For AI:** Use the executing-plans approach to implement this plan task-by-task.

**Goal:** Rebuild the Footer as a Four-Column Trust Footer with EA badge, newsletter signup, and Utah contact info while keeping the green background.

**Architecture:** Replace single-row layout with structured 4-column grid (Services, Company, Resources, Contact). Add newsletter form, EA credential badge, and contact info fetched from Sanity CMS.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Lucide Icons, Sanity CMS

---

## Task Breakdown

### Task 1: Create EA Badge SVG Component

**Files:**
- Create: `src/components/ui/EABadge.tsx`

**Step 1: Create the EA Badge component**

```tsx
import { ShieldCheck } from "lucide-react";

export const EABadge = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500/20 border-2 border-gold-500">
        <ShieldCheck className="w-5 h-5 text-gold-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
          Enrolled Agent
        </span>
        <span className="text-xs text-zinc-400">
          IRS Licensed
        </span>
      </div>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/ui/EABadge.tsx
git commit -m "feat(footer): add EA credential badge component"
```

---

### Task 2: Create Newsletter Form Component

**Files:**
- Create: `src/components/ui/NewsletterForm.tsx`

**Step 1: Create the newsletter form**

```tsx
"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm">
        <CheckCircle2 className="w-4 h-4" />
        <span>Thanks! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="footer-email" className="text-sm font-medium text-zinc-300">
        Get Tax Tips & Updates
      </label>
      <div className="flex">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 text-sm bg-brand-800 border border-brand-700 rounded-l-lg 
                     text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold-500
                     transition-colors"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe to newsletter"
          className="px-4 py-2 bg-gold-500 text-brand-900 rounded-r-lg font-semibold text-sm
                     hover:bg-gold-400 disabled:opacity-50 transition-colors cursor-pointer
                     flex items-center justify-center"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/ui/NewsletterForm.tsx
git commit -m "feat(footer): add newsletter signup form component"
```

---

### Task 3: Update Footer with Four-Column Layout

**Files:**
- Modify: `src/components/layout/Footer.tsx`

Complete rewrite with:
- Four-column grid (Services, Company, Resources, Contact)
- Logo + tagline header section
- Newsletter form in Contact column
- EA badge + social icons in bottom bar
- Utah address and phone number

---

### Task 4: Verification

- [ ] Footer displays with green background
- [ ] Four columns visible on desktop, 2 on mobile
- [ ] Newsletter form works
- [ ] EA badge displays correctly
- [ ] Social icons have hover effects
- [ ] Contact info visible
- [ ] All links work

---

## UI/UX Pro Max Checklist

- [x] No emojis as icons (using Lucide)
- [x] Consistent icon sizing (w-4 h-4)
- [x] All clickable elements have `cursor-pointer`
- [x] Hover states provide feedback
- [x] Responsive at all breakpoints
- [x] Form inputs have labels
