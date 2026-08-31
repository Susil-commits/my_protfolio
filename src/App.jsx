import { useState, useEffect, lazy, Suspense } from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import CommandPalette from './components/CommandPalette';

// Code-split heavy interactive assistants to accelerate initial page load
const Chatbot = lazy(() => import('./components/Chatbot'));
const ArchitectureModal = lazy(() => import('./components/ArchitectureModal'));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedArchProject, setSelectedArchProject] = useState(null);

  // Prevent scroll while initial quick intro is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  // Handle route / hash navigation on initial refresh or URL change
  useEffect(() => {
    if (loading) return;

    const scrollToRouteTarget = (smooth = true) => {
      let targetId = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
      if (!targetId && window.location.pathname && window.location.pathname !== '/') {
        targetId = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      }

      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          // Immediately reveal components in that section
          el.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .char-stagger')
            .forEach((child) => child.classList.add('revealed'));

          setTimeout(() => {
            el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
          }, 60);
        }
      }
    };

    // Execute immediately on initial load after loader finishes
    scrollToRouteTarget(false);

    const handleHashChange = () => scrollToRouteTarget(true);
    const handlePopState = () => scrollToRouteTarget(true);

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [loading]);

  // Listen for open-command-palette global event
  useEffect(() => {
    const handleOpenPalette = () => setCommandPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenPalette);
    return () => window.removeEventListener('open-command-palette', handleOpenPalette);
  }, []);

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

        {/* Global Command Palette */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelectProject={(title) => setSelectedArchProject(title)}
        />

        {/* Global Architecture Deep Dive Modal */}
        {selectedArchProject && (
          <Suspense fallback={null}>
            <ArchitectureModal
              projectTitle={selectedArchProject}
              isOpen={Boolean(selectedArchProject)}
              onClose={() => setSelectedArchProject(null)}
            />
          </Suspense>
        )}

        {/* Code-split Gemini AI Chatbot */}
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
