'use client';

import React from 'react';

interface ShimmerProps {
  width?: string;
  height?: string;
  className?: string;
}

const Shimmer: React.FC<ShimmerProps> = ({ width = '100%', height = '20px', className = '' }) => {
  return (
    <div 
      className={`shimmer ${className}`}
      style={{ 
        width, 
        height,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '4px'
      }}
    />
  );
};

export default Shimmer; 