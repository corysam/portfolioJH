import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...projects
      .filter((p) => !p.categories.some((c) => c.name === 'Illustration'))
      .map((p) => ({
        url: `${siteUrl}/projects/${p.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ];
}
