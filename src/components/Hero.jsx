import { useEffect, useRef } from 'react';

export default function Hero() {
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
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
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
        {/* Subheading */}
        <p className="reveal-on-scroll text-mist text-sm uppercase tracking-[0.35em] mb-6">
          Full-Stack Developer & Designer
        </p>

        {/* Main heading */}
        <h1 className="reveal-on-scroll section-title text-pearl mb-6">
          Crafting digital
          <br />
          <span className="text-gradient-animated">experiences</span> that
          <br />
          leave a mark
        </h1>

        {/* Description */}
        <p className="reveal-on-scroll text-mist text-lg max-w-xl mx-auto leading-relaxed mb-10">
          I build premium, performant web applications with modern technologies.
          Focused on clean architecture, thoughtful design, and seamless user
          experiences.
        </p>

        {/* CTA Buttons */}
        <div className="reveal-on-scroll flex items-center justify-center gap-4 mb-16">
          <a href="#projects" className="btn-primary group">
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
          <a href="#contact" className="btn-outline group">
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

        {/* Scroll indicator */}
        <div className="reveal-on-scroll mt-8">
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