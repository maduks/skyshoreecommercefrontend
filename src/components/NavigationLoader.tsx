'use client';

import React from 'react';

interface NavigationLoaderProps {
  children: React.ReactNode;
  className?: string;
}

const NavigationLoader: React.FC<NavigationLoaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`navigation-loader ${className}`}>
      {children}
    </div>
  );
};

export default NavigationLoader;
