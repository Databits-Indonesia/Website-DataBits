import './globals.css';
import type { Metadata } from 'next'
import {ThemeProvider} from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'DataBits - AI Solutions',
  description: 'DataBits - Empowering Businesses with AI Solutions',
  icons: {
    icon: 'https://avatars.githubusercontent.com/u/167419822?s=200&v=4',
  },
}

export default function RootLayout({children}: {  children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-white antialiased font-display">
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}