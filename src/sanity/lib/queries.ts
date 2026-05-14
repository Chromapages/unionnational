/**
 * Unified Sanity query exports.
 *
 * Domain modules (in ./queries/ subdirectory):
 *   blog-queries.ts     - Blog post queries
 *   service-queries.ts  - Services and pricing queries
 *   shop-queries.ts     - Product and checkout queries
 *   team-queries.ts     - Team, about, and contact queries
 *   resource-queries.ts - Playbooks, industries, and resources
 *   shared-queries.ts   - Comparisons, FAQs, testimonials, home, VSL, legal
 *
 * New code should import directly from domain modules:
 *   import { BLOG_POSTS_QUERY } from '@/sanity/lib/queries/blog-queries'
 *
 * This file re-exports all queries for backwards compatibility.
 */
import { defineQuery } from 'next-sanity'

// ─── Blog queries ────────────────────────────────────────────────────────────
import {
    BLOG_SETTINGS_QUERY,
    BLOG_POSTS_QUERY,
    BLOG_RECENT_POSTS_QUERY,
    BLOG_POST_QUERY,
    FEATURED_POSTS_QUERY,
    BLOG_CATEGORIES_QUERY,
    RELATED_POSTS_QUERY,
} from './queries/blog-queries'

// ─── Service queries ─────────────────────────────────────────────────────────
import {
    SERVICES_QUERY,
    SERVICE_QUERY,
    SERVICES_PAGE_QUERY,
    PRICING_TIERS_QUERY,
} from './queries/service-queries'

// ─── Shop queries ─────────────────────────────────────────────────────────────
import {
    SHOP_PAGE_QUERY,
    ALL_PRODUCTS_QUERY,
    PRODUCT_DETAIL_QUERY,
    PRODUCT_SLUGS_QUERY,
} from './queries/shop-queries'

// ─── Book queries ──────────────────────────────────────────────────────────────
import {
    BOOK_LANDING_QUERY,
    BOOK_SLUGS_QUERY,
} from './queries/book-queries'

// ─── Team queries ─────────────────────────────────────────────────────────────
import {
    TEAM_PAGE_QUERY,
    TEAM_MEMBERS_QUERY,
    FOUNDER_QUERY,
    ABOUT_PAGE_QUERY,
    CONTACT_SETTINGS_QUERY,
} from './queries/team-queries'

// ─── Resource queries ─────────────────────────────────────────────────────────
import {
    INDUSTRY_VERTICALS_QUERY,
    INDUSTRY_VERTICAL_QUERY,
    INDUSTRY_VERTICAL_SLUGS_QUERY,
    PLAYBOOKS_QUERY,
    PLAYBOOK_QUERY,
    PLAYBOOK_CHAPTERS_QUERY,
    PLAYBOOK_CHAPTER_QUERY,
    FEATURED_PLAYBOOK_QUERY,
    RESOURCES_PAGE_QUERY,
    RESOURCES_PLAYBOOKS_QUERY,
    RESOURCES_BLOG_POSTS_QUERY,
} from './queries/resource-queries'

// ─── Shared queries ───────────────────────────────────────────────────────────
import {
    COMPARISON_TABLES_QUERY,
    COMPARISON_TABLE_QUERY,
    DEFAULT_COMPARISON_QUERY,
    FAQ_QUERY,
    TESTIMONIALS_QUERY,
    SITE_SETTINGS_QUERY,
    HOME_PAGE_QUERY,
    VSL_PAGE_QUERY,
    LEGAL_PAGE_QUERY,
    FOOTER_LEGAL_PAGES_QUERY,
} from './queries/shared-queries'

// Re-export all queries as named exports
export {
    BLOG_SETTINGS_QUERY,
    BLOG_POSTS_QUERY,
    BLOG_RECENT_POSTS_QUERY,
    BLOG_POST_QUERY,
    FEATURED_POSTS_QUERY,
    BLOG_CATEGORIES_QUERY,
    RELATED_POSTS_QUERY,
    SERVICES_QUERY,
    SERVICE_QUERY,
    SERVICES_PAGE_QUERY,
    PRICING_TIERS_QUERY,
    SHOP_PAGE_QUERY,
    ALL_PRODUCTS_QUERY,
    PRODUCT_DETAIL_QUERY,
    PRODUCT_SLUGS_QUERY,
    BOOK_LANDING_QUERY,
    BOOK_SLUGS_QUERY,
    TEAM_PAGE_QUERY,
    TEAM_MEMBERS_QUERY,
    FOUNDER_QUERY,
    ABOUT_PAGE_QUERY,
    CONTACT_SETTINGS_QUERY,
    INDUSTRY_VERTICALS_QUERY,
    INDUSTRY_VERTICAL_QUERY,
    INDUSTRY_VERTICAL_SLUGS_QUERY,
    PLAYBOOKS_QUERY,
    PLAYBOOK_QUERY,
    PLAYBOOK_CHAPTERS_QUERY,
    PLAYBOOK_CHAPTER_QUERY,
    FEATURED_PLAYBOOK_QUERY,
    RESOURCES_PAGE_QUERY,
    RESOURCES_PLAYBOOKS_QUERY,
    RESOURCES_BLOG_POSTS_QUERY,
    COMPARISON_TABLES_QUERY,
    COMPARISON_TABLE_QUERY,
    DEFAULT_COMPARISON_QUERY,
    FAQ_QUERY,
    TESTIMONIALS_QUERY,
    SITE_SETTINGS_QUERY,
    HOME_PAGE_QUERY,
    VSL_PAGE_QUERY,
    LEGAL_PAGE_QUERY,
    FOOTER_LEGAL_PAGES_QUERY,
}