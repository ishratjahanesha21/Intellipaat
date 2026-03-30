import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'number',      title: 'Number (e.g. 01)',   type: 'string' }),
    defineField({ name: 'title',       title: 'Service Title',      type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', title: 'Short Description',  type: 'text', rows: 3 }),
    defineField({ name: 'details',     title: 'Expanded Details',   type: 'text', rows: 5 }),
    defineField({
      name: 'tags', title: 'Tags', type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'deliverables', title: 'Deliverables', type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'iconName', title: 'Icon', type: 'string',
      description: 'Choose the icon for this service',
      options: { list: [
        { title: 'Brain (AI Strategy)',   value: 'brain'    },
        { title: 'Palette (Design)',      value: 'palette'  },
        { title: 'Code (Engineering)',    value: 'code'     },
        { title: 'CPU (ML/AI)',           value: 'cpu'      },
        { title: 'Database (Data)',       value: 'database' },
        { title: 'Trend Up (Growth)',     value: 'trendUp'  },
      ]},
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'number' },
  },
});
