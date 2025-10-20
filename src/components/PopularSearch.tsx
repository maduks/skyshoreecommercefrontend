'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import TransitionLink from './TransitionLink';

const PopularSearch = () => {
  const locale = useLocale();
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${locale}${path}`;
  };

  return (
    <div style={{position: 'relative', bottom: '20px'}} className="popular-search_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="popular-search">
              <label>Popular Search:</label>
              <TransitionLink href={createLocaleUrl('/shop?search=engineoil')}>Engine Oil,</TransitionLink>
              <TransitionLink href={createLocaleUrl('/shop?search=dieseloil')}>Diesel Oil,</TransitionLink>
              <TransitionLink href={createLocaleUrl('/shop?search=motoroil')}>Motor Oil,</TransitionLink>
              <TransitionLink href={createLocaleUrl('/shop?search=Heavyduty')}>Heavy Duty</TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSearch; 