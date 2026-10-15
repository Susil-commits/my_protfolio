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
                className="reveal-scale card-morph-border p-6 group text-left cursor-pointer hover:-translate-y-1 w-full flex flex-col justify-between"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="relative z-10 tilt-pop flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <span className="w-9 h-9 rounded-lg bg-pearl/[0.04] border border-pearl/15 flex items-center justify-center text-mist group-hover:text-pearl group-hover:border-pearl/30 transition-all duration-300">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </span>
                  </div>

                  {/* Certificate thumbnail using SafeImage */}
                  <div className="relative mb-4 aspect-[4/3] rounded-xl overflow-hidden border border-pearl/15 group-hover:border-pearl/30 transition-colors duration-500 bg-obsidian-card">
                    <SafeImage
                      src={thumbSrc}
                      alt={`${item.title} certificate`}
                      title={certTitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="text-pearl font-semibold text-base leading-snug group-hover:text-accent1 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-mist text-sm mt-2 leading-relaxed flex-grow">
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
