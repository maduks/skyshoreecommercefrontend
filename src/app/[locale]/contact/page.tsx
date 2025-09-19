'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ContactPage = () => {
  const t = useTranslations('pages.contact');
  const tNav = useTranslations('navigation');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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

      {/* Begin Contact Main Page Area */}
      <div className="contact-main-page">
        <div className="container-fluid">
          <div id="google-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.8806958876207!2d7.477940075914679!3d9.074632190988547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0bf6a474bda7%3A0x3e3d6bda38184428!2s19%20Cairo%20Cres%2C%20Wuse%2C%20Abuja%20904101%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1754688152534!5m2!1sen!2sng" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 offset-lg-1 col-md-12 order-1 order-lg-2">
              <div className="contact-page-side-content">
                <h3 className="contact-page-title">Contact Us</h3>
                <p className="contact-page-message">
                  {t('contactInfoMsg')}
                </p>
                <div className="single-contact-block">
                  <h4><i className="fa fa-fax"></i> Address</h4>
                  <p>19A Cairo Crescent, Wuse II, Abuja, Nigeria</p>
                </div>
                <div className="single-contact-block">
                  <h4><i className="fa fa-phone"></i> Phone</h4>
                  <p>Mobile: (234) 209 292 0777</p>
                 
                </div>
                <div className="single-contact-block last-child">
                  <h4><i className="fa fa-envelope-o"></i> Email</h4>
                  <p>sales@skyshorelubs.com</p>
                  <p>info@skyshorelubs.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 order-2 order-lg-1">
              <div className="contact-form-content">
                <h3 className="contact-page-title">{t('sendMessage')}</h3>
                <div className="contact-form">
                  <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>{t('name')} <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="name" 
                        id="con_name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('email')} <span className="required">*</span></label>
                      <input 
                        type="email" 
                        name="email" 
                        id="con_email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('subject')}</label>
                      <input 
                        type="text" 
                        name="subject" 
                        id="con_subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group form-group-2">
                      <label>{t('message')}</label>
                      <textarea 
                        name="message" 
                        id="con_message"
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <button type="submit" value="submit" id="submit" className="uren-contact-form_btn" name="submit">{t('send')}</button>
                    </div>
                  </form>
                </div>
                <p className="form-messege"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Main Page Area End Here */}
    </>
  );
};

export default ContactPage; 