import { createClient } from '@sanity/client';

// We'll try to use the environment variables if available via sanity exec
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'p1x9y3wz',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  apiVersion: '2026-01-09',
  token: process.env.SANITY_AUTH_TOKEN, // sanity exec provides this
});

async function repair() {
  console.log('Starting Live Content Repair...');

  try {
    // 1. Repair Site Settings
    console.log('Repairing siteSettings...');
    await client
      .patch('siteSettings')
      .set({
        tagline: { en: 'Tax strategy and financial clarity for business owners who want more.' },
        ctaButtonText: { en: 'Book a Strategy Call' }
      })
      .commit();

    // 2. Repair Home Page
    console.log('Repairing homePage...');
    await client
      .patch('homePage')
      .set({
        heroTitle: { en: 'Stop Overpaying the IRS. Build a Smarter Business.' },
        heroSubtitle: { en: 'Proactive tax strategy and fractional CFO leadership for owners who want more than a tax preparer.' },
        ctaTitle: { en: 'Find Out If Your Business Structure Is Costing You Money.' }
      })
      .commit();

    // 3. Patch Lead Advisor (Jason Astwood)
    console.log('Repairing Lead Advisor credentials...');
    await client
      .patch('a12bba28-6091-437d-8956-50ce172bef82')
      .set({
        certifications: ['Enrolled Agent (EA)', 'Certified Tax Strategist'],
        yearsExperience: 15,
        irsLicenseNumber: 'EA-PENDING'
      })
      .commit();

    console.log('Repair Complete!');
  } catch (err) {
    console.error('Repair failed:', err);
  }
}

repair();
