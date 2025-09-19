'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { logout } from '@/store/slices/userSlice';
import { getUserOrders } from '@/store/slices/orderSlice';
import { RootState } from '@/store/store';

const MyAccountPage = () => {
  const dispatch = useAppDispatch();
  const currentLocale = useCurrentLocale();
  const { user, isAuthenticated, token } = useAppSelector((state) => state.user);
  const { orders, loading: ordersLoading } = useAppSelector((state: RootState) => state.order);
  // const { items: wishlistItems } = useAppSelector((state: RootState) => state.wishlist);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string) => {
    return `/${currentLocale}${path}`;
  };

  // Fetch user orders when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserOrders({ token }));
    }
  }, [dispatch, isAuthenticated, token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Use real user data from Redux store
  const currentUser = user;

  const renderDashboard = () => (
    <div className="dashboard-content">
      <h4>Welcome back, {currentUser?.name || 'User'}!</h4>
      <div className="dashboard-stats">
        <div className="row">
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="ion-bag"></i>
              </div>
              <div className="stat-info">
                <h5>Total Orders</h5>
                <span>{ordersLoading ? '...' : orders.length}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="ion-cash"></i>
              </div>
              <div className="stat-info">
                <h5>Total Spent</h5>
                <span>
                  {ordersLoading ? '...' : `₦${orders.reduce((total, order) => total + order.totalPrice, 0).toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="ion-person"></i>
              </div>
              <div className="stat-info">
                <h5>Account Status</h5>
                <span className="text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="recent-orders">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Recent Orders</h5>
          <button 
            className="btn btn-sm btn-outline-primary" 
            onClick={() => token && dispatch(getUserOrders({ token }))}
            disabled={ordersLoading}
          >
            {ordersLoading ? (
              <>
                <span className="spinner-border spinner-border-sm mr-1" role="status"></span>
                Refreshing...
              </>
            ) : (
              <>
                <i className="ion-refresh mr-1"></i>
                Refresh
              </>
            )}
          </button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersLoading ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <span className="ml-2">Loading orders...</span>
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6).toUpperCase()}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${order.isDelivered ? 'badge-success' : order.isPaid ? 'badge-warning' : 'badge-info'}`}>
                        {order.isDelivered ? 'Delivered' : order.isPaid ? 'Processing' : 'Pending'}
                      </span>
                    </td>
                    <td>₦{order.totalPrice.toLocaleString()}</td>
                    <td><Link href={createLocaleUrl('/order-history')} className="btn btn-sm btn-primary">View</Link></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-content">
      <h4>Profile Information</h4>
      <form className="profile-form">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={currentUser?.name || ''}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                defaultValue={currentUser?.email || ''}
                readOnly
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                className="form-control" 
                defaultValue={currentUser?.phone || ''}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Date of Birth</label>
              <input 
                type="date" 
                className="form-control" 
                defaultValue="1990-01-01"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Street Address</label>
          <input 
            type="text" 
            className="form-control" 
            defaultValue={currentUser?.address?.street || ''}
          />
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={currentUser?.address?.city || ''}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>State</label>
              <select className="form-control" defaultValue={currentUser?.address?.state || 'Lagos'}>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Rivers">Rivers</option>
                <option value="Kaduna">Kaduna</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>ZIP Code</label>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={currentUser?.address?.zipCode || ''}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );

  const renderSecurity = () => (
    <div className="security-content">
      <h4>Security Settings</h4>
      
      <div className="security-section">
        <h5>Change Password</h5>
        <form className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>

      <div className="security-section">
        <h5>Two-Factor Authentication</h5>
        <p>Add an extra layer of security to your account.</p>
        <button className="btn btn-outline-primary">Enable 2FA</button>
      </div>

      <div className="security-section">
        <h5>Login Sessions</h5>
        <div className="session-list">
          <div className="session-item">
            <div className="session-info">
              <strong>Current Session</strong>
              <span>Chrome on Windows • Lagos, Nigeria</span>
              <small>Active now</small>
            </div>
            <span className="badge badge-success">Active</span>
          </div>
          <div className="session-item">
            <div className="session-info">
              <strong>Previous Session</strong>
              <span>Safari on iPhone • Lagos, Nigeria</span>
              <small>2 days ago</small>
            </div>
            <button className="btn btn-sm btn-outline-danger">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="preferences-content">
      <h4>Account Preferences</h4>
      
      <div className="preferences-section">
        <h5>Email Notifications</h5>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="orderUpdates" defaultChecked />
          <label className="form-check-label" htmlFor="orderUpdates">
            Order updates and tracking
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="promotions" defaultChecked />
          <label className="form-check-label" htmlFor="promotions">
            Promotions and special offers
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="newsletter" />
          <label className="form-check-label" htmlFor="newsletter">
            Newsletter and product updates
          </label>
        </div>
      </div>

      <div className="preferences-section">
        <h5>Language & Region</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Language</label>
              <select className="form-control" defaultValue="en">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Currency</label>
              <select className="form-control" defaultValue="NGN">
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary">Save Preferences</button>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="main-content_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center py-5">
                <h3>Please Login to Access Your Account</h3>
                <p>You need to be logged in to view your account information.</p>
                <Link href={createLocaleUrl('/login')} className="btn btn-primary">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="main-content_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center py-5">
                <h3>Loading User Information...</h3>
                <p>Please wait while we load your account details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-content_wrapper">
       <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>My Account</h2>
            <ul>
              <li><Link href={createLocaleUrl('/')}>Home</Link></li>
              <li className="active">My Account</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="my-account-area section-space-y-axis-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="account-sidebar">
                <div className="account-user">
                  <div className="user-avatar">
                    <i className="ion-person"></i>
                  </div>
                  <h5>{currentUser?.name || 'User'}</h5>
                  <p>
                    Member since{' '}
                    {currentUser?.createdAt
                      ? new Date(currentUser.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
                
                <nav className="account-nav">
                  <ul>
                    <li className={activeTab === 'dashboard' ? 'active' : ''}>
                      <button onClick={() => setActiveTab('dashboard')}>
                        <i className="ion-home"></i> Dashboard
                      </button>
                    </li>
                    <li className={activeTab === 'profile' ? 'active' : ''}>
                      <button onClick={() => setActiveTab('profile')}>
                        <i className="ion-person"></i> Profile
                      </button>
                    </li>
                    <li className={activeTab === 'security' ? 'active' : ''}>
                      <button onClick={() => setActiveTab('security')}>
                        <i className="ion-locked"></i> Security
                      </button>
                    </li>
                    <li className={activeTab === 'preferences' ? 'active' : ''}>
                      <button onClick={() => setActiveTab('preferences')}>
                        <i className="ion-settings"></i> Preferences
                      </button>
                    </li>
                    <li>
                      <Link href={createLocaleUrl('/order-history')}>
                        <i className="ion-bag"></i> Order History
                      </Link>
                    </li>
                                      <li>
                    <button className="text-danger" onClick={handleLogout}>
                      <i className="ion-log-out"></i> Logout
                    </button>
                  </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            <div className="col-lg-9">
              <div className="account-content">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'profile' && renderProfile()}
                {activeTab === 'security' && renderSecurity()}
                {activeTab === 'preferences' && renderPreferences()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .stat-card {
        background: #fff;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
        height: 100%;
      }
      
      .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }
      
      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        font-size: 24px;
        color: #fff;
      }
      
      .stat-card:nth-child(1) .stat-icon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      .stat-card:nth-child(2) .stat-icon {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }
      
      .stat-card:nth-child(3) .stat-icon {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
      
      .stat-info h5 {
        font-size: 14px;
        font-weight: 600;
        color: #666;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .stat-info span {
        font-size: 28px;
        font-weight: 700;
        color: #333;
        display: block;
      }
      
      .text-success {
        color: #28a745 !important;
      }
    `}</style>
    </>
  );
};

export default MyAccountPage; 