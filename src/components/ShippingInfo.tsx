'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

const ShippingInfo = () => {
  const t = useTranslations('pages.home');
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
                  <h6>{t('fastShipping')}</h6>
                  <p>{t('fastShippingDescription')}</p>
                </div>
              </div>
            </div>
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-help-outline"></i>
                </div>
                <div className="shipping-content">
                  <h6>{t('support247')}</h6>
                  <p>{t('support247Description')}</p>
                </div>
              </div>
            </div>
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-refresh-empty"></i>
                </div>
                <div className="shipping-content">
                  <h6>{t('moneyBack')}</h6>
                  <p>{t('moneyBackDescription')}</p>
                </div>
              </div>
            </div>
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-undo-outline"></i>
                </div>
                <div className="shipping-content">
                  <h6>{t('return90Days')}</h6>
                  <p>{t('return90DaysDescription')}</p>
                </div>
              </div>
            </div>
            <div className="shipping-grid">
              <div className="shipping-item">
                <div className="shipping-icon">
                  <i className="ion-ios-locked-outline"></i>
                </div>
                <div className="shipping-content last-child">
                  <h6>{t('securePayment')}</h6>
                  <p>{t('securePaymentDescription')}</p>
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