'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, Product } from '@/store/slices/productSlice';
import { useQuickView } from '@/components/QuickViewProvider';
import { addToCart } from '@/store/slices/cartSlice';
import Notification from './Notification';
import ProductShimmer from './ProductShimmer';
import { useScriptLoader } from '@/hooks/useScriptLoader';
import { useTranslations } from 'next-intl';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
interface VariationOption {
  value: string;
  price: number;
  stock: number;
  sku: string;
}

interface Variation {
  name: string;
  options: VariationOption[];
}

interface MongoDBDate {
  $date: {
    $numberLong: string;
  };
}

interface MongoDBDateValue {
  $numberLong: string;
}







const DealOfTheDay = () => {
  const t = useTranslations('pages.home');
  const dispatch = useAppDispatch();
  const currentLocale = useCurrentLocale();
  const { products, loading } = useAppSelector((state) => state.products);
  const { openQuickView } = useQuickView();
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Load scripts for slider functionality
  useScriptLoader({
    onLoad: () => {
      console.log('Scripts loaded successfully for deal of the day slider');
    },
    onError: (error) => {
      console.error('Error loading scripts for deal of the day:', error);
    }
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Filter products that have "Carton" variations and saleEndDate
    const filteredProducts = products.filter((product: Product) => {
      // Check if product has variations with "Carton" option
      const hasCartonVariation = product.variations &&
        Array.isArray(product.variations) &&
        product.variations.some((variation: object) => {
          const typedVariation = variation as Variation;
          return typedVariation.options && 
            Array.isArray(typedVariation.options) &&
            typedVariation.options.some((option: VariationOption) => option.value === "Carton");
        });

      // Check if product has a valid saleEndDate
      if (product.saleEndDate) {
        let saleEndDate: Date;
        
        // Handle different date formats from API
        if (typeof product.saleEndDate === 'string') {
          saleEndDate = new Date(product.saleEndDate);
        } else if (product.saleEndDate && typeof product.saleEndDate === 'object' && '$date' in product.saleEndDate) {
          // Handle MongoDB date format: {"$date": {"$numberLong": "1735689599000"}}
          const dateValue = (product.saleEndDate as MongoDBDate).$date;
          if (dateValue && typeof dateValue === 'object' && '$numberLong' in dateValue) {
            // Convert milliseconds to Date object
            const timestamp = parseInt((dateValue as MongoDBDateValue).$numberLong);
            saleEndDate = new Date(timestamp);
          } else {
            saleEndDate = new Date(dateValue as string);
          }
        } else {
          // Validate date format - unused but needed for type checking
          new Date(product.saleEndDate as string);
        }
        
      }

      console.log('Product', product.name, 'included:', hasCartonVariation, product.saleEndDate);
      return hasCartonVariation;
    });

    setDealProducts(filteredProducts.slice(0, 5)); // Limit to 5 products for the slider
  }, [products]);

  // Note: Countdown initialization is now handled by useScriptLoader
  // The slider and countdown functionality will be properly initialized
  // when the scripts are loaded through the useScriptLoader hook

  const formatPrice = (price: number | { $numberDouble: string }) => {
    let numericPrice: number;
    if (typeof price === 'number') {
      numericPrice = price;
    } else {
      numericPrice = parseFloat(price.$numberDouble);
    }
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
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

  const renderStars = (rating: number | { $numberInt: string }) => {
    const numericRating = getNumericValue(rating);
    const stars = [];
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<li key={i}><i className="ion-android-star"></i></li>);
    }

    if (hasHalfStar) {
      stars.push(<li key="half" className="silver-color"><i className="ion-android-star"></i></li>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<li key={`empty-${i}`} className="silver-color"><i className="ion-android-star"></i></li>);
    }

    return stars;
  };

  const calculateDiscount = (originalPrice: number | { $numberDouble: string }, salePrice: number | { $numberDouble: string }) => {
    const original = getNumericValue(originalPrice);
    const sale = getNumericValue(salePrice);
    return Math.round(((original - sale) / original) * 100);
  };

  const formatSaleEndDate = (saleEndDate: string | MongoDBDate | unknown): string => {
    if (!saleEndDate) return '';
    
    let date: Date;
    
    if (typeof saleEndDate === 'string') {
      date = new Date(saleEndDate);
    } else if (saleEndDate && typeof saleEndDate === 'object' && '$date' in saleEndDate) {
      const dateValue = (saleEndDate as MongoDBDate).$date;
      if (dateValue && typeof dateValue === 'object' && '$numberLong' in dateValue) {
        // Convert milliseconds to Date object
        const timestamp = parseInt((dateValue as MongoDBDateValue).$numberLong);
        date = new Date(timestamp);
        console.log('MongoDB timestamp:', timestamp, 'Converted to date:', date);
      } else {
        date = new Date(dateValue as string);
      }
    } else {
      date = new Date(saleEndDate as string);
    }
    
    if (isNaN(date.getTime())) return '';
    
    // Format as YYYY/MM/DD for the countdown plugin
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}/${month}/${day}`;
    console.log('Formatted date for countdown:', formattedDate);
    return formattedDate;
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
      quantity: 1,
      sku: product.sku,
      brand: product.brand,
      stock: getNumericValue(product.stock)
    };

    dispatch(addToCart(cartItem));
    
    // Show notification
    setNotification({
      message: `${product.name} has been added to cart!`,
      type: 'success',
      isVisible: true
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  if (loading) {
    return (
      <div className="special-product_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>{t('specialOfferLimitedTime')}</span>
                <h3>{t('dealOfTheDay')}</h3>
              </div>
              <div className="text-center py-4">
                {/* <p>Loading deals...</p> */}
                <ProductShimmer count={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (dealProducts.length === 0) {
    return (
      <div className="special-product_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>{t('specialOfferLimitedTime')}</span>
                <h3>{t('dealOfTheDay')}</h3>
              </div>
              <div className="text-center py-4">
                <p>{t('noActiveDeals')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="special-product_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>{t('specialOfferLimitedTime')}</span>
                <h3>{t('dealOfTheDay')}</h3>
              </div>
              <div className="special-product_slider uren-slick-slider slider-navigation_style-1 img-hover-effect_area" data-slick-options='{
              "slidesToShow": 2,
              "arrows" : true
              }' data-slick-responsive='[
                                  {"breakpoint":768, "settings": {"slidesToShow": 1}}
                              ]'>
                {dealProducts.map((product: Product) => {
                  const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
                  return (
                    <div key={productId} className="slide-item">
                      <div className="inner-slide">
                        <div className="single-product">
                          <div className="product-img">
                            <Link href={createLocaleUrl(`/product/${productId}`)}>
                              <Image 
                                className="primary-img" 
                                src={product.images[0] || "/assets/images/product/medium-size/1-1.jpg"} 
                                alt={product.name}
                                width={300} 
                                height={300} 
                                quality={95}
                                style={{ objectFit: 'contain' }} 
                              />
                              <Image 
                                className="secondary-img" 
                                src={product.images[1] || product.images[0] || "/assets/images/product/medium-size/4-2.jpg"} 
                                alt={product.name}
                                width={300} 
                                height={300} 
                                quality={95}
                                style={{ objectFit: 'contain' }} 
                              />
                            </Link>
                            {product.salePrice && getNumericValue(product.salePrice) < getNumericValue(product.price) && (
                              <div className="sticker-area-2">
                                <span className="sticker-2">-{calculateDiscount(product.price, product.salePrice)}%</span>
                                <span className="sticker">Sale</span>
                              </div>
                            )}
                          </div>
                          <div className="product-content">
                            <div className="product-desc_info">
                              <div className="uren-countdown_area">
                                <span className="product-offer">Hurry up! Offer ends in:</span>
                                <div className="countdown-wrap">
                                  <div className="countdown item-4" data-countdown={formatSaleEndDate(product.saleEndDate)} data-format="short">
                                    <div className="countdown__item">
                                      <span className="countdown__time daysLeft">--</span>
                                      <span className="countdown__text daysText">Days</span>
                                    </div>
                                    <div className="countdown__item">
                                      <span className="countdown__time hoursLeft">--</span>
                                      <span className="countdown__text hoursText">Hours</span>
                                    </div>
                                    <div className="countdown__item">
                                      <span className="countdown__time minsLeft">--</span>
                                      <span className="countdown__text minsText">Mins</span>
                                    </div>
                                    <div className="countdown__item">
                                      <span className="countdown__time secsLeft">--</span>
                                      <span className="countdown__text secsText">Secs</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="rating-box">
                                <ul>
                                  {renderStars(product.averageRating)}
                                </ul>
                              </div>
                              <h6 className="product-name">
                                <Link href={createLocaleUrl(`/product/${productId}`)}>{product.name}</Link>
                              </h6>
                              <div className="price-box">
                                {product.salePrice && getNumericValue(product.salePrice) < getNumericValue(product.price) ? (
                                  <>
                                    <span className="new-price new-price-2">{formatPrice(product.salePrice)}</span>
                                    <span className="old-price">{formatPrice(product.price)}</span>
                                  </>
                                ) : (
                                  <span className="new-price">{formatPrice(product.price)}</span>
                                )}
                              </div>
                              <div className="add-actions">
                                <ul>
                                  <li style={{marginRight: '10px'}}>
                                    <a 
                                      className="uren-add_cart" 
                                      href="javascript:void(0)"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleAddToCart(product);
                                      }}
                                      data-toggle="tooltip" 
                                      data-placement="top" 
                                      title="Add To Cart"
                                    >
                                      <i className="ion-bag"></i>Add To Cart
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
                    </div>
                  );
                })}
              </div>
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
    </>
  );
};

export default DealOfTheDay; 