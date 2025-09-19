'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist } from '@/store/slices/wishlistSlice';
import { addToCompare } from '@/store/slices/compareSlice';
import { Product, fetchProducts } from '@/store/slices/productSlice';
import { CartItem } from '@/store/slices/cartSlice';
import { WishlistItem } from '@/store/slices/wishlistSlice';
import { CompareItem } from '@/store/slices/compareSlice';
import { RootState } from '@/store/store';
import Notification from '@/components/Notification';
import ImageZoomModal from '@/components/ImageZoomModal';
import { useScriptLoader } from '@/hooks/useScriptLoader';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

interface ProductDetailsPageClientProps {
  id: string;
}

const ProductDetailsPageClient = ({ id }: ProductDetailsPageClientProps) => {
  const dispatch = useAppDispatch();
  const currentLocale = useCurrentLocale();
  const { products, loading } = useAppSelector((state: RootState) => state.products);
  // const { items: cartItems } = useAppSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useAppSelector((state: RootState) => state.wishlist);
  const { items: compareItems } = useAppSelector((state: RootState) => state.compare);
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  useScriptLoader({
    onLoad: () => {
      console.log('Scripts loaded successfully for product details page');
    },
    onError: (error) => {
      console.error('Error loading scripts:', error);
    }
  });

  // Ensure products are loaded
  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading]);

  // Find the product by ID
  const product = products.find((p: Product) => {
    const productId = typeof p._id === 'string' ? p._id : p._id.$oid;
    return productId === id;
  });

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

  const handleAddToCart = () => {
    if (!product) return;

    const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
    const categoryId = typeof product.category._id === 'string' ? product.category._id : product.category._id.$oid;
    
    const cartItem: CartItem = {
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
      quantity: quantity
    };

    dispatch(addToCart(cartItem));
    setNotification({
      message: 'Product added to cart!',
      type: 'success',
      isVisible: true
    });
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
    const categoryId = typeof product.category._id === 'string' ? product.category._id : product.category._id.$oid;
    
    const wishlistItem: WishlistItem = {
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
      addedAt: new Date().toISOString()
    };

    dispatch(addToWishlist(wishlistItem));
    setNotification({
      message: 'Product added to wishlist!',
      type: 'success',
      isVisible: true
    });
  };

  const handleAddToCompare = () => {
    if (!product) return;

    const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
    const categoryId = typeof product.category._id === 'string' ? product.category._id : product.category._id.$oid;
    
    const compareItem: CompareItem = {
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
      description: product.description,
      addedAt: new Date().toISOString()
    };

    dispatch(addToCompare(compareItem));
    setNotification({
      message: 'Product added to compare!',
      type: 'success',
      isVisible: true
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item: WishlistItem) => item._id === productId);
  };

  const isInCompare = (productId: string) => {
    return compareItems.some((item: CompareItem) => item._id === productId);
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleImageClick = (imageIndex: number) => {
    setSelectedImage(imageIndex);
    setIsZoomModalOpen(true);
  };

  const closeZoomModal = () => {
    setIsZoomModalOpen(false);
  };

  if (!product) {
    return (
      <>
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <h2>Product Details</h2>
              <ul>
                <li><Link href={createLocaleUrl('/')}>Home</Link></li>
                <li className="active">Product Not Found</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sp-area">
          <div className="container-fluid">
            <div className="text-center">
              <p>Loading Product...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
  const numericPrice = getNumericValue(product.price);
  const numericSalePrice = product.salePrice ? getNumericValue(product.salePrice) : 0;
  const isOnSale = numericSalePrice > 0 && numericSalePrice < numericPrice;
  const averageRating = typeof product.averageRating === 'number' ? product.averageRating : getNumericValue(product.averageRating);
  const totalRatings = typeof product.totalRatings === 'number' ? product.totalRatings : getNumericValue(product.totalRatings);

  return (
    <>
      <Notification 
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
      
      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={isZoomModalOpen}
        onClose={closeZoomModal}
        images={product.images}
        currentImageIndex={selectedImage}
        productName={product.name}
      />
      
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Product Details</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href={createLocaleUrl('/shop')}>Shop</Link></li>
              <li className="active">{product.name}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's Single Product Area */}
      <div  className="sp-area">
        <div className="container-fluid">
          <div className="sp-nav">
            <div className="row">
              <div className="col-lg-4">
                <div className="sp-img_area">
                  <div className="sp-img_slider slick-img-slider uren-slick-slider" data-slick-options='{
                  "slidesToShow": 1,
                  "arrows": false,
                  "fade": true,
                  "draggable": false,
                  "swipe": false,
                  "asNavFor": ".sp-img_slider-nav"
                  }' data-slick-responsive='[
                          {"breakpoint":1501, "settings": {"slidesToShow": 1}},
                          {"breakpoint":992, "settings": {"slidesToShow": 1}},
                          {"breakpoint":768, "settings": {"slidesToShow": 1}},
                          {"breakpoint":575, "settings": {"slidesToShow": 1}}
                      ]'>
                    {product.images.map((image, index) => (
                      <div key={index} className="single-slide zoom">
                        <Image 
                          src={image} 
                          alt={product.name} 
                          width={400} 
                          height={400}
                          quality={95}
                          style={{ 
                            objectFit: 'contain',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease'
                          }}
                          onClick={() => handleImageClick(index)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                        {/* Zoom icon overlay */}
                        <div 
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '18px',
                            zIndex: 10
                          }}
                          onClick={() => handleImageClick(index)}
                        >
                          🔍
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sp-img_slider-nav slick-slider-nav uren-slick-slider slider-navigation_style-3" data-slick-options='{
                  "slidesToShow": 3,
                  "asNavFor": ".sp-img_slider",
                  "focusOnSelect": true,
                  "arrows" : true,
                  "spaceBetween": 30
                  }' data-slick-responsive='[
                          {"breakpoint":1501, "settings": {"slidesToShow": 3}},
                          {"breakpoint":992, "settings": {"slidesToShow": 4}},
                          {"breakpoint":768, "settings": {"slidesToShow": 3}},
                          {"breakpoint":575, "settings": {"slidesToShow": 2}}
                      ]'>
                    {product.images.map((image, index) => (
                      <div key={index} className="single-slide">
                        <Image 
                          src={image} 
                          alt={product.name} 
                          width={100} 
                          height={100}
                          quality={95}
                          style={{ 
                            objectFit: 'contain', 
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                          }}
                          onClick={() => {
                            setSelectedImage(index);
                            handleImageClick(index);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="sp-content">
                  <div className="sp-heading">
                    <h5><Link href="#">{product.name}</Link></h5>
                  </div>
                  <span className="reference">Reference: {product.sku}</span>
                  <div className="rating-box">
                    <ul>
                      {renderStars(averageRating)}
                    </ul>
                  </div>
                  <div className="price-box">
                    {isOnSale ? (
                      <>
                        <span className="new-price">{formatPrice(numericSalePrice)}</span>
                        <span className="old-price">{formatPrice(numericPrice)}</span>
                      </>
                    ) : (
                      <span className="new-price">{formatPrice(numericPrice)}</span>
                    )}
                  </div>
                  <div className="sp-essential_stuff">
                    <ul>
                      <li>Brand: <Link href="#">{product.brand}</Link></li>
                      <li>Product Code: <Link href="#">{product.sku}</Link></li>
                      <li>Availability: <span className={getNumericValue(product.stock) > 0 ? 'in-stock' : 'out-of-stock'}>
                        {getNumericValue(product.stock) > 0 ? 'In Stock' : 'Out of Stock'}
                      </span></li>
                    </ul>
                  </div>
                  <div className="quantity">
                    <label>Quantity</label>
                    <div className="cart-plus-minus">
                      <input 
                        className="cart-plus-minus-box" 
                        type="text" 
                        value={quantity} 
                        readOnly 
                      />
                      <div 
                        className="dec qtybutton" 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <i className="fa fa-angle-down"></i>
                      </div>
                      <div 
                        className="inc qtybutton" 
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <i className="fa fa-angle-up"></i>
                      </div>
                    </div>
                  </div>
                  <div className="qty-btn_area">
                    <ul>
                      <li>
                        <a 
                          className="qty-cart_btn" 
                          href="javascript:void(0)"
                          onClick={handleAddToCart}
                          style={{ pointerEvents: getNumericValue(product.stock) === 0 ? 'none' : 'auto', opacity: getNumericValue(product.stock) === 0 ? 0.5 : 1 }}
                        >
                          Add To Cart
                        </a>
                      </li>
                      <li>
                        <a 
                          className={`qty-wishlist_btn ${isInWishlist(productId) ? 'added' : ''}`}
                          href="javascript:void(0)"
                          onClick={handleAddToWishlist}
                          title={isInWishlist(productId) ? 'Added to Wishlist' : 'Add To Wishlist'}
                        >
                          <i className="ion-android-favorite-outline"></i>
                        </a>
                      </li>
                      <li>
                        <a 
                          className={`qty-compare_btn ${isInCompare(productId) ? 'added' : ''}`}
                          href="javascript:void(0)"
                          onClick={handleAddToCompare}
                          title={isInCompare(productId) ? 'Added to Compare' : 'Compare This Product'}
                        >
                          <i className="ion-ios-shuffle-strong"></i>
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
      {/* Uren's Single Product Area End Here */}

      {/* Begin Uren's Product Tab Area */}
      <div style={{marginBottom:50}} className="sp-product-tab_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="sp-product-tab_nav">
                <div className="product-tab">
                  <ul className="nav product-menu">
                    <li>
                      <a className="active" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">
                        <span>Description</span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#specification" role="tab" aria-controls="specification" aria-selected="false">
                        <span>Specification</span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">
                        <span>Reviews ({totalRatings})</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content uren-tab_content">
                  <div id="description" className="tab-pane active show" role="tabpanel">
                    <div className="product-description">
                      <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                  </div>
                  <div id="specification" className="tab-pane" role="tabpanel">
                    <div className="product-description">
                      <div dangerouslySetInnerHTML={{ __html: product.specifications || 'No specifications available.' }} />
                    </div>
                  </div>
                  <div id="reviews" className="tab-pane" role="tabpanel">
                    <div className="product-description">
                      <div className="rating-box">
                        <ul>
                          {renderStars(averageRating)}
                        </ul>
                        <p>Based on {totalRatings} reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Product Tab Area End Here */}

      {/* Begin Uren's Product Tab Area */}
      <div  style={{display:'none'}} className="uren-product_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>Related Products</span>
                <h3>You May Also Like</h3>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product-slider uren-slick-slider slider-navigation_style-1 img-hover-effect_area" data-slick-options='{
              "slidesToShow": 4,
              "arrows" : true
              }' data-slick-responsive='[
                          {"breakpoint":1501, "settings": {"slidesToShow": 3}},
                          {"breakpoint":1200, "settings": {"slidesToShow": 2}},
                          {"breakpoint":992, "settings": {"slidesToShow": 2}},
                          {"breakpoint":767, "settings": {"slidesToShow": 1}},
                          {"breakpoint":575, "settings": {"slidesToShow": 1}}
                      ]'>
                <div className="product-slide_item">
                  <div className="inner-slide">
                    <div className="single-product">
                      <div className="product-img">
                        <Link href={createLocaleUrl('/product/1')}>
                          <Image className="primary-img" src={product.images[0]} alt="skyshore's Product Image" width={300} height={300} quality={95} style={{ objectFit: 'contain' }} />
                          <Image className="secondary-img" src={product.images[1]} alt="skyshore's Product Image" width={300} height={300} quality={95} style={{ objectFit: 'contain' }} />
                        </Link>
                        <div className="sticker">
                          <span className="sticker">New</span>
                        </div>
                        <div className="add-actions">
                          <ul>
                            <li><Link className="uren-add_cart" href={createLocaleUrl('/cart')} data-toggle="tooltip" data-placement="top" title="Add To Cart"><i className="ion-bag"></i></Link></li>
                            <li><Link className="uren-wishlist" href={createLocaleUrl('/wishlist')} data-toggle="tooltip" data-placement="top" title="Add To Wishlist"><i className="ion-android-favorite-outline"></i></Link></li>
                            <li><Link className="uren-add_compare" href={createLocaleUrl('/compare')} data-toggle="tooltip" data-placement="top" title="Compare This Product"><i className="ion-android-options"></i></Link></li>
                            <li className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><Link href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="Quick View"><i className="ion-android-open"></i></Link></li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="product-desc_info">
                          <div className="rating-box">
                            <ul>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                              <li><i className="ion-android-star"></i></li>
                            </ul>
                          </div>
                          <h6><Link className="product-name" href={createLocaleUrl('/product/1')}>Uren&apos;s Product</Link></h6>
                          <div className="price-box">
                            <span className="new-price">₦29,900.00</span>
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
      {/* Uren's Product Tab Area End Here */}
    </>
  );
};

export default ProductDetailsPageClient; 