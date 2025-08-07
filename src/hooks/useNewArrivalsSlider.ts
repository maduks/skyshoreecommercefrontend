'use client';

import { useEffect, useRef } from 'react';

export const useNewArrivalsSlider = (products: any[]) => {
  const sliderInitialized = useRef(false);

  useEffect(() => {
    if (products.length === 0 || sliderInitialized.current) {
      return;
    }

    const initializeSlider = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        const $ = (window as any).jQuery;
        
        // Wait for the slider element to be in the DOM
        const sliderElement = $('.product-slider');
        
        if (sliderElement.length && !sliderElement.hasClass('slick-initialized')) {
          // Destroy any existing slider to prevent conflicts
          if (sliderElement.hasClass('slick-slider')) {
            sliderElement.slick('unslick');
          }
          
          // Initialize the slider with proper options
          sliderElement.slick({
            slidesToShow: 4,
            spaceBetween: 30,
            arrows: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 1000,
            responsive: [
              {
                breakpoint: 1599,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1
                }
              }
            ],
            prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
            nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>'
          });
          
          sliderElement.addClass('slick-initialized');
          sliderInitialized.current = true;
          console.log('NewArrivals slider initialized successfully');
        }
      }
    };

    // Try to initialize immediately
    initializeSlider();
    
    // If not successful, try again after a short delay
    const timer = setTimeout(() => {
      if (!sliderInitialized.current) {
        initializeSlider();
      }
    }, 500);

    // If still not successful, try one more time
    const timer2 = setTimeout(() => {
      if (!sliderInitialized.current) {
        initializeSlider();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [products.length]);

  return { sliderInitialized: sliderInitialized.current };
}; 