'use client';

import React from 'react';

class FontErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, fontLoadError: false };
  }

  static getDerivedStateFromError(error) {
    // Check if error is related to font loading
    if (error.message && error.message.includes('font')) {
      return { hasError: true, fontLoadError: true };
    }
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log font loading errors
    if (error.message && error.message.includes('font')) {
      console.warn('Font loading error caught:', error.message);
      // Fallback to system fonts
      document.documentElement.style.setProperty('--font-primary', 'system-ui, -apple-system, sans-serif');
      document.documentElement.style.setProperty('--font-secondary', 'system-ui, -apple-system, sans-serif');
    }
  }

  render() {
    if (this.state.hasError) {
      // If it's a font error, just render children with fallback fonts
      if (this.state.fontLoadError) {
        return (
          <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {this.props.children}
          </div>
        );
      }
      
      // For other errors, show error message
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page to try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default FontErrorBoundary;