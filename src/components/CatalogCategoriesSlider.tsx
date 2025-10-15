'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

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

  // Ensure slick re-initializes safely on back/forward navigation
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    type JQ = {
      fn?: { slick?: unknown };
      (selector: string): {
        length: number;
        hasClass: (cls: string) => boolean;
        slick: (cmdOrOptions?: string | Record<string, unknown>) => void;
        removeClass: (cls: string) => void;
        find: (sel: string) => { children: () => { unwrap: () => void }; remove: () => void };
        data: (key: string) => string;
      };
    };
    const w = window as unknown as { jQuery?: JQ };
    const jQueryMaybe = w.jQuery;
    if (!jQueryMaybe || !jQueryMaybe.fn || !jQueryMaybe.fn.slick) return;

    const $ = jQueryMaybe as unknown as (selector: string) => ReturnType<JQ>;
    const $slider = $('.uren-slick-slider');

    // If slick left residual classes, clean them before main.js runs
    if ($slider.length && $slider.hasClass('slick-initialized')) {
      try {
        $slider.slick('unslick');
      } catch {}
      $slider.removeClass('slick-initialized slick-slider');
      $slider.find('.slick-track, .slick-list').children().unwrap();
      $slider.find('.slick-arrow, .slick-dots').remove();
    }

    // Proactively re-init here using data-slick-options, similar to other sliders
    try {
      const rawOptions = $slider.data('slick-options') as unknown;
      let options: Record<string, unknown> | undefined;
      if (typeof rawOptions === 'string') {
        try {
          options = JSON.parse(rawOptions) as Record<string, unknown>;
        } catch {
          options = undefined;
        }
      } else if (rawOptions && typeof rawOptions === 'object') {
        options = rawOptions as Record<string, unknown>;
      }

      if ($slider.length && !$slider.hasClass('slick-initialized') && options) {
        // Ensure arrows config exists so icons render instead of default text
        if (options.arrows === undefined) options.arrows = true;
        if (options.prevArrow === undefined) {
          options.prevArrow = { buttonClass: 'slick-prev slick-btn', iconClass: 'ion-ios-arrow-back' } as unknown as Record<string, unknown>;
        }
        if (options.nextArrow === undefined) {
          options.nextArrow = { buttonClass: 'slick-next slick-btn', iconClass: 'ion-ios-arrow-forward' } as unknown as Record<string, unknown>;
        }
        $slider.slick(options);
      }
    } catch {}
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
                <Link href={createLocaleUrl(item.href)} className="category-card-cta" aria-label={`Explore ${item.title}`}>
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


