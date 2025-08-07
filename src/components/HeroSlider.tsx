'use client';

import React from 'react';
import Link from 'next/link';

const HeroSlider = () => {
  return (
    <div className="uren-slider_area" style={{marginTop:10}}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-slider slider-navigation_style-2">
              {/* First Slide */}
              <div className="single-slide animation-style-01 bg-1">
                <div className="slider-content">
                  <span>New thinking new possibilities</span>
                  <h3>Car engine <br/>oil</h3>
                  <h4>Starting at <span>₦29,900.00</span></h4>
                  <div className="uren-btn-ps_left slide-btn">
                    <Link className="uren-btn" href="/shop">Shop Now</Link>
                  </div>
                </div>
              </div>
              
              {/* Second Slide */}
              <div className="single-slide animation-style-02 bg-2">
                <div className="slider-content slider-content-2">
                  <span className="primary-text_color">Premium Protection, Peak Performance</span>
                  <h3>Engine <br/>Essentials</h3>
                  <h4>Lubricantion you can trust</h4>
                  <div className="uren-btn-ps_left slide-btn">
                    <Link className="uren-btn" href="/shop">Read More</Link>
                  </div>
                </div>
              </div>

               {/* Third Slide */}
               <div className="single-slide animation-style-02 bg-3">
                <div className="slider-content slider-content-2">
                  <span className="primary-text_color">Premium Protection, Peak Performance</span>
                  <h3>Engine <br/>Essentials</h3>
                  <h4>Lubricantion you can trust</h4>
                  <div className="uren-btn-ps_left slide-btn">
                    <Link className="uren-btn" href="/shop">Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider; 