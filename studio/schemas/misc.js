import { defineType, defineField, defineArrayMember } from 'sanity';

// ─── Process Phase ────────────────────────────────────────────────────────────
export const processPhase = defineType({
  name: 'processPhase',
  title: 'Process Phase',
  type: 'document',
  fields: [
    defineField({ name: 'number',      title: 'Phase Number (e.g. 01)', type: 'string' }),
    defineField({ name: 'title',       title: 'Phase Title',            type: 'string', validation: R => R.required() }),
    defineField({ name: 'duration',    title: 'Duration (e.g. 1 week)', type: 'string' }),
    defineField({ name: 'description', title: 'Description',            type: 'text', rows: 3 }),
    defineField({
      name: 'activities', title: 'Key Activities', type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'output', title: 'Output / Deliverable', type: 'string' }),
    defineField({ name: 'order',  title: 'Display Order',        type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'number' } },
});

// ─── Testimonial ──────────────────────────────────────────────────────────────
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote',          title: 'Quote',           type: 'text', rows: 4, validation: R => R.required() }),
    defineField({ name: 'authorName',     title: 'Author Name',     type: 'string' }),
    defineField({ name: 'authorRole',     title: 'Author Role',     type: 'string' }),
    defineField({ name: 'authorInitials', title: 'Author Initials', type: 'string' }),
    defineField({ name: 'order',          title: 'Display Order',   type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'authorName', subtitle: 'authorRole' } },
});

// ─── Company Value ────────────────────────────────────────────────────────────
export const companyValue = defineType({
  name: 'companyValue',
  title: 'Company Value',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Value Title',  type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Description',  type: 'text', rows: 2 }),
    defineField({
      name: 'iconName', title: 'Icon', type: 'string',
      options: { list: [
        { title: 'Clock  (Outcomes)', value: 'clock'  },
        { title: 'Bars   (Evidence)', value: 'bars'   },
        { title: 'Eye    (Transparency)', value: 'eye' },
        { title: 'Flash  (Action)',   value: 'flash'  },
      ]},
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title' } },
});

// ─── Bento Card (Home page feature cards) ────────────────────────────────────
export const bentoCard = defineType({
  name: 'bentoCard',
  title: 'Bento Card',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Card Title',  type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({
      name: 'cardType', title: 'Card Type', type: 'string',
      options: { list: [
        { title: 'Regular',  value: 'regular' },
        { title: 'Accent (lime / dark highlight)', value: 'accent' },
      ]},
    }),
    defineField({
      name: 'iconName', title: 'Icon', type: 'string',
      options: { list: [
        { title: 'AI / Robot',  value: 'ai'       },
        { title: 'Flash',       value: 'flash'    },
        { title: 'Security',    value: 'security' },
        { title: 'Rocket',      value: 'rocket'   },
        { title: 'Analytics',   value: 'analytics'},
      ]},
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'cardType' } },
});

// ─── Client Logo (Home logos strip) ──────────────────────────────────────────
export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  type: 'document',
  fields: [
    defineField({ name: 'name',  title: 'Client Name',   type: 'string', validation: R => R.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({
      name: 'logo', title: 'Logo (optional)', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'websiteUrl', title: 'Website URL', type: 'url' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', media: 'logo' } },
});
