import { useEffect, useRef } from 'react';
import { achievements } from '../data/portfolio';
import { useLightbox } from '../context/LightboxContext';
import SpotlightCard from './SpotlightCard';
import SafeImage from './SafeImage';

export default function Achievements() {
  const sectionRef = useRef(null);
  const { open } = useLightbox();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale')
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
    <section ref={sectionRef} id="achievements" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-white w-[400px] h-[400px] -bottom-10 left-1/3 opacity-8 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[200px] h-[200px] top-10 right-1/4 opacity-5 animate-float-slow" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Achievements & Credentials
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Recognition, Certifications & <span className="text-gradient-animated">Milestones</span>
          </h2>
          <p className="reveal-on-scroll text-mist text-sm max-w-xl mx-auto mt-4">
            Verified certifications from Oracle Cloud Infrastructure, NASSCOM, NPTEL, and hackathons with official credentials.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <SpotlightCard
              key={item.title}
              className="reveal-scale card-morph-border p-7 group flex flex-col justify-between"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="relative z-10 tilt-pop flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl opacity-90 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  {item.certificates && item.certificates.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate font-mono uppercase tracking-[0.12em] bg-pearl/[0.04] px-2.5 py-1 rounded-full border border-pearl/10">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {item.certificates.length}{' '}
                      {item.certificates.length > 1 ? 'proofs' : 'proof'}
                    </span>
                  )}
                </div>

                <h3 className="text-pearl font-semibold text-base leading-snug group-hover:text-accent1 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-mist text-sm mt-3 leading-relaxed flex-grow">
                  {item.description}
                </p>

                {/* Certificate preview thumbnails */}
                {item.certificates && item.certificates.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-pearl/[0.06]">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate mb-2.5">
                      Verified Credentials ({item.certificates.length})
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {item.certificates.map((cert, idx) => {
                        const thumbSrc =
                          typeof cert === 'string'
                            ? cert
                            : cert.thumb || cert.src || cert.full;
                        const fullSrc =
                          typeof cert === 'string'
                            ? cert
                            : cert.full || cert.src || cert.thumb;
                        const certLabel =
                          typeof cert === 'object' && cert.label
                            ? cert.label
                            : `Proof ${idx + 1}`;
                        const certTitle =
                          typeof cert === 'object' && cert.title
                            ? cert.title
                            : `${item.title} — ${certLabel}`;

                        return (
                          <button
                            key={idx}
                            onClick={() => open(fullSrc, certTitle)}
                            aria-label={`View ${certTitle}`}
                            title={`Click to preview: ${certTitle}`}
                            className="relative group/proof rounded-lg overflow-hidden border border-pearl/15 hover:border-pearl/40 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent1/50"
                          >
                            <div className="w-[72px] h-[72px] relative bg-obsidian-card">
                              <SafeImage
                                src={thumbSrc}
                                alt={certTitle}
                                title={certTitle}
                                className="w-full h-full object-cover"
                              />

                              {/* Subtle label tag at bottom */}
                              <span className="absolute bottom-0 inset-x-0 bg-black/85 backdrop-blur-[2px] text-[8px] font-mono font-semibold text-pearl/90 text-center py-0.5 truncate px-1 border-t border-white/10">
                                {certLabel}
                              </span>
                            </div>

                            {/* Hover overlay with zoom icon */}
                            <span className="absolute inset-0 bg-black/0 group-hover/proof:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-hover/proof:opacity-100 transition-opacity duration-300 drop-shadow-md"
                              >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                <line x1="11" y1="8" x2="11" y2="14" />
                                <line x1="8" y1="11" x2="14" y2="11" />
                              </svg>
                            </span>
                          </button>
                        );
                      })}
                    </div>
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
