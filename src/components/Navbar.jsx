import { useState, useEffect, useRef } from 'react';
import { personal } from '../data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'certifications', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Achievements', 'Certifications', 'Contact'];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-blur py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo with animation */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight text-pearl group relative"
        >
          <span className="relative z-10 transition-all duration-300 group-hover:text-black">
            {personal.logo}<span className="text-mist group-hover:text-pearl/70 transition-colors duration-300">.</span>
          </span>
          {/* Logo glow on hover */}
          <span className="absolute inset-0 blur-xl bg-pearl/10 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const sectionId = l.toLowerCase();
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l}
                href={`#${sectionId}`}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 tracking-wide uppercase rounded-full ${
                  isActive
                    ? 'text-pearl bg-pearl/[0.06]'
                    : 'text-mist hover:text-pearl'
                }`}
              >
                {l}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pearl rounded-full animate-pulse" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-[2px] bg-pearl rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? 'rotate-45 translate-y-[3px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-pearl rounded-full transition-all duration-300 ${
              mobileOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-pearl rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''
            }`}
          />
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full bg-pearl/0 group-hover:bg-pearl/5 transition-colors duration-300" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 nav-blur flex flex-col gap-2">
          {links.map((l) => {
            const sectionId = l.toLowerCase();
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l}
                href={`#${sectionId}`}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 uppercase tracking-wide ${
                  isActive
                    ? 'text-pearl bg-pearl/[0.06]'
                    : 'text-mist hover:text-pearl hover:bg-pearl/[0.03]'
                }`}
              >
                {l}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}