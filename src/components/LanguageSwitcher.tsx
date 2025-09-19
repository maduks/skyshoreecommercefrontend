'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import Image from 'next/image';

const languages = [
  { code: 'en', name: 'English', flag: '/assets/images/menu/icon/1.jpg' },
  { code: 'es', name: 'Español', flag: '/assets/images/menu/icon/2.jpg' },
  { code: 'fr', name: 'Français', flag: '/assets/images/menu/icon/3.png' },
//   { code: 'ar', name: 'العربية', flag: '/assets/images/menu/icon/4.jpg' },
  { code: 'zh', name: '中文', flag: '/assets/images/menu/icon/5.png' },
];

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const currentLocale = useCurrentLocale();
  const router = useRouter();
  const pathname = usePathname();
  // const params = useParams();
  const t = useTranslations('navigation');

  // const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    // Get the pathname without the current locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    
    // Ensure we don't have double slashes
    const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
    
    // Navigate to the new locale with the current path
    router.push(`/${newLocale}${cleanPath}`);
    setIsOpen(false);
  };

  return (
    <li className="" style={{marginTop: '23px'}}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="language-trigger"
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#fff', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        {t('language')} <i className="fa fa-chevron-down"></i>
      </button>
      
      {isOpen && (
        <ul className="ht-dropdown language-dropdown" style={{ 
          position: 'absolute', 
          top: '100%', 
          left: '0', 
          background: '#fff', 
          border: '1px solid #ddd', 
          borderRadius: '4px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          minWidth: '150px'
        }}>
          {languages.map((language) => (
            <li 
              key={language.code} 
              className={locale === language.code ? 'active' : ''}
              style={{ 
                borderBottom: '1px solid #eee',
                listStyle: 'none'
              }}
            >
              <button
                onClick={() => handleLanguageChange(language.code)}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: locale === language.code ? '#c96' : '#333',
                  fontWeight: locale === language.code ? 'bold' : 'normal'
                }}
              >
                <Image 
                  src={language.flag} 
                  alt={`${language.name} flag`} 
                  width={20} 
                  height={15}
                  style={{ borderRadius: '2px' }}
                />
                {language.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default LanguageSwitcher;
