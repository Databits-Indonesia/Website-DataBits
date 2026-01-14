export const locales = ['en', 'id'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

export type Messages = Record<string, string>

export async function getDictionary(locale: Locale): Promise<Messages> {
  try {
    const dict = await import(`../dictionaries/${locale}.json`)
    return dict.default as Messages
  } catch (e) {
    const fallback = await import(`../dictionaries/${defaultLocale}.json`)
    return fallback.default as Messages
  }
}

export function getCurrentLocale(pathname: string): Locale {
  const seg = pathname.split('/')[1]
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale
}

export function localizePath(locale: Locale, path: string) {
  if (!path.startsWith('/')) path = `/${path}`
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split('/')
  const maybeLocale = parts[1]
  if ((locales as readonly string[]).includes(maybeLocale)) {
    parts[1] = nextLocale
    return parts.join('/') || '/'
  }
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  return localizePath(nextLocale, normalized)
}
