import { useEffect, useRef } from 'react';

interface ScriptLoaderOptions {
  onLoad?: () => void;
  onError?: (error: Error) => void;
  dependencies?: string[];
}

export const useScriptLoader = (options: ScriptLoaderOptions = {}) => {
  const loadedScripts = useRef<Set<string>>(new Set());
  const { onLoad, onError, dependencies = [] } = options;

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (loadedScripts.current.has(src)) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        loadedScripts.current.add(src);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      script.onload = () => {
        loadedScripts.current.add(src);
        resolve();
      };
      
      script.onerror = () => {
        const error = new Error(`Failed to load script: ${src}`);
        reject(error);
      };

      document.head.appendChild(script);
    });
  };

  const loadScriptsSequentially = async (scripts: string[]) => {
    try {
      for (const script of scripts) {
        await loadScript(script);
      }
      onLoad?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const initializeShopPage = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Initialize product view mode functionality
      const initializeProductViewMode = () => {
        $('.product-view-mode a').off('click').on('click', function(e: any) {
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
  };

  const initializeSliders = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
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
    }
  };

  const initializeQuantityButtons = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Initialize quantity buttons
      $('.qtybutton').off('click').on('click', function(this: any) {
        const $input = $(this).siblings('.cart-plus-minus-box');
        const currentVal = parseInt($input.val());
        
        if ($(this).hasClass('inc')) {
          $input.val(currentVal + 1);
        } else if (currentVal > 1) {
          $input.val(currentVal - 1);
        }
      });

      // Initialize cart quantity buttons
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
  };

  const initializeQuickView = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Initialize Quick View modal functionality
      $('.quick-view-btn').off('click').on('click', function(e: any) {
        e.preventDefault();
        $('#exampleModalCenter').modal('show');
      });
    }
  };

  const initializeAll = () => {
    initializeShopPage();
    initializeSliders();
    initializeQuantityButtons();
    initializeQuickView();
  };

  useEffect(() => {
    const scripts = [
      '/assets/js/vendor/jquery-1.12.4.min.js',
      '/assets/js/vendor/modernizr-2.8.3.min.js',
      '/assets/js/vendor/popper.min.js',
      '/assets/js/vendor/bootstrap.min.js',
      '/assets/js/plugins/slick.min.js',
      '/assets/js/plugins/jquery.barrating.min.js',
      '/assets/js/plugins/jquery.counterup.js',
      '/assets/js/plugins/jquery.nice-select.js',
      '/assets/js/plugins/jquery.sticky-sidebar.js',
      '/assets/js/plugins/jquery-ui.min.js',
      '/assets/js/plugins/jquery.ui.touch-punch.min.js',
      '/assets/js/plugins/lightgallery.min.js',
      '/assets/js/plugins/scroll-top.js',
      '/assets/js/plugins/theia-sticky-sidebar.min.js',
      '/assets/js/plugins/waypoints.min.js',
      '/assets/js/plugins/jquery.zoom.min.js',
      '/assets/js/main.js'
    ];

    loadScriptsSequentially(scripts).then(() => {
      // Initialize all functionality after scripts are loaded
      setTimeout(initializeAll, 500);
    });

    return () => {
      // Cleanup if needed
    };
  }, dependencies);

  return {
    loadScript,
    loadScriptsSequentially,
    initializeAll,
    initializeShopPage,
    initializeSliders,
    initializeQuantityButtons,
    initializeQuickView
  };
}; 