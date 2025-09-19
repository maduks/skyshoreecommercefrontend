'use client';

import { useLocale } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Custom hook to get the current locale reliably
 * Uses multiple methods to determine the current locale
 */
export const useCurrentLocale = () => {
  const params = useParams();
  const locale = useLocale();
  const pathname = usePathname();
  const [urlLocale, setUrlLocale] = useState<string | null>(null);

  useEffect(() => {
    // Extract locale from URL pathname as a fallback
    const pathSegments = pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    
    // Check if first segment is a valid locale
    const validLocales = ['en', 'es', 'fr', 'ar', 'zh'];
    if (firstSegment && validLocales.includes(firstSegment)) {
      setUrlLocale(firstSegment);
    } else {
      setUrlLocale(null);
    }
  }, [pathname]);

  // Priority order: params -> urlLocale -> useLocale -> 'en'
  const currentLocale = (params?.locale as string) || urlLocale || locale || 'en';
  
  return currentLocale;
};

/**
 * Helper function to create locale-aware URLs
 * Note: This should be used within a component that has access to useCurrentLocale
 */
export const createLocaleUrl = (path: string, locale: string) => {
  return `/${locale}${path}`;
};
