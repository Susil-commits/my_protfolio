import { useEffect, useRef } from 'react';
import { achievements } from '../data/portfolio';
import { useLightbox } from '../context/LightboxContext';
import SpotlightCard from './SpotlightCard';

export default function Achievements() {
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
    <section ref={sectionRef} id="achievements" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-white w-[400px] h-[400px] -bottom-10 left-1/3 opacity-8 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[200px] h-[200px] top-10 right-1/4 opacity-5 animate-float-slow" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Achievements
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Recognition & <span className="text-gradient-animated">milestones</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((item, i) => (
            <SpotlightCard
              key={item.title}
              className="reveal-scale card-morph-border p-7 group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="relative z-10 tilt-pop">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  {item.certificates.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-pearl/50 uppercase tracking-[0.12em] bg-pearl/[0.03] px-2.5 py-1 rounded-full border border-white/[0.04]">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {item.certificates.length} {item.certificates.length > 1 ? 'proofs' : 'proof'}
                    </span>
                  )}
                </div>
                <h3 className="text-pearl font-semibold text-base leading-snug group-hover:text-black transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-mist/80 text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Certificate preview thumbnails */}
                {item.certificates.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.certificates.map((cert, idx) => (
                      <button
                        key={idx}
                        onClick={() => open(cert, `${item.title} — Certificate ${idx + 1}`)}
                        aria-label={`View certificate ${idx + 1} for ${item.title}`}
                        title="Click to preview"
                        className="relative w-16 h-16 rounded-lg overflow-hidden border border-pearl/[0.08] hover:border-pearl/25 transition-all duration-300 group/proof hover:scale-105 hover:shadow-md"
                      >
                        <img
                          src={cert}
                          alt={`${item.title} certificate ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 bg-black/0 group-hover/proof:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover/proof:opacity-100 transition-opacity duration-300">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
