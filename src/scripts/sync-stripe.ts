
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'p1x9y3wz',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_AUTH_TOKEN, // Needs to be provided by user
});

const STRIPE_DATA = [
  {
    sanitySlug: 'the-s-corp-playbook',
    editions: [
      { name: 'Bundle (Digital + Print)', price: 59, format: 'bundle', productId: 'prod_PDfDAfBryQ3f8Q', priceId: 'price_1T2eUuBBqB7ETKuVwVpzqIjj', description: 'Hardcover book + Digital PDF + Bonuses.' },
      { name: 'Hardcover', price: 39, format: 'physical', productId: 'prod_UNR9UWANshQiLI', priceId: 'price_1TOlUKBBqB7ETKuVbUqYYNhT', description: 'Premium hardcover edition.' },
      { name: 'Digital PDF', price: 29, format: 'digital', productId: 'prod_UNA6Ea65NHlAcQ', priceId: 'price_1TOlaABBqB7ETKuVEsvwS7ce', description: 'Instant digital download.' },
      { name: 'Audiobook', price: 27, format: 'audio', productId: 'prod_QpCAhI2VbFIJ2Y', priceId: 'price_1T2eTHBBqB7ETKuVe8Q9fuyw', description: 'Full audiobook edition.' }
    ]
  },
  {
    sanitySlug: 'the-3m-s-to-freedom',
    editions: [
      { name: 'Bundle (Digital + Print)', price: 59, format: 'bundle', productId: 'prod_UNSA6kl0euO5Ai', priceId: 'price_1TOlKJBBqB7ETKuVlo3eefBK', description: 'Hardcover book + Digital PDF + Bonuses.' },
      { name: 'Hardcover', price: 39, format: 'physical', productId: 'prod_U0HdtEzQy1lS5g', priceId: 'price_1T2e5lBBqB7ETKuVIuDEEQAN', description: 'Premium hardcover edition.' },
      { name: 'Digital PDF', price: 29, format: 'digital', productId: 'prod_UNRi4QzpJAHM7r', priceId: 'price_1TOlRkBBqB7ETKuVW6m7Nc30', description: 'Instant digital download.' },
      { name: 'Audiobook', price: 27, format: 'audio', productId: 'prod_U0HdtEzQy1lS5g', priceId: 'price_1T2dt6BBqB7ETKuVTGALpDEc', description: 'Full audiobook edition.' }
    ]
  },
  {
    sanitySlug: 'the-proactive-cfo-solution',
    editions: [
      { name: 'Bundle (Digital + Print)', price: 59, format: 'bundle', productId: 'prod_UNS6HQVBAr7sp4', priceId: 'price_1TOlMfBBqB7ETKuVLnrLGW1F', description: 'Hardcover book + Digital PDF + Bonuses.' },
      { name: 'Hardcover', price: 39, format: 'physical', productId: 'prod_U0HjhvumO7Vr7D', priceId: 'price_1T2dsBBBqB7ETKuVAr3xFdJQ', description: 'Premium hardcover edition.' },
      { name: 'Digital PDF', price: 29, format: 'digital', productId: 'prod_UNRxEQdmMdwP3X', priceId: 'price_1TOlPkBBqB7ETKuV28aBachq', description: 'Instant digital download.' },
      { name: 'Audiobook', price: 27, format: 'audio', productId: 'prod_U0Hmg7MtuD0C1O', priceId: 'price_1T2dqbBBqB7ETKuVqvYCiuoB', description: 'Full audiobook edition.' }
    ]
  },
  {
    sanitySlug: 'the-restaurant-profit-blueprint',
    editions: [
      { name: 'Bundle (Digital + Print)', price: 59, format: 'bundle', productId: 'prod_UNSE97UTUxZsnM', priceId: 'price_1TOlHqBBqB7ETKuVh943I21w', description: 'Hardcover book + Digital PDF + Bonuses.' },
      { name: 'Hardcover', price: 39, format: 'physical', productId: 'prod_U0HrokUdTp8jwt', priceId: 'price_1T2dpkBBqB7ETKuVPue0kV6m', description: 'Premium hardcover edition.' },
      { name: 'Digital PDF', price: 29, format: 'digital', productId: 'prod_UNSQIU4W2dtvBH', priceId: 'price_1TOlFJBBqB7ETKuVLxMO1ZR4', description: 'Instant digital download.' },
      { name: 'Audiobook', price: 27, format: 'audio', productId: 'prod_U0HuuXe7zAj0Qw', priceId: 'price_1T2do1BBqB7ETKuVhTdLQSQX', description: 'Full audiobook edition.' }
    ]
  },
  {
    sanitySlug: 'the-money-making-blueprint-for-construction-companies',
    editions: [
      { name: 'Bundle (Digital + Print)', price: 59, format: 'bundle', productId: 'prod_UNRJ66222da3Bv', priceId: 'price_1TOlSoBBqB7ETKuVtDfASqwk', description: 'Hardcover book + Digital PDF + Bonuses.' },
      { name: 'Hardcover', price: 39, format: 'physical', productId: 'prod_U0I59FqHVgmIKe', priceId: 'price_1T2cpuBBqB7ETKuVPA63LBVd', description: 'Premium hardcover edition.' },
      { name: 'Digital PDF', price: 29, format: 'digital', productId: 'prod_UNAG4gj0lRYIGj', priceId: 'price_1TOlYSBBqB7ETKuVhVlOdPk8', description: 'Instant digital download.' },
      { name: 'Audiobook', price: 27, format: 'audio', productId: 'prod_U0I8eAAAHeCBBA', priceId: 'price_1T2dAkBBqB7ETKuVZCP3OsnA', description: 'Full audiobook edition.' }
    ]
  },
  {
    sanitySlug: 'why-the-rich-dont-pay-taxes',
    editions: [
      { name: 'Bundle (Digital + Print)', price: 59, format: 'bundle', productId: 'prod_U0Hya51fC8YPfQ', priceId: 'price_1T2dlZBBqB7ETKuV8vKizDIQ', description: 'Hardcover book + Digital PDF + Bonuses.' },
      { name: 'Hardcover', price: 39, format: 'physical', productId: 'prod_UNSwEGaexybXSx', priceId: 'price_1TOl9gBBqB7ETKuVLq7ehU51', description: 'Premium hardcover edition.' },
      { name: 'Digital PDF', price: 29, format: 'digital', productId: 'prod_UNSY4CRvsxj25H', priceId: 'price_1TOlCYBBqB7ETKuVVclSsUaO', description: 'Instant digital download.' },
      { name: 'Audiobook', price: 27, format: 'audio', productId: 'prod_U0I0KrzrZzBc1K', priceId: 'price_1T2deuBBqB7ETKuV0nU8wjzq', description: 'Full audiobook edition.' }
    ]
  }
];

async function sync() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('Missing SANITY_AUTH_TOKEN environment variable.');
    return;
  }

  for (const item of STRIPE_DATA) {
    console.log(`Processing ${item.sanitySlug}...`);
    
    // Find product by slug
    let product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: item.sanitySlug });
    
    if (!product) {
      console.log(`Product "${item.sanitySlug}" not found. Creating...`);
      const titles: Record<string, string> = {
        'why-the-rich-dont-pay-taxes': 'Why the Rich Don’t Pay Taxes And Why Real Estate Is the Reason',
      };
      const titleEn = titles[item.sanitySlug] || item.sanitySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

      const newProduct = {
        _type: 'product',
        title: {
          _type: 'localizedString',
          en: titleEn,
        },
        slug: {
          _type: 'slug',
          current: item.sanitySlug
        },
        shortDescription: {
          _type: 'localizedText',
          en: 'Description coming soon.'
        },
        price: item.editions[0].price,
        format: item.editions[0].format
      };
      
      product = await client.create(newProduct);
      console.log(`Created new product: ${item.sanitySlug} (_id: ${product._id})`);
    }

    const editions = item.editions.map(ed => ({
      _key: Math.random().toString(36).substring(2, 11),
      name: ed.name,
      price: ed.price,
      format: ed.format,
      stripePriceId: ed.priceId,
      stripeProductId: ed.productId,
      description: ed.description
    }));

    await client
      .patch(product._id)
      .set({ editions })
      .commit();
    
    console.log(`Updated ${item.sanitySlug} with ${editions.length} editions.`);
  }
}

sync().catch(console.error);
