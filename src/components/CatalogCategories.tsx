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
  {
    key: 'sigma',
    title: 'SIGMA SERIES',
    description: 'Heavy‑duty protection engineered for endurance and reliability.',
    colorClass: 'gradient-sigma',
    image: '/assets/images/featured-categories/1.png',
    href: '/categories/sigma-series'
  },
  {
    key: 'apex',
    title: 'APEX SERIES',
    description: 'Multi‑grade performance oils optimized for modern engines.',
    colorClass: 'gradient-apex',
    image: '/assets/images/featured-categories/2.png',
    href: '/categories/apex-series'
  },
  {
    key: 'spark',
    title: 'SPARK',
    description: 'Efficient protection for gasoline engines with cleaner operation.',
    colorClass: 'gradient-spark',
    image: '/assets/images/featured-categories/3.png',
    href: '/categories/spark'
  },
  {
    key: 'sintec',
    title: 'SINTEC',
    description: 'Synthetic technology for extended drain intervals.',
    colorClass: 'gradient-sintec',
    image: '/assets/images/featured-categories/4.png',
    href: '/categories/sintec'
  },
  {
    key: 'sae',
    title: 'SAE SERIES',
    description: 'Straight‑grade formulations for classic and industrial engines.',
    colorClass: 'gradient-sae',
    image: '/assets/images/featured-categories/5.png',
    href: '/categories/sae-series'
  }
];

const CatalogCategories = () => {
  const currentLocale = useCurrentLocale();
  const createLocaleUrl = (path: string) => `/${currentLocale}${path}`;

  return (
    <div className="section-space">
      <div className="container-fluid">
        <div className="row">
          {SERIES.map((item) => (
            <div key={item.key} className="col-lg-4 col-md-6" style={{ marginBottom: 20 }}>
              <div className={`category-card ${item.colorClass}`}>
                <div className="category-card-content">
                  <h3 className="category-card-title">{item.title}</h3>
                  <p className="category-card-desc">{item.description}</p>
                </div>
                <div className="category-card-image">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={260}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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

export default CatalogCategories;


