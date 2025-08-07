'use client';

import React from 'react';
import Link from 'next/link';

const BannerSection = () => {
  return (
    <div className="uren-banner_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="banner-item img-hover_effect">
              <div className="banner-img-1"></div>
              <div className="banner-content">
                <span className="offer">Protect Your Investment</span>
                <h4>Luxury Car Engine Oil</h4>
                <h3>SUV&apos;S</h3>
                <p>Don&apos;t risk the performance of your luxury car with inferior oil. Ensure your engine runs smoothly and efficiently with our premium engine oil.</p>
                <div className="uren-btn-ps_left">
                  <Link className="uren-btn" href="/shop">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-item img-hover_effect">
              <div className="banner-img-1 banner-img-2"></div>
              <div className="banner-content">
                <span className="offer">Enhance Your Fleet&apos;s Performance</span>
                <h4>Premium Diesel Engine Oil</h4>
                <h3>Heavy Duty Excellence</h3>
                <p>Ensure your trucks and heavy-duty vehicles operate at peak efficiency with our top-quality diesel engine oil, designed for durability and superior protection.</p>
                <div className="uren-btn-ps_left">
                  <Link className="uren-btn" href="/shop">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection; 