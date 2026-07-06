import { useEffect, useRef } from 'react';
import { experiences } from '../data/portfolio';
import { useLightbox } from '../context/LightboxContext';
import SpotlightCard from './SpotlightCard';

export default function Experience() {
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
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-white w-[400px] h-[400px] top-1/2 -left-20 opacity-8 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[200px] h-[200px] bottom-20 right-10 opacity-5 animate-float-slow" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Experience
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Where I've <span className="text-gradient-animated">worked</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div
                key={exp.role}
                className={`reveal-on-scroll relative flex flex-col md:flex-row gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="w-3 h-3 bg-pearl rounded-full ring-4 ring-obsidian" />
                    <div className="absolute inset-0 w-3 h-3 bg-pearl rounded-full animate-ping-slow opacity-50" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`md:w-1/2 pl-12 md:pl-0 ${
                    i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                  }`}
                >
                  <SpotlightCard className="card-morph-border p-6 group hover:border-white/10">
                    <span className="text-xs font-semibold text-pearl/50 uppercase tracking-[0.15em] bg-pearl/[0.03] px-3 py-1 rounded-full border border-white/[0.04]">
                      {exp.period}
                    </span>
                    <h3 className="text-pearl font-semibold text-lg mt-3 group-hover:text-black transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-mist text-sm mt-1">{exp.company}</p>
                    <p className="text-mist/70 text-sm mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] font-medium text-pearl/40 bg-pearl/[0.02] px-2 py-0.5 rounded border border-white/[0.04]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {exp.certificate && (
                      <button
                        onClick={() => open(exp.certificate, `${exp.role} — ${exp.certificateLabel || 'Certificate'}`)}
                        aria-label={`View ${exp.certificateLabel || 'certificate'} for ${exp.company}`}
                        title="Click to preview certificate"
                        className="mt-5 group/cert flex items-center gap-3 w-full text-left p-2 rounded-xl border border-pearl/[0.06] hover:border-pearl/20 hover:bg-pearl/[0.02] transition-all duration-300"
                      >
                        <span className="relative w-14 h-14 rounded-lg overflow-hidden border border-pearl/[0.08] shrink-0">
                          <img
                            src={exp.certificate}
                            alt={`${exp.company} certificate`}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-semibold text-pearl/50 uppercase tracking-[0.12em]">
                            {exp.certificateLabel || 'Certificate'}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-pearl group-hover/cert:text-black transition-colors duration-300">
                            View certificate
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/cert:translate-x-0.5">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </span>
                      </button>
                    )}
                  </SpotlightCard>
                </div>

                {/* Empty spacer for the other side */}
                <div className="md:w-1/2 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}