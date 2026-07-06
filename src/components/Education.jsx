import { useEffect, useRef } from 'react';
import { education } from '../data/portfolio';
import SpotlightCard from './SpotlightCard';

export default function Education() {
  const sectionRef = useRef(null);

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

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Education
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Academic <span className="text-gradient-animated">background</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {education.map((edu, i) => (
            <SpotlightCard
              key={edu.institution}
              className="reveal-scale card-morph-border p-7 group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="relative z-10 tilt-pop">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-pearl/[0.04] border border-pearl/15 flex items-center justify-center text-pearl/50 group-hover:text-pearl transition-colors duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-pearl/50 uppercase tracking-[0.12em] bg-pearl/[0.03] px-3 py-1 rounded-full border border-pearl/10 shrink-0">
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-pearl font-semibold text-lg group-hover:text-black transition-colors duration-300">
                  {edu.institution}
                </h3>
                <p className="text-slate text-sm mt-1">{edu.location}</p>

                <div className="mt-4 space-y-1 text-sm">
                  <p className="text-mist">
                    <span className="text-slate">{edu.degree}</span>
                    {edu.field && <span className="text-slate"> · {edu.field}</span>}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pearl bg-pearl/[0.04] px-3 py-1.5 rounded-lg border border-pearl/15">
                    {edu.score}
                  </span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
