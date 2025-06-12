// app/page.js - With Dark Mode Classes
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-300 dark:bg-blue-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-300 dark:bg-purple-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-green-300 dark:bg-green-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-yellow-300 dark:bg-yellow-400 rounded-full animate-bounce opacity-30" style={{animationDelay: '1s'}}></div>
      </div>

      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}