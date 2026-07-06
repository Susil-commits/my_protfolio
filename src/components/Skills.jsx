import { useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';
import SpotlightCard from './SpotlightCard';
import TechPill from './TechPill';

export default function Skills() {
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
    <section ref={sectionRef} id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-white w-[400px] h-[400px] -bottom-10 left-1/3 opacity-10 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[200px] h-[200px] top-10 right-1/4 opacity-5 animate-float-slow" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Skills
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Technologies I <span className="text-gradient-animated">work with</span>
          </h2>
          <p className="reveal-on-scroll text-mist mt-4 max-w-lg mx-auto text-sm">
            A curated set of tools and technologies I use to bring ideas to life
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((group, i) => (
            <SpotlightCard
              key={group.category}
              className="reveal-scale card-morph-border p-6 group cursor-default"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Icon */}
              <div className="text-2xl text-pearl/30 mb-3 group-hover:text-pearl/60 transition-colors duration-500">
                {group.icon}
              </div>

              <h3 className="text-pearl font-semibold text-lg mb-4 group-hover:text-black transition-colors duration-300">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechPill key={item} name={item} />
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}