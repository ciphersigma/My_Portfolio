// components/Projects.js - With Analytics Tracking
'use client';
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { analytics } from '../lib/analytics';
import { useSectionView } from '../hooks/useAnalytics';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);

  // Track when Projects section is viewed
  useSectionView('projects');

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('projects');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack shopping experience with modern UI",
      subtitle: "React • Node.js • MongoDB",
      githubUrl: "#",
      liveUrl: "#",
      status: "DEMO",
      image: "🛒"
    },
    {
      title: "Task Management App", 
      description: "Collaborative workspace for team productivity",
      subtitle: "Next.js • TypeScript • Prisma",
      githubUrl: "#",
      liveUrl: "#",
      status: "DEMO",
      image: "📋"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather data with beautiful charts", 
      subtitle: "React • Chart.js • API",
      githubUrl: "#",
      liveUrl: "#",
      status: "DEMO",
      image: "🌤️"
    }
  ];

  const handleProjectClick = (url, type, projectTitle) => {
    // Track project link click
    analytics.projectLinkClick(projectTitle, type);
    
    if (url === "#") {
      alert(`${type} link would be implemented here! Connect your actual project URLs.`);
    } else {
      window.open(url, '_blank');
    }
  };

  // Track project view when card comes into view
  useEffect(() => {
    const observedProjects = new Set();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectTitle = entry.target.getAttribute('data-project-title');
            if (projectTitle && !observedProjects.has(projectTitle)) {
              observedProjects.add(projectTitle);
              analytics.projectView(projectTitle);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe project cards after component mounts
    const projectCards = document.querySelectorAll('[data-project-title]');
    projectCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section 
      id="projects" 
      className={`py-24 px-6 bg-white dark:bg-gray-900 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-white">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-project-title={project.title}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-2xl dark:hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Live' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{project.subtitle}</p>
              
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleProjectClick(project.githubUrl, 'GitHub', project.title)}
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium flex items-center space-x-2 group"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>GitHub</span>
                </button>
                <button
                  onClick={() => handleProjectClick(project.liveUrl, 'Live Demo', project.title)}
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium flex items-center space-x-2 group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Live Demo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}