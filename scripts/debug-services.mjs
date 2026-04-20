import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'p1x9y3wz',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-01-09',
});

async function debug() {
  console.log('Querying all services...');
  try {
    const services = await client.fetch('*[_type == "service"]{ title, slug, impactGoal, keyBenefit, targetAudience, eligibility }');
    console.log(JSON.stringify(services, null, 2));
  } catch (err) {
    console.error('Query failed:', err);
  }
}

debug();
