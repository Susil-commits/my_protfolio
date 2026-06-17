import { useEffect, useRef } from 'react';

export default function About() {
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

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Avatar / visual */}
          <div className="reveal-left relative">
            <div className="aspect-square max-w-md mx-auto rounded-2xl bg-ash border border-pearl/[0.06] overflow-hidden relative group card-premium-hover-lift">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10" />

              {/* Avatar placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pearl/5 to-pearl/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:from-pearl/10 group-hover:to-pearl/15">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-pearl/20 group-hover:text-pearl/30 transition-colors duration-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>

              {/* Decorative lines */}
              <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-pearl/10 rounded-tl-xl transition-all duration-500 group-hover:border-pearl/20 group-hover:w-20 group-hover:h-20" />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-pearl/10 rounded-br-xl transition-all duration-500 group-hover:border-pearl/20 group-hover:w-20 group-hover:h-20" />

              {/* Corner glow on hover */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-pearl/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>

          {/* Right: Text */}
          <div className="reveal-right">
            <span className="section-badge mb-6">
              About Me
            </span>
            <h2 className="section-title text-pearl mb-6 mt-4">
              Turning ideas into
              <br />
              <span className="text-gradient-animated">elegant solutions</span>
            </h2>

            <div className="space-y-4 text-mist leading-relaxed">
              <p>
                I'm a full-stack developer with a passion for building
                scalable, high-performance web applications. With expertise in
                the MERN stack, I create end-to-end solutions that are both
                technically robust and visually compelling.
              </p>
              <p>
                My approach blends clean architecture with thoughtful design.
                Every project is an opportunity to push boundaries and deliver
                experiences that resonate with users.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new
                technologies, contributing to open-source projects, or sketching
                interface ideas.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}