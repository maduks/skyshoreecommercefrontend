'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, fetchCategories, setViewMode, Category } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist } from '@/store/slices/wishlistSlice';
import { addToCompare } from '@/store/slices/compareSlice';
import { useScriptLoader } from '@/hooks/useScriptLoader';
import ApiStatusIndicator from '@/components/ApiStatusIndicator';
import { useQuickView } from '@/components/QuickViewProvider';
import Notification from '@/components/Notification';
import ProductShimmer from '@/components/ProductShimmer';
import TransitionLink from '@/components/TransitionLink';
import { useNavigationTransition } from '@/hooks/useNavigationTransition';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const dispatch = useAppDispatch();
  const currentLocale = useCurrentLocale();
  const tNav = useTranslations('navigation');
  const { products, categories, loading, error, viewMode } = useAppSelector((state: any) => state.products);
  const { items: cartItems } = useAppSelector((state: any) => state.cart);
  const { openQuickView } = useQuickView();
  const { isPending } = useNavigationTransition();
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };

  const [notification, setNotification] = React.useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  // Category filtering state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ category: string } | null>(null);

  // Load scripts for this page with dependencies
  useScriptLoader({
    dependencies: [products, categories, viewMode],
    onLoad: () => {
      console.log('Scripts loaded successfully for category page');
      // Initialize category page specific functionality
      initializeCategoryPage();
    },
    onError: (error) => {
      console.error('Error loading scripts:', error);
    }
  });

  // Initialize category page functionality
  const initializeCategoryPage = () => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      
      // Initialize nice select
      if ($.fn.niceSelect) {
        $('.nice-select').niceSelect();
      }
      
      // Initialize tooltips
      if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
      }
    }
  };

  useEffect(() => {
    // Resolve params
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    // Fetch products and categories when component mounts
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    
    // Restore view mode from localStorage
    const savedViewMode = localStorage.getItem('shopViewMode');
    if (savedViewMode && savedViewMode !== viewMode) {
      console.log('Restoring view mode from localStorage:', savedViewMode);
      dispatch(setViewMode(savedViewMode as any));
    }
  }, [dispatch]);

  // Find category by slug/name from URL
  useEffect(() => {
    if (categories.length > 0 && resolvedParams?.category) {
      const categorySlug = decodeURIComponent(resolvedParams.category).toLowerCase();
      const foundCategory = categories.find((cat: Category) => 
        cat.name.toLowerCase().replace(/\s+/g, '-') === categorySlug ||
        cat.name.toLowerCase() === categorySlug
      );
      
      if (foundCategory) {
        setCurrentCategory(foundCategory);
        setSelectedCategory(foundCategory._id);
      }
    }
  }, [categories, resolvedParams]);

  // Filter products by selected category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter((product: any) => {
        const productCategoryId = typeof product.category._id === 'string' 
          ? product.category._id 
          : product.category._id.$oid;
        return productCategoryId === selectedCategory;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, selectedCategory]);

  // Initialize category functionality only once when products load
  useEffect(() => {
    if (!loading && products.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        initializeCategoryPage();
      }, 100);
    }
  }, [products, loading]);

  // Debug view mode changes
  useEffect(() => {
    console.log('View mode changed to:', viewMode);
    
    // Force a re-render when view mode changes
    if (viewMode) {
      // Small delay to ensure DOM updates
      setTimeout(() => {
        console.log('DOM should be updated with view mode:', viewMode);
      }, 50);
    }
  }, [viewMode]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <li key={i} className={i <= rating ? "" : "silver-color"}>
          <i className="ion-android-star"></i>
        </li>
      );
    }
    return stars;
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      category: product.category,
      sku: product.sku,
      brand: product.brand,
      stock: product.stock,
      quantity: 1
    }));

    // Show notification
    setNotification({
      message: `${product.name} has been added to cart!`,
      type: 'success',
      isVisible: true,
    });
  };

  const handleViewModeChange = (mode: 'gridview-2' | 'gridview-3' | 'gridview-4' | 'gridview-5' | 'listview') => {
    console.log('Changing view mode to:', mode);
    
    // Save to localStorage for persistence
    localStorage.setItem('shopViewMode', mode);
    
    // Dispatch immediately and wait for it to complete
    dispatch(setViewMode(mode));
    
    // Force a small delay to ensure state is updated
    setTimeout(() => {
      console.log('State should be updated now');
    }, 10);
    
    // Prevent any default behavior
    return false;
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const isInCart = (productId: string) => {
    return cartItems.some((item: any) => item._id === productId);
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const getNumericValue = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    if (value && typeof value === 'object' && value.$numberDouble) {
      return parseFloat(value.$numberDouble);
    }
    if (value && typeof value === 'object' && value.$numberInt) {
      return parseInt(value.$numberInt);
    }
    return 0;
  };

  if (loading) {
    return (
      <>
        {/* Begin Uren's Breadcrumb Area */}
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <h2>{currentCategory?.name || 'Loading...'}</h2>
              <ul>
                <li><TransitionLink href={createLocaleUrl('/')}>{tNav('home')}</TransitionLink></li>
                <li><TransitionLink href={createLocaleUrl('/categories')}>Categories</TransitionLink></li>
                <li className="active">{currentCategory?.name || 'Loading...'}</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Uren's Breadcrumb Area End Here */}

        {/* Begin Uren's Shop Area */}
        <div className="shop-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shop-content">
                  <div className="shop-bar-area">
                    <div className="shop-bar pb-60">
                      <div className="shop-found-selector">
                        <div className="shop-found">
                          <p><span>Loading...</span> products found</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shop-product-all tab-content">
                    <div id="grid-5-col" className="tab-pane active show">
                      <ProductShimmer count={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Uren's Shop Area End Here */}
      </>
    );
  }

  if (error) {
    return (
      <div className="error-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="error-content text-center">
                <h3>⚠️ Server Error</h3>
                <p>{error}</p>
                <div className="error-actions">
                  <button 
                    onClick={() => {
                      dispatch(fetchProducts());
                      dispatch(fetchCategories());
                    }} 
                    className="btn btn-primary"
                    style={{ marginRight: '10px' }}
                  >
                    🔄 Try Again
                  </button>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="btn btn-secondary"
                  >
                    🔄 Refresh Page
                  </button>
                </div>
                <div className="error-info" style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                  <p>If the problem persists, please check back later. The server may be experiencing high traffic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Loading Overlay */}
      {isPending && (
        <div className="navigation-loading-overlay">
          <div className="navigation-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>
      )}
      
      <ApiStatusIndicator />
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>{currentCategory?.name || 'Category'}</h2>
            <ul>
              <li><TransitionLink href={createLocaleUrl('/')}>{tNav('home')}</TransitionLink></li>
              <li><TransitionLink href={createLocaleUrl('/categories')}>Categories</TransitionLink></li>
              <li className="active">{currentCategory?.name || 'Category'}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's Shop Left Sidebar Area */}
      <div className="shop-content_wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-5 order-2 order-lg-1 order-md-1">
              <div className="uren-sidebar-catagories_area">
                <div className="category-module uren-sidebar_categories">
                  <div className="category-module_heading">
                    <h5>Categories</h5>
                  </div>
                  <div className="module-body">
                    <ul className="module-list_item">
                      <li>
                        <TransitionLink 
                          href={createLocaleUrl('/categories')}
                          className={selectedCategory === '' ? "active" : ""}
                        >
                          All Categories
                        </TransitionLink>
                      </li>
                      {categories.length > 0 ? (
                        categories.map((category: Category) => (
                          <li key={category._id}>
                            <TransitionLink 
                              href={createLocaleUrl(`/categories/${encodeURIComponent(category.name.toLowerCase().replace(/\s+/g, '-'))}`)}
                              className={selectedCategory === category._id ? "active" : ""}
                            >
                              {category.name}
                            </TransitionLink>
                          </li>
                        ))
                      ) : (
                        <li>
                          <a href="javascript:void(0)">Loading categories...</a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="sidebar-banner_area">
                  <div className="banner-item img-hover_effect">
                    <a href="javascript:void(0)">
                      <Image 
                        src="/assets/images/shop/1.jpg" 
                        alt="Categories Banner Image"
                        width={300}
                        height={400}
                        style={{ objectFit: 'cover' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-7 order-1 order-lg-2 order-md-2">
             {filteredProducts.length > 0 ? (
              <div className="shop-toolbar">
                <div className="product-view-mode">
                  <a 
                    className={`grid-1 ${viewMode === 'gridview-1' ? 'active' : ''}`} 
                    data-target="gridview-1" 
                    onClick={() => handleViewModeChange('gridview-2')}
                    title="1"
                  >
                    1
                  </a>
                  <a 
                    style={{display:'none'}}
                    className={`grid-2 ${viewMode === 'gridview-2' ? 'active' : ''}`} 
                    data-target="gridview-2" 
                    onClick={() => handleViewModeChange('gridview-2')}
                    title="2"
                  >
                    2
                  </a>
                  <a 
                    className={`grid-3 ${viewMode === 'gridview-3' ? 'active' : ''}`} 
                    data-target="gridview-3" 
                    onClick={() => handleViewModeChange('gridview-3')}
                    title="3"
                  >
                    3
                  </a>
                  <a 
                    className={`grid-4 ${viewMode === 'gridview-4' ? 'active' : ''}`} 
                    data-target="gridview-4" 
                    onClick={() => handleViewModeChange('gridview-4')}
                    title="4"
                  >
                    4
                  </a>
                  <a 
                    style={{display:'none'}}
                    className={`grid-5 ${viewMode === 'gridview-5' ? 'active' : ''}`} 
                    data-target="gridview-5" 
                    onClick={() => handleViewModeChange('gridview-5')}
                    title="5"
                  >
                    5
                  </a>
                  <a 
                    className={`list ${viewMode === 'listview' ? 'active' : ''}`} 
                    data-target="listview" 
                    onClick={() => handleViewModeChange('listview')}
                    title="List"
                  >
                    <i className="fa fa-th-list"></i>
                  </a>
                </div>
              </div>) :(
                <div className="shop-toolbar">
                  <p>No products found</p>
                </div>
              )}
              <div className={`shop-product-wrap grid ${viewMode} img-hover-effect_area row`}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product: any) => (
                  <div key={product._id} className={
                    viewMode === 'gridview-2' ? 'col-lg-6' :
                    viewMode === 'gridview-3' ? 'col-lg-4' :
                    viewMode === 'gridview-4' ? 'col-lg-3' :
                    viewMode === 'gridview-5' ? 'col-lg-2' :
                    viewMode === 'listview' ? 'col-lg-12' :
                    'col-lg-4' // default
                  }>
                    <div className="product-slide_item">
                      <div className="inner-slide">
                        <div className="single-product">
                          <div className="product-img">
                            <TransitionLink href={createLocaleUrl(`/product/${product._id}`)}>
                              <Image 
                                className="primary-img" 
                                src={product.images[0] || "/assets/images/product/large-size/1.jpg"} 
                                alt={product.name}
                                width={300}
                                height={300}
                                quality={95}
                                style={{ objectFit: 'contain' }}
                              />
                              <Image 
                                className="secondary-img" 
                                src={product.images[1] || product.images[0] || "/assets/images/product/large-size/2.jpg"} 
                                alt={product.name}
                                width={300}
                                height={300}
                                quality={95}
                                style={{ objectFit: 'contain' }}
                              />
                            </TransitionLink>
                            {product.newArrival && (
                              <div className="sticker">
                                <span className="sticker">New</span>
                              </div>
                            )}
                            {product.salePrice && getNumericValue(product.salePrice) < getNumericValue(product.price) && (
                              <div className="sticker-area-2">
                                <span className="sticker-2">-{Math.round(((getNumericValue(product.price) - getNumericValue(product.salePrice)) / getNumericValue(product.price)) * 100)}%</span>
                                <span className="sticker">Sale</span>
                              </div>
                            )}
                            <div className="add-actions">
                              <ul>
                                <li style={{marginRight:'5px'}}>
                                  <a 
                                    className={`uren-add_cart ${isInCart(product._id) ? 'added' : ''}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleAddToCart(product);
                                    }}
                                    style={{cursor:'pointer'}}
                                    data-toggle="tooltip" 
                                    data-placement="top" 
                                    title={isInCart(product._id) ? 'Added to Cart' : 'Add To Cart'}
                                  >
                                    <i className="ion-bag"></i>
                                  </a>
                                </li>
                                <li className="quick-view-btn">
                                  <a 
                                    href="javascript:void(0)" 
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openQuickView(product);
                                    }}
                                    data-toggle="tooltip" 
                                    data-placement="top" 
                                    title="Quick View"
                                  >
                                    <i className="ion-android-open"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="product-desc_info">
                              <div className="rating-box">
                                <ul>
                                  {renderStars(getNumericValue(product.averageRating))}
                                </ul>
                              </div>
                              <h6>
                                <TransitionLink className="product-name" href={createLocaleUrl(`/product/${product._id}`)}>
                                  {product.name}
                                </TransitionLink>
                              </h6>
                              <div className="price-box">
                                {product.salePrice && getNumericValue(product.salePrice) < getNumericValue(product.price) ? (
                                  <>
                                    <span className="new-price new-price-2">{formatPrice(getNumericValue(product.salePrice))}</span>
                                    <span className="old-price">{formatPrice(getNumericValue(product.price))}</span>
                                  </>
                                ) : (
                                  <span className="new-price">{formatPrice(getNumericValue(product.price))}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-slide_item">
                      <div className="single-product">
                        <div className="product-img">
                          <TransitionLink href={createLocaleUrl(`/product/${product._id}`)}>
                            <Image 
                              className="primary-img" 
                              src={product.images[0] || "/assets/images/product/large-size/1.jpg"} 
                              alt={product.name}
                              width={300}
                              height={300}
                              quality={95}
                              style={{ objectFit: 'cover' }}
                            />
                            <Image 
                              className="secondary-img" 
                              src={product.images[1] || product.images[0] || "/assets/images/product/large-size/2.jpg"} 
                              alt={product.name}
                              width={300}
                              height={300}
                              quality={95}
                              style={{ objectFit: 'cover' }}
                            />
                          </TransitionLink>
                          {product.salePrice && getNumericValue(product.salePrice) < getNumericValue(product.price) && (
                            <div className="sticker-area-2">
                              <span className="sticker-2">-{Math.round(((getNumericValue(product.price) - getNumericValue(product.salePrice)) / getNumericValue(product.price)) * 100)}%</span>
                              <span className="sticker">Sale</span>
                            </div>
                          )}
                        </div>
                        <div className="product-content">
                          <div className="product-desc_info">
                            <div className="rating-box">
                              <ul>
                                {renderStars(getNumericValue(product.averageRating))}
                              </ul>
                            </div>
                            <h6>
                              <TransitionLink className="product-name" href={createLocaleUrl(`/product/${product._id}`)}>
                                {product.name}
                              </TransitionLink>
                            </h6>
                            <div className="price-box">
                              {product.salePrice && getNumericValue(product.salePrice) < getNumericValue(product.price) ? (
                                <>
                                  <span className="new-price new-price-2">{formatPrice(getNumericValue(product.salePrice))}</span>
                                  <span className="old-price">{formatPrice(getNumericValue(product.price))}</span>
                                </>
                              ) : (
                                <span className="new-price">{formatPrice(getNumericValue(product.price))}</span>
                              )}
                            </div>
                            <div className="product-short_desc">
                              <p>{product.description ? product.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : "No description available."}</p>
                            </div>
                          </div>
                          <div className="add-actions">
                            <ul>
                              <li>
                                <a 
                                  className={`uren-add_cart ${isInCart(product._id) ? 'added' : ''}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product);
                                  }}
                                  data-toggle="tooltip" 
                                  data-placement="top" 
                                  title={isInCart(product._id) ? 'Added to Cart' : 'Add To Cart'}
                                  style={{cursor:'pointer'}}
                                >
                                  <i className="ion-bag"></i>
                                </a>
                              </li>
                              <li className="quick-view-btn">
                                <a 
                                  href="javascript:void(0)" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openQuickView(product);
                                  }}
                                  data-toggle="tooltip" 
                                  data-placement="top" 
                                  title="Quick View"
                                >
                                  <i className="ion-android-open"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                ) : (
                  <>
               
                  

                  </>
                )}
              </div>


              <div className={`shop-product-wrap grid listview img-hover-effect_area row`}>
              {filteredProducts.length === 0 && (
              <div className="no-products-found" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                margin: '20px 0',
                minHeight: '400px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px', color: '#6c757d' }}>
                  📦
                </div>
                <h3 style={{ color: '#495057', marginBottom: '10px' }}>
                  No Products in This Category
                </h3>
                <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                  There are no products available in the &quot;{currentCategory?.name || 'selected'}&quot; category at the moment.
                </p>
                <div style={{ marginTop: '20px' }}>
                  <TransitionLink 
                    href={createLocaleUrl('/categories')}
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      backgroundColor: '#007bff',
                      color: '#ffffff',
                      textDecoration: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    Browse All Categories
                  </TransitionLink>
                </div>
              </div>
         
                
              )}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="uren-paginatoin-area">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="uren-pagination-box primary-color">
                          <li className="active"><Link href="javascript:void(0)">1</Link></li>
                          <li><Link href="javascript:void(0)">2</Link></li>
                          <li><Link href="javascript:void(0)">3</Link></li>
                          <li><Link href="javascript:void(0)">4</Link></li>
                          <li><Link href="javascript:void(0)">5</Link></li>
                          <li><Link className="Next" href="javascript:void(0)">Next</Link></li>
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
      {/* Uren's Shop Area End Here */}
      
      {/* Notification Toast */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </>
  );
};

export default CategoryPage;
