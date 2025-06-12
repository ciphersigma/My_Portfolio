// components/About.js - Simplified Skills (No Ratings)
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        
        if (isInView && !isVisible) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const skills = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "JavaScript", icon: "🟨" },
    { name: "TypeScript", icon: "🔷" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Node.js", icon: "🟢" },
    { name: "HTML5", icon: "📄" },
    { name: "CSS3", icon: "🎭" },
    { name: "Git", icon: "📝" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Express.js", icon: "⚡" },
    { name: "Figma", icon: "🎯" }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/Prashant_Chettiyar_Resume.pdf';
    link.download = 'Prashant_Chettiyar_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloadCount(prev => prev + 1);
  };

  const handleViewResume = () => {
    window.open('/assets/Prashant_Chettiyar_Resume.pdf', '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className={`py-24 px-6 bg-gray-50 dark:bg-gray-800 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 dark:text-white">About Me</h2>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              I&apos;m a passionate frontend developer who loves crafting digital experiences that make a difference. 
              With expertise in React and Next.js, I transform ideas into reality through clean, efficient code.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source, 
              or sharing knowledge with the developer community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={handleDownloadResume}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
              
              <button 
                onClick={handleViewResume}
                className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Resume</span>
              </button>
            </div>

            {downloadCount > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Resume downloaded {downloadCount} time{downloadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Skills & Technologies</h3>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`flex items-center space-x-3 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Optional: Add a note about continuous learning */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <span className="font-semibold">Always Learning:</span> I continuously explore new technologies and best practices to stay current with the evolving web development landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}