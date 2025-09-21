'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const PopularSearch = () => {
  const locale = useLocale();
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${locale}${path}`;
  };

  return (
    <div className="popular-search_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="popular-search">
              <label>Popular Search:</label>
              <Link href={createLocaleUrl('/shop?search=engineoil')}>Engine Oil,</Link>
              <Link href={createLocaleUrl('/shop?search=dieseloil')}>Diesel Oil,</Link>
              <Link href={createLocaleUrl('/shop?search=motoroil')}>Motor Oil,</Link>
              <Link href={createLocaleUrl('/shop?search=Heavyduty')}>Heavy Duty</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSearch; 