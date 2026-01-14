"use client"

import React from 'react'
import type { Locale, Messages } from '@/lib/i18n'

type I18nContextValue = {
  locale: Locale
  messages: Messages
  t: (key: string, fallback?: string) => string
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

export function I18nProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: React.ReactNode }) {
  const t = React.useCallback(
    (key: string, fallback?: string) => {
      return messages[key] ?? fallback ?? key
    },
    [messages]
  )

  return (
    <I18nContext.Provider value={{ locale, messages, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
