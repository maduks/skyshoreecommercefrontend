'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScriptLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Check if jQuery is already loaded
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      console.log('jQuery already loaded');
      return;
    }

    // Load jQuery first
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        console.log('Loading scripts...');
        
        // Load jQuery first
        await loadScript('/assets/js/vendor/jquery-1.12.4.min.js');
        console.log('jQuery loaded');
        
        // Wait a bit for jQuery to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Load other vendor scripts
        await loadScript('/assets/js/vendor/modernizr-2.8.3.min.js');
        await loadScript('/assets/js/vendor/popper.min.js');
        await loadScript('/assets/js/vendor/bootstrap.min.js');
        console.log('Vendor scripts loaded');

        // Load plugins
        await loadScript('/assets/js/plugins/slick.min.js');
        await loadScript('/assets/js/plugins/jquery.barrating.min.js');
        await loadScript('/assets/js/plugins/jquery.counterup.js');
        await loadScript('/assets/js/plugins/jquery.nice-select.js');
        await loadScript('/assets/js/plugins/jquery.sticky-sidebar.js');
        await loadScript('/assets/js/plugins/jquery-ui.min.js');
        await loadScript('/assets/js/plugins/jquery.ui.touch-punch.min.js');
        await loadScript('/assets/js/plugins/lightgallery.min.js');
        await loadScript('/assets/js/plugins/scroll-top.js');
        await loadScript('/assets/js/plugins/theia-sticky-sidebar.min.js');
        await loadScript('/assets/js/plugins/waypoints.min.js');
        await loadScript('/assets/js/plugins/jquery.zoom.min.js');
        console.log('Plugin scripts loaded');

        // Load main JS file last
        await loadScript('/assets/js/main.js');
        console.log('Main script loaded');

        // Initialize any missing functionality
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).jQuery) {
            const $ = (window as any).jQuery;
            
            // Initialize shop page grid view functionality
            if (pathname === '/shop') {
              console.log('Initializing shop page functionality...');
              
              // Initialize product view mode functionality
              const initializeProductViewMode = () => {
                $('.product-view-mode a').on('click', function(e: any) {
                  e.preventDefault();
                  
                  const shopProductWrap = $('.shop-product-wrap');
                  const viewMode = $(this).data('target');
                  
                  $('.product-view-mode a').removeClass('active');
                  $(this).addClass('active');
                  
                  if (viewMode === 'listview') {
                    shopProductWrap.removeClass('grid');
                  } else {
                    if (!shopProductWrap.hasClass('grid')) {
                      shopProductWrap.addClass('grid');
                    }
                  }
                  
                  shopProductWrap.removeClass('gridview-2 gridview-3 gridview-4 gridview-5 listview').addClass(viewMode);
                  console.log('Grid view changed to:', viewMode);
                });
                
                // Set default active state
                if ($('.product-view-mode a.grid-3').length) {
                  $('.product-view-mode a').removeClass('active');
                  $('.product-view-mode a.grid-3').addClass('active');
                  $('.shop-product-wrap').removeClass('gridview-2 gridview-4 gridview-5 listview').addClass('gridview-3');
                }
              };
              
              // Initialize the grid view functionality
              initializeProductViewMode();
              
              // Re-initialize on dynamic content changes
              const observer = new MutationObserver(() => {
                if ($('.product-view-mode a').length && !$('.product-view-mode a').hasClass('initialized')) {
                  initializeProductViewMode();
                  $('.product-view-mode a').addClass('initialized');
                }
              });
              
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
            }
            
            // Re-initialize slick slider if needed
            if ($.fn.slick && $('.main-slider').length && !$('.main-slider').hasClass('slick-initialized')) {
              $('.main-slider').slick({
                infinite: true,
                arrows: true,
                autoplay: true,
                fade: true,
                dots: true,
                autoplaySpeed: 7000,
                speed: 1000,
                adaptiveHeight: true,
                easing: 'ease-in-out',
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
                nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>'
              });
              console.log('Main slider initialized');
            }

            // Initialize featured categories slider
            if ($.fn.slick && $('.featured-categories_slider').length && !$('.featured-categories_slider').hasClass('slick-initialized')) {
              $('.featured-categories_slider').slick({
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
              console.log('Featured categories slider initialized');
            }

            // Initialize product slider
            if ($.fn.slick && $('.product-slider').length && !$('.product-slider').hasClass('slick-initialized')) {
              $('.product-slider').slick({
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
              console.log('Product slider initialized');
            }

            // Initialize special product slider
            if ($.fn.slick && $('.special-product_slider').length && !$('.special-product_slider').hasClass('slick-initialized')) {
              $('.special-product_slider').slick({
                slidesToShow: 2,
                spaceBetween: 30,
                arrows: true,
                dots: false,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 1000,
                responsive: [
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
              console.log('Special product slider initialized');
            }

            // Initialize newsletter popup
            setTimeout(() => {
              $('.popup_wrapper').css({
                opacity: '1',
                visibility: 'visible'
              });
            }, 5000);

            // Newsletter popup close functionality
            $('.popup_off').on('click', () => {
              $('.popup_wrapper').fadeOut(500);
            });

            // Initialize sticky header
            $(window).on('scroll', () => {
              if ($(window).scrollTop() > 300) {
                $('.header-sticky').addClass('sticky');
              } else {
                $('.header-sticky').removeClass('sticky');
              }
            });

            // Initialize Quick View modal functionality
            $('.quick-view-btn').on('click', function(e: any) {
              e.preventDefault();
              $('#exampleModalCenter').modal('show');
            });

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
              console.log('Modal thumbnail slider initialized');
            }

            // Initialize quantity buttons
            $('.qtybutton').on('click', function(this: any) {
              const $input = $(this).siblings('.cart-plus-minus-box');
              const currentVal = parseInt($input.val());
              
              if ($(this).hasClass('inc')) {
                $input.val(currentVal + 1);
              } else if (currentVal > 1) {
                $input.val(currentVal - 1);
              }
            });

            // Initialize cart quantity buttons
            $('.cart-plus-minus .qtybutton').on('click', function(this: any) {
              const $input = $(this).siblings('.cart-plus-minus-box');
              const currentVal = parseInt($input.val());
              
              if ($(this).hasClass('inc')) {
                $input.val(currentVal + 1);
              } else if (currentVal > 1) {
                $input.val(currentVal - 1);
              }
            });

            // Initialize checkout accordion
            $('#showlogin').on('click', function(e: any) {
              e.preventDefault();
              $('#checkout-login').slideToggle();
            });

            $('#showcoupon').on('click', function(e: any) {
              e.preventDefault();
              $('#checkout_coupon').slideToggle();
            });

            // Initialize payment accordion
            $('.payment-accordion .panel-title a').on('click', function(e: any) {
              e.preventDefault();
              const target = $(this).attr('data-target');
              $(target).collapse('toggle');
            });

            // Initialize ship to different address toggle
            $('#ship-box').on('change', function(this: any) {
              if ($(this).is(':checked')) {
                $('#ship-box-info').slideDown();
              } else {
                $('#ship-box-info').slideUp();
              }
            });

            // Initialize color swatches
            $('.single-color').on('click', function(this: any, e: any) {
              e.preventDefault();
              $('.single-color').removeClass('active');
              $(this).addClass('active');
            });

            // Initialize shop page filters
            $('.price-range').on('input', function(this: any) {
              const value = $(this).val();
              $('.min-price').val(value);
            });

            $('.color-filter input, .size-filter input').on('change', function(this: any) {
              // Handle filter changes
              console.log('Filter changed:', $(this).val());
            });

            // Initialize contact form
            $('.contact-form form').on('submit', function(e: any) {
              e.preventDefault();
              // Handle form submission
              console.log('Contact form submitted');
              alert('Thank you for your message! We will get back to you soon.');
            });

            // Initialize nice select for shop sorting
            if ($.fn.niceSelect) {
              $('.nice-select').niceSelect();
            }

            // Initialize product tabs
            $('.product-menu a').on('click', function(this: any, e: any) {
              e.preventDefault();
              const target = $(this).attr('href');
              
              // Remove active class from all tabs
              $('.product-menu a').removeClass('active');
              $(this).addClass('active');
              
              // Hide all tab content
              $('.tab-pane').removeClass('active show');
              
              // Show target tab content
              $(target).addClass('active show');
            });

            // Initialize review form
            $('#form-review').on('submit', function(this: any, e: any) {
              e.preventDefault();
              // Handle review submission
              console.log('Review form submitted');
              alert('Thank you for your review!');
            });

            console.log('All sliders and functionality initialized');
          }
        }, 1000);

      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();
  }, [pathname]);

  return null;
};

export default ScriptLoader; 