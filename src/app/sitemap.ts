import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prism-saas.vercel.app';

  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '',            priority: 1.0, changeFrequency: 'weekly' },
    { path: '/features',   priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing',    priority: 0.9, changeFrequency: 'monthly' },
    { path: '/blog',       priority: 0.8, changeFrequency: 'weekly' },
    { path: '/services',   priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about',      priority: 0.7, changeFrequency: 'monthly' },
    { path: '/team',       priority: 0.6, changeFrequency: 'monthly' },
    { path: '/portfolio',  priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact',    priority: 0.6, changeFrequency: 'yearly' },
    { path: '/faq',        priority: 0.6, changeFrequency: 'monthly' },
    { path: '/shop',       priority: 0.8, changeFrequency: 'weekly' },
  ];

  return routes.map(r => ({
    url: `${base}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
