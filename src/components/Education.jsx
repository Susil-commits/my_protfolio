import { useEffect, useRef } from 'react';
import { education } from '../data/portfolio';
import SpotlightCard from './SpotlightCard';
import SafeImage from './SafeImage';
import { useLightbox } from '../context/LightboxContext';

export default function Education() {
  const sectionRef = useRef(null);
  const { open } = useLightbox();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
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
    <section ref={sectionRef} id="education" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-white w-[400px] h-[400px] top-10 right-1/4 opacity-8 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[200px] h-[200px] bottom-20 left-10 opacity-5 animate-float-slow" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Education
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Academic <span className="text-gradient-animated">background</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => {
            const hasImage = Boolean(edu.image?.thumb);
            const fullSrc = edu.image?.full || edu.image?.thumb;
            const certTitle = edu.image?.title || edu.institution;

            return (
              <SpotlightCard
                key={edu.institution}
                className="reveal-scale card-premium p-6 group flex flex-col justify-between bg-white dark:bg-[#07080a] border border-slate-200/80 dark:border-[#1b1c1e] hover:border-slate-300 dark:hover:border-[#2f3031] rounded-2xl transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="relative z-10 tilt-pop">
                  {/* Institution Image Banner */}
                  {hasImage && (
                    <button
                      type="button"
                      onClick={() => open(fullSrc, certTitle, edu.image?.thumb)}
                      onMouseEnter={() => {
                        if (fullSrc) {
                          const img = new Image();
                          img.src = fullSrc;
                        }
                      }}
                      aria-label={`Preview ${edu.institution} image`}
                      title="Click to view full preview"
                      className="relative w-full h-40 rounded-xl overflow-hidden mb-4 border border-slate-200 hover:border-slate-300 dark:border-[#2f3031] dark:hover:border-[#454647] transition-all duration-200 group/pic cursor-pointer block bg-slate-100 dark:bg-[#040506]"
                    >
                      <SafeImage
                        src={edu.image.thumb}
                        alt={edu.institution}
                        title={certTitle}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/pic:scale-105"
                      />

                      {/* Hover zoom overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover/pic:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                        <span className="opacity-0 group-hover/pic:opacity-100 transition-opacity duration-200 px-3 py-1 rounded-full bg-white/90 dark:bg-[#07080a]/90 border border-slate-200 dark:border-[#2f3031] text-slate-900 dark:text-white text-[11px] font-mono flex items-center gap-1.5 shadow-lg">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                          <span>View Full</span>
                        </span>
                      </div>
                    </button>
                  )}

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-slate-600 dark:text-[#9c9c9d] bg-slate-100 dark:bg-[#111214] px-3 py-1 rounded border border-slate-200 dark:border-[#2f3031] shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <h3 className="text-slate-900 dark:text-white font-medium text-lg leading-snug">
                    {edu.institution}
                  </h3>
                  <p className="text-slate-500 dark:text-[#6a6b6c] text-xs mt-1">{edu.location}</p>

                  <div className="mt-3.5 space-y-1 text-xs sm:text-sm">
                    <p className="text-slate-600 dark:text-[#9c9c9d]">
                      <span className="text-slate-900 dark:text-white font-normal">{edu.degree}</span>
                      {edu.field && <span className="text-slate-500 dark:text-[#9c9c9d]"> · {edu.field}</span>}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-5 pt-3 border-t border-slate-200 dark:border-[#1b1c1e] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-800 dark:text-white bg-slate-100 dark:bg-[#111214] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#2f3031]">
                    {edu.score}
                  </span>
                  {hasImage && (
                    <button
                      type="button"
                      onClick={() => open(fullSrc, certTitle, edu.image?.thumb)}
                      className="text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:text-[#9c9c9d] dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1"
                    >
                      <span>Photo preview</span>
                      <span>→</span>
                    </button>
                  )}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
