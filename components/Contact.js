// components/Contact.js (Fixed)
'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('contact');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert(`Thanks ${formData.name}! Your message has been sent. I&apos;ll get back to you soon!`);
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields before sending your message.');
    }
  };

  const handleSocialClick = (platform, url) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else if (url === '#') {
      alert(`${platform} link would be implemented here! Add your actual social media URLs.`);
    } else {
      window.open(url, '_blank');
    }
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:prashant@example.com',
      hoverColor: 'group-hover:text-red-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: '#',
      hoverColor: 'group-hover:text-blue-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: '#',
      hoverColor: 'group-hover:text-gray-900'
    }
  ];

  return (
    <section 
      id="contact" 
      className={`py-24 px-6 bg-gray-50 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 text-center">
          Let&apos;s Build Something Amazing
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Get In Touch</h3>
            <p className="text-lg text-gray-600 mb-8">
              Have a project in mind? Let&apos;s discuss how we can bring your ideas to life 
              with modern web technologies.
            </p>
            
            <div className="flex space-x-6 mb-8">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => handleSocialClick(social.name, social.url)}
                    className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
                  >
                    <IconComponent className={`w-7 h-7 text-gray-700 transition-colors ${social.hoverColor}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              ></textarea>
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}