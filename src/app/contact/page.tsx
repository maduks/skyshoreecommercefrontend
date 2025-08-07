import React from 'react';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Contact Us</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li className="active">Contact</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's Contact Area */}
      <div className="contact-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-info">
                <h3>Get In Touch</h3>
                <p>We are a team of designers and developers that create high quality HTML Template & Woocommerce, Shopify Theme.</p>
                <div className="contact-info_item">
                  <div className="contact-info_icon">
                    <i className="ion-android-call"></i>
                  </div>
                  <div className="contact-info_content">
                    <h4>Phone</h4>
                    <p>+123 321 345</p>
                  </div>
                </div>
                <div className="contact-info_item">
                  <div className="contact-info_icon">
                    <i className="ion-email"></i>
                  </div>
                  <div className="contact-info_content">
                    <h4>Email</h4>
                    <p>info@yourdomain.com</p>
                  </div>
                </div>
                <div className="contact-info_item">
                  <div className="contact-info_icon">
                    <i className="ion-android-pin"></i>
                  </div>
                  <div className="contact-info_content">
                    <h4>Address</h4>
                    <p>The Barn, Ullenhall, Henley in Arden B578 5CC, England</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-form">
                <h3>Send Message</h3>
                <form action="javascript:void(0)">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="text" placeholder="Your Name" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="email" placeholder="Your Email" required />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input type="text" placeholder="Subject" required />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea placeholder="Your Message" rows={5} required></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <button type="submit" className="uren-btn">Send Message</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Contact Area End Here */}

      {/* Begin Uren's Map Area */}
      <div className="map-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="map-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sin!4v1644262070010!5m2!1sen!2sin" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Map Area End Here */}
    </>
  );
};

export default ContactPage; 