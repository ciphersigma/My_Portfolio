// components/AnalyticsProvider.js - Analytics Wrapper Component
'use client';
import { useEffect } from 'react';
import { initGA, analytics } from '../lib/analytics';
import { useScrollDepth } from '../hooks/useAnalytics';

export default function AnalyticsProvider({ children }) {
  useScrollDepth(); // Track scroll depth

  useEffect(() => {
    // Initialize Google Analytics
    initGA();

    // Track page load time
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        analytics.pageLoadTime(Math.round(loadTime));
      });
    }

    // Track initial page view
    analytics.sectionView('home');
  }, []);

  return <>{children}</>;
}