# Intellipaat — Sanity CMS Setup Guide

This app is fully wired to Sanity. Until you connect your project ID,
every page gracefully falls back to the original static content — so the
site looks and works perfectly out of the box.

---

## Step 1 — Create a Sanity Project

```bash
# Install the Sanity CLI globally (once)
npm install -g sanity@latest

# Create a new Sanity project (free)
# When prompted, choose "Empty project" and note your Project ID
sanity init --project intellipaat
```

Or create one at **https://sanity.io/manage** → New Project → note the **Project ID**.

---

## Step 2 — Set Up Environment Variables

```bash
# In the /intellipaat root (React app)
cp .env.example .env
```

Open `.env` and fill in your Project ID:

```
REACT_APP_SANITY_PROJECT_ID=abc123xyz
REACT_APP_SANITY_DATASET=production
```

---

## Step 3 — Configure CORS

Sanity blocks requests from unknown origins by default.

1. Go to **https://sanity.io/manage** → your project
2. Click **API** → **CORS Origins**
3. Add:
   - `http://localhost:3000` (development)
   - Your production domain e.g. `https://intellipaat.com`

---

## Step 4 — Install & Launch the Studio

The Sanity Studio lives in the `/studio` folder. It's a separate app.

```bash
cd studio
npm install
npm run dev
# Studio opens at http://localhost:3333
```

To deploy the studio publicly so your client/team can edit content:

```bash
npm run deploy
# Deploys to https://intellipaat.sanity.studio
```

---

## Step 5 — Populate Content

Once the studio is running, you'll see the sidebar organised like this:

```
⚙️  Site Settings       ← Site name, hero text, footer CTA, social links
🏠  Home Page           ← Client logos, bento feature cards
🛠  Services            ← Service cards (title, description, deliverables)
💼  Work / Portfolio    ← Project cards with images
📋  Process             ← Process phases + testimonials
👥  About               ← Team members + company values
✍️  Blog                ← Blog posts with rich text body
```

### Content you MUST add first:
1. **Site Settings** — site name, status label, hero text, footer copy
2. **At least 1 post** in Blog (set one as Featured)
3. **Projects** in Work (upload real images via Sanity's asset manager)
4. **Team Members** in About (upload photos)

---

## Step 6 — How CMS Data Flows

```
Sanity Studio  →  Sanity CDN  →  useSanity() hook  →  React page
   (editor)        (API)          (fetch + state)      (renders)
```

Every page uses the `useSanity(QUERY, params, fallback)` hook:

```js
const { data, loading, error } = useSanity(BLOG_QUERY, {}, null);

if (loading) return <Loader />;          // animated bar loader
const posts = data?.length ? data : FALLBACK_POSTS;  // graceful fallback
```

- **`loading`** → shows the animated loader
- **`error`** → shows a yellow info banner + falls back to static content
- **`data`** → live CMS content renders immediately

---

## GROQ Queries Reference

All queries are in `src/lib/queries.js`. Edit them to add or remove fields.

| Constant | Page | Fetches |
|---|---|---|
| `HOME_QUERY` | Home | hero text, logos, bento cards |
| `SERVICES_QUERY` | Services | all service documents, ordered |
| `WORK_QUERY` | Work | all projects with images |
| `PROCESS_QUERY` | Process | phases + testimonials |
| `ABOUT_QUERY` | About | mission, values, team, stats |
| `BLOG_QUERY` | Blog | all posts, sorted by date |
| `SETTINGS_QUERY` | Navbar + Footer | global site settings |

---

## Adding New Content Types

1. Create a schema file in `studio/schemas/`
2. Add it to `studio/schemas/index.js`
3. Add a sidebar entry in `studio/structure/deskStructure.js`
4. Write a GROQ query in `src/lib/queries.js`
5. Call `useSanity(YOUR_QUERY)` in the page component

---

## Live Preview (Optional)

To see edits update in real-time without publishing:

```bash
npm install @sanity/preview-kit
```

Then wrap your pages with `<LiveQueryProvider>` from `@sanity/preview-kit`.
Full docs: https://www.sanity.io/docs/preview-content-on-site

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Failed to load content" banner | Check CORS settings + `.env` Project ID |
| Images not loading | Make sure `useCdn: true` in `sanityClient.js` |
| Studio schema errors | Run `sanity check` in `/studio` |
| Stale data after publish | Sanity CDN caches for ~60s — wait or set `useCdn: false` in dev |

---

## File Structure

```
intellipaat/
├── src/
│   ├── lib/
│   │   ├── sanityClient.js     ← Sanity client + urlFor() helper
│   │   └── queries.js          ← All GROQ queries
│   ├── hooks/
│   │   └── useSanity.js        ← Data-fetching hook with loading/error
│   ├── components/
│   │   └── Loader.js           ← Loading + error state UI
│   ├── context/
│   │   └── ThemeContext.js     ← Light / dark mode
│   └── pages/                  ← All 6 pages — CMS-connected
├── studio/
│   ├── schemas/
│   │   ├── index.js            ← Schema registry
│   │   ├── siteSettings.js     ← Global settings schema
│   │   ├── post.js             ← Blog post schema
│   │   ├── project.js          ← Portfolio project schema
│   │   ├── service.js          ← Services schema
│   │   ├── teamMember.js       ← Team member schema
│   │   └── misc.js             ← processPhase, testimonial, companyValue, bentoCard, clientLogo
│   ├── structure/
│   │   └── deskStructure.js    ← Custom studio sidebar
│   └── sanity.config.js        ← Studio configuration
├── .env.example                ← Environment variable template
└── SETUP.md                    ← This guide
```

---

## Common Errors & Fixes

### `Uncaught error: Importing binding name 'StructureBuilder' is not found`
**Cause:** `StructureBuilder` was removed as a named export in Sanity v3.
**Fix:** Already resolved in this version. The desk structure file (`studio/structure/deskStructure.js`) no longer imports anything — the `S` builder is injected automatically by the `structureTool` plugin. Never add `import { StructureBuilder } from 'sanity/structure'`.

### `__experimental_actions` warning in console
**Cause:** This was a Sanity v2 API for restricting document creation. Removed in v3.
**Fix:** Already resolved. The singleton `siteSettings` document is restricted via the desk structure instead — it only shows an "Edit" button, never "Create new".

### `defineType is not a function`
**Cause:** Using Sanity v2 plain object schemas instead of the v3 `defineType()` wrapper.
**Fix:** All schemas now use `defineType`, `defineField`, and `defineArrayMember` from `'sanity'`.

### Studio shows blank page / no sidebar
**Cause:** Missing `sanity.cli.js` in the `/studio` folder.
**Fix:** Already added. Make sure `SANITY_STUDIO_PROJECT_ID` is set in your environment or hardcoded in `sanity.cli.js`.
