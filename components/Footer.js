// components/Footer.js
'use client';
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 hover:text-gray-700 transition-colors duration-300 mb-4 md:mb-0">
            © {currentYear} Prashant Chettiyar | Made with ♡ in React
          </p>
          
          <button
            onClick={scrollToTop}
            className="text-gray-500 hover:text-blue-600 transition-colors duration-300 font-medium"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}