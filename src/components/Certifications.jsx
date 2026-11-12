import { useEffect, useRef } from 'react';
import { certifications } from '../data/portfolio';
import { useLightbox } from '../context/LightboxContext';
import SpotlightCard from './SpotlightCard';
import SafeImage from './SafeImage';

export default function Certifications() {
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
    <section ref={sectionRef} id="certifications" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-white w-[400px] h-[400px] -bottom-10 right-1/4 opacity-8 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[200px] h-[200px] top-10 left-10 opacity-5 animate-float-slow" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Bootcamps & Courses
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Hands-On <span className="text-gradient-animated">Bootcamps</span>
          </h2>
          <p className="reveal-on-scroll text-mist mt-4 max-w-lg mx-auto text-sm">
            Intensive practical workshops in full-stack web and backend engineering — click any card to preview.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((item, i) => {
            const thumbSrc =
              typeof item.certificate === 'string'
                ? item.certificate
                : item.certificate?.thumb || item.certificate?.full;
            const fullSrc =
              typeof item.certificate === 'string'
                ? item.certificate
                : item.certificate?.full || item.certificate?.thumb;
            const certTitle =
              typeof item.certificate === 'object' && item.certificate?.title
                ? item.certificate.title
                : `${item.title} Certificate`;

            return (
              <SpotlightCard
                key={item.title}
                as="button"
                onClick={() => open(fullSrc, certTitle, thumbSrc)}
                onMouseEnter={() => {
                  if (fullSrc) {
                    const img = new Image();
                    img.src = fullSrc;
                  }
                }}
                aria-label={`Preview ${item.title} certificate`}
                title="Click to preview certificate"
                className="reveal-scale card-premium p-6 group text-left cursor-pointer w-full flex flex-col justify-between bg-white dark:bg-[#07080a] border border-slate-200/80 dark:border-[#1b1c1e] hover:border-slate-300 dark:hover:border-[#2f3031] rounded-2xl transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="relative z-10 tilt-pop flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl opacity-80 group-hover:scale-105 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#111214] border border-slate-200 dark:border-[#2f3031] flex items-center justify-center text-slate-500 group-hover:text-slate-900 group-hover:border-slate-300 dark:text-[#9c9c9d] dark:group-hover:text-white dark:group-hover:border-[#454647] transition-all duration-200">
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
                    </span>
                  </div>

                  {/* Certificate thumbnail using SafeImage */}
                  <div className="relative mb-4 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 group-hover:border-slate-300 dark:border-[#2f3031] dark:group-hover:border-[#454647] transition-colors duration-300 bg-slate-100 dark:bg-[#040506]">
                    <SafeImage
                      src={thumbSrc}
                      alt={`${item.title} certificate`}
                      title={certTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="text-slate-900 dark:text-white font-medium text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-[#9c9c9d] text-sm mt-2 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
