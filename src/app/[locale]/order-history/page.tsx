'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getUserOrders } from '@/store/slices/orderSlice';
import { logout as logoutUser } from '@/store/slices/userSlice';

const OrderHistoryPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token } = useAppSelector((state) => state.user);
  const { orders, loading } = useAppSelector((state) => state.order);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('order-history');

  // Load user orders when component mounts
  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserOrders({ token }));
    }
  }, [dispatch, isAuthenticated, token]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="badge badge-success">Delivered</span>;
      case 'processing':
        return <span className="badge badge-warning">Processing</span>;
      case 'pending':
        return <span className="badge badge-danger">Pending</span>;
      default:
        return <span className="badge badge-secondary">Unknown</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <i className="ion-checkmark-circled text-success"></i>;
      case 'processing':
        return <i className="ion-clock text-warning"></i>;
      case 'pending':
        return <i className="ion-alert text-danger"></i>;
      default:
        return <i className="ion-help text-secondary"></i>;
    }
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatus = (order: { isDelivered: boolean; isPaid: boolean }) => {
    if (order.isDelivered) return 'delivered';
    if (order.isPaid) return 'processing';
    return 'pending';
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return getOrderStatus(order) === filterStatus;
  });

  const selectedOrderData = orders.find(order => order._id === selectedOrder);

  return (
    <div className="main-content_wrapper">
      <div className="breadcrumb-area breadcrumb-height">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-12">
              <div className="breadcrumb-item">
                <h2 className="breadcrumb-heading">My Account</h2>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>My Account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="account-area section-space-y-axis-100">
        <div className="container">
          <div className="row">
            {/* Account Sidebar */}
            <div className="col-lg-3">
              <div className="account-sidebar">
                <div className="account-user">
                  <div className="user-avatar">
                    <i className="ion-person"></i>
                  </div>
                  <h5>{user?.name || 'User'}</h5>
                  <p>
                    Member since{' '}
                    {user && 'createdAt' in user && user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : '2024'}
                  </p>
                </div>

                <div className="account-menu">
                  <ul>
                    <li>
                      <Link 
                        href="/my-account" 
                        className={activeTab === 'dashboard' ? 'active' : ''}
                        onClick={() => setActiveTab('dashboard')}
                      >
                        <i className="ion-speedometer"></i> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/my-account" 
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => setActiveTab('profile')}
                      >
                        <i className="ion-person"></i> Profile
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/order-history" 
                        className="active"
                      >
                        <i className="ion-bag"></i> Order History
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/my-account" 
                        className={activeTab === 'security' ? 'active' : ''}
                        onClick={() => setActiveTab('security')}
                      >
                        <i className="ion-locked"></i> Security
                      </Link>
                    </li>
                 
                    <li>
                      <button className="text-danger" onClick={handleLogout}>
                        <i className="ion-log-out"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Account Content */}
            <div className="col-lg-9">
              <div className="account-content">
                <div className="order-history-header">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h3>Order History</h3>
                      <p>Track your order status and history</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <div className="filter-buttons">
                        <button
                          className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setFilterStatus('all')}
                        >
                          All Orders
                        </button>
                        <button
                          className={`btn btn-sm ${filterStatus === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setFilterStatus('pending')}
                        >
                          Pending
                        </button>
                        <button
                          className={`btn btn-sm ${filterStatus === 'processing' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setFilterStatus('processing')}
                        >
                          Processing
                        </button>
                        <button
                          className={`btn btn-sm ${filterStatus === 'delivered' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setFilterStatus('delivered')}
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <i className="ion-loading-a" style={{fontSize: '32px'}}></i>
                    <p>Loading your orders...</p>
                  </div>
                ) : filteredOrders.length > 0 ? (
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="order-list">
                        {filteredOrders.map((order) => (
                          <div key={order._id} className="order-item">
                            <div className="order-header">
                              <div className="order-info">
                                <h5>Order #{order._id}</h5>
                                <p className="order-date">{formatDate(order.createdAt)}</p>
                              </div>
                              <div className="order-status">
                                {getStatusBadge(getOrderStatus(order))}
                              </div>
                            </div>
                            <div className="order-summary">
                              <div className="row">
                                <div className="col-md-4">
                                  <span className="label">Total Amount:</span>
                                  <span className="value">{formatPrice(order.totalPrice)}</span>
                                </div>
                                <div className="col-md-4">
                                  <span className="label">Payment Method:</span>
                                  <span className="value">{order.paymentMethod}</span>
                                </div>
                                <div className="col-md-4">
                                  <span className="label">Items:</span>
                                  <span className="value">{order.orderItems.length} item(s)</span>
                                </div>
                              </div>
                            </div>
                            <div className="order-actions">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setSelectedOrder(order._id)}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      {selectedOrderData ? (
                        <div className="order-details">
                          <h4>Order Details</h4>
                          <div className="order-info-card">
                            <div className="info-section">
                              <h6>Order Information</h6>
                              <p><strong>Order ID:</strong> #{selectedOrderData._id}</p>
                              <p><strong>Date:</strong> {formatDate(selectedOrderData.createdAt)}</p>
                              <p><strong>Status:</strong> {getStatusBadge(getOrderStatus(selectedOrderData))}</p>
                              <p><strong>Payment Method:</strong> {selectedOrderData.paymentMethod}</p>
                            </div>

                            <div className="info-section">
                              <h6>Shipping Address</h6>
                              <p>{selectedOrderData.shippingAddress.street}</p>
                              <p>{selectedOrderData.shippingAddress.city}, {selectedOrderData.shippingAddress.state}</p>
                              <p>{selectedOrderData.shippingAddress.zipCode}</p>
                              <p>{selectedOrderData.shippingAddress.country}</p>
                            </div>

                            <div className="info-section">
                              <h6>Order Items</h6>
                              {selectedOrderData.orderItems.map((item: { product: string; quantity: number }, index: number) => (
                                <div key={index} className="order-item-detail">
                                  <span>Product ID: {item.product}</span>
                                  <span>Qty: {item.quantity}</span>
                                </div>
                              ))}
                            </div>

                            <div className="info-section">
                              <h6>Pricing</h6>
                              <div className="price-breakdown">
                                <div className="price-row">
                                  <span>Items Price:</span>
                                  <span>{formatPrice(selectedOrderData.itemsPrice)}</span>
                                </div>
                                <div className="price-row">
                                  <span>Shipping:</span>
                                  <span>{formatPrice(selectedOrderData.shippingPrice)}</span>
                                </div>
                                <div className="price-row">
                                  <span>Tax:</span>
                                  <span>{formatPrice(selectedOrderData.taxPrice)}</span>
                                </div>
                                <div className="price-row total">
                                  <span>Total:</span>
                                  <span>{formatPrice(selectedOrderData.totalPrice)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="timeline">
                              <h6>Order Timeline</h6>
                              <div className="timeline-item">
                                <div className="timeline-icon">
                                  <i className="ion-checkmark-circled"></i>
                                </div>
                                <div className="timeline-content">
                                  <h6>Order Placed</h6>
                                  <p>{formatDate(selectedOrderData.createdAt)}</p>
                                </div>
                              </div>
                              {selectedOrderData.isPaid && (
                                <div className="timeline-item">
                                  <div className="timeline-icon">
                                    <i className="ion-card"></i>
                                  </div>
                                  <div className="timeline-content">
                                    <h6>Payment Confirmed</h6>
                                    <p>{formatDate(selectedOrderData.paidAt || '')}</p>
                                  </div>
                                </div>
                              )}
                              {selectedOrderData.isDelivered && (
                                <div className="timeline-item">
                                  <div className="timeline-icon">
                                    <i className="ion-android-car"></i>
                                  </div>
                                  <div className="timeline-content">
                                    <h6>Delivered</h6>
                                    <p>{formatDate(selectedOrderData.deliveredAt || '')}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="order-details-placeholder">
                          <div className="text-center">
                            <i className="ion-document" style={{fontSize: '48px', color: '#ccc'}}></i>
                            <p>Select an order to view details</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="ion-bag" style={{fontSize: '64px', color: '#ccc'}}></i>
                    <h4>No Orders Found</h4>
                    <p>You haven&apos;t placed any orders yet.</p>
                    <Link href="/shop" className="btn btn-primary">Start Shopping</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage; 