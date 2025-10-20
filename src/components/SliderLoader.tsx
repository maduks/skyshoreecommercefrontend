'use client';

import React from 'react';

interface SliderLoaderProps {
  isLoading: boolean;
}

const SliderLoader: React.FC<SliderLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="slider-loading-overlay">
      <div className="slider-loading-spinner">
        <div className="slider-spinner-ring"></div>
        <div className="slider-spinner-ring"></div>
        <div className="slider-spinner-ring"></div>
        <div className="slider-spinner-ring"></div>
      </div>
      <p className="slider-loading-text">Loading images...</p>
    </div>
  );
};

export default SliderLoader;
