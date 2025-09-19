'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchBlogs } from '@/store/slices/blogSlice';
import { RootState } from '@/store/store';

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations('pages.blog');
  const tNav = useTranslations('navigation');
  const { blogs, loading } = useAppSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (blogs.length === 0 && !loading) {
      dispatch(fetchBlogs({ limit: 10 }));
    }
  }, [dispatch, blogs.length, loading]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Use recent posts for sidebar (first 5 blogs)
  const recentPosts = blogs.slice(0, 5);



  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>{t('title')}</h2>
            <ul>
              <li><Link href="/">{tNav('home')}</Link></li>
              <li className="active">{t('breadcrumb')}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's Blog Left Sidebar Area */}
      <div className="uren-blog_area grid-view_area blog-with_sidebar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 order-lg-1 order-2">
              <div className="uren-blog-sidebar-wrapper">
                
              
                <div className="uren-blog-sidebar">
                  <h4 className="uren-blog-sidebar-title">Recent Posts</h4>
                  {recentPosts.map((post) => (
                    <div style={{marginBottom:10}} key={post._id} className="recent-post">
                      <div className="recent-post_thumb">
                        <Link href={`/blog/${post.slug}`}>
                          <Image 
                            className="img-full" 
                            src={post.featuredImage} 
                            alt={post.title} 
                            width={100} 
                            height={100}
                            quality={95}
                            style={{ objectFit: 'cover',borderRadius:2 }}
                          />
                        </Link>
                      </div>
                      <div className="recent-post_desc">
                        <span><Link href={`/blog/${post.slug}`}>{post.title}</Link></span>
                        <span className="post-date">{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
            
               
              </div>
            </div>
            <div className="col-lg-9 order-lg-2 order-1">
              <div className="row blog-item_wrap">
                {blogs.map((post) => (
                  <div key={post._id} className="col-xl-4 col-lg-6">
                    <div className="blog-item">
                      <div className="blog-img img-hover_effect">
                        <Link href={`/blog/${post.slug}`}>
                          <Image 
                            src={post.featuredImage} 
                            alt={post.title} 
                            width={300} 
                            height={200}
                            quality={95}
                            style={{ objectFit: 'cover',borderRadius:5 }}
                          />
                        </Link>
                        <span className="post-date">{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="blog-content">
                        <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                        <p>{post.excerpt}</p>
                        <div className="uren-btn-ps_left">
                          <Link className="uren-btn-2" href={`/blog/${post.slug}`}>Read More</Link>
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
      {/* Uren's Blog Left Sidebar Area End Here */}
    </>
  );
};

export default BlogPage; 