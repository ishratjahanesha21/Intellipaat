import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Full Name',    type: 'string', validation: R => R.required() }),
    defineField({ name: 'role',     title: 'Role / Title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'initials', title: 'Initials (2–3 chars)', type: 'string' }),
    defineField({ name: 'bio',      title: 'Bio',          type: 'text', rows: 3 }),
    defineField({
      name: 'tags', title: 'Skill Tags', type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'photo', title: 'Photo', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'socialLinkedIn', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'order',          title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
});
