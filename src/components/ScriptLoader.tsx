'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScriptLoader = () => {
  const pathname = usePathname();

  const initializeFunctionality = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Initialize shop page grid view functionality
      if (pathname === '/shop') {
        console.log('Initializing shop page functionality...');
        
        // Initialize product view mode functionality
        const initializeProductViewMode = () => {
          $('.product-view-mode a').on('click', function(this: any) {
            this.preventDefault();
            
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

      // Initialize product details page functionality
      if (pathname.startsWith('/product/')) {
        console.log('Initializing product details page functionality...');
        
        // Initialize product tabs
        $('.product-menu a').off('click').on('click', function(this: any, e: any) {
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

        // Initialize quantity buttons for product details
        $('.cart-plus-minus .qtybutton').off('click').on('click', function(this: any) {
          const $input = $(this).siblings('.cart-plus-minus-box');
          const currentVal = parseInt($input.val());
          
          if ($(this).hasClass('inc')) {
            $input.val(currentVal + 1);
          } else if (currentVal > 1) {
            $input.val(currentVal - 1);
          }
        });

        // Initialize image zoom functionality
        if ($.fn.zoom) {
          $('.zoom').zoom({
            magnify: 1.5
          });
        }
      }
      
      // Initialize all sliders
      initializeSliders($);
      
      // Initialize other functionality
      initializeOtherFunctionality($);
    }
  };

  const initializeSliders = ($: any) => {
    // Main slider is now handled by main.js to prevent conflicts

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
      $('.featured-categories_slider').addClass('slick-initialized');
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
      $('.product-slider').addClass('slick-initialized');
      console.log('Product slider initialized');
    }

    // Initialize blog slider with better error handling and retry mechanism
    if ($.fn.slick && $('.blog-slider').length && !$('.blog-slider').hasClass('slick-initialized')) {
      try {
        // Destroy any existing slider first
        if ($('.blog-slider').hasClass('slick-slider')) {
          $('.blog-slider').slick('unslick');
        }
        
        $('.blog-slider').slick({
          slidesToShow: 4,
          spaceBetween: 30,
          arrows: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 5000,
          speed: 1000,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ],
          prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
          nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>'
        });
        $('.blog-slider').addClass('slick-initialized');
        console.log('Blog slider initialized successfully');
      } catch (error) {
        console.error('Error initializing blog slider:', error);
        // Retry after a short delay
        setTimeout(() => {
          if ($('.blog-slider').length && !$('.blog-slider').hasClass('slick-initialized')) {
            console.log('Retrying blog slider initialization...');
            initializeSliders($);
          }
        }, 1000);
      }
    }
  };

  const initializeOtherFunctionality = ($: any) => {
    // Initialize quantity buttons
    $('.qtybutton').off('click').on('click', function(this: any) {
      const $input = $(this).siblings('.qty-input');
      const currentVal = parseInt($input.val());
      
      if ($(this).hasClass('inc')) {
        $input.val(currentVal + 1);
      } else if (currentVal > 1) {
        $input.val(currentVal - 1);
      }
    });

    // Initialize cart quantity buttons (only for non-cart pages)
    if (pathname !== '/cart') {
      $('.cart-plus-minus .qtybutton').off('click').on('click', function(this: any) {
        const $input = $(this).siblings('.cart-plus-minus-box');
        const currentVal = parseInt($input.val());
        
        if ($(this).hasClass('inc')) {
          $input.val(currentVal + 1);
        } else if (currentVal > 1) {
          $input.val(currentVal - 1);
        }
      });
    }

    // Initialize product tabs
    $('.product-menu a').off('click').on('click', function(this: any, e: any) {
      e.preventDefault();
      const target = $(this).attr('href');
      
      $('.product-menu a').removeClass('active');
      $(this).addClass('active');
      
      $('.tab-pane').removeClass('active show');
      $(target).addClass('active show');
    });

    // Initialize nice select for shop sorting
    if ($.fn.niceSelect) {
      $('.nice-select').niceSelect();
    }
  };

  useEffect(() => {
    // Check if jQuery is already loaded
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      console.log('jQuery already loaded, initializing functionality...');
      // Initialize functionality immediately if jQuery is already loaded
      setTimeout(() => {
        initializeFunctionality();
  
      }, 100);
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
        await new Promise(resolve => setTimeout(resolve, 200));
        
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

        // Initialize functionality after scripts are loaded
        setTimeout(() => {
          initializeFunctionality();
        }, 500);

      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
};

export default ScriptLoader; 