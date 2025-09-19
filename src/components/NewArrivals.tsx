'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, Product } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { useQuickView } from '@/components/QuickViewProvider';
import Notification from './Notification';
import { useScriptLoader } from '@/hooks/useScriptLoader';
import ProductShimmer from './ProductShimmer';
import { useTranslations } from 'next-intl';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';


const NewArrivals = () => {
  const t = useTranslations('pages.home');
  const dispatch = useAppDispatch();
  const currentLocale = useCurrentLocale();
  const { products, loading, error } = useAppSelector((state: any) => state.products);
  const { items: cartItems } = useAppSelector((state: any) => state.cart);
  const { openQuickView } = useQuickView();
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };
  
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  useScriptLoader({
    onLoad: () => {
      console.log('Scripts loaded successfully for new arrivals page');
    },
    onError: (error) => {
      console.error('Error loading scripts:', error);
    }
  });

  useEffect(() => {
    // Fetch products if not already loaded
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getNumericValue = (value: number | { $numberInt: string } | { $numberDouble: string }): number => {
    if (typeof value === 'number') {
      return value;
    } else if ('$numberInt' in value) {
      return parseInt(value.$numberInt);
    } else if ('$numberDouble' in value) {
      return parseFloat(value.$numberDouble);
    }
    return 0;
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

  const handleAddToCart = (product: Product) => {
    const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
    const categoryId = typeof product.category._id === 'string' ? product.category._id : product.category._id.$oid;
    
    const cartItem = {
      _id: productId,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      category: {
        _id: categoryId,
        name: product.category.name || 'Unknown'
      },
      sku: product.sku,
      brand: product.brand,
      stock: getNumericValue(product.stock),
      quantity: 1
    };

    dispatch(addToCart(cartItem));
    
    // Show notification
    setNotification({
      message: `${product.name} has been added to cart!`,
      type: 'success',
      isVisible: true
    });
  };



  const isInCart = (productId: string) => {
    return cartItems.some((item: any) => item._id === productId);
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  // Filter products with new-arrival tag
  const newArrivalProducts = products.filter((product: Product) => 
    product.tags && product.tags.includes('new-arrival')
  );

  if (loading) {
    return (
      <div className="uren-product_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>{t('newArrivals')}</span>
                <h3>{t('featuredProducts')}</h3>
              </div>
              <div className="text-center py-4">
                <ProductShimmer count={8} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="uren-product_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>{t('newArrivals')}</span>
                <h3>{t('featuredProducts')}</h3>
              </div>
              <div className="text-center">
                <p>Error loading products: {error}</p>
                <button onClick={() => dispatch(fetchProducts())} className="btn btn-primary">
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (newArrivalProducts.length === 0) {
    return (
      <div className="uren-product_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>{t('newArrivals')}</span>
                <h3>{t('featuredProducts')}</h3>
              </div>
              <div className="text-center">
                <p>{t('noNewArrivals')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="uren-product_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title_area">
              <span>{t('newArrivals')}</span>
              <h3>{t('featuredProducts')}</h3>
            </div>
            <div className="product-slider uren-slick-slider slider-navigation_style-1 img-hover-effect_area" 
                 data-slick-options='{"slidesToShow": 4, "spaceBetween": 30, "arrows" : true}' 
                 data-slick-responsive='[{"breakpoint":1599, "settings": {"slidesToShow": 3}}, {"breakpoint":1200, "settings": {"slidesToShow": 2}}, {"breakpoint":768, "settings": {"slidesToShow": 1}}]'>
              
              {newArrivalProducts.map((product: Product) => {
                const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
                return (
                  <div key={productId} className="product-slide_item">
                    <div className="inner-slide">
                      <div className="single-product">
                        <div className="product-img">
                          <Link href={createLocaleUrl(`/product/${productId}`)}>
                            <Image 
                              className="primary-img" 
                              src={product.images[0] || "/assets/images/product/medium-size/1-1.jpg"} 
                              alt={product.name} 
                              width={306} 
                              height={306}
                              quality={95}
                              style={{ objectFit: 'contain' }}
                            />
                            <Image 
                              className="secondary-img" 
                              src={product.images[1] || product.images[0] || "/assets/images/product/medium-size/4-2.jpg"} 
                              alt={product.name} 
                              width={306} 
                              height={306}
                              quality={95}
                              style={{ objectFit: 'contain' }}
                            />
                          </Link>
                          {product.newArrival && <span className="sticker">New</span>}
                          {product.salePrice && getNumericValue(product.salePrice) < getNumericValue(product.price) && (
                            <div className="sticker-area-2">
                              <span className="sticker-2">-{Math.round(((getNumericValue(product.price) - getNumericValue(product.salePrice)) / getNumericValue(product.price)) * 100)}%</span>
                              <span className="sticker">Sale</span>
                            </div>
                          )}
                          <div className="add-actions">
                            <ul>
                              <li style={{marginRight: '10px', cursor:'pointer'}}>
                                <a 
                                  className={`uren-add_cart ${isInCart(productId) ? 'added' : ''}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product);
                                  }}
                                  data-toggle="tooltip" 
                                  data-placement="top" 
                                  title={isInCart(productId) ? 'Added to Cart' : 'Add To Cart'}
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
                              <Link className="product-name" href={createLocaleUrl(`/product/${productId}`)}>{product.name}</Link>
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
                );
              })}
              
            </div>
          </div>
        </div>
      </div>
      <Notification 
        message={notification.message} 
        type={notification.type} 
        isVisible={notification.isVisible} 
        onClose={closeNotification} 
      />
    </div>
  );
};

export default NewArrivals;