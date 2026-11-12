import { useEffect, useRef, useState } from 'react';
import { personal, hero, skills } from '../data/portfolio';
import { useMagnetic } from '../hooks/useMagnetic';
import RotatingText from './RotatingText';
import ProfileAvatar3D from './ProfileAvatar3D';

export default function Hero() {
  const sectionRef = useRef(null);
  const viewWork = useMagnetic(0.4);
  const getInTouch = useMagnetic(0.4);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Parallax tilt on hero content
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function handleMouseMove(e) {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * -4, y: dx * 4 });
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    function handleMouseLeave() {
      setTilt({ x: 0, y: 0 });
    }

    section.addEventListener('mousemove', handleMouseMove, { passive: true });
    section.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll reveal
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Build staggered name chars
  const nameParts = [];
  let nameCharIdx = 0;
  personal.name.split(' ').forEach((word, wi, arr) => {
    nameParts.push(
      <span key={`w${wi}`} className="whitespace-nowrap">
        {word.split('').map((ch) => {
          const idx = nameCharIdx++;
          return (
            <span
              key={idx}
              className="char-stagger"
              style={{ transitionDelay: `${0.2 + idx * 0.04}s` }}
            >
              {ch}
            </span>
          );
        })}
      </span>
    );
    if (wi < arr.length - 1) {
      nameParts.push(' ');
      nameCharIdx++;
    }
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-24"
    >
      {/* Main content with parallax tilt */}
      <div
        className="max-w-5xl mx-auto text-center relative"
        style={{
          zIndex: 10,
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      >
        {/* 3D Profile Avatar */}
        <ProfileAvatar3D />

        {/* Rotating roles subheading */}
        <div className="reveal-on-scroll flex items-center justify-center gap-4 mb-5">
          <span className="h-px w-10 bg-slate-300 dark:bg-[#2f3031]" />
          <p className="text-sm uppercase tracking-[0.3em] font-semibold text-[#ff6363]">
            <RotatingText words={hero.roles} />
          </p>
          <span className="h-px w-10 bg-slate-300 dark:bg-[#2f3031]" />
        </div>

        {/* Main heading — staggered char reveal */}
        <h1
          className="font-bold tracking-tight mb-5 leading-none text-slate-900 dark:text-white"
          style={{
            fontFamily: 'var(--font-display, var(--font-inter, sans-serif))',
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
          }}
        >
          <span className="text-gradient-accent">{nameParts}</span>
        </h1>

        {/* Tagline */}
        <p
          className="reveal-on-scroll text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-9 px-2 text-slate-600 dark:text-[#9c9c9d]"
        >
          {hero.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="reveal-on-scroll flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 px-2">
          <a href="#projects" className="btn-primary group" {...viewWork}>
            View Work
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline group" {...getInTouch}>
            Get in Touch
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="reveal-on-scroll flex flex-col items-center gap-2">
          <div
            className="relative w-5 h-8 rounded-full border border-slate-300 dark:border-white/15 flex justify-center pt-1.5 overflow-hidden"
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: '#ff6363',
                animation: 'scrollBounce 1.6s cubic-bezier(0.37, 0, 0.63, 1) infinite',
                boxShadow: '0 0 8px rgba(255, 99, 99, 0.8)',
              }}
            />
          </div>
          <p
            className="text-[9px] uppercase tracking-[0.3em] font-mono text-slate-500 dark:text-[#6a6b6c]"
          >
            Scroll
          </p>
        </div>
      </div>

      {/* Corner decorations — Raycast Hairline Strokes */}
      <div
        className="absolute top-12 left-12 w-20 h-20 rounded-tl-2xl hidden lg:block pointer-events-none border-t border-l border-slate-200 dark:border-white/[0.07]"
      />
      <div
        className="absolute bottom-12 right-12 w-20 h-20 rounded-br-2xl hidden lg:block pointer-events-none border-b border-r border-[#ff6363]/20"
      />

      {/* Infinite Tech Marquee — Raycast Cockpit Dock */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden py-3 backdrop-blur-md border-t border-slate-200 dark:border-[#1b1c1e] bg-white/85 dark:bg-[rgba(4,5,6,0.85)] z-20"
      >
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-0 px-6">
              {skills.flatMap((s) => s.items).map((tech, idx) => (
                <span key={`${i}-${idx}`} className="flex items-center">
                  <span
                    className="text-xs font-mono tracking-[0.14em] uppercase whitespace-nowrap px-6 text-slate-600 dark:text-[#9c9c9d]"
                  >
                    {tech}
                  </span>
                  {/* Glowing separator — Coral Pulse, Cobalt, Success Green */}
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{
                      background: idx % 3 === 0
                        ? '#ff6363'
                        : idx % 3 === 1
                        ? '#63a1ff'
                        : '#59d499',
                      boxShadow: `0 0 6px currentColor`,
                    }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll bounce keyframe */}
      <style>{`
        @keyframes scrollBounce {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.3; }
          51% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
