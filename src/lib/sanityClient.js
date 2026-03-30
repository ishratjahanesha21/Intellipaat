import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ─── Replace these values with your own Sanity project details ───
// 1. Go to https://sanity.io and create a free project
// 2. Run: npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production
// 3. Paste your projectId below
export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset:   process.env.REACT_APP_SANITY_DATASET    || 'production',
  useCdn:    process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  // token: process.env.REACT_APP_SANITY_TOKEN  // only needed for private datasets
});

const builder = imageUrlBuilder(client);

/**
 * Build an optimised Sanity image URL.
 * Usage: urlFor(image).width(600).auto('format').url()
 */
export const urlFor = (source) => builder.image(source);
