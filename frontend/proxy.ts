import { NextResponse, NextRequest } from "next/server";
 
const locales = ['en', 'id'] as const
const defaultLocale = 'en'
 
// Get the preferred locale from Accept-Language header or default
function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language')
  if (acceptLang) {
    // Check if Indonesian is preferred
    if (acceptLang.includes('id')) return 'id'
  }
  return defaultLocale
}
 
export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
}