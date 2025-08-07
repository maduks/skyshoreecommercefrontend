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
                <span className="offer">Get 20% off your order</span>
                <h4>Car and Truck</h4>
                <h3>Mercedes Benz</h3>
                <p>Explore and immerse in exciting 360 content with Fulldive&apos;s all-in-one virtual reality platform</p>
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
                <span className="offer">Save $120 when you buy</span>
                <h4>Rotiform SFO</h4>
                <h3>Custom Forged</h3>
                <p>Explore and immerse in exciting 360 content with Fulldive&apos;s all-in-one virtual reality platform</p>
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