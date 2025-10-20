'use client';

import React, { useState, useEffect } from 'react';

interface SliderImageLoaderProps {
  imageUrl: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const SliderImageLoader: React.FC<SliderImageLoaderProps> = ({ 
  imageUrl, 
  className = '', 
  style = {},
  children 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      return;
    }

    const img = new Image();
    
    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return (
    <div className={`slider-image-loader ${className}`} style={style}>
      {isLoading && (
        <div className="slider-loading-overlay">
          <div className="slider-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="slider-loading-text">Loading...</div>
        </div>
      )}
      
      {hasError && (
        <div className="slider-error-overlay">
          <div className="slider-error-content">
            <i className="ion-android-alert"></i>
            <span>Image failed to load</span>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default SliderImageLoader;
