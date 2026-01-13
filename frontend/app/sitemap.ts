import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://databitsid.tech/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://databitsid.tech/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://databitsid.tech/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url: 'https://databitsid.tech/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: 'https://databitsid.tech/projects',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        url: 'https://databitsid.tech/privacy-policy',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.4,
    },
    {
        url: 'https://databitsid.tech/terms-of-service',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.4,
    },
    {
        url: 'https://databitsid.tech/research',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        url: 'https://databitsid.tech/services',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }
  ]
}