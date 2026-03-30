import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Project Title',  type: 'string', validation: R => R.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['AI/ML','Web App','Design System','Data'] },
    }),
    defineField({
      name: 'tags', title: 'Tags', type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: ['AI/ML','Web App','Design System','Data'] },
    }),
    defineField({ name: 'year',        title: 'Year',           type: 'string' }),
    defineField({ name: 'description', title: 'Description',    type: 'text', rows: 3 }),
    defineField({ name: 'metric',      title: 'Key Metric',     type: 'string' }),
    defineField({
      name: 'tech', title: 'Tech Stack', type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'accent', title: 'Accent Card (lime highlight)', type: 'boolean', initialValue: false }),
    defineField({
      name: 'mainImage', title: 'Project Image', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      validation: R => R.required(),
    }),
    defineField({ name: 'caseStudyUrl', title: 'Case Study URL (optional)', type: 'url' }),
    defineField({ name: 'order',        title: 'Display Order',             type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
});
