'use client';

import { useEffect } from 'react';

export default function FontPreloader() {
  useEffect(() => {
    // Preconnect to Google Fonts domains
    const preconnectGoogleFonts = () => {
      const preconnectLinks = [
        { href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
        { href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      ];

      preconnectLinks.forEach(({ href, crossOrigin }) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = href;
          if (crossOrigin) link.crossOrigin = crossOrigin;
          document.head.appendChild(link);
        }
      });
    };

    // Load fallback CSS
    const loadFallbackCSS = () => {
      if (!document.querySelector('link[href="/fonts/fallback.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/fonts/fallback.css';
        link.media = 'print';
        
        // Proper onLoad handler as a function
        link.onload = function() {
          this.media = 'all';
        };
        
        document.head.appendChild(link);
      }
    };

    // Initialize font loading optimizations
    preconnectGoogleFonts();
    loadFallbackCSS();

    // Add noscript fallback for CSS
    const noscript = document.createElement('noscript');
    noscript.innerHTML = '<link rel="stylesheet" href="/fonts/fallback.css" />';
    document.head.appendChild(noscript);

  }, []);

  return null; // This component doesn't render anything
}