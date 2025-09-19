'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from 'react';

const MainJsInitializer = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Wait for React to finish rendering
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).jQuery && !initialized.current) {
        try {
          // Store the original slick function
          if ((window as any).jQuery.fn.slick && !(window as any).jQuery.fn._originalSlick) {
            (window as any).jQuery.fn._originalSlick = (window as any).jQuery.fn.slick;
          }
          
          // Prevent main.js from initializing sliders that are handled by React
          if (typeof (window as any).mainJsInit === 'function') {
            // Override the main slider initialization to prevent conflicts
            const originalSlick = (window as any).jQuery.fn._originalSlick;
            if (originalSlick) {
              (window as any).jQuery.fn.slick = function(options: any) {
                // Skip initialization if already handled by React
                if (this.hasClass('slick-initialized')) {
                  return this;
                }
                return originalSlick.call(this, options);
              };
            }
            
            (window as any).mainJsInit();
          }
          
          initialized.current = true;
          console.log('Main.js initialization completed');
        } catch (error) {
          console.error('Error in MainJsInitializer:', error);
        }
      }
    }, 500); // Increased delay to ensure React has finished rendering

    return () => {
      clearTimeout(timer);
      // Restore original slick function on cleanup
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn._originalSlick) {
        (window as any).jQuery.fn.slick = (window as any).jQuery.fn._originalSlick;
      }
    };
  }, []);

  return null;
};

export default MainJsInitializer; 