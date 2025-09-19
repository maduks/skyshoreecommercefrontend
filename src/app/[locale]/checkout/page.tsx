'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { registerUser, loginUser } from '@/store/slices/userSlice';
import { createOrder, clearError, clearSuccess, resetOrder } from '@/store/slices/orderSlice';
// import { clearCart } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import Notification from '@/components/Notification';

interface CheckoutForm {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
}

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentLocale = useCurrentLocale();
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const { token, loading: userLoading, error: userError } = useAppSelector((state) => state.user);
  const { currentOrder, loading: orderLoading, error: orderError, success: orderSuccess } = useAppSelector((state) => state.order);
  
  // Helper function to create locale-aware URLs
  const createLocaleUrl = useCallback((path: string) => {
    return `/${currentLocale}${path}`;
  }, [currentLocale]);
  
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showShipDifferent, setShowShipDifferent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  // Nigerian states array
  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory',
    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];
  
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: ''
    }
  });

  const formatPrice = (price: number | { $numberDouble: string }) => {
    let numericPrice: number;
    if (typeof price === 'number') {
      numericPrice = price;
    } else {
      numericPrice = parseFloat(price.$numberDouble);
    }
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  const getNumericValue = (value: number | { $numberDouble: string }): number => {
    if (typeof value === 'number') {
      return value;
    } else if ('$numberDouble' in value) {
      return parseFloat(value.$numberDouble);
    }
    return 0;
  };

  const getEffectivePrice = (item: { salePrice?: number | { $numberDouble: string }; price: number | { $numberDouble: string } }): number => {
    if (item.salePrice && getNumericValue(item.salePrice) < getNumericValue(item.price)) {
      return getNumericValue(item.salePrice);
    }
    return getNumericValue(item.price);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CheckoutForm] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

    // Handle successful order creation
  useEffect(() => {
    if (orderSuccess && currentOrder) {
      // Show success notification
      setNotification({
        message: `Order placed successfully! Order ID: ${currentOrder._id}`,
        type: 'success',
        isVisible: true,
      });
      
      // Reset order state
      dispatch(resetOrder());
      
      // Redirect to order success page immediately
      const formattedTotal = formatPrice(totalAmount);
      router.push(createLocaleUrl(`/order-success?orderId=${currentOrder._id}&total=${encodeURIComponent(formattedTotal)}`));
    }
  }, [orderSuccess, currentOrder, dispatch, router, totalAmount, createLocaleUrl]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result) {
        // Fill form with user data
        setFormData({
          name: result.user.name,
          email: result.user.email,
          password: password, // Keep the password for order creation
          phone: result.user.phone,
          address: {
            street: result.user.address.street,
            city: result.user.address.city,
            state: result.user.address.state,
          }
        });
        setIsLoggedIn(true);
        setShowLogin(false);
        setShowCreateAccount(false);
        
        setNotification({
          message: 'Login successful! Form filled with your details.',
          type: 'success',
          isVisible: true,
        });
      }
    } catch (error) {
      setNotification({
        message: error instanceof Error ? error.message : 'Login failed',
        type: 'error',
        isVisible: true,
      });
    }
  };

  // Handle create account checkbox change
  const handleCreateAccountChange = (checked: boolean) => {
    setShowCreateAccount(checked);
    if (checked) {
      // Clear form fields when creating new account
      // setFormData({
      //   name: '',
      //   email: '',
      //   password: '',
      //   phone: '',
      //   address: {
      //     street: '',
      //     city: '',
      //     state: ''
      //   }
      // });
      setIsLoggedIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let orderToken: string;

      if (isLoggedIn) {
        // User is logged in, use existing token
        orderToken = token || '';
        
        if (!orderToken) {
          throw new Error('No authentication token found. Please login again.');
        }
      } else {
        // User is not logged in, register new user
        const registerResult = await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: {
            street: formData.address.street,
            city: formData.address.city,
            state: formData.address.state,
            zipCode: '100001', // Default Nigerian postal code
            country: 'Nigeria',
          }
        })).unwrap();

        orderToken = registerResult.token;
      }

      if (!orderToken) {
        throw new Error('Failed to obtain authentication token.');
      }

      // Create the order with the token
      const orderItems = items.map((item: { _id: string | { $oid: string }; quantity: number }) => ({
        product: typeof item._id === 'string' ? item._id : item._id.$oid,
        quantity: item.quantity
      }));

      const orderData = {
        orderItems,
        shippingAddress: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
        },
        paymentMethod: 'Transfer',
        token: orderToken
      };

      await dispatch(createOrder(orderData)).unwrap();
    } catch (error) {
      console.error('Error during checkout:', error);
      if (error instanceof Error) {
        alert(`Checkout failed: ${error.message}`);
      } else {
        alert('Checkout failed. Please try again.');
      }
    }
  };

  if (items.length === 0) {
    return (
      <>
        {/* Begin Uren's Breadcrumb Area */}
        <div className="breadcrumb-area">
          <div className="container">
            <div className="breadcrumb-content">
              <h2>CHECKOUT</h2>
              <ul>
                <li><Link href={createLocaleUrl('/')}>Home</Link></li>
                <li className="active">Checkout</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Uren's Breadcrumb Area End Here */}
        
        <div className="checkout-empty_area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="checkout-empty-content text-center">
                  <i className="ion-bag" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }}></i>
                  <h3>Your cart is empty</h3>
                  <p>Please add items to your cart before proceeding to checkout.</p>
                  <Link href={createLocaleUrl('/shop')} className="uren-btn">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Begin Uren's Breadcrumb Area */}
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>CHECKOUT</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li className="active">Checkout</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Uren's Breadcrumb Area End Here */}

      {/* Begin Uren's Checkout Area */}
      <div className="checkout-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="coupon-accordion">
                <h3>
                  Returning customer? 
                  <span 
                    id="showlogin" 
                    onClick={() => setShowLogin(!showLogin)}
                    style={{ cursor: 'pointer', color: '#007bff' }}
                  >
                    Click here to login
                  </span>
                </h3>
                <div 
                  id="checkout-login" 
                  className="coupon-content"
                  style={{ display: showLogin ? 'block' : 'none' }}
                >
                  <div className="coupon-info">
                    <p className="coupon-text">Please login to your account to continue with checkout.</p>
                    <form onSubmit={handleLogin}>
                      <p className="form-row-first">
                        <label>Email <span className="required">*</span></label>
                        <input name="email" type="email" required />
                      </p>
                      <p className="form-row-last">
                        <label>Password <span className="required">*</span></label>
                        <input name="password" type="password" required />
                      </p>
                      <p className="form-row">
                        <input 
                          value={userLoading ? "Logging in..." : "Login"} 
                          type="submit"
                          disabled={userLoading}
                        />
                        <label>
                          <input type="checkbox" />
                          Remember me
                        </label>
                      </p>
                      <p className="lost-password">
                        <a href="javascript:void(0)">Lost your password?</a>
                      </p>
                    </form>
                  </div>
                </div>
                <h3>
                  Have a coupon? 
                  <span 
                    id="showcoupon" 
                    onClick={() => setShowCoupon(!showCoupon)}
                    style={{ cursor: 'pointer', color: '#007bff' }}
                  >
                    Click here to enter your code
                  </span>
                </h3>
                <div 
                  id="checkout_coupon" 
                  className="coupon-checkout-content"
                  style={{ display: showCoupon ? 'block' : 'none' }}
                >
                  <div className="coupon-info">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <p className="checkout-coupon">
                        <input placeholder="Coupon code" type="text" />
                        <input className="coupon-inner_btn" value="Apply Coupon" type="submit" />
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              {(userError || orderError) && (
                <div className="alert alert-danger" role="alert">
                  {userError || orderError}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="checkbox-form">
                  <h3>Billing Details</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>Full Name <span className="required">*</span></label>
                        <input 
                          placeholder="John Doe" 
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={isLoggedIn && !showCreateAccount}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>Email Address <span className="required">*</span></label>
                        <input 
                          placeholder="john@example.com" 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={isLoggedIn && !showCreateAccount}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>Phone <span className="required">*</span></label>
                        <input 
                          placeholder="+234-801-234-5678" 
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={isLoggedIn && !showCreateAccount}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>Password <span className="required">*</span></label>
                        <input 
                          placeholder="Enter your password" 
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          disabled={isLoggedIn && !showCreateAccount}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>Street Address <span className="required">*</span></label>
                        <input 
                          placeholder="123 Main Street" 
                          type="text"
                          value={formData.address.street}
                          onChange={(e) => handleInputChange('address.street', e.target.value)}
                          disabled={isLoggedIn && !showCreateAccount}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>City <span className="required">*</span></label>
                        <input 
                          placeholder="New York" 
                          type="text"
                          value={formData.address.city}
                          onChange={(e) => handleInputChange('address.city', e.target.value)}
                          disabled={isLoggedIn && !showCreateAccount}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>State <span className="required">*</span></label>
                        <select 
                          value={formData.address.state}
                          onChange={(e) => handleInputChange('address.state', e.target.value)}
                          disabled={isLoggedIn && !showCreateAccount}
                          required
                          className="form-control"
                        >
                          <option value="">Select a state</option>
                          {nigerianStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list create-acc">
                        <input 
                          id="cbox" 
                          type="checkbox"
                          checked={showCreateAccount}
                          onChange={(e) => handleCreateAccountChange(e.target.checked)}
                        />
                        <label>Create an account?</label>
                      </div>
                      <div 
                        id="cbox-info" 
                        className="checkout-form-list create-account"
                        style={{ display: showCreateAccount ? 'block' : 'none' }}
                      >
                        <p>Create an account by entering the information below. If you are a returning
                          customer please login at the top of the page.</p>
                        <p><strong>Note:</strong> Your account will be created using the email and password provided above.</p>
                      </div>
                    </div>
                  </div>
                  <div className="different-address">
                    <div className="ship-different-title">
                      <h3>
                        <label>Ship to a different address?</label>
                        <input 
                          id="ship-box" 
                          type="checkbox"
                          checked={showShipDifferent}
                          onChange={(e) => setShowShipDifferent(e.target.checked)}
                        />
                      </h3>
                    </div>
                    <div 
                      id="ship-box-info" 
                      className="row"
                      style={{ display: showShipDifferent ? 'block' : 'none' }}
                    >
                      {/* Ship to different address fields would go here */}
                      <div className="col-md-12">
                        <p>Shipping address fields would be implemented here</p>
                      </div>
                    </div>
                    <div className="order-notes">
                      <div className="checkout-form-list checkout-form-list-2">
                        <label>Order Notes</label>
                        <textarea 
                          id="checkout-mess" 
                          cols={30} 
                          rows={10} 
                          placeholder="Notes about your order, e.g. special notes for delivery."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6 col-12">
              <div className="your-order">
                <h3>Your order</h3>
                <div className="your-order-table table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="cart-product-name">Product</th>
                        <th className="cart-product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item._id} className="cart_item">
                          <td className="cart-product-name">
                            {item.name}
                            <strong className="product-quantity"> × {item.quantity}</strong>
                          </td>
                          <td className="cart-product-total">
                            <span className="amount">
                              {formatPrice(getEffectivePrice(item) * item.quantity)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="cart-subtotal">
                        <th>Cart Subtotal</th>
                        <td><span className="amount">{formatPrice(totalAmount)}</span></td>
                      </tr>
                      <tr className="order-total">
                        <th>Order Total</th>
                        <td><strong><span className="amount">{formatPrice(totalAmount)}</span></strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="payment-method">
                  <div className="payment-accordion">
                    <div id="accordion">
                      <div className="card">
                        <div className="card-header" id="#payment-1">
                          <h5 className="panel-title">
                            <a href="javascript:void(0)" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Direct Bank Transfer.
                            </a>
                          </h5>
                        </div>
                        <div id="collapseOne" className="collapse show" data-parent="#accordion">
                          <div className="card-body">
                            <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won&apos;t be shipped until the funds have cleared in our account.</p>
                          </div>
                        </div>
                      </div>
                      <div style={{display:"none"}} className="card">
                        <div className="card-header" id="#payment-2">
                          <h5 className="panel-title">
                            <a href="javascript:void(0)" className="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Cheque Payment
                            </a>
                          </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" data-parent="#accordion">
                          <div className="card-body">
                            <p>Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                          </div>
                        </div>
                      </div>
                      <div style={{display:"none"}} className="card">
                        <div className="card-header" id="#payment-3">
                          <h5 className="panel-title">
                            <a href="javascript:void(0)" className="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              PayPal
                            </a>
                          </h5>
                        </div>
                        <div id="collapseThree" className="collapse" data-parent="#accordion">
                          <div className="card-body">
                            <p>Pay via PayPal; you can pay with your credit card if you don&apos;t have a PayPal account.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-button-payment">
                      <input 
                  onClick={handleSubmit} 
                  value={userLoading || orderLoading ? "Processing..." : "Place order"} 
                  type="submit"
                  disabled={userLoading || orderLoading}
                />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Uren's Checkout Area End Here */}
      
      {/* Notification Toast */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </>
  );
};

export default CheckoutPage; 