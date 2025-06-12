// lib/analytics.js - Core Analytics Functions ONLY
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
      page_title: title,
    });
  }
};

// Track custom events
export const trackEvent = (action, category = 'general', label = '', value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', { action, category, label, value });
  }
};

// Predefined tracking functions for common actions
export const analytics = {
  // Portfolio specific events
  resumeDownload: () => trackEvent('resume_download', 'engagement', 'resume_pdf'),
  resumeView: () => trackEvent('resume_view', 'engagement', 'resume_pdf_view'),
  
  // Contact events
  contactFormSubmit: () => trackEvent('contact_form_submit', 'contact', 'form_submission'),
  contactFormStart: () => trackEvent('contact_form_start', 'contact', 'form_interaction'),
  
  // Navigation events
  sectionView: (section) => trackEvent('section_view', 'navigation', section),
  navClick: (section) => trackEvent('nav_click', 'navigation', section),
  
  // Project events
  projectView: (projectName) => trackEvent('project_view', 'projects', projectName),
  projectLinkClick: (projectName, linkType) => trackEvent('project_link_click', 'projects', `${projectName}_${linkType}`),
  
  // Theme events
  themeToggle: (newTheme) => trackEvent('theme_toggle', 'ui', newTheme),
  
  // Skills events
  skillCategoryExpand: (category) => trackEvent('skill_category_expand', 'skills', category),
  
  // Social events
  socialClick: (platform) => trackEvent('social_click', 'social', platform),
  
  // Performance events
  pageLoadTime: (loadTime) => trackEvent('page_load_time', 'performance', 'milliseconds', loadTime),
  
  // Scroll depth tracking
  scrollDepth: (percentage) => trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage),
  
  // General event tracker
  trackEvent: trackEvent,
};