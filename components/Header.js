// components/Header.js (Updated with Resume)
'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg transform translate-y-0' : 'bg-white transform translate-y-0'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div 
            className="text-xl font-bold text-gray-900 hover:scale-105 transition-transform duration-300 cursor-pointer"
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
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group transform hover:scale-105"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Resume Download Button */}
            <button
              onClick={handleResumeDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span className="font-medium">Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:scale-110 transition-transform duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium transform hover:translate-x-2"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Resume Button */}
            <button
              onClick={handleResumeDownload}
              className="flex items-center space-x-2 w-full py-3 text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium"
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