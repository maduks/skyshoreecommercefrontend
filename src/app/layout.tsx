import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScriptLoader from '@/components/ScriptLoader';
import { Provider } from '@/store/Provider';

export const metadata: Metadata = {
  title: 'Skyshore - Car Accessories & Parts',
  description: 'Premium car accessories and automotive parts for your vehicle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider>
          <div className="main-wrapper">
            <Header />
            {children}
            <Footer />
            <ScriptLoader />

            {/* Quick View Modal */}
            <div className="modal fade modal-wrapper" id="exampleModalCenter">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modal-inner-area sp-area row">
                      <div className="col-lg-5">
                        <div className="sp-img_area">
                          <div className="sp-img_slider slick-img-slider uren-slick-slider" data-slick-options='{
                          "slidesToShow": 1,
                          "arrows": false,
                          "fade": true,
                          "draggable": false,
                          "swipe": false,
                          "asNavFor": ".sp-img_slider-nav"
                          }'>
                            <div className="single-slide red">
                              <img src="/assets/images/product/large-size/1.jpg" alt="Uren's Product Image" />
                            </div>
                            <div className="single-slide orange">
                              <img src="/assets/images/product/large-size/2.jpg" alt="Uren's Product Image" />
                            </div>
                            <div className="single-slide brown">
                              <img src="/assets/images/product/large-size/3.jpg" alt="Uren's Product Image" />
                            </div>
                            <div className="single-slide umber">
                              <img src="/assets/images/product/large-size/4.jpg" alt="Uren's Product Image" />
                            </div>
                            <div className="single-slide black">
                              <img src="/assets/images/product/large-size/5.jpg" alt="Uren's Product Image" />
                            </div>
                            <div className="single-slide golden">
                              <img src="/assets/images/product/large-size/6.jpg" alt="Uren's Product Image" />
                            </div>
                          </div>
                          <div className="sp-img_slider-nav slick-slider-nav uren-slick-slider slider-navigation_style-3" data-slick-options='{
                         "slidesToShow": 4,
                          "asNavFor": ".sp-img_slider",
                         "focusOnSelect": true,
                         "arrows" : true,
                         "spaceBetween": 30
                        }' data-slick-responsive='[
                          {"breakpoint":1501, "settings": {"slidesToShow": 3}},
                          {"breakpoint":992, "settings": {"slidesToShow": 4}},
                          {"breakpoint":768, "settings": {"slidesToShow": 3}},
                          {"breakpoint":575, "settings": {"slidesToShow": 2}}
                      ]'>
                            <div className="single-slide red">
                              <img src="/assets/images/product/small-size/1.jpg" alt="Uren's Product Thumnail" />
                            </div>
                            <div className="single-slide orange">
                              <img src="/assets/images/product/small-size/2.jpg" alt="Uren's Product Thumnail" />
                            </div>
                            <div className="single-slide brown">
                              <img src="/assets/images/product/small-size/3.jpg" alt="Uren's Product Thumnail" />
                            </div>
                            <div className="single-slide umber">
                              <img src="/assets/images/product/small-size/4.jpg" alt="Uren's Product Thumnail" />
                            </div>
                            <div className="single-slide black">
                              <img src="/assets/images/product/small-size/5.jpg" alt="Uren's Product Thumnail" />
                            </div>
                            <div className="single-slide golden">
                              <img src="/assets/images/product/small-size/6.jpg" alt="Uren's Product Thumnail" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-7 col-lg-6">
                        <div className="sp-content">
                          <div className="sp-heading">
                            <h5><a href="#">Dolorem odio provident ut nihil</a></h5>
                          </div>
                          <div className="rating-box">
                            <ul>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li className="silver-color"><i className="ion-android-star"></i></li>
                              <li className="silver-color"><i className="ion-android-star"></i></li>
                            </ul>
                          </div>
                          <div className="price-box">
                            <span className="new-price new-price-2">$194.00</span>
                            <span className="old-price">$241.00</span>
                          </div>
                          <div className="sp-essential_stuff">
                            <ul>
                              <li>Brands <a href="javascript:void(0)">Buxton</a></li>
                              <li>Product Code: <a href="javascript:void(0)">Product 16</a></li>
                              <li>Reward Points: <a href="javascript:void(0)">100</a></li>
                              <li>Availability: <a href="javascript:void(0)">In Stock</a></li>
                              <li>EX Tax: <a href="javascript:void(0)"><span>$453.35</span></a></li>
                              <li>Price in reward points: <a href="javascript:void(0)">400</a></li>
                            </ul>
                          </div>
                          <div className="color-list_area">
                            <div className="color-list_heading">
                              <h4>Available Options</h4>
                            </div>
                            <span className="sub-title">Color</span>
                            <div className="color-list">
                              <a href="javascript:void(0)" className="single-color active" data-swatch-color="red">
                                <span className="bg-red_color"></span>
                                <span className="color-text">Red (+$150)</span>
                              </a>
                              <a href="javascript:void(0)" className="single-color" data-swatch-color="orange">
                                <span className="burnt-orange_color"></span>
                                <span className="color-text">Orange (+$170)</span>
                              </a>
                              <a href="javascript:void(0)" className="single-color" data-swatch-color="brown">
                                <span className="brown_color"></span>
                                <span className="color-text">Brown (+$120)</span>
                              </a>
                              <a href="javascript:void(0)" className="single-color" data-swatch-color="umber">
                                <span className="raw-umber_color"></span>
                                <span className="color-text">Umber (+$125)</span>
                              </a>
                              <a href="javascript:void(0)" className="single-color" data-swatch-color="black">
                                <span className="black_color"></span>
                                <span className="color-text">Black (+$125)</span>
                              </a>
                              <a href="javascript:void(0)" className="single-color" data-swatch-color="golden">
                                <span className="golden_color"></span>
                                <span className="color-text">Golden (+$125)</span>
                              </a>
                            </div>
                          </div>
                          <div className="quantity">
                            <label>Quantity</label>
                            <div className="cart-plus-minus">
                              <input className="cart-plus-minus-box" value="1" type="text" readOnly />
                              <div className="dec qtybutton"><i className="fa fa-angle-down"></i></div>
                              <div className="inc qtybutton"><i className="fa fa-angle-up"></i></div>
                            </div>
                          </div>
                          <div className="uren-group_btn">
                            <ul>
                              <li><a href="/cart" className="add-to_cart">Cart To Cart</a></li>
                              <li><a href="/cart"><i className="ion-android-favorite-outline"></i></a></li>
                              <li><a href="/cart"><i className="ion-ios-shuffle-strong"></i></a></li>
                            </ul>
                          </div>
                          <div className="uren-tag-line">
                            <h6>Tags:</h6>
                            <a href="javascript:void(0)">Ring</a>,
                            <a href="javascript:void(0)">Necklaces</a>,
                            <a href="javascript:void(0)">Braid</a>
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
                              <li className="youtube">
                                <a href="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube">
                                  <i className="fab fa-youtube"></i>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
