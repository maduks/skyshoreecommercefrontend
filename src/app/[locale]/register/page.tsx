'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, clearError } from '@/store/slices/userSlice';
import Notification from '@/components/Notification';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated, user } = useAppSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '100001',
      country: 'Nigeria'
    }
  });
  
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/my-account');
    }
  }, [isAuthenticated, user, router]);

  // Handle error notifications
  useEffect(() => {
    if (error) {
      setNotification({
        message: error,
        type: 'error',
        isVisible: true
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        const parentData = prev[parent as keyof typeof prev];
        return {
          ...prev,
          [parent]: {
            ...(parentData as object),
            [child]: value
          }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      setNotification({
        message: 'Please fill in all required fields',
        type: 'error',
        isVisible: true
      });
      return;
    }

    if (!formData.email.includes('@')) {
      setNotification({
        message: 'Please enter a valid email address',
        type: 'error',
        isVisible: true
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({
        message: 'Passwords do not match',
        type: 'error',
        isVisible: true
      });
      return;
    }

    if (formData.password.length < 6) {
      setNotification({
        message: 'Password must be at least 6 characters long',
        type: 'error',
        isVisible: true
      });
      return;
    }

    if (!agreeToTerms) {
      setNotification({
        message: 'Please agree to the Terms & Conditions',
        type: 'error',
        isVisible: true
      });
      return;
    }

    try {
      const result = await dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address
      })).unwrap();

      setNotification({
        message: 'Registration successful! Redirecting...',
        type: 'success',
        isVisible: true
      });

      // Redirect after successful registration
      setTimeout(() => {
        router.push('/my-account');
      }, 1500);

    } catch (error) {
      console.error('Registration error:', error);
      setNotification({
        message: 'Registration failed. Please try again.',
        type: 'error',
        isVisible: true
      });
    }
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="main-content_wrapper">
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Register</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li className="active">Register</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="register-area section-space-y-axis-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="register-form-wrapper">
                <div className="register-form-header">
                  <h3>Create Your Account</h3>
                  <p>Join us and start shopping for quality lubricants</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <div className="password-input-wrapper">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <i className={`ion-${showPassword ? 'eye-disabled' : 'eye'}`}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <div className="password-input-wrapper">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <i className={`ion-${showConfirmPassword ? 'eye-disabled' : 'eye'}`}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="street">Street Address *</label>
                    <input
                      type="text"
                      id="street"
                      name="address.street"
                      className="form-control"
                      placeholder="Enter your street address"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="city">City *</label>
                        <input
                          type="text"
                          id="city"
                          name="address.city"
                          className="form-control"
                          placeholder="Enter your city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="state">State *</label>
                        <select
                          id="state"
                          name="address.state"
                          className="form-control"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select State</option>
                          <option value="Lagos">Lagos</option>
                          <option value="Abuja">Abuja</option>
                          <option value="Kano">Kano</option>
                          <option value="Rivers">Rivers</option>
                          <option value="Kaduna">Kaduna</option>
                          <option value="Ondo">Ondo</option>
                          <option value="Katsina">Katsina</option>
                          <option value="Oyo">Oyo</option>
                          <option value="Borno">Borno</option>
                          <option value="Anambra">Anambra</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="zipCode">ZIP Code</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="address.zipCode"
                          className="form-control"
                          placeholder="Enter ZIP code"
                          value={formData.address.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        className="form-check-input"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeToTerms">
                        I agree to the{' '}
                        <Link href="/terms-conditions" target="_blank">
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy-policy" target="_blank">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <i className="ion-loading-a"></i> Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </form>

                <div className="register-form-footer">
                  <p>
                    Already have an account?{' '}
                    <Link href="/login" className="login-link">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default RegisterPage; 