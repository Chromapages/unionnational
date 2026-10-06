import { createClient } from '@sanity/client';
import { backupForMutation, mutationOptions, reportMutationFailure } from './lib/sanity-mutation.mjs';

// We'll try to use the environment variables if available via sanity exec
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'p1x9y3wz',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  apiVersion: '2026-01-09',
  token: process.env.SANITY_AUTH_TOKEN, // sanity exec provides this
});
const mutation = mutationOptions(process.argv.slice(2), client.config());

async function repair() {
  const plans = [
    { _id: 'siteSettings', content: {
        tagline: { en: 'Tax strategy and financial clarity for business owners who want more.' },
        ctaButtonText: { en: 'Book a Strategy Call' }
    } },
    { _id: 'homePage', content: {
        heroTitle: { en: 'Stop Overpaying the IRS. Build a Smarter Business.' },
        heroSubtitle: { en: 'Proactive tax strategy and fractional CFO leadership for owners who want more than a tax preparer.' },
        ctaTitle: { en: 'Find Out If Your Business Structure Is Costing You Money.' }
    } },
    { _id: 'a12bba28-6091-437d-8956-50ce172bef82', content: {
        certifications: ['Enrolled Agent (EA)', 'Certified Tax Strategist'],
        yearsExperience: 15,
        irsLicenseNumber: 'EA-PENDING'
    } },
  ];
  console.log(JSON.stringify({ mode: mutation.apply ? 'apply' : 'dry-run', projectId: mutation.projectId, dataset: mutation.dataset,
    documents: plans.map((plan) => ({ id: plan._id, fields: Object.keys(plan.content) })) }));
  if (!mutation.apply) return;
  const originals = await client.fetch('*[_id in $ids]', { ids: plans.map((plan) => plan._id) });
  if (originals.length !== plans.length) throw new Error('Required repair documents are missing.');
  await backupForMutation(client, mutation, originals);
  const byId = new Map(originals.map((document) => [document._id, document]));
  let transaction = client.transaction();
  for (const plan of plans) {
    transaction = transaction.patch(plan._id, (patch) => patch.ifRevisionId(byId.get(plan._id)._rev).set(plan.content));
  }
  await transaction.commit();
  console.log(JSON.stringify({ event: 'sanity_repair_applied', documents: plans.length }));
}

repair().catch(reportMutationFailure);
