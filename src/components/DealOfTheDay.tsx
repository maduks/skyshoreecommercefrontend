'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DealOfTheDay = () => {
  return (
    <div className="special-product_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title_area">
              <span>Special Offer Limited Time</span>
              <h3>Deal Of The Day</h3>
            </div>
            <div className="special-product_slider uren-slick-slider slider-navigation_style-1 img-hover-effect_area" data-slick-options='{
            "slidesToShow": 2,
            "arrows" : true
            }' data-slick-responsive='[
                                {"breakpoint":768, "settings": {"slidesToShow": 1}}
                            ]'>
              <div className="slide-item">
                <div className="inner-slide">
                  <div className="single-product">
                    <div className="product-img">
                      <Link href="/single-product">
                        <Image className="primary-img" src="/assets/images/product/medium-size/1-1.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                        <Image className="secondary-img" src="/assets/images/product/medium-size/4-1.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                      </Link>
                      <div className="sticker-area-2">
                        <span className="sticker-2">-33%</span>
                        <span className="sticker">New</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="product-desc_info">
                        <div className="uren-countdown_area">
                          <span className="product-offer">Hurry up! Offer ends in:</span>
                          <div className="countdown-wrap">
                            <div className="countdown item-4" data-countdown="2024/12/31" data-format="short">
                              <div className="countdown__item">
                                <span className="countdown__time daysLeft">15</span>
                                <span className="countdown__text daysText">Days</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time hoursLeft">12</span>
                                <span className="countdown__text hoursText">Hours</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time minsLeft">30</span>
                                <span className="countdown__text minsText">Mins</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time secsLeft">45</span>
                                <span className="countdown__text secsText">Secs</span>
                              </div>
                            </div>
                          </div>
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
                        <h6 className="product-name"><Link href="/single-product">Veniam officiis voluptates</Link></h6>
                        <div className="price-box">
                          <span className="new-price new-price-2">$98.00</span>
                          <span className="old-price">$146.00</span>
                        </div>
                        <div className="add-actions">
                          <ul>
                            <li style={{marginRight: '10px'}}><Link className="uren-add_cart" href="/cart" data-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="ion-bag"></i>Add To Cart</Link></li>
                            {/* <li><Link className="uren-wishlist" href="/wishlist" data-toggle="tooltip" data-placement="top" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></Link></li> */}
                            <li className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><Link href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="Quick View"><i className="ion-android-open"></i></Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide-item">
                <div className="inner-slide">
                  <div className="single-product">
                    <div className="product-img">
                      <Link href="/single-product">
                        <Image className="primary-img" src="/assets/images/product/medium-size/4-2.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                        <Image className="secondary-img" src="/assets/images/product/medium-size/5-2.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                      </Link>
                      <div className="sticker-area-2">
                        <span className="sticker-2">-10%</span>
                        <span className="sticker">New</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="product-desc_info">
                        <div className="uren-countdown_area">
                          <span className="product-offer">Hurry up! Offer ends in:</span>
                          <div className="countdown-wrap">
                            <div className="countdown item-4" data-countdown="2024/11/30" data-format="short">
                              <div className="countdown__item">
                                <span className="countdown__time daysLeft">10</span>
                                <span className="countdown__text daysText">Days</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time hoursLeft">08</span>
                                <span className="countdown__text hoursText">Hours</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time minsLeft">25</span>
                                <span className="countdown__text minsText">Mins</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time secsLeft">30</span>
                                <span className="countdown__text secsText">Secs</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rating-box">
                          <ul>
                            <li><i className="ion-android-star"></i></li>
                            <li><i className="ion-android-star"></i></li>
                            <li><i className="ion-android-star"></i></li>
                            <li><i className="ion-android-star"></i></li>
                            <li><i className="ion-android-star"></i></li>
                          </ul>
                        </div>
                        <h6 className="product-name"><Link href="/single-product">Accusantium corporis odio</Link></h6>
                        <div className="price-box">
                          <span className="new-price new-price-2">$110.00</span>
                          <span className="old-price">$122.00</span>
                        </div>
                        <div className="add-actions">
                          <ul>
                            <li style={{marginRight: '10px'}}><Link className="uren-add_cart" href="/cart" data-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="ion-bag"></i>Add To Cart</Link></li>
                            {/* <li><Link className="uren-wishlist" href="/wishlist" data-toggle="tooltip" data-placement="top" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></Link></li> */}
                            <li className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><Link href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="Quick View"><i className="ion-android-open"></i></Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide-item">
                <div className="inner-slide">
                  <div className="single-product">
                    <div className="product-img">
                      <Link href="/single-product">
                        <Image className="primary-img" src="/assets/images/product/medium-size/6-1.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                        <Image className="secondary-img" src="/assets/images/product/medium-size/6-2.jpg" alt="Uren's Product Image" width={300} height={300} style={{ objectFit: 'cover' }} />
                      </Link>
                      <div className="sticker-area-2">
                        <span className="sticker-2">-15%</span>
                        <span className="sticker">New</span>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="product-desc_info">
                        <div className="uren-countdown_area">
                          <span className="product-offer">Hurry up! Offer ends in:</span>
                          <div className="countdown-wrap">
                            <div className="countdown item-4" data-countdown="2024/10/31" data-format="short">
                              <div className="countdown__item">
                                <span className="countdown__time daysLeft">05</span>
                                <span className="countdown__text daysText">Days</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time hoursLeft">18</span>
                                <span className="countdown__text hoursText">Hours</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time minsLeft">42</span>
                                <span className="countdown__text minsText">Mins</span>
                              </div>
                              <div className="countdown__item">
                                <span className="countdown__time secsLeft">15</span>
                                <span className="countdown__text secsText">Secs</span>
                              </div>
                            </div>
                          </div>
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
                        <h6 className="product-name"><Link href="/single-product">Dolorem voluptates aut</Link></h6>
                        <div className="price-box">
                          <span className="new-price new-price-2">$250.00</span>
                          <span className="old-price">$295.00</span>
                        </div>
                        <div className="add-actions">
                          <ul>
                            <li style={{marginRight: '10px'}}><Link className="uren-add_cart" href="/cart" data-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="ion-bag"></i>Add To Cart</Link></li>
                            {/* <li><Link className="uren-wishlist" href="/wishlist" data-toggle="tooltip" data-placement="top" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></Link></li> */}
                            <li className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><Link href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="Quick View"><i className="ion-android-open"></i></Link></li>
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
      </div>
    </div>
  );
};

export default DealOfTheDay; 