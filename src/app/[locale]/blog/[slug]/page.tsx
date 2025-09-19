'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchBlogBySlug, fetchBlogs } from '@/store/slices/blogSlice';
import { RootState } from '@/store/store';
import { useScriptLoader } from '@/hooks/useScriptLoader';
interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const BlogDetailsPage = ({ params }: BlogDetailsPageProps) => {
  const dispatch = useAppDispatch();
  const { blogs, currentBlog, loading, error } = useAppSelector((state: RootState) => state.blog);

  useScriptLoader({
    onLoad: () => {
      console.log('Scripts loaded successfully for blog details page');
    },
    onError: (error) => {
      console.error('Error loading scripts:', error);
    }
  });

  useEffect(() => {
    const loadBlog = async () => {
      const { slug } = await params;
      dispatch(fetchBlogBySlug(slug));
      
      // Also load recent blogs for sidebar
      if (blogs.length === 0) {
        dispatch(fetchBlogs({ limit: 5 }));
      }
    };
    
    loadBlog();
  }, [dispatch, params, blogs.length]);

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
      {/* Uren's Blog Details Left Sidebar Area Start Here */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2 className="breadcrumb__title">Blog Details</h2>
            <ul className="breadcrumb__list">
              <li className="breadcrumb__item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb__item">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="breadcrumb__item breadcrumb__item--active">
                {currentBlog?.slug}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="uren-blog_area uren-blog-details bg--white_smoke">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 order-lg-1 order-2">
              <div className="uren-blog-sidebar">
              
             
                <div className="uren-blog-sidebar__recent">
                  <h4 className="uren-blog-sidebar-title">Recent Posts</h4>
                  {recentPosts.map((post) => (
                    <div style={{marginBottom:10}} key={post._id} className="recent-post">
                      <div className="recent-post_thumb">
                        <Link href={`/blog/${post.slug}`}>
                          <Image 
                            className="img-full" 
                            src={post.featuredImage} 
                            alt={post.title} 
                            width={80} 
                            height={60}
                            quality={95}
                            style={{ objectFit: 'cover',borderRadius:5 }}
                          />
                        </Link>
                      </div>
                      <div className="recent-post_desc">
                        <span><Link href={`/blog/${post.slug}`}>{post.title}</Link> &nbsp; - &nbsp; </span>
                        <span className="post-date">{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
            
               
              </div>
            </div>
            <div className="col-lg-9 order-lg-2 order-1">
              {loading ? (
                <div className="text-center">
                  <p>Loading blog post...</p>
                </div>
              ) : error ? (
                <div className="text-center">
                  <p>Error loading blog post: {error}</p>
                </div>
              ) : currentBlog ? (
                <div className="blog-item">
                  <div className="blog-img img-hover_effect">
                    <Link href="javascript:void(0)">
                      <Image 
                        src={currentBlog.featuredImage} 
                        alt={currentBlog.title} 
                        width={800} 
                        height={400}
                        quality={95}
                        style={{ objectFit: 'cover',borderRadius:5 }}
                      />
                    </Link>
                    <span className="post-date">{formatDate(currentBlog.publishedAt)}</span>
                  </div>
                  <div className="blog-content">
                    <h3><Link href="javascript:void(0)">{currentBlog.title}</Link></h3>
                    <p>{currentBlog.content}</p>
                    <div className="uren-btn-ps_left">
                    </div>
                  </div>
                  <div className="uren-blog-blockquote">
                    <blockquote>
                      <p>
                        {currentBlog.excerpt}
                      </p>
                    </blockquote>
                  </div>
                  <div className="blog-additional_information">
                    <p>
                      Aspernatur autem dolores optio dolore temporibus voluptatem ut ad nulla dolor eligendi ipsum eum, aperiam officia debitis quasi? Voluptas, perspiciatis assumenda perferendis cumque quaerat, exercitationem quas dolorem tenetur molestias neque ratione modi nemo ex, suscipit sed obcaecati nam recusandae eum itaque unde.
                    </p>
                  </div>
                  <div className="uren-tag-line">
                    <h4>Tag:</h4>
                    {currentBlog.tags.map((tag, index) => (
                      <React.Fragment key={index}>
                        <Link href="javascript:void(0)">{tag}</Link>
                        {index < currentBlog.tags.length - 1 && ','}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="uren-social_link">
                    <ul>
                      <li className="facebook">
                        <Link href="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title="Facebook">
                          <i className="fab fa-facebook"></i>
                        </Link>
                      </li>
                      <li className="twitter">
                        <Link href="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                          <i className="fab fa-twitter-square"></i>
                        </Link>
                      </li>
                      <li className="google-plus">
                        <Link href="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google Plus">
                          <i className="fab fa-google-plus"></i>
                        </Link>
                      </li>
                      <li className="instagram">
                        <Link href="https://rss.com/" data-toggle="tooltip" target="_blank" title="Instagram">
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
            
                  <div style={{display:'none'}} className="uren-blog-comment-wrapper">
                    <h3>leave a reply</h3>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    <form action="javascript:void(0)">
                      <div className="comment-post-box">
                        <div className="row">
                          <div className="col-lg-12">
                            <label>comment</label>
                            <textarea name="comment" placeholder="Write a comment"></textarea>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <label>Name</label>
                            <input type="text" className="coment-field" placeholder="Name" />
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <label>Email</label>
                            <input type="text" className="coment-field" placeholder="Email" />
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <label>Website</label>
                            <input type="text" className="coment-field" placeholder="Website" />
                          </div>
                          <div className="col-lg-12">
                            <div className="comment-btn_wrap f-left">
                              <div className="uren-post-btn_area">
                                <Link className="uren-btn-2" href="javascript:void(0)">Post comment</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p>Blog post not found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Blog Details Left Sidebar Area End Here */}
    </>
  );
};

export default BlogDetailsPage; 