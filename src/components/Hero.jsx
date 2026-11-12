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
      {/* Gradient Mesh Background */}
      <div className="gradient-mesh-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        {/* SVG Noise Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" style={{ zIndex: 1 }}>
          <filter id="heroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoise)" />
        </svg>
      </div>

      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          color: 'var(--theme-pearl)',
          zIndex: 1,
        }}
      />

      {/* Spotlight follow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, oklch(70% 0.2 240 / 0.04), transparent 60%)`,
          zIndex: 2,
          transition: 'background 0.1s ease',
        }}
      />

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
          <span
            className="h-px w-10"
            style={{
              background: 'linear-gradient(90deg, transparent, oklch(70% 0.2 240 / 0.5))',
            }}
          />
          <p
            className="text-sm uppercase tracking-[0.3em] font-semibold"
            style={{ color: 'oklch(70% 0.2 240)' }}
          >
            <RotatingText words={hero.roles} />
          </p>
          <span
            className="h-px w-10"
            style={{
              background: 'linear-gradient(90deg, oklch(70% 0.2 240 / 0.5), transparent)',
            }}
          />
        </div>

        {/* Main heading — staggered char reveal */}
        <h1
          className="font-bold tracking-tight mb-5 leading-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          <span className="text-gradient-accent">{nameParts}</span>
        </h1>

        {/* Tagline */}
        <p
          className="reveal-on-scroll text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-9 px-2"
          style={{ color: 'var(--theme-mist)' }}
        >
          {hero.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="reveal-on-scroll flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 px-2">
          <a href="#projects" className="btn-primary group" {...viewWork}>
            View Work
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
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
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="reveal-on-scroll flex flex-col items-center gap-2.5">
          <div
            className="relative w-6 h-10 rounded-full border flex justify-center pt-2 overflow-hidden"
            style={{ borderColor: 'oklch(70% 0.2 240 / 0.3)' }}
          >
            <div
              className="w-1 h-2.5 rounded-full"
              style={{
                background: 'oklch(70% 0.2 240)',
                animation: 'scrollBounce 1.6s cubic-bezier(0.37, 0, 0.63, 1) infinite',
                boxShadow: '0 0 8px oklch(70% 0.2 240 / 0.6)',
              }}
            />
          </div>
          <p
            className="text-[9px] uppercase tracking-[0.4em]"
            style={{ color: 'var(--theme-slate)' }}
          >
            Scroll
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div
        className="absolute top-12 left-12 w-20 h-20 rounded-tl-2xl hidden lg:block"
        style={{
          borderTop: '1px solid oklch(70% 0.2 240 / 0.08)',
          borderLeft: '1px solid oklch(70% 0.2 240 / 0.08)',
        }}
      />
      <div
        className="absolute bottom-12 right-12 w-20 h-20 rounded-br-2xl hidden lg:block"
        style={{
          borderBottom: '1px solid oklch(65% 0.25 290 / 0.08)',
          borderRight: '1px solid oklch(65% 0.25 290 / 0.08)',
        }}
      />

      {/* Infinite Tech Marquee */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden py-4 backdrop-blur-sm"
        style={{
          zIndex: 20,
          borderTop: '1px solid oklch(70% 0.2 240 / 0.08)',
          background: 'color-mix(in oklch, var(--theme-obsidian) 70%, transparent)',
        }}
      >
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-0 px-6">
              {skills.flatMap((s) => s.items).map((tech, idx) => (
                <span key={`${i}-${idx}`} className="flex items-center">
                  <span
                    className="text-xs font-semibold tracking-[0.18em] uppercase whitespace-nowrap px-6"
                    style={{ color: 'var(--theme-mist)' }}
                  >
                    {tech}
                  </span>
                  {/* Glowing separator */}
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{
                      background: idx % 3 === 0
                        ? 'oklch(70% 0.2 240)'
                        : idx % 3 === 1
                        ? 'oklch(65% 0.25 290)'
                        : 'oklch(75% 0.18 160)',
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
