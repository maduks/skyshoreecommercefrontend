'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

/* eslint-disable @typescript-eslint/no-explicit-any */

type SeriesKey = 'sigma' | 'apex' | 'spark' | 'sintec' | 'sae';

const SERIES: Array<{
  key: SeriesKey;
  title: string;
  description: string;
  colorClass: string;
  image: string;
  href: string;
}> = [
  { key: 'sigma', title: 'SIGMA SERIES', description: 'Heavy‑duty protection engineered for endurance.', colorClass: 'gradient-sigma', image: '/assets/images/featured-categories/sigmaseries.png', href: '/catalog/sigma' },
  { key: 'apex', title: 'APEX SERIES', description: 'Multi‑grade performance for modern engines.', colorClass: 'gradient-apex', image: '/assets/images/featured-categories/apexseries.png', href: '/catalog/apex' },
  { key: 'spark', title: 'SPARK', description: 'Cleaner, efficient protection for gasoline engines.', colorClass: 'gradient-spark', image: '/assets/images/featured-categories/sparkseries.png', href: '/catalog/spark' },
  { key: 'sintec', title: 'SINTEC', description: 'Synthetic technology for extended drain intervals.', colorClass: 'gradient-sintec', image: '/assets/images/featured-categories/sintecseries.png', href: '/catalog/sintec' },
  { key: 'sae', title: 'SAE SERIES', description: 'Straight‑grade formulations for classic engines.', colorClass: 'gradient-sae', image: '/assets/images/featured-categories/5.png', href: '/catalog/sae' },
];

const CatalogCategoriesSlider = () => {
  const currentLocale = useCurrentLocale();
  const createLocaleUrl = (path: string) => `/${currentLocale}${path}`;

  // Force slider re-initialization on back navigation to prevent scattered layout
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const reinitializeSlider = () => {
      // Use a more direct approach - force DOM cleanup and reinit
      const sliderElement = document.querySelector('.uren-slick-slider');
      if (!sliderElement) return;
      
      // Remove all slick-related classes and DOM modifications
      sliderElement.classList.remove('slick-initialized', 'slick-slider');
      
      // Remove slick-generated DOM elements
      const slickTrack = sliderElement.querySelector('.slick-track');
      const slickList = sliderElement.querySelector('.slick-list');
      const slickArrows = sliderElement.querySelectorAll('.slick-arrow');
      const slickDots = sliderElement.querySelectorAll('.slick-dots');
      
      if (slickTrack) {
        // Unwrap all slides from slick-track
        const slides = slickTrack.children;
        while (slides.length > 0) {
          const slide = slides[0];
          const parent = slide.parentNode;
          if (parent && parent !== sliderElement) {
            parent.parentNode?.insertBefore(slide, parent);
            if (parent.parentNode) {
              parent.parentNode.removeChild(parent);
            }
          } else {
            break;
          }
        }
      }
      
      // Remove slick-generated elements
      [slickList, ...slickArrows, ...slickDots].forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // Force a reflow to ensure DOM is clean
      void (sliderElement as HTMLElement).offsetHeight;
      
      // Re-trigger main.js initialization after a short delay
      setTimeout(() => {
        if (typeof (window as any).mainJsInit === 'function') {
          (window as any).mainJsInit();
        }
      }, 100);
    };
    
    // Run on mount
    reinitializeSlider();
    
    // Handle back navigation (bfcache restore)
    const handlePageShow = (e: PageTransitionEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((e as any).persisted) {
        setTimeout(reinitializeSlider, 50);
      }
    };
    
    // Handle visibility change (mobile back button)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(reinitializeSlider, 50);
      }
    };
    
    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="section-space">
      <div className="container-fluid">
        <div className="section-title_area" style={{marginBottom: 30}}>
          <span><span style={{color: '#061837'}}>Explore Our</span></span>
          <h2><span style={{color: '#f7bf06'}}>Product</span> Series</h2>
        </div>
        <div className="uren-slick-slider slider-navigation_style-1" data-slick-options='{"slidesToShow":3,"arrows":true,"dots":true,"spaceBetween":20,"infinite":false,"autoplay":false,"prevArrow":{"buttonClass":"slick-prev slick-btn","iconClass":"ion-ios-arrow-back"},"nextArrow":{"buttonClass":"slick-next slick-btn","iconClass":"ion-ios-arrow-forward"}}' data-slick-responsive='[{"breakpoint":1200,"settings":{"slidesToShow":2,"dots":true}},{"breakpoint":767,"settings":{"slidesToShow":1,"dots":true}}]'>
          {SERIES.map(item => (
            <div key={item.key} className="single-slide">
              <div className={`category-card category-card--tall ${item.colorClass}`}>
                <div className="category-card-content">
                  <h3 className="category-card-title">{item.title}</h3>
                  <p className="category-card-desc">{item.description}</p>
                </div>
                <div className="category-card-image large">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    width={480}
                    height={360}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    priority
                  />
                </div>
                <Link 
                  href={createLocaleUrl(item.href)} 
                  className="category-card-cta" 
                  aria-label={`Explore ${item.title}`}
                  onClick={() => {
                    // Auto-close any open dropdowns when series is selected
                    if (typeof window !== 'undefined' && (window as any).jQuery) {
                      const $ = (window as any).jQuery;
                      // Close any open dropdowns
                      $('.dropdown-menu').removeClass('show');
                      $('.dropdown-toggle').attr('aria-expanded', 'false');
                      // Close any mobile menu if open
                      $('.mobile-menu').removeClass('active');
                      $('.mobile-menu-toggle').removeClass('active');
                    }
                  }}
                >
                  <span className="cta-arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogCategoriesSlider;


