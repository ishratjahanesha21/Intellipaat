import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title',    title: 'Title',    type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug',     title: 'Slug',     type: 'slug', options: { source: 'title', maxLength: 96 }, validation: R => R.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['AI/ML','Design','Engineering','Strategy','Data'] },
      validation: R => R.required(),
    }),
    defineField({
      name: 'tags', title: 'Tags', type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: ['AI/ML','Design','Engineering','Strategy','Data'] },
    }),
    defineField({ name: 'featured',       title: 'Featured Post',   type: 'boolean', initialValue: false }),
    defineField({ name: 'excerpt',        title: 'Excerpt',         type: 'text', rows: 3, validation: R => R.required() }),
    defineField({ name: 'readTime',       title: 'Read Time',       type: 'string' }),
    defineField({ name: 'publishedAt',    title: 'Published At',    type: 'datetime', validation: R => R.required() }),
    defineField({ name: 'authorName',     title: 'Author Name',     type: 'string' }),
    defineField({ name: 'authorInitials', title: 'Author Initials', type: 'string' }),
    defineField({
      name: 'mainImage', title: 'Cover Image', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'body', title: 'Body', type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
    }),
  ],
  orderings: [{ title: 'Publish Date (newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
});
