// components/Header.js - Fixed Text Contrast Based on Background
'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(saved === 'true');
      if (saved === 'true') {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/Prashant_Chettiyar_Resume.pdf';
    link.download = 'Prashant_Chettiyar_Resume.pdf';
    link.click();
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  // Determine text colors based on background state
  const getTextClasses = () => {
    if (scrolled) {
      // When scrolled, use contrasting colors based on actual background
      return darkMode 
        ? 'text-gray-100' // Light text on dark background (dark mode scrolled)
        : 'text-gray-900'; // Dark text on light background (light mode scrolled)
    } else {
      // When transparent, ensure visibility on any background
      return darkMode 
        ? 'text-white' // White text in dark mode
        : 'text-gray-900'; // Dark text in light mode
    }
  };

  const getNavTextClasses = () => {
    if (scrolled) {
      return darkMode 
        ? 'text-gray-300 hover:text-blue-400' // Light nav text on dark background
        : 'text-gray-700 hover:text-blue-600'; // Dark nav text on light background
    } else {
      return darkMode 
        ? 'text-gray-100 hover:text-blue-400' // Light nav text in dark mode
        : 'text-gray-800 hover:text-blue-600'; // Dark nav text in light mode
    }
  };

  const getMobileTextClasses = () => {
    if (scrolled) {
      return darkMode 
        ? 'text-gray-300' // Light text on dark background
        : 'text-gray-700'; // Dark text on light background
    } else {
      return darkMode 
        ? 'text-gray-100' // Light text in dark mode
        : 'text-gray-800'; // Dark text in light mode
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? darkMode
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700/50'
          : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div 
            className={`text-xl font-bold transition-colors duration-300 cursor-pointer hover:scale-105 transform transition-transform ${getTextClasses()}`}
            onClick={() => scrollToSection('home')}
          >
            Prashant Chettiyar
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 font-medium relative group transform hover:scale-105 ${getNavTextClasses()}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 ${
                scrolled
                  ? darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                  : darkMode
                    ? 'bg-gray-800/80 hover:bg-gray-700/80'
                    : 'bg-gray-100/80 hover:bg-gray-200/80'
              }`}
              title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              <Sun 
                className={`w-6 h-6 text-yellow-500 transition-all duration-300 ${
                  !darkMode 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 rotate-90 scale-0 absolute'
                }`}
              />
              <Moon 
                className={`w-6 h-6 text-blue-400 transition-all duration-300 ${
                  darkMode 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 -rotate-90 scale-0 absolute'
                }`}
              />
            </button>
            
            {/* Resume Download Button */}
            <button
              onClick={handleResumeDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span className="font-medium">Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                scrolled
                  ? darkMode
                    ? 'bg-gray-800'
                    : 'bg-gray-100'
                  : darkMode
                    ? 'bg-gray-800/80'
                    : 'bg-gray-100/80'
              }`}
            >
              {darkMode ? (
                <Moon className="w-5 h-5 text-blue-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </button>
            
            <button
              className={`hover:scale-110 transition-all duration-300 ${getMobileTextClasses()}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t transition-all duration-300 ${
            scrolled
              ? darkMode
                ? 'border-gray-700/50 bg-gray-900/95'
                : 'border-gray-200/50 bg-white/95'
              : darkMode
                ? 'border-gray-700/30 bg-gray-900/90'
                : 'border-gray-200/30 bg-white/90'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-3 px-4 transition-all duration-300 font-medium ${
                  scrolled
                    ? darkMode
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                    : darkMode
                      ? 'text-gray-100 hover:text-blue-400 hover:bg-gray-800/50'
                      : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            <button
              onClick={handleResumeDownload}
              className={`flex items-center space-x-2 w-full py-3 px-4 transition-all duration-300 font-medium ${
                scrolled
                  ? darkMode
                    ? 'text-blue-400 hover:bg-gray-800/50'
                    : 'text-blue-600 hover:bg-blue-50/50'
                  : darkMode
                    ? 'text-blue-400 hover:bg-gray-800/50'
                    : 'text-blue-600 hover:bg-blue-50/50'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}