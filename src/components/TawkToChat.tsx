'use client';

import { useEffect } from 'react';

// Declare global Tawk_API
declare global {
  interface Window {
    Tawk_API: Record<string, unknown>;
    Tawk_LoadStart: Date;
  }
}

const TawkToChat = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Declare Tawk_API globally
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      (function() {
        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/689a1f9863e952192907c386/1j2d0mrrv';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode?.insertBefore(s1, s0);
      })();
    }
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkToChat; 