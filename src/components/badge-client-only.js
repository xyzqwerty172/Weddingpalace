'use client';

import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';

// Client-only Badge wrapper to prevent hydration mismatches
export default function BadgeClientOnly({ children, ...props }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return children without Badge on server-side
    return children;
  }

  return <Badge {...props}>{children}</Badge>;
}