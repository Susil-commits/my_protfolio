import { useEffect, useRef } from 'react';
import { about } from '../data/portfolio';

const PrincipleIcon = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'puzzle':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
          <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2H9z" />
          <path d="M3 15h6" />
          <path d="M6 12v6" />
        </svg>
      );
    case 'target':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'rocket':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case 'terminal':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case 'shield':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'layers':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'brain':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
        </svg>
      );
    case 'code':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'check':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .char-stagger')
              .forEach((el) => {
                el.classList.add('revealed');
              });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient glows */}
      <div className="ambient-glow ambient-glow-white w-[350px] h-[350px] top-10 right-1/4 opacity-10 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-accent1 w-[280px] h-[280px] bottom-10 left-1/4 opacity-5 animate-float-slow" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Left/Top: badge + big headline (preserved exactly as before) */}
        <div className="max-w-3xl reveal-left">
          <span className="section-badge mb-6 inline-flex">
            About Me
          </span>
          <h2 className="section-title text-pearl mt-4">
            {about.headline[0]}
            <br />
            <span className="text-gradient-animated">{about.headline[1]}</span>
          </h2>
        </div>

        {/* Dual Tables in ONE LINE side-by-side on desktop, responsive on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch reveal-on-scroll">
          {/* Table 1: How I Think & Work */}
          <div className="card-premium p-6 sm:p-7 lg:p-8 rounded-2xl bg-white dark:bg-[#07080a] border border-slate-200/80 dark:border-[#1b1c1e] hover:border-slate-300 dark:hover:border-[#2f3031] relative group transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-[#1b1c1e]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#111214] border border-slate-200 dark:border-[#2f3031] flex items-center justify-center text-slate-900 dark:text-white shrink-0">
                    <PrincipleIcon name="brain" className="w-5 h-5 text-[#ff6363]" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-medium text-lg sm:text-xl tracking-tight">How I Think &amp; Work</h3>
                    <p className="text-slate-500 dark:text-[#6a6b6c] text-xs font-mono tracking-wide">Engineering Philosophy &amp; Mindset</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded bg-slate-100 dark:bg-[#111214] border border-slate-200 dark:border-[#2f3031] text-slate-600 dark:text-[#9c9c9d] shrink-0">
                  5 Tenets
                </span>
              </div>

              {/* Items List */}
              <div className="mt-5 space-y-3">
                {about.principles?.howIThink.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100/90 dark:bg-[#111214]/60 dark:hover:bg-[#111214] border border-slate-200/70 hover:border-slate-300 dark:border-[#1b1c1e] dark:hover:border-[#2f3031] transition-all duration-200 group/item relative overflow-hidden"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 w-7 h-7 rounded-lg bg-white dark:bg-[#07080a] border border-slate-200 dark:border-[#2f3031] group-hover/item:border-[#ff6363]/40 flex items-center justify-center text-slate-500 dark:text-[#9c9c9d] group-hover/item:text-[#ff6363] shrink-0 transition-colors duration-200">
                        <PrincipleIcon name={item.icon} className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-slate-900 dark:text-white text-sm font-medium transition-colors duration-200">
                            {item.title}
                          </h4>
                          {item.tag && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-600 dark:text-[#9c9c9d] px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1b1c1e] border border-slate-200 dark:border-[#2f3031]">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 dark:text-[#9c9c9d] text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table 2: What I Bring */}
          <div className="card-premium p-6 sm:p-7 lg:p-8 rounded-2xl bg-white dark:bg-[#07080a] border border-slate-200/80 dark:border-[#1b1c1e] hover:border-slate-300 dark:hover:border-[#2f3031] relative group transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-[#1b1c1e]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#111214] border border-slate-200 dark:border-[#2f3031] flex items-center justify-center text-slate-900 dark:text-white shrink-0">
                    <PrincipleIcon name="rocket" className="w-5 h-5 text-[#ff6363]" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-medium text-lg sm:text-xl tracking-tight">What I Bring</h3>
                    <p className="text-slate-500 dark:text-[#6a6b6c] text-xs font-mono tracking-wide">Core Capabilities &amp; Technical Scope</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded bg-slate-100 dark:bg-[#111214] border border-slate-200 dark:border-[#2f3031] text-slate-600 dark:text-[#9c9c9d] shrink-0">
                  5 Drivers
                </span>
              </div>

              {/* Items List */}
              <div className="mt-5 space-y-3">
                {about.principles?.whatIBring.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100/90 dark:bg-[#111214]/60 dark:hover:bg-[#111214] border border-slate-200/70 hover:border-slate-300 dark:border-[#1b1c1e] dark:hover:border-[#2f3031] transition-all duration-200 group/item relative overflow-hidden"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 w-7 h-7 rounded-lg bg-white dark:bg-[#07080a] border border-slate-200 dark:border-[#2f3031] group-hover/item:border-[#ff6363]/40 flex items-center justify-center text-slate-500 dark:text-[#9c9c9d] group-hover/item:text-[#ff6363] shrink-0 transition-colors duration-200">
                        <PrincipleIcon name={item.icon} className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-slate-900 dark:text-white text-sm font-medium transition-colors duration-200">
                            {item.title}
                          </h4>
                          {item.tag && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-600 dark:text-[#9c9c9d] px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1b1c1e] border border-slate-200 dark:border-[#2f3031]">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 dark:text-[#9c9c9d] text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

