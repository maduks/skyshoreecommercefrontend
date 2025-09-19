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
              <Link href={createLocaleUrl('/shop?search=brakes')}>Brakes & Rotors,</Link>
              <Link href={createLocaleUrl('/shop?search=lighting')}>Lighting,</Link>
              <Link href={createLocaleUrl('/shop?search=performance')}>Performance,</Link>
              <Link href={createLocaleUrl('/shop?search=wheels')}>Wheels & Tires</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSearch; 