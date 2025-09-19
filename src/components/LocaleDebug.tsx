'use client';

import { useLocale } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

const LocaleDebug = () => {
  const locale = useLocale();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = useCurrentLocale();

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <div><strong>Locale Debug Info:</strong></div>
      <div>useLocale(): {locale}</div>
      <div>params.locale: {params?.locale as string || 'undefined'}</div>
      <div>useCurrentLocale(): {currentLocale}</div>
      <div>pathname: {pathname}</div>
      <div>window.location: {typeof window !== 'undefined' ? window.location.pathname : 'N/A'}</div>
    </div>
  );
};

export default LocaleDebug;
