import { useEffect, useRef } from 'react';
import { personal, hero } from '../data/portfolio';
import { useMagnetic } from '../hooks/useMagnetic';
import CountUp from './CountUp';
import RotatingText from './RotatingText';

export default function Hero() {
  const sectionRef = useRef(null);
  const viewWork = useMagnetic(0.4);
  const getInTouch = useMagnetic(0.4);

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

  const nameChars = personal.name.split('');

  const stats = [
    { label: 'Projects', end: 3, suffix: '' },
    { label: 'Internships', end: 3, suffix: '' },
    { label: 'Certifications', end: 13, suffix: '+' },
    { label: 'CGPA', end: 7.77, decimals: 2 },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Animated mesh background */}
      <div className="mesh-bg" />

      {/* Ambient glows with pulse */}
      <div className="ambient-glow ambient-glow-white ambient-glow-pulse w-[600px] h-[600px] -top-40 -right-40" />
      <div className="ambient-glow ambient-glow-white w-[300px] h-[300px] top-1/2 left-1/4 opacity-5 animate-float-slow" />
      <div className="ambient-glow ambient-glow-white w-[250px] h-[250px] -bottom-20 -left-20 opacity-10 animate-float" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Profile avatar */}
        <div className="reveal-scale flex justify-center mb-8">
          <div className="relative group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-pearl/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:scale-105 group-hover:border-pearl/20">
              <img
                src={personal.avatar}
                alt={personal.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Rotating ring */}
            <div className="absolute -inset-1.5 rounded-full border border-pearl/[0.06] animate-spin-slow pointer-events-none" />
            <div className="absolute -inset-1.5 rounded-full bg-pearl/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>

        {/* Subheading — rotating roles */}
        <div className="reveal-on-scroll flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-pearl/20" />
          <p className="text-pearl text-sm uppercase tracking-[0.3em] font-medium">
            <RotatingText words={hero.roles} />
          </p>
          <span className="h-px w-8 bg-pearl/20" />
        </div>

        {/* Main heading — staggered char reveal */}
        <h1 className="section-title text-pearl mb-6">
          <span className="text-gradient-animated">
            {nameChars.map((ch, i) => (
              <span
                key={i}
                className="char-stagger"
                style={{ transitionDelay: `${0.3 + i * 0.035}s` }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </span>
        </h1>

        {/* Description */}
        <p className="reveal-on-scroll text-mist text-lg max-w-xl mx-auto leading-relaxed mb-10">
          {hero.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="reveal-on-scroll flex items-center justify-center gap-4 mb-16">
          <a href="#projects" className="btn-primary group" {...viewWork}>
            View Work
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
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
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>

        {/* Stats strip with count-up */}
        <div className="reveal-on-scroll grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card-morph-border py-5 px-3 group hover:-translate-y-1 transition-transform duration-400"
            >
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-bold text-pearl tabular-nums">
                  <CountUp end={s.end} decimals={s.decimals || 0} suffix={s.suffix || ''} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate mt-1">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="reveal-on-scroll mt-14">
          <div className="w-5 h-8 border border-pearl/20 rounded-full mx-auto flex justify-center relative overflow-hidden">
            <div className="w-1 h-2 bg-pearl rounded-full mt-1.5 animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-b from-pearl/10 to-transparent animate-bounce" />
          </div>
          <p className="text-slate text-[10px] uppercase tracking-[0.3em] mt-3 animate-pulse">
            Scroll
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-12 left-12 w-20 h-20 border-t border-l border-pearl/[0.04] rounded-tl-2xl hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-20 h-20 border-b border-r border-pearl/[0.04] rounded-br-2xl hidden lg:block" />
    </section>
  );
}
