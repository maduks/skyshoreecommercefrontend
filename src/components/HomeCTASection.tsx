'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { useTranslations } from 'next-intl';

const HomeCTASection = () => {
  const currentLocale = useCurrentLocale();
  const t = useTranslations('pages.distributor');
  const createLocaleUrl = (path: string) => `/${currentLocale}${path}`;

  return (
    <div className="section-space">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="home-cta-card home-cta-card--shop">
              <div className="home-cta-content">
                <h3 className="home-cta-title" style={{color:'#fff'}}>Visit Our Shop</h3>
                <p className="home-cta-desc" style={{color:'#fff', marginBottom:'40px'}}>
                From heavy-duty engines to everyday vehicles,
                 browse our wide collection of high-performance
                  lubricants and find the perfect match tailored to 
                  your unique needs—ensuring smooth performance, 
                  unmatched protection, and total peace of mind.
                </p>
                <Link href={createLocaleUrl('/contact')} className="home-cta-btn home-cta-btn--primary">Shop Now</Link>

              
              </div>
              <div 
                className="home-cta-image"
                style={{
                  backgroundImage: 'url(/assets/images/banner/1-1.png)'
                }}
              ></div>
              <Link href={createLocaleUrl('/catalog')} className="home-cta-button" aria-label="Shop Now">
                <span className="cta-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="home-cta-card home-cta-card--contact">
              <div className="home-cta-icon">
                <i className="ion-ios-people" style={{ fontSize: '58px', fontWeight:'bold', color: '#1a73e8' }}></i>
              </div>
              <div className="home-cta-content">
                <h3 className="home-cta-title">{t('title')}</h3>
                <p className="home-cta-desc">{t('description')}</p>
              </div>
              <div className="home-cta-buttons">
                <Link href={createLocaleUrl('/contact')} className="home-cta-btn home-cta-btn--primary">{t('contactSales')}</Link>
                <Link href={createLocaleUrl('/contact')} className="home-cta-btn home-cta-btn--secondary">{t('learnMore')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCTASection;
