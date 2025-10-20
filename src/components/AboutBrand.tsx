'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

const AboutBrand = () => {
  const currentLocale = useCurrentLocale();
  const createLocaleUrl = (path: string) => `/${currentLocale}${path}`;

  return (
    <div className="section-space">
      <div className="container-fluid">
        <div className="about-hero-card">
          <div className="row no-gutters align-items-center">
            <div className="col-lg-6">
              <div className="about-hero-left">
                <span className="about-hero-eyebrow">About the brand</span>
                <h2 className="about-hero-title">Skyshore Lubricants <br/>Limited</h2>
                <p className="about-hero-desc">We are dedicated manufacturers of
                     high-quality lubricants, delivering reliable 
                     performance and protection for a wide range of 
                     engines and machinery. 
                     With years of experience in the industry, 
                     we have established....</p>
                <Link href={createLocaleUrl('/catalog')} className="about-hero-btn">Read more</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-hero-image">
                <Image 
                  src="/assets/images/banner/1--2.jpg"
                  alt="Skyshore lubricants visual"
                  width={1200}
                  height={750}
                  priority
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBrand;


