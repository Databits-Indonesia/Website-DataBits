import '../globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { I18nProvider } from '@/components/i18n-provider'
import { getDictionary, locales, type Locale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'DataBits - AI Solutions',
  description: 'DataBits - Empowering Businesses with AI Solutions',
  icons: {
    icon: 'https://avatars.githubusercontent.com/u/167419822?s=200&v=4',
  },
}

export async function generateStaticParams() {
  return (locales as readonly string[]).map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-white antialiased font-display">
        <I18nProvider locale={locale} messages={dict}>
          <ThemeProvider attribute="class" enableSystem>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
