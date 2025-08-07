'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/store/slices/productSlice';
import { useScriptInitializer } from '@/hooks/useScriptInitializer';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onAddToCompare: (product: Product) => void;
  isInCart: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  isInCart,
  isInWishlist,
  isInCompare
}) => {
  const { initializeAllModalScripts } = useScriptInitializer();

  useEffect(() => {
    if (isOpen && product) {
      // Initialize scripts when modal opens
      initializeAllModalScripts();
    }
  }, [isOpen, product, initializeAllModalScripts]);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

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
                            onAddToCart(product);
                          }}
                        >
                          {isInCart(product._id) ? 'Added to Cart' : 'Add To Cart'}
                        </a>
                      </li>
                      {/* <li>
                        <a 
                          href="javascript:void(0)"
                          className={isInWishlist(product._id) ? 'added' : ''}
                          onClick={(e) => {
                            e.preventDefault();
                            onAddToWishlist(product);
                          }}
                        >
                          <i className="ion-android-favorite-outline"></i>
                        </a>
                      </li> */}
                      {/* <li>
                        <a 
                          href="javascript:void(0)"
                          className={isInCompare(product._id) ? 'added' : ''}
                          onClick={(e) => {
                            e.preventDefault();
                            onAddToCompare(product);
                          }}
                        >
                          <i className="ion-ios-shuffle-strong"></i>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  <div className="uren-tag-line">
                    <h6>Tags:</h6>
                    {product.tags && product.tags.length > 0 ? (
                      product.tags.map((tag, index) => (
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