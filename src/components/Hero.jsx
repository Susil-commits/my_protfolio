import { useEffect, useRef } from 'react';
import { personal, hero, skills } from '../data/portfolio';
import { useMagnetic } from '../hooks/useMagnetic';
import RotatingText from './RotatingText';
import ProfileAvatar3D from './ProfileAvatar3D';

export default function Hero() {
  const sectionRef = useRef(null);
  const viewWork = useMagnetic(0.4);
  const getInTouch = useMagnetic(0.4);
  const askAi = useMagnetic(0.4);

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

  // Group chars into words so the name can wrap on narrow screens
  // (each word stays together via whitespace-nowrap; breakable spaces between)
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
              style={{ transitionDelay: `${0.3 + idx * 0.035}s` }}
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      {/* Animated mesh background */}
      <div className="mesh-bg" />

      {/* Ambient glows with pulse */}
      <div className="ambient-glow ambient-glow-accent1 ambient-glow-pulse w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
      <div className="ambient-glow ambient-glow-accent2 w-[300px] h-[300px] top-1/2 left-1/4 opacity-10 animate-float-slow" />
      <div className="ambient-glow ambient-glow-accent1 w-[250px] h-[250px] -bottom-20 -left-20 opacity-15 animate-float" />

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
        {/* Interactive 3D Profile Avatar */}
        <ProfileAvatar3D />

        {/* Subtle executive status indicator */}
        <div className="reveal-on-scroll inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pearl/10 bg-pearl/[0.03] backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-pearl/90 tracking-wide">
            Distributed Systems & AI Architecture • 7 Verified System Topologies
          </span>
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
        <h1 className="text-[clamp(1.75rem,5vw,3.25rem)] font-bold tracking-tight mb-6">
          <span className="text-gradient-accent">{nameParts}</span>
        </h1>

        {/* Description */}
        <p className="reveal-on-scroll text-mist text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2">
          {hero.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="reveal-on-scroll flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-2">
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
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-portfolio-ai'))}
            className="btn-outline group border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 text-pearl cursor-pointer flex items-center gap-2"
            {...askAi}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Ask AI</span>
          </button>
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
      {/* Infinite Tech Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-pearl/[0.04] bg-pearl/[0.02] py-4 backdrop-blur-sm z-20">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {skills.flatMap((s) => s.items).map((tech, idx) => (
                <span key={`${i}-${idx}`} className="text-mist/70 text-xs font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
