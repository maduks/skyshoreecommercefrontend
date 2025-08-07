'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  

  return (
    <>
      {/* Header Main Area */}
      <header className="header-main_area bg--sapphire">
        {/* Top Header */}
        <div className="header-top_area d-lg-block d-none">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7 col-lg-8">
                <div className="main-menu_area position-relative">
                  <nav className="main-nav">
                    <ul>
                      <li className="dropdown-holder active">
                        <Link onClick={() => router.push('/home')} href="/">Home</Link>
                      
                      </li>
                      <li className="megamenu-holder">
                        <Link href="/shop">Shop </Link>
                     
                      </li>
                    
                      <li className=""><Link href="/about">About Us</Link></li>
                      <li className=""><Link href="/contact">Contact</Link></li>
                      <li className=""><Link href="/blog">Blog </Link>
                    
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-5 col-lg-4">
                <div className="ht-right_area">
                  <div className="ht-menu">
                    <ul>
                 
                      <li>
                        <Link href="#">Language <i className="fa fa-chevron-down"></i></Link>
                        <ul className="ht-dropdown">
                          <li className="active">
                            <Link href="#">
                              <Image src="/assets/images/menu/icon/1.jpg" alt="Language Icon" width={20} height={15} />
                              English
                            </Link>
                          </li>
                         
                        </ul>
                      </li>
                      <li>
                        <Link href="/my-account">My Account<i className="fa fa-chevron-down"></i></Link>
                        <ul className="ht-dropdown ht-my_account">
                          <li><Link href="/register">Register</Link></li>
                          <li className="active"><Link href="/login">Login</Link></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <div className="header-top_area header-sticky bg--sapphire">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8 col-lg-7 d-lg-block d-none">
                <div className="main-menu_area position-relative">
                  <nav className="main-nav">
                    <ul>
                      <li className="dropdown-holder active">
                        <Link href="/">Home</Link>
                      
                      </li>
                      <li className="megamenu-holder">
                        <Link href="/shop">Shop </Link>
                      
                      </li>
                    
                      <li className=""><Link href="/about">About Us</Link></li>
                      <li className=""><Link href="/contact">Contact</Link></li>
                      <li className=""><Link href="/blog">Blog </Link>
                    
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-sm-3 d-block d-lg-none">
                <div className="header-logo_area header-sticky_logo">
                  <Link href="/">
                    <Image src="/assets/images/menu/logo/logo_skylubs.png" alt="Skyshore Logo" width={150} height={50} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-sm-9">
                <div className="header-right_area">
                  <ul>
                    <li className="mobile-menu_wrap d-flex d-lg-none">
                      <button 
                        className="mobile-menu_btn toolbar-btn color--white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      >
                        <i className="ion-navicon"></i>
                      </button>
                    </li>
                    <li className="minicart-wrap">
                        <Link href="#miniCart" className="minicart-btn toolbar-btn">
                            <div className="minicart-count_area">
                                <span className="item-count">3</span>
                                <i className="ion-bag"></i>
                            </div>
                            <div className="minicart-front_text">
                                <span>Cart:</span>
                                <span className="total-price">462.5</span>
                            </div>
                        </Link>
                    </li>
                    <li className="contact-us_wrap">
                      <Link href="tel://+123123321345">
                        <i className="ion-android-call"></i>+(234)811 322 0000
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Header */}
        <div className="header-middle_area">
          <div className="container-fluid">
            <div className="row">
              <div className="custom-logo_col col-12">
                <div className="header-logo_area">
                  <Link href="/">
                    <Image src="/assets/images/menu/logo/logo_skylubs.png" style={{marginBottom:10}} alt="Skyshore Logo" width={300} height={50} />
                  </Link>
                </div>
              </div>
              <div className="custom-category_col col-12">
                <div className="category-menu category-menu-hidden">
                  <div className="category-heading">
                    <h2 className="categories-toggle">
                      <span>Shop By</span>
                      <span>Category</span>
                    </h2>
                  </div>
                  <div id="cate-toggle" className="category-menu-list">
                    <ul>
                      {/* <li className="right-menu">
                        <Link href="/shop">Car Parts</Link>
                        <ul className="cat-mega-menu">
                          <li className="right-menu cat-mega-title">
                            <Link href="/shop">Active body control</Link>
                            <ul>
                              <li><Link href="/shop">Aluminum Nonstick</Link></li>
                              <li><Link href="/shop">Calphalon</Link></li>
                              <li><Link href="/shop">Contemporary</Link></li>
                              <li><Link href="/shop">Hard-Anodized</Link></li>
                            </ul>
                          </li>
                        
                        </ul>
                      </li> */}
                   
                      <li><Link href="/shop">Engine Oil Parts</Link></li>
                      <li><Link href="/shop">Diesel Oil</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="custom-search_col col-12">
                <div className="hm-form_area">
                  <form action="#" className="hm-searchbox">
                    <select className="nice-select select-search-category">
                      <option value="0">All Categories</option>
                      <option value="10">Engine Oil </option>
                      <option value="11">Diesel Oil</option>
                      <option value="12">Gear Oil</option>
                      <option value="13">Brake Fluid</option>
                      <option value="14">Coolant</option>
                    </select>
                    <input type="text" placeholder="Enter your search key ..." />
                    <button className="header-search_btn" type="submit">
                      <i className="ion-ios-search-strong"><span>Search</span></i>
                    </button>
                  </form>
                </div>
              </div>
              <div className="custom-cart_col col-12">
                <div className="header-right_area">
                  <ul>
                    <li className="mobile-menu_wrap d-flex d-lg-none">
                      <button 
                        className="mobile-menu_btn toolbar-btn color--white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      >
                        <i className="ion-navicon"></i>
                      </button>
                    </li>
                    <li className="minicart-wrap">
                        <Link href="#miniCart" className="minicart-btn toolbar-btn">
                            <div className="minicart-count_area">
                                <span className="item-count">3</span>
                                <i className="ion-bag"></i>
                            </div>
                            <div className="minicart-front_text">
                                <span>Cart:</span>
                                <span className="total-price">462.4</span>
                            </div>
                        </Link>
                    </li>
                    <li className="contact-us_wrap">
                      <Link href="tel://+123123321345">
                        <i className="ion-android-call"></i>+(234)811 322 0000
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mini Cart */}
      <div className={`offcanvas-minicart_wrapper ${isMiniCartOpen ? 'open' : ''}`} id="miniCart">
        <div className="offcanvas-menu-inner">
          <button 
            className="btn-close"
            onClick={() => setIsMiniCartOpen(false)}
          >
            <i className="ion-android-close"></i>
          </button>
          <div className="minicart-content">
            <div className="minicart-heading">
              <h4>Shopping Cart</h4>
            </div>
            <ul className="minicart-list">
              <li className="minicart-product">
                <button className="product-item_remove">
                  <i className="ion-android-close"></i>
                </button>
                <div className="product-item_img">
                  <Image src="/assets/images/product/small-size/1.jpg" alt="Product Image" width={80} height={80} />
                </div>
                <div className="product-item_content">
                  <Link className="product-item_title" href="/product">Car Accessory 1</Link>
                  <span className="product-item_quantity">1 x $145.80</span>
                </div>
              </li>
              <li className="minicart-product">
                <button className="product-item_remove">
                  <i className="ion-android-close"></i>
                </button>
                <div className="product-item_img">
                  <Image src="/assets/images/product/small-size/2.jpg" alt="Product Image" width={80} height={80} />
                </div>
                <div className="product-item_content">
                  <Link className="product-item_title" href="/product">Car Accessory 2</Link>
                  <span className="product-item_quantity">1 x $150.80</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="minicart-item_total">
            <span>Subtotal</span>
            <span className="ammount">$296.60</span>
          </div>
          <div className="minicart-btn_area">
            <Link href="/cart" className="uren-btn uren-btn_dark uren-btn_fullwidth">View Cart</Link>
          </div>
          <div className="minicart-btn_area">
            <Link href="/checkout" className="uren-btn uren-btn_dark uren-btn_fullwidth">Checkout</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu_wrapper ${isMobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <div className="offcanvas-menu-inner">
          <div className="container">
            <button 
              className="btn-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="ion-android-close"></i>
            </button>
            <div className="offcanvas-inner_search">
              <form action="#" className="inner-searchbox">
                <input type="text" placeholder="Search for item..." />
                <button className="search_btn" type="submit">
                  <i className="ion-ios-search-strong"></i>
                </button>
              </form>
            </div>
            <nav className="offcanvas-navigation">
              <ul className="mobile-menu">
                <li className="menu-item-has-children active">
                  <Link href="/"><span className="mm-text">Home</span></Link>
                </li>
                <li className="menu-item-has-children">
                  <Link href="/shop"><span className="mm-text">Shop</span></Link>
                </li>
                <li className="menu-item-has-children">
                  <Link href="/blog"><span className="mm-text">Blog</span></Link>
                </li>
                <li className="menu-item-has-children">
                  <Link href="/about"><span className="mm-text">About Us</span></Link>
                </li>
                <li className="menu-item-has-children">
                  <Link href="/contact"><span className="mm-text">Contact</span></Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 