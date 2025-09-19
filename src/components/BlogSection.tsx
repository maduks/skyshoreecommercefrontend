'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchBlogs } from '@/store/slices/blogSlice';
import { RootState } from '@/store/store';
import { useTranslations } from 'next-intl';

// Declare jQuery types
declare global {
  interface Window {
    jQuery: any;
  }
}

const BlogSection = () => {
  const t = useTranslations('pages.home');
  const sliderRef = useRef(null);
  const [sliderInitialized, setSliderInitialized] = React.useState(false);
  const [sliderFailed, setSliderFailed] = React.useState(false);
  const dispatch = useAppDispatch();
  const { blogs, loading, error } = useAppSelector((state: RootState) => state.blog);

  useEffect(() => {
    console.log('BlogSection: blogs.length =', blogs.length, 'loading =', loading, 'error =', error);
    // Only fetch blogs if we don't have any and not currently loading
    if (blogs.length === 0 && !loading) {
      console.log('BlogSection: Dispatching fetchBlogs');
      dispatch(fetchBlogs({ featured: true, limit: 6 }));
    }
  }, [dispatch, blogs.length, loading, error]);

  // Initialize blog slider when blogs are loaded and scripts are available
  useEffect(() => {
    if (!blogs.length || loading) {
      return; // Don't initialize if no blogs or still loading
    }

    // Wait for jQuery and Slick to be available
    const initializeSlider = () => {
      console.log('initializeSlider called', {
        window: typeof window !== 'undefined',
        jQuery: typeof window !== 'undefined' && (window as any).jQuery,
        slick: typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.slick,
        sliderRef: sliderRef.current,
        blogsLength: blogs.length
      });

      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.slick && sliderRef.current) {
        const $ = (window as any).jQuery;
        const slider = $(sliderRef.current);
        
        console.log('Slider element found:', {
          element: sliderRef.current,
          slideItems: slider.find('.slide-item').length,
          alreadyInitialized: slider.hasClass('slick-initialized')
        });
        
        // Check if slider is already initialized
        if (slider.hasClass('slick-initialized')) {
          console.log('Blog slider already initialized');
          return;
        }

        // Check if slider has content
        if (slider.find('.slide-item').length === 0) {
          console.log('Blog slider has no content, waiting...');
          return;
        }

        try {
          // Destroy any existing slider first
          if (slider.hasClass('slick-slider')) {
            slider.slick('unslick');
          }

          slider.slick({
            slidesToShow: 4,
            spaceBetween: 30,
            arrows: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 1000,
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1
                }
              }
            ]
          });
          slider.addClass('slick-initialized');
          setSliderInitialized(true);
          setSliderFailed(false);
          console.log('Blog slider initialized successfully with', slider.find('.slide-item').length, 'items');
        } catch (error) {
          console.error('Error initializing blog slider:', error);
          setSliderFailed(true);
        }
      }
    };

    // Try to initialize immediately
    initializeSlider();

    // Force initialization after a delay to ensure DOM is ready
    setTimeout(() => {
      console.log('Force initialization attempt...');
      initializeSlider();
    }, 1000);

    // If not ready, wait and retry with exponential backoff
    let retryCount = 0;
    const maxRetries = 15; // Increased retries
    
    const checkAndInitialize = () => {
      console.log('Checking for jQuery and Slick...', {
        jQuery: typeof window !== 'undefined' && (window as any).jQuery,
        slick: typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.slick,
        retryCount
      });
      
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.slick) {
        initializeSlider();
      } else if (retryCount < maxRetries) {
        retryCount++;
        const delay = Math.min(100 * Math.pow(2, retryCount - 1), 2000); // Exponential backoff, max 2s
        console.log(`Retry ${retryCount}/${maxRetries} in ${delay}ms`);
        setTimeout(checkAndInitialize, delay);
      } else {
        console.error('Failed to initialize blog slider after', maxRetries, 'retries');
        setSliderFailed(true);
      }
    };

    // Start checking if not immediately available
    if (typeof window !== 'undefined' && (!(window as any).jQuery || !(window as any).jQuery.fn.slick)) {
      setTimeout(checkAndInitialize, 100);
    }

    // Clean up the slick instance when the component unmounts
    return () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && sliderRef.current) {
        const $ = (window as any).jQuery;
        const slider = $(sliderRef.current);
        if (slider.hasClass('slick-initialized')) {
          try {
            slider.slick('unslick');
            slider.removeClass('slick-initialized');
            console.log('Blog slider cleaned up');
          } catch (error) {
            console.error('Error cleaning up blog slider:', error);
          }
        }
      }
    };
  }, [blogs.length, loading]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };

  return (
    <div className="uren-blog_area bg--white_smoke">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
                        <div className="section-title_area">
              <span>{t('ourRecentPosts')}</span>
              <h3>{t('fromOurBlogs')}</h3>
             
            </div>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-2">Loading blog posts...</p>
                <p>Debug: blogs.length = {blogs.length}</p>
              </div>
            ) : blogs.length > 0 ? (
              <>
                {/* Slider Layout */}
                <div 
                  ref={sliderRef} 
                  className="blog-slider uren-slick-slider slider-navigation_style-1"
                  style={{ display: sliderFailed ? 'none' : 'block' }}
                  data-slick-options='{
                    "slidesToShow": 4,
                    "spaceBetween": 30,
                    "arrows": true
                  }'
                  data-slick-responsive='[
                    {"breakpoint":1200, "settings": {"slidesToShow": 3}},
                    {"breakpoint":992, "settings": {"slidesToShow": 2}},
                    {"breakpoint":768, "settings": {"slidesToShow": 2}},
                    {"breakpoint":576, "settings": {"slidesToShow": 1}}
                  ]'
                >
                  {blogs.map((post) => (
                    <div key={post._id} className="slide-item">
                      <div className="inner-slide">
                        <div className="blog-img img-hover_effect">
                          <Link href={`/blog/${post.slug}`}>
                            <Image 
                              src={post.featuredImage} 
                              alt={post.title} 
                              width={300} 
                              height={200}
                              quality={95}
                              style={{ objectFit: 'cover' }}
                            />
                          </Link>
                          <span className="post-date">{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="blog-content">
                          <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                          <p>{post.excerpt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Fallback Grid Layout if slider fails */}
                {sliderFailed && (
                  <div className="row">
                    {blogs.map((post) => (
                      <div key={post._id} className="col-lg-3 col-md-6 col-sm-6">
                        <div className="inner-slide">
                          <div className="blog-img img-hover_effect">
                            <Link href={`/blog/${post.slug}`}>
                              <Image 
                                src={post.featuredImage} 
                                alt={post.title} 
                                width={300} 
                                height={200}
                                quality={95}
                                style={{ objectFit: 'cover' }}
                              />
                            </Link>
                            <span className="post-date">{formatDate(post.publishedAt)}</span>
                          </div>
                          <div className="blog-content">
                            <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                            <p>{post.excerpt}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <p>No blog posts found.</p>
                <p>Blogs loaded: {blogs.length}</p>
                <p>Loading state: {loading ? 'true' : 'false'}</p>
                <p>Error: {error || 'none'}</p>
                <button 
                  className="btn btn-primary mt-2" 
                  onClick={() => dispatch(fetchBlogs({ featured: true, limit: 6 }))}
                >
                  Retry Fetch
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection; 