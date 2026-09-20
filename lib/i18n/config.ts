export const locales = ['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'ja'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  pt: 'PT',
  it: 'IT',
  nl: 'NL',
  ja: 'JA',
}

export const localeFlags: Record<Locale, string> = {
  en: '/flags/en.webp',
  es: '/flags/es.webp',
  fr: '/flags/fr.webp',
  de: '/flags/de.webp',
  pt: '/flags/pt.webp',
  it: '/flags/it.webp',
  nl: '/flags/nl.webp',
  ja: '/flags/ja.webp',
}
