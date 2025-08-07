'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedCategories = () => {
  return (
    <div className="featured-categories_area">
      <div className="container-fluid">
        <div className="section-title_area">
          <span>Top Featured Collections</span>
          <h3>Featured Categories</h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="featured-categories_slider uren-slick-slider slider-navigation_style-1" 
                 data-slick-options='{"slidesToShow": 4, "spaceBetween": 30, "arrows" : true}' 
                 data-slick-responsive='[{"breakpoint":1599, "settings": {"slidesToShow": 3}}, {"breakpoint":1200, "settings": {"slidesToShow": 2}}, {"breakpoint":768, "settings": {"slidesToShow": 1}}]'>
              
              <div className="slide-item">
                <div className="slide-inner">
                  <div className="slide-image_area">
                    <Link href="/shop">
                      <Image 
                        src="/assets/images/featured-categories/1.png" 
                        alt="Featured Categories" 
                        width={120} 
                        height={120}
                        layout="responsive"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </Link>
                  </div>
                  <div className="slide-content_area">
                    <h3><Link href="/shop">Brakes & Rotors</Link></h3>
                    <span>(8 Products)</span>
                    <ul className="product-item">
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Accessories</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Auto GPS Units</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Fitness GPS Units</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Handheld GPS Units</Link>
                      </li>
                    </ul>
                    <div className="uren-btn-ps_left">
                      <Link className="uren-btn" href="/shop">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-item">
                <div className="slide-inner">
                  <div className="slide-image_area">
                    <Link href="/shop">
                      <Image 
                        src="/assets/images/featured-categories/2.png" 
                        alt="Featured Categories" 
                        width={120} 
                        height={120}
                        layout="responsive"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </Link>
                  </div>
                  <div className="slide-content_area">
                    <h3><Link href="/shop">Interior</Link></h3>
                    <span>(0 Products)</span>
                    <ul className="product-item">
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Dash Kits</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Floor Mats</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Seat Covers</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Steering Wheels</Link>
                      </li>
                    </ul>
                    <div className="uren-btn-ps_left">
                      <Link className="uren-btn" href="/shop">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-item">
                <div className="slide-inner">
                  <div className="slide-image_area">
                    <Link href="/shop">
                      <Image 
                        src="/assets/images/featured-categories/3.png" 
                        alt="Featured Categories" 
                        width={120} 
                        height={120}
                        layout="responsive"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </Link>
                  </div>
                  <div className="slide-content_area">
                    <h3><Link href="/shop">Lighting</Link></h3>
                    <span>(8 Products)</span>
                    <ul className="product-item">
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Smart Appliances</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Smart Appliances</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Smart Energy</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Smart Health</Link>
                      </li>
                    </ul>
                    <div className="uren-btn-ps_left">
                      <Link className="uren-btn" href="/shop">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-item">
                <div className="slide-inner">
                  <div className="slide-image_area">
                    <Link href="/shop">
                      <Image 
                        src="/assets/images/featured-categories/4.png" 
                        alt="Featured Categories" 
                        width={120} 
                        height={120}
                        layout="responsive"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </Link>
                  </div>
                  <div className="slide-content_area">
                    <h3><Link href="/shop">Performance</Link></h3>
                    <span>(13 Products)</span>
                    <ul className="product-item">
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Home Theater</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Speakers Systems</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Sports</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Stereo Receivers</Link>
                      </li>
                    </ul>
                    <div className="uren-btn-ps_left">
                      <Link className="uren-btn" href="/shop">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-item">
                <div className="slide-inner">
                  <div className="slide-image_area">
                    <Link href="/shop">
                      <Image 
                        src="/assets/images/featured-categories/5.png" 
                        alt="Featured Categories" 
                        width={120} 
                        height={120}
                        layout="responsive"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </Link>
                  </div>
                  <div className="slide-content_area">
                    <h3><Link href="/shop">Suspension Systems</Link></h3>
                    <span>(15 Products)</span>
                    <ul className="product-item">
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Clothing</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Jewelry</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Sunglasses</Link>
                      </li>
                    </ul>
                    <div className="uren-btn-ps_left">
                      <Link className="uren-btn" href="/shop">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-item">
                <div className="slide-inner">
                  <div className="slide-image_area">
                    <Link href="/shop">
                      <Image 
                        src="/assets/images/featured-categories/6.png" 
                        alt="Featured Categories" 
                        width={120} 
                        height={120}
                        layout="responsive"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </Link>
                  </div>
                  <div className="slide-content_area">
                    <h3><Link href="/shop">Wheels & Tires</Link></h3>
                    <span>(13 Products)</span>
                    <ul className="product-item">
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Cellphone Accessories</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Mobile Hotspots & Plans</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Phones With Plans</Link>
                      </li>
                      <li>
                        <Link href="/shop"><i className="fa fa-arrow-right"></i> Prepaid Plans</Link>
                      </li>
                    </ul>
                    <div className="uren-btn-ps_left">
                      <Link className="uren-btn" href="/shop">Read More</Link>
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

export default FeaturedCategories; 