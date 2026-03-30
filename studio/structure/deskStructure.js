// Sanity v3 desk structure — NO imports needed.
// The structure builder (S) is injected automatically by the structureTool plugin.
// Importing StructureBuilder from 'sanity/structure' causes a crash — do not add it.

export const structure = (S) =>
  S.list()
    .title('Intellipaat CMS')
    .items([

      // ── Global ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      // ── Home ────────────────────────────────────────────────────────────
      S.listItem()
        .title('Home Page')
        .child(
          S.list()
            .title('Home Page')
            .items([
              S.listItem()
                .title('Client Logos')
                .child(S.documentTypeList('clientLogo').title('Client Logos')),
              S.listItem()
                .title('Bento Feature Cards')
                .child(S.documentTypeList('bentoCard').title('Bento Cards')),
            ])
        ),

      // ── Services ────────────────────────────────────────────────────────
      S.listItem()
        .title('Services')
        .child(S.documentTypeList('service').title('Services')),

      // ── Work / Portfolio ────────────────────────────────────────────────
      S.listItem()
        .title('Work / Portfolio')
        .child(S.documentTypeList('project').title('Projects')),

      // ── Process ─────────────────────────────────────────────────────────
      S.listItem()
        .title('Process')
        .child(
          S.list()
            .title('Process Page')
            .items([
              S.listItem()
                .title('Phases')
                .child(S.documentTypeList('processPhase').title('Phases')),
              S.listItem()
                .title('Testimonials')
                .child(S.documentTypeList('testimonial').title('Testimonials')),
            ])
        ),

      // ── About ───────────────────────────────────────────────────────────
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About Page')
            .items([
              S.listItem()
                .title('Team Members')
                .child(S.documentTypeList('teamMember').title('Team Members')),
              S.listItem()
                .title('Company Values')
                .child(S.documentTypeList('companyValue').title('Company Values')),
            ])
        ),

      // ── Blog ────────────────────────────────────────────────────────────
      S.listItem()
        .title('Blog')
        .child(S.documentTypeList('post').title('Blog Posts')),
    ]);
