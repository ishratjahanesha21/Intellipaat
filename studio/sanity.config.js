import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index'
import { structure } from './structure/deskStructure'

// ─── Replace YOUR_PROJECT_ID with your actual Sanity project ID ─────────────
// Find it at: https://sanity.io/manage → your project → Settings → API
// Then create a .env file in this /studio folder:
//   SANITY_STUDIO_PROJECT_ID=abc123xyz
//   SANITY_STUDIO_DATASET=production
// ────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  name:    'intellipaat',
  title:   'Intellipaat CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset:   process.env.SANITY_STUDIO_DATASET    || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
