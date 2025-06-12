// components/Footer.js - Fixed apostrophes for production build
'use client';
import React from 'react';
import { ArrowUp, Heart, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSocialClick = (platform, url) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/ciphersigma',
      hoverColor: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/prashantchettiyar/',
      hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:Prashantchettiyar@ieee.org',
      hoverColor: 'hover:text-red-600 dark:hover:text-red-400'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Let&apos;s Stay Connected</h3>
          <p className="text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
            Thank you for visiting my portfolio. I&apos;m always excited to discuss new opportunities and innovative projects.
          </p>
        </div>

        <div className="flex justify-center space-x-8 mb-12">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <button
                key={social.name}
                onClick={() => handleSocialClick(social.name, social.url)}
                className={`w-12 h-12 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-700 dark:hover:bg-gray-800 ${social.hoverColor}`}
                title={social.name}
              >
                <IconComponent className="w-5 h-5" />
              </button>
            );
          })}
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
              <span>© 2024 Prashant Chettiyar. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and lots of ☕</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400 dark:text-gray-500">
              <span>Built with Next.js & Tailwind CSS</span>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
              >
                <span>Back to top</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-purple-500 rounded-full opacity-40 animate-ping"></div>
      <div className="absolute bottom-10 left-1/4 w-1 h-1 bg-green-500 rounded-full opacity-30 animate-bounce"></div>
    </footer>
  );
}