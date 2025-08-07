'use client';

import React, { useState } from 'react';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="popup_wrapper">
      <div className="test">
        <button className="popup_off" onClick={handleClose}>
          <i className="ion-android-close"></i>
        </button>
        <div className="subscribe_area">
          <h2>Sign Up Newsletter</h2>
          <p>Subscribe to the our store mailing list to receive updates on new arrivals, special offers and other discount information.</p>
          <div className="subscribe-form-group">
            <form className="subscribe-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">subscribe</button>
            </form>
          </div>
          <div className="subscribe-bottom">
            <input 
              type="checkbox" 
              id="newsletter-permission"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            <label htmlFor="newsletter-permission"> Don&apos;t show this popup again</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup; 