// components/Hero.js - With Analytics Tracking
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { analytics } from '../lib/analytics';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const words = useMemo(() => [
    'Frontend Developer', 
    'React Specialist', 
    'Next.js Expert', 
    'UI/UX Enthusiast'
  ], []);
  
  const fullText = "Hi, I'm Prashant Chettiyar";

  useEffect(() => {
    let timeout;
    const currentWord = words[currentWordIndex];
    
    if (typedText.length < currentWord.length) {
      timeout = setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText('');
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [typedText, currentWordIndex, words]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    
    // Track hero button clicks
    if (id === 'contact') {
      analytics.trackEvent('hero_cta_click', 'engagement', 'lets_connect_button');
    } else if (id === 'projects') {
      analytics.trackEvent('hero_cta_click', 'engagement', 'view_projects_button');
    }
    
    // Also track as navigation
    analytics.navClick(id);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="text-center max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            {fullText}
          </h1>
          <div className="h-16 flex items-center justify-center">
            <p className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-semibold">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in" 
             style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
            Creating beautiful, responsive web experiences with modern technologies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" 
               style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Let&apos;s Connect
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}