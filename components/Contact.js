// components/Contact.js (Direct Email - No Client Opening)
'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle, MapPin } from 'lucide-react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    if (submitStatus) setSubmitStatus(null);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields before sending your message.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email directly via Formspree (no email client opens)
      const response = await fetch('https://formspree.io/f/mdkzgajj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact from ${formData.name}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform, url) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const contactInfo = {
    email: 'Prashantchettiyar@ieee.org',
    location: 'Ahmedabad, Gujarat, Bharat',
    linkedin: 'https://www.linkedin.com/in/prashantchettiyar/',
    github: 'https://github.com/ciphersigma',
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${contactInfo.email}`,
      hoverColor: 'group-hover:text-red-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: contactInfo.linkedin,
      hoverColor: 'group-hover:text-blue-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: contactInfo.github,
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
            
            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>{contactInfo.location}</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-8">
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

            {/* Why Choose Me */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Quick Response Guaranteed</h4>
              <p className="text-blue-700 text-sm">
                I typically respond to all inquiries within 24 hours. Let&apos;s discuss your project!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
            
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-800 font-semibold">Message sent successfully!</p>
                  <p className="text-green-700 text-sm">Thank you for reaching out. I&apos;ll get back to you within 24 hours!</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-red-800 font-semibold">Failed to send message</p>
                  <p className="text-red-700 text-sm">Please try again or contact me directly at {contactInfo.email}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-100"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-100"
              />
              
              <textarea
                name="message"
                rows="5"
                placeholder="Tell me about your project... *"
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none disabled:bg-gray-100"
              ></textarea>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 hover:scale-105 shadow-lg hover:shadow-xl'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                * Required fields. Your message will be sent directly to my inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}