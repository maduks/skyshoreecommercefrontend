'use client';

import React from 'react';

const ShippingInfo = () => {
  return (
    <div className="uren-shipping_area">
      <div className="container-fluid">
        <div className="shipping-nav">
          <div className="row no-gutters">
           
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-paperplane-outline"></i>
                </div>
                <div className="shipping-content">
                  <h6>Free Shipping</h6>
                  <p>Free shipping on all US order</p>
                </div>
              </div>
            </div>
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-help-outline"></i>
                </div>
                <div className="shipping-content">
                  <h6>Support 24/7</h6>
                  <p>Contact us 24 hours a day</p>
                </div>
              </div>
            </div>
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-refresh-empty"></i>
                </div>
                <div className="shipping-content">
                  <h6>100% Money Back</h6>
                  <p>You have 30 days to Return</p>
                </div>
              </div>
            </div>
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-undo-outline"></i>
                </div>
                <div className="shipping-content">
                  <h6>90 Days Return</h6>
                  <p>If goods have problems</p>
                </div>
              </div>
            </div>
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-locked-outline"></i>
                </div>
                <div className="shipping-content last-child">
                  <h6>Payment Secure</h6>
                  <p>We ensure secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo; 