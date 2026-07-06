import { useEffect, useRef } from 'react';
import { about } from '../data/portfolio';

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
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient glows */}
      <div className="ambient-glow ambient-glow-white w-[350px] h-[350px] top-10 right-1/4 opacity-10 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[200px] h-[200px] bottom-10 left-1/3 opacity-5 animate-float-slow" />

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Left: badge + headline */}
          <div className="md:col-span-2 reveal-left">
            <span className="section-badge mb-6">
              About Me
            </span>
            <h2 className="section-title text-pearl mt-4">
              {about.headline[0]}
              <br />
              <span className="text-gradient-animated">{about.headline[1]}</span>
            </h2>

            {/* Highlight chips */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {about.highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="reveal-scale card-morph-border p-4 group"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-slate">{h.label}</p>
                    <p className="text-sm font-semibold text-pearl mt-1 group-hover:text-black transition-colors duration-300">
                      {h.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: recruiter-focused narrative */}
          <div className="md:col-span-3 reveal-right">
            <div className="relative">
              {/* Accent quote mark */}
              <span className="absolute -top-8 -left-2 text-7xl font-serif text-pearl/10 select-none leading-none">
                &ldquo;
              </span>

              <div className="space-y-5 text-mist leading-relaxed text-[15px] relative z-10">
                {about.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={i === 0 ? 'text-pearl/90 text-lg font-medium leading-relaxed' : ''}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Signature line */}
            <div className="mt-10 pt-6 border-t border-pearl/[0.06] flex items-center gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <p className="text-pearl font-semibold">Susil Kumar Nayak</p>
                <p className="text-slate text-xs">Available for full-time roles & internships</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
