'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import HeroSlider from '@/components/HeroSlider';
import ShippingInfo from '@/components/ShippingInfo';
import BannerSection from '@/components/BannerSection';
import NewArrivals from '@/components/NewArrivals';
import DealOfTheDay from '@/components/DealOfTheDay';
import PopularSearch from '@/components/PopularSearch';
import BlogSection from '@/components/BlogSection';

export default function Home() {
  const t = useTranslations('pages.home');
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <ShippingInfo />
      {/* <FeaturedCategories /> */}
      <BannerSection />
      <DealOfTheDay />
      <PopularSearch />
      <BlogSection />
      
      {/* Newsletter Popup */}
      <div className="popup_wrapper">
        <div className="test">
          <span className="popup_off">{t('close')}</span>
          <div className="subscribe_area text-center">
            <h2>{t('newsletter')}</h2>
            <p>{t('newsletterDescription')}</p>
            <div className="subscribe-form-group">
              <form action="http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                <div id="mc_embed_signup_scroll">
                  <div id="mc-form" className="mc-form subscribe-form">
                    <input id="mc-email" className="newsletter-input" type="email" autoComplete="off" placeholder={t('emailPlaceholder')} />
                    <button className="newsletter-btn" id="mc-submit">{t('subscribe')}</button>
                  </div>
                </div>
              </form>
            </div>
            <ul className="newsletter-social">
              <li><a href="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title="Facebook"><i className="fab fa-facebook"></i></a></li>
              <li><a href="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter"><i className="fab fa-twitter-square"></i></a></li>
              <li><a href="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube"><i className="fab fa-youtube"></i></a></li>
              <li><a href="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google Plus"><i className="fab fa-google-plus"></i></a></li>
              <li><a href="https://rss.com/" data-toggle="tooltip" target="_blank" title="Instagram"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
