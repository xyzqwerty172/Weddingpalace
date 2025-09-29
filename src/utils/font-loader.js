'use client';

// Font loading utility with fallback support
export class FontLoader {
  static async loadGoogleFont(fontFamily, weights = ['400', '500', '600', '700']) {
    try {
      // Check if font is already loaded
      if (document.fonts && document.fonts.check(`16px ${fontFamily}`)) {
        return true;
      }

      // Create font face declarations
      const fontPromises = weights.map(weight => {
        const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@${weight}&display=swap`;
        
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = fontUrl;
          
          // Set timeout for font loading
          const timeout = setTimeout(() => {
            reject(new Error(`Font loading timeout: ${fontFamily}`));
          }, 10000); // 10 second timeout
          
          link.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          
          link.onerror = () => {
            clearTimeout(timeout);
            reject(new Error(`Failed to load font: ${fontFamily}`));
          };
          
          document.head.appendChild(link);
        });
      });

      await Promise.all(fontPromises);
      return true;
    } catch (error) {
      console.warn(`Font loading failed for ${fontFamily}:`, error.message);
      return false;
    }
  }

  static applyFallbackFonts() {
    const fallbackCSS = `
      :root {
        --font-primary: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        --font-secondary: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }
      
      body, * {
        font-family: var(--font-primary) !important;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = fallbackCSS;
    document.head.appendChild(style);
  }

  static async initializeFonts() {
    try {
      // Try to load primary fonts
      const interLoaded = await this.loadGoogleFont('Inter', ['400', '500', '600', '700', '800', '900']);
      const montserratLoaded = await this.loadGoogleFont('Montserrat', ['400', '500', '600', '700', '800', '900']);
      
      if (!interLoaded || !montserratLoaded) {
        console.warn('Some fonts failed to load, applying fallbacks');
        this.applyFallbackFonts();
      }
      
      return { interLoaded, montserratLoaded };
    } catch (error) {
      console.error('Font initialization failed:', error);
      this.applyFallbackFonts();
      return { interLoaded: false, montserratLoaded: false };
    }
  }
}

// Auto-initialize fonts when module loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FontLoader.initializeFonts());
  } else {
    FontLoader.initializeFonts();
  }
}