import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

/** Every page of qrdx.org. Add a page here when you add it to app/. */
const PAGES = ['', 'network', 'trade', 'pools', 'stake', 'wallet', 'wallet/funding', 'wallet/shielding', 'explorer', 'services', 'get-started', 'whitepaper', 'about', 'contact', 'docs', 'terms', 'privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `https://qrdx.org/${p ? `${p}/` : ''}`, changeFrequency: p === '' || p === 'network' ? 'weekly' : 'monthly', priority: p === '' ? 1 : 0.6 }))
}
