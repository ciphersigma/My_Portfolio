// components/About.js - With Analytics Tracking
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { analytics } from '../lib/analytics';
import { useSectionView } from '../hooks/useAnalytics';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const sectionRef = useRef(null);

  // Track when About section is viewed
  useSectionView('about');

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

  const skillCategories = [
    {
      id: 'webdev',
      name: 'Web Development',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100 dark:bg-blue-800',
      borderColor: 'border-blue-300 dark:border-blue-600',
      textColor: 'text-blue-900 dark:text-blue-100',
      subTextColor: 'text-blue-700 dark:text-blue-200',
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "JavaScript", icon: "🟨" },
        { name: "TypeScript", icon: "🔷" },
        { name: "HTML5", icon: "📄" },
        { name: "CSS3", icon: "🎭" },
        { name: "Tailwind CSS", icon: "🎨" },
        { name: "Node.js", icon: "🟢" },
        { name: "Express.js", icon: "⚡" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Git", icon: "📝" },
        { name: "REST APIs", icon: "🔗" }
      ]
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: '🔐',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-100 dark:bg-red-800',
      borderColor: 'border-red-300 dark:border-red-600',
      textColor: 'text-red-900 dark:text-red-100',
      subTextColor: 'text-red-700 dark:text-red-200',
      skills: [
        { name: "Network Security", icon: "🌐" },
        { name: "Penetration Testing", icon: "🔍" },
        { name: "Vulnerability Assessment", icon: "🛡️" },
        { name: "Security Auditing", icon: "📊" },
        { name: "Cryptography", icon: "🔒" },
        { name: "Incident Response", icon: "🚨" },
        { name: "Ethical Hacking", icon: "👨‍💻" },
        { name: "OWASP", icon: "🔰" },
        { name: "Firewall Management", icon: "🧱" },
        { name: "Risk Assessment", icon: "⚖️" }
      ]
    },
    {
      id: 'aiml',
      name: 'AI & Machine Learning',
      icon: '🤖',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-100 dark:bg-purple-800',
      borderColor: 'border-purple-300 dark:border-purple-600',
      textColor: 'text-purple-900 dark:text-purple-100',
      subTextColor: 'text-purple-700 dark:text-purple-200',
      skills: [
        { name: "Machine Learning", icon: "🧠" },
        { name: "Deep Learning", icon: "🔬" },
        { name: "Python", icon: "🐍" },
        { name: "TensorFlow", icon: "🔥" },
        { name: "PyTorch", icon: "⚡" },
        { name: "Data Analysis", icon: "📈" },
        { name: "NLP", icon: "📝" },
        { name: "Computer Vision", icon: "👁️" },
        { name: "Pandas", icon: "🐼" },
        { name: "Scikit-learn", icon: "🔬" }
      ]
    }
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
    
    // Track resume download
    analytics.resumeDownload();
  };

  const handleViewResume = () => {
    window.open('/assets/Prashant_Chettiyar_Resume.pdf', '_blank');
    
    // Track resume view
    analytics.resumeView();
  };

  const toggleCategory = (categoryId) => {
    const wasExpanded = expandedCategory === categoryId;
    setExpandedCategory(wasExpanded ? null : categoryId);
    
    // Track skill category expansion (only when expanding, not collapsing)
    if (!wasExpanded) {
      analytics.skillCategoryExpand(categoryId);
    }
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
            <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Skills & Expertise</h3>
            
            {/* Skill Categories */}
            <div className="space-y-4">
              {skillCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${category.borderColor} ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full p-6 ${category.bgColor} hover:opacity-90 transition-all duration-300 flex items-center justify-between group`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{category.icon}</span>
                      <div className="text-left">
                        <h4 className={`text-xl font-semibold ${category.textColor} group-hover:scale-105 transition-transform duration-300`}>
                          {category.name}
                        </h4>
                        <p className={`text-sm ${category.subTextColor}`}>
                          Click to explore skills
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${category.subTextColor}`}>
                        {category.skills.length} skills
                      </span>
                      {expandedCategory === category.id ? (
                        <ChevronUp className={`w-5 h-5 ${category.subTextColor} group-hover:scale-110 transition-transform duration-300`} />
                      ) : (
                        <ChevronDown className={`w-5 h-5 ${category.subTextColor} group-hover:scale-110 transition-transform duration-300`} />
                      )}
                    </div>
                  </button>

                  {/* Expanded Skills */}
                  {expandedCategory === category.id && (
                    <div className="p-6 bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skill.name}
                            className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg hover:scale-105 hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-500"
                            style={{
                              animationDelay: `${skillIndex * 0.05}s`,
                              animation: 'fadeIn 0.4s ease-out forwards'
                            }}
                          >
                            <span className="text-lg">{skill.icon}</span>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Learning Note */}
            <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-800 rounded-lg border border-blue-300 dark:border-blue-600">
              <p className="text-blue-900 dark:text-blue-100 text-sm">
                <span className="font-semibold">Always Learning:</span> I continuously explore new technologies and best practices across all domains to stay current with the evolving tech landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}