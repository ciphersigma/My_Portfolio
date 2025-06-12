// hooks/useAnalytics.js - React Hooks for Analytics
import { useEffect, useRef } from 'react';
import { analytics } from '../lib/analytics';

export const useScrollDepth = () => {
  const scrollDepthRef = useRef({
    25: false,
    50: false,
    75: false,
    100: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track milestones
      [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercentage >= milestone && !scrollDepthRef.current[milestone]) {
          scrollDepthRef.current[milestone] = true;
          analytics.scrollDepth(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export const useSectionView = (sectionName) => {
  const hasTriggered = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered.current) return;

      const element = document.getElementById(sectionName);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
          analytics.sectionView(sectionName);
          hasTriggered.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionName]);
};