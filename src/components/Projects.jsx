import { useState, lazy, Suspense } from 'react';
import { projects } from '../data/portfolio';
import SpotlightCard from './SpotlightCard';
import TechPill from './TechPill';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ArchitectureModal = lazy(() => import('./ArchitectureModal'));

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

const BlueprintIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
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
        className="inline-flex items-center gap-1.5 text-xs font-medium text-pearl hover:text-white transition-colors duration-300"
      >
        {icon}
        <span>{label}</span>
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

const CATEGORIES = [
  'All',
  'Distributed Systems & AI',
  'Cloud & DevOps',
  'Full-Stack Web',
];

const POPULAR_TAGS = ['Kafka', 'PyTorch', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Ansible', 'FastAPI'];

export default function Projects() {
  const [selectedArchProject, setSelectedArchProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTag, setSearchTag] = useState('');
  const sectionRef = useIntersectionObserver();

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    if (!matchesCategory) return false;

    if (!searchTag.trim()) return true;
    const query = searchTag.toLowerCase().trim();
    return (
      p.title.toLowerCase().includes(query) ||
      p.subtitle.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-accent1 w-[500px] h-[500px] top-20 -right-20 opacity-15 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-accent2 w-[250px] h-[250px] bottom-20 left-10 opacity-10 animate-float-slow" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Featured Engineering
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4 text-glow-accent">
            Selected <span className="text-gradient-accent">Platforms & Systems</span>
          </h2>
          <p className="reveal-on-scroll text-mist mt-4 max-w-2xl mx-auto text-sm">
            Autonomous AI digital twins, distributed streaming pipelines, cloud-native continuous delivery controllers, and high-throughput web architectures built end-to-end.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="reveal-on-scroll flex flex-wrap items-center justify-center gap-2 mb-6">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-pearl text-obsidian shadow-lg font-bold scale-102 border border-pearl'
                    : 'text-mist hover:text-pearl bg-pearl/[0.04] hover:bg-pearl/[0.08] border border-pearl/10'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-obsidian/20 text-obsidian font-bold' : 'bg-pearl/10 text-slate'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tag Search Input & Quick Tag Filter Bar */}
        <div className="reveal-on-scroll max-w-xl mx-auto mb-12 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              placeholder="Search by technology (e.g. Kafka, PyTorch, Kubernetes, PostgreSQL)..."
              className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-pearl/[0.03] border border-pearl/15 text-xs sm:text-sm text-pearl placeholder:text-slate focus:outline-none focus:border-pearl/40 transition-all duration-300"
            />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchTag && (
              <button
                onClick={() => setSearchTag('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate hover:text-pearl cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
            <span className="text-slate mr-1">Quick Tags:</span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchTag(searchTag.toLowerCase() === tag.toLowerCase() ? '' : tag)}
                className={`px-2.5 py-1 rounded-lg border transition-all duration-200 cursor-pointer ${
                  searchTag.toLowerCase() === tag.toLowerCase()
                    ? 'bg-pearl text-obsidian border-pearl font-semibold'
                    : 'bg-pearl/[0.02] border-pearl/10 text-mist hover:text-pearl hover:bg-pearl/[0.05]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-mist text-sm border border-pearl/10 rounded-3xl bg-pearl/[0.02]">
            No projects found matching your search. Try another tag or clear your filter.
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <SpotlightCard
              key={project.title}
              className="reveal-scale card-morph-border p-7 group relative overflow-hidden flex flex-col justify-between"
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
            >
              {/* Hover gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Badges */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                {project.badge && (
                  <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 backdrop-blur-md">
                    {project.badge}
                  </span>
                )}
                {project.highlight && (
                  <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] bg-pearl/10 text-pearl/80 rounded-full border border-pearl/15 backdrop-blur-md">
                    Featured
                  </span>
                )}
              </div>

              <div className="relative z-10 tilt-pop transition-transform duration-500 group-hover:translate-z-10 flex-1">
                {/* Icon */}
                <div className="text-3xl mb-4 opacity-80 group-hover:scale-110 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500">
                  {project.icon}
                </div>

                <div className="mb-3 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                  <div className="flex items-center gap-2">
                    <h3 className="text-pearl font-semibold text-xl drop-shadow-sm transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-slate text-xs mt-1 leading-snug">{project.subtitle}</p>
                </div>

                <p className="text-mist text-xs sm:text-sm leading-relaxed mb-6 group-hover:text-pearl transition-colors duration-300 group-hover:-translate-y-1 delay-150">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5 group-hover:-translate-y-1 transition-transform duration-500 delay-200">
                  {project.tags.map((tag) => (
                    <TechPill key={tag} name={tag} compact />
                  ))}
                </div>
              </div>

              {/* Action Links & Architecture Deep Dive Trigger */}
              <div className="relative z-10 pt-4 border-t border-pearl/[0.06] space-y-3">
                {/* Architecture Deep Dive Button */}
                <button
                  type="button"
                  onClick={() => setSelectedArchProject(project.title)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-pearl/90 bg-pearl/[0.05] hover:bg-pearl hover:text-obsidian border border-pearl/15 hover:border-pearl shadow-sm transition-all duration-300 cursor-pointer"
                >
                  {BlueprintIcon}
                  <span>System Architecture Deep Dive</span>
                </button>

                {/* External links */}
                <div className="flex items-center justify-between px-1">
                  <ProjectLink url={project.link} label="Live / Repo" icon={DeployIcon} />
                  <ProjectLink url={project.github} label="Source Code" icon={GithubIcon} />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Architecture Deep Dive Modal */}
      {selectedArchProject && (
        <Suspense fallback={null}>
          <ArchitectureModal
            projectTitle={selectedArchProject}
            isOpen={Boolean(selectedArchProject)}
            onClose={() => setSelectedArchProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
