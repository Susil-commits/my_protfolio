import { useEffect, useRef } from 'react';

const projects = [];

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
            Featured projects showcasing architecture, design, and performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              className="reveal-scale card-morph-border p-8 group cursor-pointer relative overflow-hidden"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Hover gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Featured badge */}
              {project.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-pearl/10 text-pearl/60 rounded-full border border-pearl/10 backdrop-blur-md">
                    Featured
                  </span>
                </div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-3xl mb-4 opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                  {project.icon}
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-pearl font-semibold text-xl group-hover:text-black transition-colors duration-300">
                    {project.title}
                  </h3>
                  <svg
                    className="w-5 h-5 text-mist group-hover:text-pearl transition-all duration-300 shrink-0 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
                <p className="text-mist text-sm leading-relaxed mb-6 group-hover:text-mist/80 transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-smoke/80 border border-white/[0.04] text-mist group-hover:border-white/10 group-hover:bg-ash/80 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}