
import { createClient } from '@sanity/client';
import * as fs from 'fs';

const client = createClient({
  projectId: 'p1x9y3wz',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function fetchProducts() {
  const query = `*[_type == "product"] {
    _id,
    "title": coalesce(title.en, title),
    "slug": slug.current,
    editions
  }`;
  
  const products = await client.fetch(query);
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf8');
  console.log('Fetched', products.length, 'products');
}

fetchProducts().catch(console.error);
