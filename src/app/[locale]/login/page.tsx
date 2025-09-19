'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearError } from '@/store/slices/userSlice';
import Notification from '@/components/Notification';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations('pages.login');
  const tNav = useTranslations('navigation');
  const { loading, error, isAuthenticated, user } = useAppSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setNotification({
        message: 'Please fill in all fields',
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

    try {
      const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap();

      setNotification({
        message: 'Login successful! Redirecting...',
        type: 'success',
        isVisible: true
      });

      // Redirect after successful login
      setTimeout(() => {
        router.push('/my-account');
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      setNotification({
        message: 'Login failed. Please check your credentials.',
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
            <h2>{t('title')}</h2>
            <ul>
              <li><Link href="/">{tNav('home')}</Link></li>
              <li className="active">{t('breadcrumb')}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="login-area section-space-y-axis-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="login-form-wrapper">
                <div className="login-form-header">
                  <div className="login-icon">
                    <i className="ion-person"></i>
                  </div>
                  <h3>{t('welcomeBack')}</h3>
                  <p>{t('loginToAccount')}</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="email">{t('email')}</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <i className="ion-email"></i>
                      </div>
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

                  <div className="form-group">
                    <label htmlFor="password">{t('password')}</label>
                    <div className="input-group">
                      <div className="input-icon">
                        <i className="ion-locked"></i>
                      </div>
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

                  <div className="form-options">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        className="form-check-input"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        {t('rememberMe')}
                      </label>
                    </div>
                    <Link href="/forgot-password" className="forgot-password-link">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <i className="ion-loading-a"></i> Signing In...
                        </>
                      ) : (
                        t('login')
                      )}
                    </button>
                  </div>
                </form>

                <div className="login-form-footer">
                  <p>
                    {t('dontHaveAccount')}{' '}
                    <Link href="/register" className="register-link">
                      {t('signUp')}
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

export default LoginPage; 