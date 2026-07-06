import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolio';
import SpotlightCard from './SpotlightCard';

const DeployIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const GithubIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

function ProjectLink({ url, label, icon }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-pearl hover:text-black transition-colors duration-300"
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </a>
    );
  }
  return (
    <span
      aria-label={`${label} (coming soon)`}
      title={`${label} (coming soon)`}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate/50 cursor-not-allowed"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </span>
  );
}

export default function Projects() {
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
    <section ref={sectionRef} id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-white w-[500px] h-[500px] top-20 -right-20 opacity-10 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[250px] h-[250px] bottom-20 left-10 opacity-5 animate-float-slow" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Projects
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Selected <span className="text-gradient-animated">work</span>
          </h2>
          <p className="reveal-on-scroll text-mist mt-4 max-w-lg mx-auto text-sm">
            Full-stack platforms I've designed, built, and shipped end-to-end
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <SpotlightCard
              key={project.title}
              className="reveal-scale card-morph-border p-8 group relative overflow-hidden"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Hover gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Featured badge */}
              {project.highlight && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-pearl/10 text-pearl/60 rounded-full border border-pearl/10 backdrop-blur-md">
                    Featured
                  </span>
                </div>
              )}

              <div className="relative z-10 tilt-pop">
                {/* Icon */}
                <div className="text-3xl mb-4 opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                  {project.icon}
                </div>

                <div className="mb-3">
                  <h3 className="text-pearl font-semibold text-xl group-hover:text-black transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate text-xs mt-0.5">{project.subtitle}</p>
                </div>

                <p className="text-mist text-sm leading-relaxed mb-6 group-hover:text-mist/80 transition-colors duration-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-smoke/80 border border-white/[0.04] text-mist group-hover:border-white/10 group-hover:bg-ash/80 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link icons — deployment + source always present */}
                <div className="flex items-center gap-4 pt-4 border-t border-pearl/[0.04]">
                  <ProjectLink url={project.link} label="Live Demo" icon={DeployIcon} />
                  <ProjectLink url={project.github} label="Source" icon={GithubIcon} />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
