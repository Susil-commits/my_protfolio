import { useEffect, useRef } from 'react';
import { experiences } from '../data/portfolio';
import { useLightbox } from '../context/LightboxContext';
import SpotlightCard from './SpotlightCard';
import SafeImage from './SafeImage';

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
    <section ref={sectionRef} id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-accent2 w-[400px] h-[400px] top-1/2 -left-20 opacity-15 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-accent1 w-[200px] h-[200px] bottom-20 right-10 opacity-10 animate-float-slow" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Experience
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4 text-glow-accent">
            Where I've <span className="text-gradient-accent">worked</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-300 dark:via-white/[0.08] to-transparent" />
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
                    <div className="w-3 h-3 bg-[#ff6363] rounded-full ring-4 ring-white dark:ring-[#040506]" />
                    <div className="absolute inset-0 w-3 h-3 bg-[#ff6363] rounded-full animate-ping-slow opacity-40" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`md:w-1/2 pl-12 md:pl-0 ${
                    i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                  }`}
                >
                  <SpotlightCard className="card-premium p-6 group rounded-2xl bg-white dark:bg-[#07080a] border border-slate-200/80 dark:border-[#1b1c1e] hover:border-slate-300 dark:hover:border-[#2f3031] transition-all duration-300">
                    <span className="text-xs font-medium text-slate-600 dark:text-[#9c9c9d] font-mono uppercase tracking-[0.14em] bg-slate-100 dark:bg-[#111214] px-3 py-1 rounded border border-slate-200 dark:border-[#2f3031]">
                      {exp.period}
                    </span>
                    <h3 className="text-slate-900 dark:text-white font-medium text-lg mt-3 transition-colors duration-200">
                      {exp.role}
                    </h3>
                    <p className="text-slate-600 dark:text-[#9c9c9d] text-sm mt-1">{exp.company}</p>
                    <p className="text-slate-600 dark:text-[#9c9c9d] text-sm mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] font-mono text-slate-500 dark:text-[#6a6b6c] bg-slate-100 dark:bg-[#111214] px-2 py-0.5 rounded border border-slate-200 dark:border-[#1b1c1e]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {exp.certificate && (() => {
                      const thumbSrc =
                        typeof exp.certificate === 'string'
                          ? exp.certificate
                          : exp.certificate?.thumb || exp.certificate?.full;
                      const fullSrc =
                        typeof exp.certificate === 'string'
                          ? exp.certificate
                          : exp.certificate?.full || exp.certificate?.thumb;
                      const certTitle =
                        typeof exp.certificate === 'object' && exp.certificate?.title
                          ? exp.certificate.title
                          : `${exp.role} — ${exp.certificateLabel || 'Certificate'}`;

                      return (
                        <button
                          onClick={() => open(fullSrc, certTitle, thumbSrc)}
                          onMouseEnter={() => {
                            if (fullSrc) {
                              const img = new Image();
                              img.src = fullSrc;
                            }
                          }}
                          aria-label={`View ${exp.certificateLabel || 'certificate'} for ${exp.company}`}
                          title="Click to preview certificate"
                          className="mt-5 group/cert flex items-center gap-3 w-full text-left p-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-[#2f3031] dark:hover:border-[#454647] dark:hover:bg-[#111214] transition-all duration-200 cursor-pointer"
                        >
                          <span className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 dark:border-[#2f3031] shrink-0 bg-slate-100 dark:bg-[#040506]">
                            <SafeImage
                              src={thumbSrc}
                              alt={`${exp.company} certificate`}
                              title={certTitle}
                              className="w-full h-full object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[10px] font-mono uppercase tracking-[0.12em] text-slate-500 dark:text-[#6a6b6c]">
                              {exp.certificateLabel || 'Certificate'}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-900 dark:text-white group-hover/cert:text-[#ff6363] transition-colors duration-200">
                              View certificate
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover/cert:translate-x-0.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </span>
                          </span>
                        </button>
                      );
                    })()}
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