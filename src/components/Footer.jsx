import { personal } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleFooterNav = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .char-stagger')
        .forEach((child) => child.classList.add('revealed'));
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <footer className="relative py-16 px-6 border-t border-slate-200 dark:border-[#1b1c1e] bg-slate-50 dark:bg-[#040506] overflow-hidden">
      {/* Top subtle hairline highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#ff6363]/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleFooterNav(e, 'home')}
            className="flex items-center text-sm font-medium tracking-tight text-slate-900 dark:text-white group relative shrink-0"
          >
            <span className="w-5 h-5 rounded-[5px] bg-[#ff6363] mr-2.5 flex items-center justify-center shadow-[0_0_10px_rgba(255,99,99,0.4)]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#040506" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="20" x2="20" y2="4" />
                <polyline points="15 4 20 4 20 9" />
              </svg>
            </span>
            <span className="text-slate-900 dark:text-white font-medium text-sm">
              {personal.logo}<span className="text-[#ff6363]">.</span>
            </span>
          </a>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Achievements', 'Certifications', 'Contact'].map((link) => {
              const sectionId = link.toLowerCase();
              return (
                <a
                  key={link}
                  href={`#${sectionId}`}
                  onClick={(e) => handleFooterNav(e, sectionId)}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-[#9c9c9d] dark:hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-[#1b1c1e] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-[#6a6b6c] text-xs font-mono">
            &copy; {year} {personal.name}. All rights reserved.
          </p>
          <p className="text-slate-500 dark:text-[#6a6b6c] text-xs font-mono flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff6363] animate-pulse" />
            Designed &amp; Engineered by {personal.name}
          </p>
        </div>
      </div>
    </footer>
  );
}