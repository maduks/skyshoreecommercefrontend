'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutPage = () => {
  const t = useTranslations('navigation');
  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>{t('about')}</h2>
            <ul>
              <li><Link href="/">{t('home')}</Link></li>
              <li className="active">{t('about')}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's About Us Area */}
      <div className="about-us-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-us-img">
                <Image 
                  src="/assets/images/about-us/1.jpg" 
                  alt="About Us" 
                  width={600} 
                  height={400}
                  quality={95}
                  style={{ objectFit: 'cover', borderRadius: '10px' }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-us-content">
                <h2>About Skyshore</h2>
                <p>We are dedicated manufacturers of high-quality lubricants, delivering reliable performance and protection for a wide range of engines and machinery. With years of experience in the industry, we have established ourselves as a trusted name in automotive and industrial lubrication solutions.</p>
                <p>Our commitment to excellence drives us to produce lubricants that meet and exceed international standards. We understand that proper lubrication is crucial for the longevity and optimal performance of engines and machinery, which is why we invest heavily in research and development to create products that deliver superior protection and performance.</p>
                <p>At Skyshore, we believe in quality, innovation, and customer satisfaction. Our products are formulated using advanced technology and premium base oils to ensure maximum protection against wear, corrosion, and thermal breakdown. Whether you&apos;re looking for engine oils, transmission fluids, or specialized lubricants, we have the solutions you need.</p>
                <div className="about-us-btn">
                  <Link href="/shop" className="uren-btn">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* Uren's About Us Area End Here */}

      {/* Begin Uren's Mission & Vision Area */}
      <div className="mission-vision-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="mission-content">
                <h3>Our Mission</h3>
                <p>To provide innovative lubrication solutions that enhance engine performance, extend equipment life, and contribute to sustainable operations across various industries. We strive to be the leading choice for quality lubricants that meet the evolving needs of modern engines and machinery.</p>
                <ul className="mission-points">
                  <li><i className="fa fa-check"></i> Superior Quality Standards</li>
                  <li><i className="fa fa-check"></i> Advanced Technology</li>
                  <li><i className="fa fa-check"></i> Customer Satisfaction</li>
                  <li><i className="fa fa-check"></i> Environmental Responsibility</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="vision-content">
                <h3>Our Vision</h3>
                <p>To become the most trusted and preferred lubricant manufacturer, recognized for our commitment to excellence, innovation, and sustainable practices. We envision a future where our products play a vital role in advancing automotive and industrial efficiency while protecting our environment.</p>
                <div className="vision-highlights">
                  <div className="highlight-item">
                    <i className="fa fa-cog"></i>
                    <div>
                      <h4>Innovation</h4> 
                      <p>Continuously developing advanced lubrication technologies</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <i className="fa fa-leaf"></i>
                    <div>
                      <h4>Sustainability</h4>
                      <p>Eco-friendly formulations for a greener future</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Mission & Vision Area End Here */}

      {/* Begin Uren's Values Area */}
      <div className="values-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>Our Values</span>
                <h3>What Drives Us Forward</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="value-item">
                <div className="value-icon">
                  <i className="fa fa-star"></i>
                </div>
                <h4>Quality Excellence</h4>
                <p>We maintain the highest standards in every product we manufacture, ensuring reliability and performance.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="value-item">
                <div className="value-icon">
                  <i className="fa fa-lightbulb"></i>
                </div>
                <h4>Innovation</h4>
                <p>Constantly researching and developing new formulations to meet evolving industry demands.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="value-item">
                <div className="value-icon">
                  <i className="fa fa-users"></i>
                </div>
                <h4>Customer Focus</h4>
                <p>Understanding and exceeding customer expectations through personalized solutions and support.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="value-item">
                <div className="value-icon">
                  <i className="fa fa-shield-alt"></i>
                </div>
                <h4>Trust & Reliability</h4>
                <p>Building long-term relationships based on transparency, honesty, and consistent performance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Values Area End Here */}

   
      {/* Uren's Commitment Area End Here */}
    </>
  );
};

export default AboutPage; 