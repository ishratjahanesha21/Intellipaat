import { defineType, defineField, defineArrayMember } from 'sanity';

// Single singleton document — controls all global site content.
// In Sanity v3 __experimental_actions is removed; use the desk structure
// to hide the "Create" button instead (already done in deskStructure.js).
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName',    title: 'Site Name',              type: 'string', initialValue: 'Intellipaat' }),
    defineField({ name: 'tagline',     title: 'Tagline (meta)',          type: 'text', rows: 2 }),
    defineField({ name: 'statusLabel', title: 'Nav Status (e.g. Available)', type: 'string', initialValue: 'Available' }),

    // ── Hero ──────────────────────────────────────────────────────────────
    defineField({ name: 'heroLabel',      title: 'Hero Badge Label',    type: 'string', initialValue: 'AI-Powered Agency · Est. 2024' }),
    defineField({ name: 'heroHeading',    title: 'Hero Heading (use | to separate lines)', type: 'string', initialValue: 'We Build|Intelligent|Experiences' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading',     type: 'text', rows: 3 }),
    defineField({
      name: 'heroStats', title: 'Hero Stats', type: 'array',
      of: [defineArrayMember({
        type: 'object', name: 'stat',
        fields: [
          defineField({ name: 'value', title: 'Value (e.g. 150+)', type: 'string' }),
          defineField({ name: 'label', title: 'Label',              type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      })],
    }),

    // ── Mission (About page) ──────────────────────────────────────────────
    defineField({ name: 'missionHeading', title: 'Mission Heading',           type: 'string' }),
    defineField({ name: 'missionBody1',   title: 'Mission Paragraph 1',       type: 'text', rows: 4 }),
    defineField({ name: 'missionBody2',   title: 'Mission Paragraph 2',       type: 'text', rows: 4 }),
    defineField({
      name: 'aboutStats', title: 'About Page Stats', type: 'array',
      of: [defineArrayMember({
        type: 'object', name: 'stat',
        fields: [
          defineField({ name: 'number', title: 'Number (e.g. 2021)', type: 'string' }),
          defineField({ name: 'label',  title: 'Label',               type: 'string' }),
        ],
        preview: { select: { title: 'number', subtitle: 'label' } },
      })],
    }),

    // ── Footer ────────────────────────────────────────────────────────────
    defineField({ name: 'footerCtaSubtitle', title: 'Footer CTA Subtitle',      type: 'string', initialValue: '// Ready to Build?' }),
    defineField({ name: 'footerCta',         title: 'Footer CTA Heading (use | for line break)', type: 'string', initialValue: "Let's make|something great" }),
    defineField({ name: 'footerCtaButton',   title: 'Footer CTA Button Label',  type: 'string', initialValue: 'Start Your Project →' }),

    // ── Social Links ──────────────────────────────────────────────────────
    defineField({ name: 'socialX',        title: 'X (Twitter) URL', type: 'url' }),
    defineField({ name: 'socialLinkedIn', title: 'LinkedIn URL',     type: 'url' }),
    defineField({ name: 'socialGithub',   title: 'GitHub URL',       type: 'url' }),
    defineField({ name: 'socialDribbble', title: 'Dribbble URL',     type: 'url' }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
