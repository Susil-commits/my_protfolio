import { useState, useEffect, lazy, Suspense } from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import SystemArchitecture from './components/SystemArchitecture';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

// Code-split heavy interactive assistants to accelerate initial page load
const Chatbot = lazy(() => import('./components/Chatbot'));

export default function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scroll while initial quick intro is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-obsidian transition-colors duration-300">
        {loading && <Loader onComplete={() => setLoading(false)} />}
        
        {/* Hardware-accelerated lightweight particles */}
        <ParticlesBackground />
        <CustomCursor />
        <ScrollProgress />

        <Navbar />
        <main>
          <Hero />
          <div className="line-decoration max-w-4xl mx-auto" />
          <About />
          <div className="line-decoration max-w-4xl mx-auto" />
          <Skills />
          <div className="line-decoration max-w-4xl mx-auto" />
          <SystemArchitecture />
          <div className="line-decoration max-w-4xl mx-auto" />
          <Projects />
          <div className="line-decoration max-w-4xl mx-auto" />
          <Experience />
          <div className="line-decoration max-w-4xl mx-auto" />
          <Education />
          <div className="line-decoration max-w-4xl mx-auto" />
          <Achievements />
          <div className="line-decoration max-w-4xl mx-auto" />
          <Certifications />
          <div className="line-decoration max-w-4xl mx-auto" />
          <Contact />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
