import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'es', 'fr', 'ar', 'zh'] as const;

export default getRequestConfig(async ({ locale }) => {
  // Fallback to 'en' if locale is undefined
  const actualLocale = locale || 'en';
  
  return {
    locale: actualLocale,
    messages: (await import(`../messages/${actualLocale}.json`)).default
  };
});
