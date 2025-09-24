// schemas/hero.js
export const hero ={
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string'
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'url'
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    }
  ]
}

// schemas/about.js
export const about= {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'About Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'About Description',
      type: 'text',
      rows: 5
    },
    {
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    }
  ]
}

// schemas/features.js
export const features = {
  name: 'features',
  title: 'Features Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Features Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Features Subtitle',
      type: 'string'
    },
    {
      name: 'featuresList',
      title: 'Features List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3
            },
            {
              name: 'icon',
              title: 'Feature Icon (Emoji)',
              type: 'string',
              description: 'Add an emoji icon like 🌱, 📖, 📊'
            }
          ]
        }
      ]
    }
  ]
}

// schemas/testimonials.js
export const testimonials = {
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Testimonials Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Testimonials Subtitle',
      type: 'string'
    },
    {
      name: 'testimonialsList',
      title: 'Testimonials List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Customer Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'role',
              title: 'Role/Title',
              type: 'string'
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Testimonial Content',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'rating',
              title: 'Rating (1-5 stars)',
              type: 'number',
              validation: Rule => Rule.min(1).max(5)
            },
            {
              name: 'image',
              title: 'Customer Photo',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

// schemas/banner.js
export const banner= {
  name: 'banner',
  title: 'Banner/Carousel Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Banner Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Banner Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string'
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'url'
    },
    {
      name: 'bannerType',
      title: 'Banner Type',
      type: 'string',
      options: {
        list: [
          { title: 'Simple Banner', value: 'simple' },
          { title: 'Image Carousel', value: 'carousel' }
        ]
      },
      initialValue: 'simple'
    },
    {
      name: 'isVisible',
      title: 'Show Banner?',
      type: 'boolean',
      description: 'Toggle to show/hide the banner section',
      initialValue: false
    },
    {
      name: 'images',
      title: 'Banner Images',
      type: 'array',
      description: 'Add images for carousel or single banner image',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'bannerType',
      media: 'images.0'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Banner Section',
        subtitle: `${subtitle || 'simple'} banner`,
        media
      }
    }
  }
}

// schemas/contact.js
export const contact= {
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Contact Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Contact Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2
    }
  ]
}

// schemas/siteSettings.js
export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'footerText',
      title: 'Footer Description',
      type: 'text',
      rows: 3
    }
  ]
}


export const schemaTypes = [
  hero,
  about,
  features,
  testimonials,
  banner,
  contact,
  siteSettings
]