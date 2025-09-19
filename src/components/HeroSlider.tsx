'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';


// Declare jQuery types
declare global {
  interface Window {
    jQuery: any;
  }
}

const HeroSlider = () => {
  const sliderRef = useRef(null);
  const locale = useLocale();
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${locale}${path}`;
  };

  useEffect(() => {
    // Wait for jQuery and Slick to be available
    const initializeSlider = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.slick && sliderRef.current) {
        const $ = (window as any).jQuery;
        const slider = $(sliderRef.current);
        
        // Check if slider is already initialized
        if (slider.hasClass('slick-initialized')) {
          return;
        }

        try {
          slider.slick({
            infinite: true,
            arrows: true,
            autoplay: true,
            fade: true,
            dots: true,
            autoplaySpeed: 7000,
            speed: 1000,
            adaptiveHeight: true,
            easing: "ease-in-out",
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:
              '<button style="padding:10px;border-radius:5px;" class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
            nextArrow:
             '<button style="border:none;padding:10px;border-radius:5px;" class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
         
            });
          slider.addClass('slick-initialized');
          console.log('Heros slider initialized successfully');
        } catch (error) {
          console.error('Error initializing hero slider:', error);
        }
      }
    };

    // Try to initialize immediately
   initializeSlider();

    // If not ready, wait and retry
    const checkAndInitialize = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.slick) {
       initializeSlider();
      } else {
        // Retry after a short delay
        setTimeout(checkAndInitialize, 100);
      }
    };

    

    // Start checking if not immediately available
    if (typeof window !== 'undefined' && (!(window as any).jQuery || !(window as any).jQuery.fn.slick)) {
      setTimeout(checkAndInitialize, 100);
    }

    // Clean up the slick instance when the component unmounts
    return () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && sliderRef.current) {
        const $ = (window as any).jQuery;
        const slider = $(sliderRef.current);
        if (slider.hasClass('slick-initialized')) {
          try {
            slider.slick('unslick');
            slider.removeClass('slick-initialized');
          } catch (error) {
            console.error('Error cleaning up hero slider:', error);
          }
        }
      }
    };
  }, []);

  return (
    <div className="uren-slider_area" >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div ref={sliderRef} className="main-slider slider-navigation_style-2">
              {/* First Slide */}
              <div className="single-slide animation-style-01 bg-1">
                <div className="slider-content">
                  <span>New thinking new possibilities</span>
                  <h3>Car engine <br/>oil</h3>
                  <h4>Starting at <span>₦69,900.00</span></h4>
                  <div className="uren-btn-ps_left slide-btn">
                    <Link className="uren-btn" href={createLocaleUrl('/shop')}>Shop Now</Link>
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
                    <Link className="uren-btn" href={createLocaleUrl('/shop')}>Read More</Link>
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
                    <Link className="uren-btn" href={createLocaleUrl('/shop')}>Read More</Link>
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