// app/not-found.js
'use client';
import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, Coffee } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const emojis = ['🤔', '😅', '🔍', '💭', '🚀'];

  useEffect(() => {
    setIsVisible(true);
    const emojiInterval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 1500);
    return () => clearInterval(emojiInterval);
  }, [emojis.length]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-green-300 rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-25" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className={`text-center max-w-2xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-gray-900 mb-4 animate-pulse">
            4
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>0</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>4</span>
          </h1>
        </div>

        {/* Animated Emoji */}
        <div className="mb-8">
          <span className="text-6xl animate-bounce">
            {emojis[currentEmoji]}
          </span>
        </div>

        {/* Error Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Oops! The page you&apos;re looking for seems to have taken a coffee break ☕
          </p>
          <p className="text-lg text-gray-500">
            Let&apos;s get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            <span className="font-semibold">Go Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Go Back</span>
          </button>
        </div>

        {/* Developer Note */}
        <div className="mt-16 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-sm flex items-center justify-center space-x-2">
            <Coffee className="w-4 h-4" />
            <span>Built with ❤️ by Prashant Chettiyar</span>
          </p>
        </div>
      </div>
    </div>
  );
}
