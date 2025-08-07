'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="uren-footer_area">
      <div className="footer-top_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="newsletter-area">
                <h3 className="title">Join Our Newsletter Now</h3>
                <p className="short-desc">Get E-mail updates about our latest shop and special offers.</p>
                <div className="newsletter-form_wrap">
                  <form action="http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="newsletters-form validate" target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll">
                      <div id="mc-form" className="mc-form subscribe-form">
                        <input id="mc-email" className="newsletter-input" type="email" autoComplete="off" placeholder="Enter your email" />
                        <button className="newsletter-btn" id="mc-submit">Subscribe</button>
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
                  <Link href="#">
                    <Image src="/assets/images/menu/logo/1.png" alt="Uren's Footer Logo" width={150} height={50} />
                  </Link>
                </div>
                <div className="widget-short_desc">
                  <p>We are a team of designers and developers that create high quality HTML Template &
                    Woocommerce, Shopify Theme.
                  </p>
                </div>
                <div className="widgets-essential_stuff">
                  <ul>
                    <li className="uren-address"><span>Address:</span> 19A Cairo Crescent, Wuse II, Abuja, Nigeria</li>
                    <li className="uren-phone"><span>Call
                    Us:</span> <a href="tel://+123123321345">(+234) 209 292 0777</a>
                    </li>
                    <li className="uren-email"><span>Email:</span> <a href="mailto://sales@skyshorelubs.com">sales@skyshorelubs.com</a></li>
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
                      <h3>Information</h3>
                    </div>
                    <div className="footer-widgets">
                      <ul>
                        <li><a href="javascript:void(0)">About Us</a></li>
                        <li><a href="javascript:void(0)">Delivery Information</a></li>
                        <li><a href="javascript:void(0)">Privacy Policy</a></li>
                        <li><a href="javascript:void(0)">Terms & Conditions</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="footer-widgets_title">
                      <h3>Customer Service</h3>
                    </div>
                    <div className="footer-widgets">
                      <ul>
                        <li><a href="javascript:void(0)">Contact Us</a></li>
                        <li><a href="javascript:void(0)">Returns</a></li>
                        <li><a href="javascript:void(0)">Site Map</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="footer-widgets_title">
                      <h3>Extras</h3>
                    </div>
                    <div className="footer-widgets">
                      <ul>
                        <li><a href="javascript:void(0)">About Us</a></li>
                        <li><a href="javascript:void(0)">Delivery Information</a></li>
                        <li><a href="javascript:void(0)">Privacy Policy</a></li>
                        <li><a href="javascript:void(0)">Terms & Conditions</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="footer-widgets_title">
                      <h3>My Account</h3>
                    </div>
                    <div className="footer-widgets">
                      <ul>
                        <li><a href="javascript:void(0)">My Account</a></li>
                        <li><a href="javascript:void(0)">Order History</a></li>
                        <li><a href="javascript:void(0)">Wish List</a></li>
                        <li><a href="javascript:void(0)">Newsletter</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom_area">
        <div className="container-fluid">
          <div className="footer-bottom_nav">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="copyright">
                  <span><a href="templateshub.net">Templateshub</a></span>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="payment">
                  <a href="#">
                    <Image src="/assets/images/footer/payment/1.png" alt="Uren's Payment Method" width={200} height={30} />
                  </a>
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