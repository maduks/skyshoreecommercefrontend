'use client';

import { useEffect, useCallback } from 'react';

export const useScriptInitializer = () => {
  const initializeQuantityButtons = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Remove existing event handlers to prevent duplicates
      $('.qtybutton').off('click');
      $('.cart-plus-minus .qtybutton').off('click');
      
      // Initialize quantity buttons with a small delay to ensure DOM is ready
      setTimeout(() => {
        $('.qtybutton').off('click').on('click', function(this: any) {
          const $input = $(this).siblings('.cart-plus-minus-box');
          const currentVal = parseInt($input.val()) || 1;
          
          if ($(this).hasClass('inc')) {
            $input.val(currentVal + 1);
          } else if (currentVal > 1) {
            $input.val(currentVal - 1);
          }
        });

        // Initialize cart quantity buttons
        $('.cart-plus-minus .qtybutton').off('click').on('click', function(this: any) {
          const $input = $(this).siblings('.cart-plus-minus-box');
          const currentVal = parseInt($input.val()) || 1;
          
          if ($(this).hasClass('inc')) {
            $input.val(currentVal + 1);
          } else if (currentVal > 1) {
            $input.val(currentVal - 1);
          }
        });
      }, 50);
    }
  }, []);

  const initializeModalSliders = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Initialize modal image sliders
      if ($.fn.slick && $('.sp-img_slider').length && !$('.sp-img_slider').hasClass('slick-initialized')) {
        $('.sp-img_slider').slick({
          slidesToShow: 1,
          arrows: false,
          fade: true,
          draggable: false,
          swipe: false,
          asNavFor: '.sp-img_slider-nav'
        });
        $('.sp-img_slider').addClass('slick-initialized');
        console.log('Modal image slider initialized');
      }

      if ($.fn.slick && $('.sp-img_slider-nav').length && !$('.sp-img_slider-nav').hasClass('slick-initialized')) {
        $('.sp-img_slider-nav').slick({
          slidesToShow: 4,
          asNavFor: '.sp-img_slider',
          focusOnSelect: true,
          arrows: true,
          spaceBetween: 30,
          responsive: [
            {
              breakpoint: 1501,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 2
              }
            }
          ]
        });
        $('.sp-img_slider-nav').addClass('slick-initialized');
        console.log('Modal thumbnail slider initialized');
      }
    }
  }, []);

  const initializeColorSwatches = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Remove existing event handlers
      $('.single-color').off('click');
      
      // Initialize color swatches
      $('.single-color').on('click', function(this: any, e: any) {
        e.preventDefault();
        $('.single-color').removeClass('active');
        $(this).addClass('active');
      });
    }
  }, []);

  const initializeModalClose = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Remove existing event handlers
      $('.modal .close').off('click');
      
      // Initialize modal close button
      $('.modal .close').on('click', function(this: any) {
        const $modal = $(this).closest('.modal');
        $modal.removeClass('show').css('display', 'none');
      });
    }
  }, []);

  const initializeAllModalScripts = useCallback(() => {
    // Wait a bit for the modal to be fully rendered
    setTimeout(() => {
      initializeQuantityButtons();
      initializeModalSliders();
      initializeColorSwatches();
      initializeModalClose();
    }, 100);
  }, [initializeQuantityButtons, initializeModalSliders, initializeColorSwatches, initializeModalClose]);

  return {
    initializeQuantityButtons,
    initializeModalSliders,
    initializeColorSwatches,
    initializeModalClose,
    initializeAllModalScripts
  };
}; 