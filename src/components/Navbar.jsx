import { useState, useEffect, useRef } from 'react';
import { personal } from '../data/portfolio';
import { useMagnetic } from '../hooks/useMagnetic';

const LinkedinIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const GithubIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const DownloadIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const ChevronIcon = ({ className = '' }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${className}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const MernIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const AiIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M9 9h.01M15 9h.01M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5" />
  </svg>
);

function ResumeIcon({ name }) {
  return name === 'mern' ? MernIcon : AiIcon;
}

function MagneticSocialLink({ url, label, icon }) {
  const magnetic = useMagnetic(0.2);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`w-9 h-9 rounded-full border border-pearl/15 flex items-center justify-center text-mist hover:text-pearl hover:border-pearl/30 hover:bg-pearl/[0.04] transition-all duration-300 ${magnetic.className}`}
      ref={magnetic.ref}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
    >
      {icon}
    </a>
  );
}

function SocialLinks({ className = '' }) {
  const items = [
    { label: 'LinkedIn', url: personal.social.linkedin, icon: LinkedinIcon },
    { label: 'GitHub', url: personal.social.github, icon: GithubIcon },
  ].filter((s) => s.url);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map((s) => (
        <MagneticSocialLink key={s.label} {...s} />
      ))}
    </div>
  );
}

function CvButton({ className = '', onClick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          onClick?.();
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className="btn-primary !py-2 !px-4 text-xs gap-1.5"
      >
        {DownloadIcon}
        <span>CV</span>
        <ChevronIcon className={open ? 'rotate-180' : ''} />
      </button>

      {/* Dropdown panel */}
      <div
        role="menu"
        className={`absolute right-0 top-full mt-2 w-64 origin-top-right z-50 transition-all duration-200 ${
          open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl border border-pearl/15 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-2 overflow-hidden">
          <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate">
            Select resume
          </p>
          {personal.resumes.map((r) => {
            const disabled = !r.url;
            const content = (
              <>
                <span className="w-9 h-9 shrink-0 rounded-lg bg-pearl/[0.04] border border-pearl/10 flex items-center justify-center text-pearl/60 group-hover:text-pearl group-hover:border-pearl/20 transition-colors duration-300">
                  <ResumeIcon name={r.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-pearl truncate">{r.role}</span>
                  <span className="block text-[11px] text-slate truncate">{r.subtitle}</span>
                </span>
                {disabled ? (
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                    Soon
                  </span>
                ) : (
                  <span className="shrink-0 text-mist group-hover:text-pearl transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                )}
              </>
            );
            return disabled ? (
              <div
                key={r.role}
                role="menuitem"
                aria-disabled="true"
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-60 cursor-not-allowed"
              >
                {content}
              </div>
            ) : (
              <a
                key={r.role}
                role="menuitem"
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pearl/[0.04] transition-colors duration-300"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileCv({ onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-slate">Resume</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="btn-primary !py-2 !px-4 text-xs gap-1.5"
        >
          {DownloadIcon}
          <span>CV</span>
          <ChevronIcon className={open ? 'rotate-180' : ''} />
        </button>
      </div>

      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl border border-pearl/15 bg-white/80 backdrop-blur-xl p-2 space-y-1">
            {personal.resumes.map((r) => {
              const disabled = !r.url;
              const content = (
                <>
                  <span className="w-9 h-9 shrink-0 rounded-lg bg-pearl/[0.04] border border-pearl/10 flex items-center justify-center text-pearl/60">
                    <ResumeIcon name={r.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-pearl truncate">{r.role}</span>
                    <span className="block text-[11px] text-slate truncate">{r.subtitle}</span>
                  </span>
                  {disabled ? (
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                      Soon
                    </span>
                  ) : null}
                </>
              );
              return disabled ? (
                <div
                  key={r.role}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-60 cursor-not-allowed"
                >
                  {content}
                </div>
              ) : (
                <a
                  key={r.role}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pearl/[0.04] transition-colors duration-300"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

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

        {/* Desktop actions: socials + CV */}
        <div className="hidden lg:flex items-center gap-3">
          <SocialLinks />
          <CvButton />
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
          mobileOpen ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'
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

          {/* Mobile actions: socials + CV */}
          <div className="pt-3 mt-2 border-t border-pearl/10 space-y-3">
            <SocialLinks />
            <MobileCv onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
}