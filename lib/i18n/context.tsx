'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Locale, defaultLocale, locales } from './config'
import { t } from './translations'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const LOCALE_STORAGE_KEY = 'ada-ceramics-locale'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null
    if (savedLocale && locales.includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
    setIsInitialized(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
    // Update HTML lang attribute
    document.documentElement.lang = newLocale
  }

  const translate = (key: string, params?: Record<string, string | number>) => {
    return t(locale, key, params)
  }

  // Prevent hydration mismatch by rendering with default locale until client-side initialization
  if (!isInitialized) {
    return (
      <LocaleContext.Provider value={{ locale: defaultLocale, setLocale, t: (key, params) => t(defaultLocale, key, params) }}>
        {children}
      </LocaleContext.Provider>
    )
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
