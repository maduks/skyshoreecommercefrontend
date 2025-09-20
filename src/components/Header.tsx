'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Product } from '@/store/slices/productSlice';
import { closeCart, openCart } from '@/store/slices/cartSlice';
import CartIcon from './CartIcon';
import SideCart from './SideCart';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const params = useParams();
  // const locale = useLocale();
  const currentLocale = useCurrentLocale();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state: any) => state.products);
  const { isAuthenticated } = useAppSelector((state: any) => state.user);
  const { isOpen: isMiniCartOpen } = useAppSelector((state: any) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const tHeader = useTranslations('header');

  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };
  
  // Debug logging removed to prevent SSR issues
  // useEffect(() => {
  //   console.log('=== LOCALE DEBUG INFO ===');
  //   console.log('useLocale():', locale);
  //   console.log('params.locale:', params?.locale);
  //   console.log('useCurrentLocale():', currentLocale);
  //   console.log('pathname:', pathname);
  //   console.log('window.location.pathname:', typeof window !== 'undefined' ? window.location.pathname : 'N/A');
  //   console.log('========================');
  // }, [locale, params, currentLocale, pathname]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [mobileSearchSuggestions, setMobileSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Handle desktop search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      const filtered = products.filter((product: Product) => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle mobile search input changes
  const handleMobileSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setMobileSearchQuery(query);
    
    if (query.length >= 2) {
      const filtered = products.filter((product: Product) => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setMobileSearchSuggestions(filtered);
      setShowMobileSuggestions(true);
    } else {
      setMobileSearchSuggestions([]);
      setShowMobileSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product: Product) => {
    const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
    router.push(createLocaleUrl(`/product/${productId}`));
    setSearchQuery('');
    setSearchSuggestions([]);
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
  };

  // Handle mobile suggestion click
  const handleMobileSuggestionClick = (product: Product) => {
    const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
    router.push(createLocaleUrl(`/product/${productId}`));
    setMobileSearchQuery('');
    setMobileSearchSuggestions([]);
    setShowMobileSuggestions(false);
    setIsMobileMenuOpen(false);
  };

  // Handle desktop search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(createLocaleUrl(`/shop?search=${encodeURIComponent(searchQuery.trim())}`));
      setSearchQuery('');
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle mobile search form submit
  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(createLocaleUrl(`/shop?search=${encodeURIComponent(mobileSearchQuery.trim())}`));
      setMobileSearchQuery('');
      setMobileSearchSuggestions([]);
      setShowMobileSuggestions(false);
      setIsMobileMenuOpen(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowMobileSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper function to check if a route is active
  const isActiveRoute = (route: string) => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(route);
  };

  // Helper function to get active class
  const getActiveClass = (route: string) => {
    return isActiveRoute(route) ? 'active' : '';
  };
  

  return (
    <>
      {/* Header Main Area */}
      <header className="header-main_area bg--sapphire">
        {/* Top Header */}
        <div className="header-top_area   d-lg-block d-none">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7 col-lg-8">
                <div className="main-menu_area position-relative">
                  <nav className="main-nav">
                    <ul>
                      <li className={`dropdown-holder ${getActiveClass('/')}`}>
                        <Link href={createLocaleUrl('/')}>{t('home')}</Link>
                      
                      </li>
                      <li className={`megamenu-holder ${getActiveClass('/shop')}`}>
                        <Link href={createLocaleUrl('/shop')}>{t('shop')} </Link>
                     
                      </li>
                    
                      <li className={getActiveClass('/about')}><Link href={createLocaleUrl('/about')}>{t('about')}</Link></li>
                      <li className={getActiveClass('/contact')}><Link href={createLocaleUrl('/contact')}>{t('contact')}</Link></li>
                      <li className={getActiveClass('/blog')}><Link href={createLocaleUrl('/blog')}>{t('blog')} </Link>
                    
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-5 col-lg-4">
                <div className="ht-right_area">
                  <div className="ht-menu">
                    <ul>
                     <LanguageSwitcher />
                      <li>
                        <Link style={{color:'#fff'}} href={createLocaleUrl('/my-account')}>{t('myAccount')}<i className="fa fa-chevron-down"></i></Link>
                        <ul className="ht-dropdown ht-my_account">
                          {isAuthenticated ? (
                            <>
                              <li><Link href={createLocaleUrl('/my-account')}>Dashboard</Link></li>
                              <li><Link href={createLocaleUrl('/order-history')}>Order History</Link></li>
                            </>
                          ) : (
                            <>
                              <li><Link href={createLocaleUrl('/register')}>{t('register')}</Link></li>
                              <li className="active"><Link href={createLocaleUrl('/login')}>{t('login')}</Link></li>
                            </>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


  { /* Mobile Header lang */}

  <div className="header-top_area_lang  header-top_area   d-lg-block d-none">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-5 col-lg-4">
                <div className="ht-right_area">
                  <div className="ht-menu">
                    <ul>
                     <LanguageSwitcher />
                      <li>
                        <Link style={{color:'#fff'}} href={createLocaleUrl('/my-account')}>{t('myAccount')}<i className="fa fa-chevron-down"></i></Link>
                        <ul className="ht-dropdown ht-my_account">
                          {isAuthenticated ? (
                            <>
                              <li><Link href={createLocaleUrl('/my-account')}>Dashboard</Link></li>
                              <li><Link href={createLocaleUrl('/order-history')}>Order History</Link></li>
                            </>
                          ) : (
                            <>
                              <li><Link href={createLocaleUrl('/register')}>{t('register')}</Link></li>
                              <li className="active"><Link href={createLocaleUrl('/login')}>{t('login')}</Link></li>
                            </>
                          )}
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
              <div className="col-xl-6 col-lg-7 d-lg-block d-none">
                <div className="main-menu_area position-relative">
                  <nav className="main-nav">
                    <ul>
                      <li className={`dropdown-holder ${getActiveClass('/')}`}>
                        <Link href={createLocaleUrl('/')}>{t('home')}</Link>
                      
                      </li>
                      <li className={`megamenu-holder ${getActiveClass('/shop')}`}>
                        <Link href={createLocaleUrl('/shop')}>{t('shop')} </Link>
                      
                      </li>
                    
                      <li className={getActiveClass('/about')}><Link href={createLocaleUrl('/about')}>{t('about')}</Link></li>
                      <li className={getActiveClass('/contact')}><Link href={createLocaleUrl('/contact')}>{t('contact')}</Link></li>
                      <li className={getActiveClass('/blog')}><Link href={createLocaleUrl('/blog')}>{t('blog')} </Link>
                    
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-sm-3 d-block d-lg-none">
                <div className="header-logo_area header-sticky_logo">
                  <Link href={createLocaleUrl('/')}>
                    <Image src="https://ik.imagekit.io/paysupport/Skyshoregroup/800_products/Untitled%20design%20(1)_4u0CemLCM.png?updatedAt=1758298202967" alt="Skyshore Logo" width={150} height={50} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-sm-9">
                <div className="header-right_area">
                  <ul>
                    {/* <li className="mobile-menu_wrap d-flex d-lg-none">
                      <a href="#mobileMenu" className="mobile-menu_btn toolbar-btn color--white">
                        <i className="ion-navicon"></i>
                      </a>
                    </li> */}
                    <li  className="minicart-wrap">
                        <CartIcon onClick={() => dispatch(openCart())} />
                    </li>
                    <li className="contact-us_wrap">
                      <Link style={{fontSize:15}} href="tel://+2342092920777">
                        <i className="ion-android-call"></i>(+234) 209 292 0777
                      </Link>
                    </li>
                    <li className="user-account_wrap">
                      {isAuthenticated ? (
                        <Link style={{color:'#fff'}} href={createLocaleUrl('/my-account')} className="user-account-btn">
                          <i className="ion-person"></i>
                          <span className="d-none d-md-inline">Dashboard</span>
                        </Link>
                      ) : (
                        <Link style={{color:'#fff'}} href={createLocaleUrl('/login')} className="user-account-btn">
                          <i className="ion-log-in"></i>
                          <span className="d-none d-md-inline">{t('login')}</span>
                        </Link>
                      )}
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
                  <Link href={createLocaleUrl('/')}>
                    <Image src="https://ik.imagekit.io/paysupport/Skyshoregroup/800_products/Untitled%20design%20(1)_4u0CemLCM.png?updatedAt=1758298202967" style={{position:'relative',bottom:1, marginBottom:3}}  width={250} height={70} alt="Skyshore Logo"  />
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
                   
                      <li><Link href={createLocaleUrl('/shop')}>Engine Oil </Link></li>
                      <li><Link href={createLocaleUrl('/shop')}>Diesel Oil</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="custom-search_col col-12">
                <div className="hm-form_area" ref={searchRef}>
                  <form onSubmit={handleSearchSubmit} className="hm-searchbox">
                   
                    <input 
                      type="text" 
                      placeholder={tHeader('searchPlaceholder')} 
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button className="header-search_btn" type="submit">
                      <i className="ion-ios-search-strong"><span>{tHeader('search')}</span></i>
                    </button>
                  </form>
                  
                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="search-suggestions">
                      {searchSuggestions.map((product: Product) => {
                        const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
                        return (
                          <div 
                            key={productId}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(product)}
                          >
                            <div className="suggestion-image">
                              <Image 
                                src={product.images[0] || "/assets/images/product/small-size/1.jpg"} 
                                alt={product.name}
                                width={40}
                                height={40}
                                quality={95}
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <div className="suggestion-content">
                              <div className="suggestion-name">{product.name}</div>
                              <div className="suggestion-brand">{product.brand}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="custom-cart_col col-12">
                <div className="header-right_area">
                  <ul>
                    <li className="mobile-menu_wrap d-flex d-lg-none">
                      <a href="#mobileMenu" className="mobile-menu_btn toolbar-btn color--white">
                        <i className="ion-navicon"></i>
                      </a>
                    </li>
                    <li className="minicart-wrap">
                        <CartIcon onClick={() => dispatch(openCart())} />
                    </li>
                    <li className="contact-us_wrap">
                      <Link style={{fontSize:14}} href="tel://+2342092920777">
                        <i className="ion-android-call"></i>(+234) 209 292 0777
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
            onClick={() => dispatch(closeCart())}
          >
            <i className="ion-android-close"></i>
          </button>
      
        
        </div>

        <SideCart onClose={() => dispatch(closeCart())} />
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
            <div className="offcanvas-inner_search" ref={mobileSearchRef}>
              <form onSubmit={handleMobileSearchSubmit} className="inner-searchbox">
                <input type="text" placeholder="Search for item..." value={mobileSearchQuery} onChange={handleMobileSearchChange} />
                <button className="search_btn" type="submit">
                  <i className="ion-ios-search-strong"></i>
                </button>
              </form>
              
              {/* Mobile Search Suggestions Dropdown */}
              {showMobileSuggestions && mobileSearchSuggestions.length > 0 && (
                <div className="search-suggestions mobile-search-suggestions">
                  {mobileSearchSuggestions.map((product: Product) => {
                    const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
                    return (
                      <div 
                        key={productId}
                        className="suggestion-item"
                        onClick={() => handleMobileSuggestionClick(product)}
                      >
                        <div className="suggestion-image">
                          <Image 
                            src={product.images[0] || "/assets/images/product/small-size/1.jpg"} 
                            alt={product.name}
                            width={40}
                            height={40}
                            quality={95}
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="suggestion-content">
                          <div className="suggestion-name">{product.name}</div>
                          <div className="suggestion-brand">{product.brand}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <nav className="offcanvas-navigation">
              <ul className="mobile-menu">
                <li className={`menu-item-has-children ${getActiveClass('/')}`}>
                  <Link href={createLocaleUrl('/')}><span className="mm-text">{t('home')}</span></Link>
                </li>
                <li className={`menu-item-has-children ${getActiveClass('/shop')}`}>
                  <Link href={createLocaleUrl('/shop')}><span className="mm-text">{t('shop')}</span></Link>
                </li>
                <li className={`menu-item-has-children ${getActiveClass('/blog')}`}>
                  <Link href={createLocaleUrl('/blog')}><span className="mm-text">{t('blog')}</span></Link>
                </li>
                <li className={`menu-item-has-children ${getActiveClass('/about')}`}>
                  <Link href={createLocaleUrl('/about')}><span className="mm-text">{t('about')}</span></Link>
                </li>
                <li className={`menu-item-has-children ${getActiveClass('/contact')}`}>
                  <Link href={createLocaleUrl('/contact')}><span className="mm-text">{t('contact')}</span></Link>
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