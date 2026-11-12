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
                className="reveal-scale card-morph-border p-6 group flex flex-col justify-between"
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
                      className="relative w-full h-40 rounded-xl overflow-hidden mb-4 border border-pearl/15 hover:border-pearl/40 transition-all duration-300 group/pic cursor-pointer block bg-obsidian-card"
                    >
                      <SafeImage
                        src={edu.image.thumb}
                        alt={edu.institution}
                        title={certTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/pic:scale-105"
                      />

                      {/* Hover zoom overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover/pic:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover/pic:opacity-100 transition-opacity duration-300 px-3 py-1 rounded-full bg-slate-900/90 border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-lg">
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
                    <span className="text-[11px] font-semibold text-slate font-mono uppercase tracking-[0.12em] bg-pearl/[0.03] px-3 py-1 rounded-full border border-pearl/10 shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <h3 className="text-pearl font-semibold text-lg group-hover:text-accent1 transition-colors duration-300 leading-snug">
                    {edu.institution}
                  </h3>
                  <p className="text-slate text-xs mt-1">{edu.location}</p>

                  <div className="mt-3.5 space-y-1 text-xs sm:text-sm">
                    <p className="text-mist">
                      <span className="text-pearl/90 font-medium">{edu.degree}</span>
                      {edu.field && <span className="text-mist"> · {edu.field}</span>}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-5 pt-3 border-t border-pearl/10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pearl bg-pearl/[0.04] px-3 py-1.5 rounded-lg border border-pearl/15 font-mono">
                    {edu.score}
                  </span>
                  {hasImage && (
                    <button
                      type="button"
                      onClick={() => open(fullSrc, certTitle, edu.image?.thumb)}
                      className="text-[11px] font-medium text-mist hover:text-pearl transition-colors duration-200 cursor-pointer flex items-center gap-1"
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
