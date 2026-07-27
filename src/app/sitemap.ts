import { MetadataRoute } from 'next';
import { INITIAL_SERVICES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jokicoding.vercel.app';

  const serviceUrls = INITIAL_SERVICES.map((service) => ({
    url: `${baseUrl}/jasa/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...serviceUrls,
  ];
}
