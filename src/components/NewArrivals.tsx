'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, Product } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist } from '@/store/slices/wishlistSlice';
import { addToCompare } from '@/store/slices/compareSlice';
import { useScriptLoader } from '@/hooks/useScriptLoader';

const NewArrivals = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state: any) => state.products);
  const { items: cartItems } = useAppSelector((state: any) => state.cart);
  const { items: wishlistItems } = useAppSelector((state: any) => state.wishlist);
  const { items: compareItems } = useAppSelector((state: any) => state.compare);

  // Load scripts for sliders
  useScriptLoader({
    onLoad: () => {
      console.log('Scripts loaded successfully for NewArrivals component');
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
  };

  const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist({
      _id: product._id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      category: product.category,
      sku: product.sku,
      brand: product.brand,
      stock: product.stock
    }));
  };

  const handleAddToCompare = (product: Product) => {
    dispatch(addToCompare({
      _id: product._id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      category: product.category,
      sku: product.sku,
      brand: product.brand,
      stock: product.stock,
      description: product.description
    }));
  };

  const isInCart = (productId: string) => {
    return cartItems.some((item: any) => item._id === productId);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item: any) => item._id === productId);
  };

  const isInCompare = (productId: string) => {
    return compareItems.some((item: any) => item._id === productId);
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
                <span>New Arrivals</span>
                <h3>Featured Products</h3>
              </div>
              <div className="text-center">
                <p>Loading new arrivals...</p>
                <div className="loading-spinner"></div>
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
                <span>New Arrivals</span>
                <h3>Featured Products</h3>
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
                <span>New Arrivals</span>
                <h3>Featured Products</h3>
              </div>
              <div className="text-center">
                <p>No new arrivals available at the moment.</p>
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
              <span>New Arrivals</span>
              <h3>Featured Products</h3>
            </div>
            <div className="product-slider uren-slick-slider slider-navigation_style-1 img-hover-effect_area" 
                 data-slick-options='{"slidesToShow": 4, "spaceBetween": 30, "arrows" : true}' 
                 data-slick-responsive='[{"breakpoint":1599, "settings": {"slidesToShow": 3}}, {"breakpoint":1200, "settings": {"slidesToShow": 2}}, {"breakpoint":768, "settings": {"slidesToShow": 1}}]'>
              
              {newArrivalProducts.map((product: Product) => (
                <div key={product._id} className="product-slide_item">
                  <div className="inner-slide">
                    <div className="single-product">
                      <div className="product-img">
                        <Link href={`/product/${product._id}`}>
                          <Image 
                            className="primary-img" 
                            src={product.images[0] } 
                            alt={product.name} 
                            width={306} 
                            height={306}
                            style={{ objectFit: 'contain' }}
                          />
                          {/* <img 
                            className="secondary-img" 
                            
                            src={product.images[1] || product.images[0]} 
                            alt={product.name} 
                            
                            style={{ objectFit: 'cover' }}
                          /> */}
                        </Link>
                        {product.newArrival && <span className="sticker">New</span>}
                        {product.salePrice && product.salePrice < product.price && (
                          <div className="sticker-area-2">
                            <span className="sticker-2">-{Math.round(((product.price - product.salePrice) / product.price) * 100)}%</span>
                            <span className="sticker">Sale</span>
                          </div>
                        )}
                        <div className="add-actions">
                          <ul>
                            <li style={{marginRight: '10px'}}>
                              <a 
                                className={`uren-add_cart ${isInCart(product._id) ? 'added' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCart(product);
                                }}
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title={isInCart(product._id) ? 'Added to Cart' : 'Add To Cart'}
                              >
                                <i className="ion-bag"></i>
                              </a>
                            </li>
                            <li style={{marginRight: '10px'}}>
                              <a 
                                className={`uren-wishlist ${isInWishlist(product._id) ? 'added' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToWishlist(product);
                                }}
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title={isInWishlist(product._id) ? 'Added to Wishlist' : 'Add To Wishlist'}
                              >
                                <i className="ion-android-favorite-outline"></i>
                              </a>
                            </li>
                            <li style={{marginRight: '10px'}}>
                              <a 
                                className={`uren-add_compare ${isInCompare(product._id) ? 'added' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCompare(product);
                                }}
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title={isInCompare(product._id) ? 'Added to Compare' : 'Compare This Product'}
                              >
                                <i className="ion-android-options"></i>
                              </a>
                            </li>
                            <li className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter">
                              <a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="Quick View">
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
                              {renderStars(product.averageRating)}
                            </ul>
                          </div>
                          <h6>
                            <Link className="product-name" href={`/product/${product._id}`}>{product.name}</Link>
                          </h6>
                          <div className="price-box">
                            {product.salePrice && product.salePrice < product.price ? (
                              <>
                                <span className="new-price new-price-2">{formatPrice(product.salePrice)}</span>
                                <span className="old-price">{formatPrice(product.price)}</span>
                              </>
                            ) : (
                              <span className="new-price">{formatPrice(product.price)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals; 