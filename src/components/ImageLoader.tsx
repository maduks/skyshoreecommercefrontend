'use client';

import React, { useState, useEffect } from 'react';

interface ImageLoaderProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  style = {},
  children,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    const img = new Image();
    
    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  return (
    <div className={`image-loader ${className}`} style={style}>
      {isLoading && (
        <div className="image-loading-overlay">
          <div className="image-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="image-error-overlay">
          <div className="image-error-content">
            <i className="ion-android-alert"></i>
            <span>Failed to load image</span>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default ImageLoader;
