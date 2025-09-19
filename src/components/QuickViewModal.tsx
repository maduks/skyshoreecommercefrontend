'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist } from '@/store/slices/wishlistSlice';
import { addToCompare } from '@/store/slices/compareSlice';


interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ isOpen, onClose, product }) => {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { items: compareItems } = useAppSelector((state) => state.compare);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        images: product.images,
        category: product.category,
        quantity: 1,
        sku: product.sku,
        brand: product.brand,
        stock: product.stock
      }));
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
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
    }
  };

  const handleAddToCompare = () => {
    if (product) {
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
    }
  };

  useEffect(() => {
    if (isOpen && product) {
      // Simple initialization - let main.js handle everything
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).jQuery) {
          const $ = (window as any).jQuery;
          
          // Initialize modal-specific functionality
          if ($.fn.slick && $('.sp-img_slider').length) {
            try {
              $('.sp-img_slider').slick({
                slidesToShow: 1,
                arrows: false,
                fade: true,
                draggable: false,
                swipe: false,
                asNavFor: '.sp-img_slider-nav'
              });
            } catch (error) {
              console.warn('Modal slider initialization failed:', error);
            }
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <li key={i}>
          <i className={i <= rating ? "ion-android-star" : "ion-android-star silver-color"}></i>
        </li>
      );
    }
    return stars;
  };

  return (
    <div className={`modal fade modal-wrapper ${isOpen ? 'show' : ''}`} 
         id="exampleModalCenter" 
         style={{ display: isOpen ? 'block' : 'none' }}
         tabIndex={-1}
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button 
              type="button" 
              className="close" 
              onClick={onClose}
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-inner-area sp-area row">
              <div className="col-lg-5">
                <div className="sp-img_area">
                  <div className="sp-img_slider slick-img-slider uren-slick-slider">
                                         {product.images && product.images.length > 0 ? (
                       product.images.map((image: string, index: number) => (
                         <div key={index} className="single-slide">
                           <Image 
                             src={image} 
                             alt={`${product.name} - Image ${index + 1}`}
                             width={400}
                             height={400}
                             quality={95}
                             style={{ objectFit: 'cover' }}
                           />
                         </div>
                       ))
                     ) : (
                      <div className="single-slide">
                        <Image 
                          src="/assets/images/product/large-size/1.jpg" 
                          alt={product.name}
                          width={400}
                          height={400}
                          quality={95}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                                     {product.images && product.images.length > 1 && (
                     <div className="sp-img_slider-nav slick-slider-nav uren-slick-slider slider-navigation_style-3">
                       {product.images.map((image: string, index: number) => (
                         <div key={index} className="single-slide">
                           <Image 
                             src={image} 
                             alt={`${product.name} - Thumbnail ${index + 1}`}
                             width={80}
                             height={80}
                             quality={95}
                             style={{ objectFit: 'contain' }}
                           />
                         </div>
                       ))}
                     </div>
                   )}
                </div>
              </div>
              <div className="col-xl-7 col-lg-6">
                <div className="sp-content">
                  <div className="sp-heading">
                    <h5>
                      <Link href={`/product/${product._id}`}>
                        {product.name}
                      </Link>
                    </h5>
                  </div>
                  <div className="rating-box">
                    <ul>
                      {renderStars(product.averageRating || 0)}
                    </ul>
                  </div>
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
                  <div className="sp-essential_stuff">
                    <ul>
                      <li><b>Brand:</b> <a href="javascript:void(0)">{product.brand || 'N/A'}</a></li>
                      <li><b>Product Code:</b> <a href="javascript:void(0)">{product._id}</a></li>
                      <li><b>Reward Points:</b> <a href="javascript:void(0)">100</a></li>
                      <li><b>Availability:</b> <a href="javascript:void(0)">In Stock</a></li>
                    </ul>
                  </div>
                  {product.description && (
                    <div className="product-short_desc">
                      <p>{product.description.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
                    </div>
                  )}
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
                      <li>
                        <a 
                          href="javascript:void(0)" 
                          className={`add-to_cart ${isInCart(product._id) ? 'added' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart();
                          }}
                        >
                          {isInCart(product._id) ? 'Added to Cart' : 'Add To Cart'}
                        </a>
                      </li>
                      <li>
                        <a 
                          href="javascript:void(0)"
                          className={isInWishlist(product._id) ? 'added' : ''}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToWishlist();
                          }}
                        >
                          <i className="ion-android-favorite-outline"></i>
                        </a>
                      </li>
                      <li>
                        <a 
                          href="javascript:void(0)"
                          className={isInCompare(product._id) ? 'added' : ''}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCompare();
                          }}
                        >
                          <i className="ion-ios-shuffle-strong"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="uren-tag-line">
                    <h6>Tags:</h6>
                    {product.tags && product.tags.length > 0 ? (
                      product.tags.map((tag: any, index: any) => (
                        <React.Fragment key={tag}>
                          <a href="javascript:void(0)">{tag}</a>
                          {index < product.tags.length - 1 && ', '}
                        </React.Fragment>
                      ))
                    ) : (
                      <>
                        <a href="javascript:void(0)">Car</a>,
                        <a href="javascript:void(0)">Accessories</a>,
                        <a href="javascript:void(0)">Parts</a>
                      </>
                    )}
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
  );
};

export default QuickViewModal; 