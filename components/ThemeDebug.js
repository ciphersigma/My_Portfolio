// components/ThemeDebug.js (Temporary - for debugging)
'use client';
import React from 'react';
import { useTheme } from './ThemeContext';

export default function ThemeDebug() {
  const { theme, mounted } = useTheme();
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-red-500 text-white p-2 rounded text-xs z-50">
      <div>Theme: {theme}</div>
      <div>Mounted: {mounted ? 'Yes' : 'No'}</div>
      <div>HTML has dark class: {document.documentElement.classList.contains('dark') ? 'Yes' : 'No'}</div>
      <div>Tailwind dark mode: {getComputedStyle(document.body).backgroundColor}</div>
    </div>
  );
}