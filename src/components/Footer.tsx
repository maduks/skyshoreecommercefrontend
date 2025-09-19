'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';


const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const params = useParams();
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    // Get locale from params first, fallback to useLocale
    const currentLocale = (params?.locale as string) || locale;
    return `/${currentLocale}${path}`;
  };

  return (
    <div className="uren-footer_area">
      <div className="footer-top_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="newsletter-area">
                <h3 className="title">{t('newsletter')}</h3>
                <p className="short-desc">{t('newsletterDescription')}</p>
                <div className="newsletter-form_wrap">
                  <form action="http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="newsletters-form validate" target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll">
                      <div id="mc-form" className="mc-form subscribe-form">
                        <input id="mc-email" className="newsletter-input" type="email" autoComplete="off" placeholder={t('emailPlaceholder')} />
                        <button className="newsletter-btn" id="mc-submit">{t('subscribe')}</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-middle_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="footer-widgets_info">
                <div className="footer-widgets_logo">
                  <Link href={createLocaleUrl('/')}>
                    <Image src="/assets/images/menu/logo/logo_skylubs.png" alt="Uren's Footer Logo" width={200} height={50} />
                  </Link>
                </div>
                <div className="widget-short_desc">
                  <p>
                    {t('description')}</p>
                </div>
                <div className="widgets-essential_stuff">
                  <ul>
                    <li className="uren-address"><span>{t('address')}:</span> 19A Cairo Crescent, Wuse II, Abuja, Nigeria</li>
                    {/* <li className="uren-phone"><span>Call
                    Us:</span> <a href="tel://+123123321345">(+234) 209 292 0777</a>
                    </li> */}
                    <li className="uren-email"><span>{t('email')}:</span> <a href="mailto://sales@skyshorelubs.com">sales@skyshorelubs.com</a></li>
                  </ul>
                </div>
                <div className="uren-social_link">
                  <ul>
                    <li className="facebook">
                      <a href="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title="Facebook">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li className="twitter">
                      <a href="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                        <i className="fab fa-twitter-square"></i>
                      </a>
                    </li>
                    <li className="google-plus">
                      <a href="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google Plus">
                        <i className="fab fa-google-plus"></i>
                      </a>
                    </li>
                    <li className="instagram">
                      <a href="https://rss.com/" data-toggle="tooltip" target="_blank" title="Instagram">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="footer-widgets_area">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <div className="footer-widgets_title">
                      <h3>{t('information.title')}</h3>
                    </div>
                    <div className="footer-widgets">
                      <ul>
                        <li><Link href={createLocaleUrl('/about')}>{t('information.about')}</Link></li>
                        <li><Link href={createLocaleUrl('/privacy-policy')}>{t('information.privacyPolicy')}</Link></li>
                        <li><Link href={createLocaleUrl('/terms-conditions')}>{t('information.termsConditions')}</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="footer-widgets_title">
                      <h3>{t('customerService.title')}</h3>
                    </div>
                    <div className="footer-widgets">
                      <ul>
                        <li><Link href={createLocaleUrl('/contact')}>{t('customerService.contactUs')}</Link></li>
                        <li><Link href={createLocaleUrl('/blog')}>{t('customerService.blog')}</Link></li>
                      </ul>
                    </div>
                  </div>
                  {/* <div style={{display:"none"}} className="col-lg-3 col-md-6">
                    <div className="footer-widgets_title">
                      <h3>{t('more.title')}</h3>
                    </div>
                    <div className="footer-widgets">
                      <ul>
                        <li><a href="javascript:void(0)">{t('more.about')}</a></li>
                        <li><a href="javascript:void(0)">{t('more.deliveryInformation')}</a></li>
                        <li><a href="javascript:void(0)">{t('more.privacyPolicy')}</a></li>
                        <li><a href="javascript:void(0)">{t('more.termsConditions')}</a></li>
                      </ul>
                    </div>
                  </div> */}
                  <div className="col-lg-3 col-md-6">
                    <div className="footer-widgets_title">
                      <h3>{t('more.title')}</h3> 
                    </div>
                    <div className="footer-widgets">
                      <ul>
                        <li><Link href={createLocaleUrl('/my-account')}>{t('more.myAccount')}</Link></li>
                        <li><Link href={createLocaleUrl('/order-history')}>{t('more.orderHistory')}</Link></li>
                        <li><Link href={createLocaleUrl('/wishlist')}>{t('more.wishlist')}</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Footer; 