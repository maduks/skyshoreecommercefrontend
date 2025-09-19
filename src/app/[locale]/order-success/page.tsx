'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';

const OrderSuccessPage = () => {
  const dispatch = useAppDispatch();
  const currentLocale = useCurrentLocale();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orderTotal = searchParams.get('total');
  const { isAuthenticated } = useAppSelector((state: any) => state.user);
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };

  // Clear cart when order success page loads
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>ORDER SUCCESS</h2>
            <ul>
              <li><Link href={createLocaleUrl('/')}>Home</Link></li>
              <li className="active">Order Success</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Order Success Area */}
      <div className="order-success-area pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="order-success-content text-center">
                {/* Success Icon */}
                <div className="success-icon mb-4">
                  <div className="success-circle">
                    <i className="ion-checkmark" style={{ fontSize: '60px', color: '#28a745' }}></i>
                  </div>
                </div>

                {/* Success Message */}
                <div className="success-message mb-5">
                  <h2 className="text-success mb-3">Order Placed Successfully!</h2>
                  <p className="text-muted">
                    Thank you for your purchase. Your order has been received and is being processed.
                  </p>
                </div>

                {/* Order Details */}
                <div className="order-details mb-5">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h4 className="mb-0">Order Details</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 text-md-left text-center mb-3">
                          <strong>Order ID:</strong>
                          <p className="text-primary">{orderId || 'N/A'}</p>
                        </div>
                        <div className="col-md-6 text-md-right text-center mb-3">
                          <strong>Total Amount:</strong>
                          <p className="text-success">{orderTotal || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center">
                          <strong>Status:</strong>
                          <p className="text-info">Processing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="next-steps mb-5">
                  <h4 className="mb-3">What&apos;s Next?</h4>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div className="step-item">
                        <div className="step-icon mb-2">
                          <i className="ion-email" style={{ fontSize: '30px', color: '#007bff' }}></i>
                        </div>
                                                 <h6>Order Confirmation</h6>
                         <p className="text-muted small">You&apos;ll receive an email confirmation shortly</p>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="step-item">
                        <div className="step-icon mb-2">
                          <i className="ion-card" style={{ fontSize: '30px', color: '#28a745' }}></i>
                        </div>
                        <h6>Payment Processing</h6>
                        <p className="text-muted small">Your payment is being processed</p>
                      </div>
                    </div>
                                         <div className="col-md-4 mb-3">
                       <div className="step-item">
                         <div className="step-icon mb-2">
                           <i className="ion-android-car" style={{ fontSize: '30px', color: '#ffc107' }}></i>
                         </div>
                         <h6>Delivery</h6>
                         <p className="text-muted small">Your order will be delivered within 2-3 business days</p>
                       </div>
                     </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <div className="row">
                    {isAuthenticated && (
                      <div className="col-md-4 mb-3">
                        <Link 
                          href={createLocaleUrl('/my-account')} 
                          className="btn btn-primary btn-lg btn-block"
                          style={{ width: '100%' }}
                        >
                          <i className="ion-person mr-2"></i>
                          View Dashboard
                        </Link>
                      </div>
                    )}
                    <div className="col-md-4 mb-3">
                      <Link 
                        href={createLocaleUrl('/shop')} 
                        className="btn btn-warning btn-lg btn-block"
                        style={{ width: '100%' }}
                      >
                        <i className="ion-bag mr-2"></i>
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="col-md-4 mb-3">
                      <Link 
                        href={createLocaleUrl('/')} 
                        className="btn btn-danger btn-lg btn-block"
                        style={{ width: '100%' }}
                      >
                        <i className="ion-home mr-2"></i>
                        Back to Home
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="additional-info mt-5">
                  <div className="alert alert-info">
                                         <h6><i className="ion-information-circled mr-2"></i>Need Help?</h6>
                     <p className="mb-2">
                       If you have any questions about your order, please don&apos;t hesitate to contact us.
                     </p>
                    <Link href={createLocaleUrl('/contact')} className="btn btn-sm btn-outline-info">
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order Success Area End Here */}

      <style jsx>{`
        .success-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #d4edda;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          border: 4px solid #28a745;
        }
        
        .step-item {
          padding: 20px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .step-item:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .step-icon {
          display: flex;
          justify-content: center;
        }
        
        .btn-block {
          display: block;
          width: 100%;
        }
        
        .order-success-content {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  );
};

export default OrderSuccessPage; 