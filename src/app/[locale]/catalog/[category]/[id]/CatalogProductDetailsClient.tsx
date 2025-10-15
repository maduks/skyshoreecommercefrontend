'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { Product, fetchProducts } from '@/store/slices/productSlice';
import { RootState } from '@/store/store';
import ImageZoomModal from '@/components/ImageZoomModal';
import { useScriptLoader } from '@/hooks/useScriptLoader';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

interface CatalogProductDetailsClientProps {
  category: string;
  id: string;
}

const CatalogProductDetailsClient = ({ category, id }: CatalogProductDetailsClientProps) => {
  const dispatch = useAppDispatch();
  const currentLocale = useCurrentLocale();
  const { products, loading } = useAppSelector((state: RootState) => state.products);
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  useScriptLoader({
    onLoad: () => {
      console.log('Scripts loaded successfully for catalog product details page');
    },
    onError: (error) => {
      console.error('Error loading scripts:', error);
    }
  });

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

  // Add styling to Features and Applications sections
  useEffect(() => {
    if (product && product.description) {
      const timer = setTimeout(() => {
        const descriptionElement = document.querySelector('.product-description');
        if (descriptionElement) {
          // Find Features & Benefits section
          const featuresHeading = Array.from(descriptionElement.querySelectorAll('h3')).find(
            h3 => h3.textContent?.toLowerCase().includes('features') || h3.textContent?.toLowerCase().includes('benefits')
          );
          if (featuresHeading) {
            const featuresList = featuresHeading.nextElementSibling;
            if (featuresList && featuresList.tagName === 'UL') {
              featuresList.classList.add('features-list');
            }
          }

          // Find Applications section
          const applicationsHeading = Array.from(descriptionElement.querySelectorAll('h3')).find(
            h3 => h3.textContent?.toLowerCase().includes('applications')
          );
          if (applicationsHeading) {
            const applicationsList = applicationsHeading.nextElementSibling;
            if (applicationsList && applicationsList.tagName === 'UL') {
              applicationsList.classList.add('applications-list');
            }
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [product]);

  const getCategoryTitle = (categorySlug: string) => {
    const titleMap: { [key: string]: string } = {
      'sigma': 'Sigma Series',
      'apex': 'Apex Series',
      'spark': 'Spark Series',
      'sintec': 'Sintec Series',
      'sae': 'SAE Series',
    };
    return titleMap[categorySlug.toLowerCase()] || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  };

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
    } else if (value && typeof value === 'object' && '$numberInt' in value) {
      return parseInt(value.$numberInt);
    } else if (value && typeof value === 'object' && '$numberDouble' in value) {
      return parseFloat(value.$numberDouble);
    }
    return 0;
  };

  const handleImageClick = (imageIndex: number) => {
    setSelectedImage(imageIndex);
    setIsZoomModalOpen(true);
  };

  const closeZoomModal = () => {
    setIsZoomModalOpen(false);
  };

  if (loading) {
    return (
      <div className="sp-area">
        <div className="container">
          <div className="text-center">
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-area">
        <div className="container">
          <div className="error-content text-center">
            <h3>⚠️ Product not found</h3>
            <p>The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href={createLocaleUrl('/catalog')} className="btn btn-primary">
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const productId = typeof product._id === 'string' ? product._id : product._id.$oid;
  const categoryTitle = getCategoryTitle(category);
  const numericPrice = getNumericValue(product.price);
  const numericSalePrice = product.salePrice ? getNumericValue(product.salePrice) : 0;
  const isOnSale = numericSalePrice > 0 && numericSalePrice < numericPrice;
  const averageRating = typeof product.averageRating === 'number' ? product.averageRating : getNumericValue(product.averageRating);
  const totalRatings = typeof product.totalRatings === 'number' ? product.totalRatings : getNumericValue(product.totalRatings);

  return (
    <>
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
              <li><Link href={createLocaleUrl('/')}>Home</Link></li>
              <li><Link href={createLocaleUrl('/catalog')}>Catalog</Link></li>
              <li><Link href={createLocaleUrl(`/catalog/${category}`)}>{categoryTitle}</Link></li>
              <li className="active">{product.name}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's Single Product Area */}
      <div className="sp-area">
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
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => handleImageClick(index)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <i className="ion-android-search" style={{ fontSize: '18px' }}></i>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  {product.images && product.images.length > 1 && (
                    <div className="sp-img_slider-nav slick-img-slider-nav uren-slick-slider" data-slick-options='{
                    "slidesToShow": 4,
                    "slidesToScroll": 1,
                    "arrows": false,
                    "asNavFor": ".sp-img_slider",
                    "focusOnSelect": true,
                    "vertical": false,
                    "responsive": [
                      {"breakpoint": 768, "settings": {"slidesToShow": 3}},
                      {"breakpoint": 480, "settings": {"slidesToShow": 2}}
                    ]
                    }' data-slick-responsive='[
                            {"breakpoint": 768, "settings": {"slidesToShow": 3}},
                            {"breakpoint": 480, "settings": {"slidesToShow": 2}}
                        ]'>
                      {product.images.map((image, index) => (
                        <div key={index} className="single-slide">
                          <Image 
                            src={image} 
                            alt={`${product.name} ${index + 1}`} 
                            width={80} 
                            height={80}
                            quality={90}
                            style={{ 
                              objectFit: 'contain',
                              cursor: 'pointer',
                              border: selectedImage === index ? '2px solid #007bff' : '2px solid transparent',
                              borderRadius: '4px',
                              transition: 'all 0.3s ease'
                            }}
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-lg-8">
                <div className="sp-content">
                  <div className="sp-heading">
                    <h5><Link href={createLocaleUrl(`/catalog/${category}`)}>{categoryTitle}</Link></h5>
                    <h2><Link href="#">{product.name}</Link></h2>
                  </div>
                  
                  <div className="rating-box">
                    <ul>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <li key={star} className={star <= averageRating ? "" : "silver-color"}>
                          <i className="ion-android-star"></i>
                        </li>
                      ))}
                    </ul>
                    <span>({totalRatings} customer reviews)</span>
                  </div>
                  
                  {/* <div className="price-box">
                    {isOnSale ? (
                      <>
                        <span className="new-price new-price-2">{formatPrice(product.salePrice!)}</span>
                        <span className="old-price">{formatPrice(product.price)}</span>
                      </>
                    ) : (
                      <span className="new-price">{formatPrice(product.price)}</span>
                    )}
                  </div> */}
                  
                  <div className="sp-essential_stuff">
                    <ul>
                      <li>SKU: {product.sku}</li>
                      <li>Brand: {product.brand}</li>
                      <li>Stock: {getNumericValue(product.stock)} units available</li>
                    </ul>
                  </div>
                  
                  <div className="product-desc">
                    <p>{stripHtmlTags(product.description).substring(0, 200)}...</p>
                  </div>
                  
                  <div className="uren-btn-ps_left">
                    <Link style={{width:'30%'}} className="uren-btn" href={createLocaleUrl('/contact')}>
                      Contact for Purchase
                    </Link>
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
                    {product.specifications && (
                      <li>
                        <a data-toggle="tab" href="#specification" role="tab" aria-controls="specification" aria-selected="false">
                          <span>Specification</span>
                        </a>
                      </li>
                    )}
                    <li>
                      <a data-toggle="tab" href="#datasheet" role="tab" aria-controls="datasheet" aria-selected="false">
                        <span>Technical Data Download</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content uren-tab_content">
                  <div id="description" className="tab-pane active show" role="tabpanel">
                    <div className="product-description">
                      <div 
                        dangerouslySetInnerHTML={{ __html: product.description }} 
                        style={{
                          '--features-bullet': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23007bff\'%3E%3Cpath d=\'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z\'/%3E%3C/svg%3E")',
                          '--applications-bullet': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%2328a745\'%3E%3Cpath d=\'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z\'/%3E%3C/svg%3E")'
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                  {product.specifications && (
                    <div id="specification" className="tab-pane" role="tabpanel">
                      <div className="product-description">
                        <div dangerouslySetInnerHTML={{ __html: product.specifications || 'No specifications available.' }} />
                      </div>
                    </div>
                  )}
                  <div id="datasheet" className="tab-pane" role="tabpanel">
                    <div className="product-description">
                      <div className="datasheet-download-section">
                        <h4>Technical Data Sheet</h4>
                        <p>Download the complete technical data sheet for {product.name} to get detailed specifications, performance data, and application guidelines.</p>
                        <div className="datasheet-actions">
                          <a 
                            href={`/assets/datasheets/${product.sku || productId}.pdf`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-primary datasheet-download-btn"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '12px 24px',
                              backgroundColor: '#007bff',
                              color: 'white',
                              textDecoration: 'none',
                              borderRadius: '6px',
                              fontWeight: '500',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0056b3';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#007bff';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <i className="ion-android-download" style={{ fontSize: '18px' }}></i>
                            Download Technical Data Sheet
                          </a>
                          <p className="datasheet-note" style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
                            <i className="ion-information-circled" style={{ marginRight: '6px' }}></i>
                            PDF format • Updated regularly • Free download
                          </p>
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

export default CatalogProductDetailsClient;