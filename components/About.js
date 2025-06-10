// components/About.js
'use client';
import React, { useState, useEffect } from 'react';
import { Download, ExternalLink } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: "React", level: 90, icon: "⚛️" },
    { name: "Next.js", level: 85, icon: "▲" },
    { name: "JavaScript", level: 92, icon: "🟨" },
    { name: "TypeScript", level: 80, icon: "🔷" },
    { name: "Tailwind CSS", level: 88, icon: "🎨" },
    { name: "Node.js", level: 75, icon: "🟢" }
  ];

  // Method 1: Direct download
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/Prashant_Chettiyar_Resume.pdf';
    link.download = 'Prashant_Chettiyar_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download (optional)
    setDownloadCount(prev => prev + 1);
    
    // Analytics tracking (if you have Google Analytics)
    // gtag('event', 'download', {
    //   'event_category': 'Resume',
    //   'event_label': 'PDF Download'
    // });
  };

  // Method 2: Open in new tab for preview
  const handleViewResume = () => {
    window.open('/assets/Prashant_Chettiyar_Resume.pdf', '_blank');
  };

  return (
    <section 
      id="about" 
      className={`py-24 px-6 bg-gray-50 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">About Me</h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              I'm a passionate frontend developer who loves crafting digital experiences that make a difference. 
              With expertise in React and Next.js, I transform ideas into reality through clean, efficient code.
            </p>
            <p className="text-lg text-gray-500 mb-8">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
              or sharing knowledge with the developer community.
            </p>
            
            {/* Resume Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={handleDownloadResume}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
              
              <button 
                onClick={handleViewResume}
                className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 hover:scale-105 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Optional: Download counter */}
            {downloadCount > 0 && (
              <p className="text-sm text-gray-500 mb-4">
                Resume downloaded {downloadCount} time{downloadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Skills & Expertise</h3>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="transform hover:scale-105 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-blue-600 font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-2000 ease-out"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}