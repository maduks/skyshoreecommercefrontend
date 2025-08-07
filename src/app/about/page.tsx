'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>About Us</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li className="active">About Us</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's About Us Area */}
      <div className="about-us-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-us-img">
                <Image 
                  src="/assets/images/about-us/1.jpg" 
                  alt="About Us" 
                  width={600} 
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-us-content">
                <h2>About Skyshore</h2>
                <p>We are a team of designers and developers that create high quality HTML Template & Woocommerce, Shopify Theme. We are a team of designers and developers that create high quality HTML Template & Woocommerce, Shopify Theme.</p>
                <p>We are a team of designers and developers that create high quality HTML Template & Woocommerce, Shopify Theme. We are a team of designers and developers that create high quality HTML Template & Woocommerce, Shopify Theme.</p>
                <div className="about-us-btn">
                  <Link href="/shop" className="uren-btn">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's About Us Area End Here */}

      {/* Begin Uren's Team Area */}
      <div className="team-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title_area">
                <span>Our Team</span>
                <h3>Meet Our Experts</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="team-member">
                <div className="team-member_img">
                  <Image 
                    src="/assets/images/about-us/team/1.jpg" 
                    alt="Team Member" 
                    width={300} 
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="team-member_content">
                  <h4>John Doe</h4>
                  <p>CEO & Founder</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-member">
                <div className="team-member_img">
                  <Image 
                    src="/assets/images/about-us/team/2.jpg" 
                    alt="Team Member" 
                    width={300} 
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="team-member_content">
                  <h4>Jane Smith</h4>
                  <p>Design Director</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-member">
                <div className="team-member_img">
                  <Image 
                    src="/assets/images/about-us/team/3.jpg" 
                    alt="Team Member" 
                    width={300} 
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="team-member_content">
                  <h4>Mike Johnson</h4>
                  <p>Lead Developer</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-member">
                <div className="team-member_img">
                  <Image 
                    src="/assets/images/about-us/team/4.jpg" 
                    alt="Team Member" 
                    width={300} 
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="team-member_content">
                  <h4>Sarah Wilson</h4>
                  <p>Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Team Area End Here */}
    </>
  );
};

export default AboutPage; 