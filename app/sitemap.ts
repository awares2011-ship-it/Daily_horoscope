import { MetadataRoute } from 'next'
import { ZODIAC_SIGNS } from '@/data/zodiac'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://daily-horoscope.app'

  // ✅ Use static date (safe for export)
  const lastModified = '2026-01-01'

  const zodiacEntries = ZODIAC_SIGNS.map((sign) => ({
    url: `${base}/zodiac/${sign.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [
    {
      url: base,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...zodiacEntries,
  ]
}
