import { useEffect, useRef, useCallback } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
interface ScriptLoaderOptions {
  onLoad?: () => void;
  onError?: (error: Error) => void;
  dependencies?: string[];
}

// Global flag to prevent multiple slider initializations
let slidersInitialized = false;

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

      // Safely append to head
      if (document.head) {
        document.head.appendChild(script);
      } else {
        reject(new Error('Document head not available'));
      }
    });
  };

  const loadScriptsSequentially = useCallback(async (scripts: string[]) => {
    try {
      for (const script of scripts) {
        await loadScript(script);
      }
      onLoad?.();
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onLoad, onError]);

  const initializeShopPage = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Only initialize nice-select and tooltips, not layout functionality
      // Layout functionality is now handled by React components
      
      // Initialize nice select
      if ($.fn.niceSelect) {
        $('.nice-select').niceSelect();
      }
      
      // Initialize tooltips
      if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
      }
    }
  };

  const initializeSliders = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Prevent multiple initializations
      if (slidersInitialized) {
        console.log('Sliders already initialized, skipping...');
        return;
      }
      
      // Initialize main slider only if not already initialized
   
      
      // Mark sliders as initialized to prevent re-initialization
      slidersInitialized = true;

      // Initialize product slider
      if ($.fn.slick && $('.product-slider').length && !$('.product-slider').hasClass('slick-initialized')) {
        try {
          // Destroy any existing slider first
          if ($('.product-slider').hasClass('slick-slider')) {
            $('.product-slider').slick('unslick');
          }
          
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
        } catch (error) {
          console.error('Error initializing product slider:', error);
        }
      }

      // Initialize featured categories slider
      if ($.fn.slick && $('.featured-categories_slider').length && !$('.featured-categories_slider').hasClass('slick-initialized')) {
        try {
          // Destroy any existing slider first
          if ($('.featured-categories_slider').hasClass('slick-slider')) {
            $('.featured-categories_slider').slick('unslick');
          }
          
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
        } catch (error) {
          console.error('Error initializing featured categories slider:', error);
        }
      }

      // Initialize special product slider (DealOfTheDay)
      if ($.fn.slick && $('.special-product_slider').length && !$('.special-product_slider').hasClass('slick-initialized')) {
        try {
          // Destroy any existing slider first
          if ($('.special-product_slider').hasClass('slick-slider')) {
            $('.special-product_slider').slick('unslick');
          }
          
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
          $('.special-product_slider').addClass('slick-initialized');
          console.log('Special product slider initialized');
        } catch (error) {
          console.error('Error initializing special product slider:', error);
        }
      }

      // Initialize any uren-slick-slider elements
      $('.uren-slick-slider').each(function(this: HTMLElement) {
        const $this = $(this);
        if (!$this.hasClass('slick-initialized')) {
          try {
            // Destroy any existing slider first
            if ($this.hasClass('slick-slider')) {
              $this.slick('unslick');
            }
            
            // Get options from data attributes
            const options = $this.data('slick-options') || {};
            const responsive = $this.data('slick-responsive') || [];
            
            const defaultOptions = {
              slidesToShow: 4,
              spaceBetween: 30,
              arrows: true,
              dots: false,
              autoplay: true,
              autoplaySpeed: 5000,
              speed: 1000,
              responsive: responsive,
              prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
              nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>'
            };
            
            $this.slick({ ...defaultOptions, ...options });
            $this.addClass('slick-initialized');
            console.log('Uren slick slider initialized');
          } catch (error) {
            console.error('Error initializing uren slick slider:', error);
          }
        }
      });
    }
  };

  const initializeQuantityButtons = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      try {
        // Initialize quantity buttons
        $('.qtybutton').off('click').on('click', function(this: HTMLElement) {
          const $input = $(this).siblings('.cart-plus-minus-box');
          if ($input.length) {
            const currentVal = parseInt($input.val() as string) || 0;
            
            if ($(this).hasClass('inc')) {
              $input.val(currentVal + 1);
            } else if (currentVal > 1) {
              $input.val(currentVal - 1);
            }
          }
        });

        // Initialize cart quantity buttons
        $('.cart-plus-minus .qtybutton').off('click').on('click', function(this: HTMLElement) {
          const $input = $(this).siblings('.cart-plus-minus-box');
          if ($input.length) {
            const currentVal = parseInt($input.val() as string) || 0;
            
            if ($(this).hasClass('inc')) {
              $input.val(currentVal + 1);
            } else if (currentVal > 1) {
              $input.val(currentVal - 1);
            }
          }
        });
      } catch (error) {
        console.error('Error initializing quantity buttons:', error);
      }
    }
  };

  const initializeQuickView = () => {
    // Quick View modal functionality is now handled by React components
    // No need to initialize here as it's handled in QuickViewModal
  };

  const initializeCountdown = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      try {
        // Add elExists function if it doesn't exist
        if (!$.fn.elExists) {
          $.fn.elExists = function () {
            return this.length > 0;
          };
        }

        // Initialize countdown functionality
        if ($(".countdown").elExists()) {
          $(".countdown").each(function(this: HTMLElement) {
            const $this = $(this);
            const $endDate = $this.data("countdown");
            const $format = $this.data("format");
            
            if ($endDate) {
              // Clear any existing interval for this countdown
              if ($this.data('countdown-interval')) {
                clearInterval($this.data('countdown-interval'));
              }
              
              // Create new interval
              const interval = setInterval(function () {
                makeTimer($endDate, $this, $format);
              }, 1000);
              
              // Store the interval ID for cleanup
              $this.data('countdown-interval', interval);
              
              // Initialize immediately
              makeTimer($endDate, $this, $format);
              
              console.log('Countdown initialized for date:', $endDate);
            }
          });
        }
      } catch (error) {
        console.error('Error initializing countdown:', error);
      }
    }
  };

  // Countdown timer function (copied from main.js)
  const makeTimer = (endDate: string, $this: any, format: string) => {
    try {
      const today = new Date();
      const BigDay = new Date(endDate);
      const msPerDay = 24 * 60 * 60 * 1000;
      const timeLeft = BigDay.getTime() - today.getTime();
      const e_daysLeft = timeLeft / msPerDay;
      let daysLeft = Math.floor(e_daysLeft);
      const e_hrsLeft = (e_daysLeft - daysLeft) * 24;
      const hrsLeft = Math.floor(e_hrsLeft);
      const e_minsLeft = (e_hrsLeft - hrsLeft) * 60;
      const minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60);
      const e_secsLeft = (e_minsLeft - minsLeft) * 60;
      const secsLeft = Math.floor((e_minsLeft - minsLeft) * 60);

      let yearsLeft = 0;
      let monthsLeft = 0;
      let weeksLeft = 0;

      if (format !== "short") {
        if (daysLeft > 365) {
          yearsLeft = Math.floor(daysLeft / 365);
          daysLeft = daysLeft % 365;
        }

        if (daysLeft > 30) {
          monthsLeft = Math.floor(daysLeft / 30);
          daysLeft = daysLeft % 30;
        }
        if (daysLeft > 7) {
          weeksLeft = Math.floor(daysLeft / 7);
          daysLeft = daysLeft % 7;
        }
      }

      const yearsLeftStr = yearsLeft < 10 ? "0" + yearsLeft : yearsLeft;
      const monthsLeftStr = monthsLeft < 10 ? "0" + monthsLeft : monthsLeft;
      const weeksLeftStr = weeksLeft < 10 ? "0" + weeksLeft : weeksLeft;
      const daysLeftStr = daysLeft < 10 ? "0" + daysLeft : daysLeft;
      const hrsLeftStr = hrsLeft < 10 ? "0" + hrsLeft : hrsLeft;
      const minsLeftStr = minsLeft < 10 ? "0" + minsLeft : minsLeft;
      const secsLeftStr = secsLeft < 10 ? "0" + secsLeft : secsLeft;
      const yearsText = yearsLeft > 1 ? "years" : "year";
      const monthsText = monthsLeft > 1 ? "months" : "month";
      const weeksText = weeksLeft > 1 ? "weeks" : "week";
      const daysText = daysLeft > 1 ? "days" : "day";
      const hourText = hrsLeft > 1 ? "hrs" : "hr";
      const minsText = minsLeft > 1 ? "mins" : "min";
      const secText = secsLeft > 1 ? "secs" : "sec";

      const $markup = {
        wrapper: $this.find(".countdown__item"),
        year: $this.find(".yearsLeft"),
        month: $this.find(".monthsLeft"),
        week: $this.find(".weeksLeft"),
        day: $this.find(".daysLeft"),
        hour: $this.find(".hoursLeft"),
        minute: $this.find(".minsLeft"),
        second: $this.find(".secsLeft"),
        yearTxt: $this.find(".yearsText"),
        monthTxt: $this.find(".monthsText"),
        weekTxt: $this.find(".weeksText"),
        dayTxt: $this.find(".daysText"),
        hourTxt: $this.find(".hoursText"),
        minTxt: $this.find(".minsText"),
        secTxt: $this.find(".secsText"),
      };

      const elNumber = $markup.wrapper.length;
      $this.addClass("item-" + elNumber);
      if ($markup.year.length) $markup.year.html(yearsLeftStr);
      if ($markup.yearTxt.length) $markup.yearTxt.html(yearsText);
      if ($markup.month.length) $markup.month.html(monthsLeftStr);
      if ($markup.monthTxt.length) $markup.monthTxt.html(monthsText);
      if ($markup.week.length) $markup.week.html(weeksLeftStr);
      if ($markup.weekTxt.length) $markup.weekTxt.html(weeksText);
      if ($markup.day.length) $markup.day.html(daysLeftStr);
      if ($markup.dayTxt.length) $markup.dayTxt.html(daysText);
      if ($markup.hour.length) $markup.hour.html(hrsLeftStr);
      if ($markup.hourTxt.length) $markup.hourTxt.html(hourText);
      if ($markup.minute.length) $markup.minute.html(minsLeftStr);
      if ($markup.minTxt.length) $markup.minTxt.html(minsText);
      if ($markup.second.length) $markup.second.html(secsLeftStr);
      if ($markup.secTxt.length) $markup.secTxt.html(secText);
    } catch (error) {
      console.error('Error in makeTimer:', error);
    }
  };

  const initializeAll = useCallback(() => {
    try {
      initializeShopPage();
      initializeSliders();
      initializeQuantityButtons();
      initializeQuickView();
      initializeCountdown();
    } catch (error) {
      console.error('Error in initializeAll:', error);
    }
  }, []);

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
      // Reduced delay to prevent scattering
      setTimeout(initializeAll, 100);
    }).catch((error) => {
      console.error('Error loading scripts:', error);
    });

    return () => {
      // Reset the initialization flag
      slidersInitialized = false;
      
      // Cleanup sliders on unmount to prevent conflicts
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        const $ = (window as any).jQuery;
   
        
        // Cleanup countdown intervals
        try {
          $('.countdown').each(function(this: HTMLElement) {
            const $this = $(this);
            const interval = $this.data('countdown-interval');
            if (interval) {
              clearInterval(interval);
            }
          });
        } catch (error) {
          console.error('Error cleaning up countdown intervals:', error);
        }
      }
    };
  }, [dependencies, loadScriptsSequentially, initializeAll]);

  return {
    loadScript,
    loadScriptsSequentially,
    initializeAll,
    initializeShopPage,
    initializeSliders,
    initializeQuantityButtons,
    initializeQuickView,
    initializeCountdown
  };
}; 