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

function LiveProjectButton({ project }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    if (!project.deployed || !project.link) {
      e.preventDefault();
      setClicked(true);
      setTimeout(() => setClicked(false), 2400);
    }
  };

  if (project.deployed && project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Live Demo for ${project.title}`}
        title={`Visit live demo for ${project.title}`}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-800 dark:text-white hover:text-[#ff6363] dark:hover:text-[#ff6363] transition-colors duration-200 group/link"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6363] animate-pulse" />
        {DeployIcon}
        <span>Live Demo</span>
      </a>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        aria-label={`${project.title} live deployment is work in progress`}
        title="Live Deployment: Work in Progress"
        className="relative inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-[#9c9c9d] dark:hover:text-white transition-all duration-200 group/wip cursor-pointer py-0.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-[#6a6b6c]" />
        {DeployIcon}
        <span className="group-hover/wip:hidden transition-all">Live Demo</span>
        <span className="hidden group-hover/wip:inline-flex items-center gap-1 font-medium text-slate-700 dark:text-[#9c9c9d] transition-all">
          <span>🚧</span> Work in Progress
        </span>
      </button>

      {/* Click feedback popup */}
      {clicked && (
        <div className="absolute bottom-full left-0 mb-2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#07080a] border border-slate-200 dark:border-[#2f3031] text-[11px] font-medium text-slate-900 dark:text-white shadow-xl dark:shadow-2xl backdrop-blur-xl whitespace-nowrap animate-bounce z-30 flex items-center gap-1.5">
          <span>🚧</span>
          <span>Work in Progress — Deployment coming soon!</span>
        </div>
      )}
    </div>
  );
}

function ProjectLink({ url, label, icon }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-pearl hover:text-accent1 transition-colors duration-300"
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

const POPULAR_TAGS = ['Go', 'Kafka', 'Next.js', 'PyTorch', 'LangGraph', 'XGBoost', 'PostgreSQL', 'MongoDB'];

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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-[#e6e6e6] dark:text-[#111214] font-medium shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 dark:text-[#9c9c9d] dark:hover:text-white dark:bg-[#111214] dark:hover:bg-[#1b1c1e] dark:border-[#1b1c1e]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-white/20 text-white dark:bg-[#111214]/15 dark:text-[#111214] font-semibold' : 'bg-slate-200/70 text-slate-600 dark:bg-[#1b1c1e] dark:text-[#6a6b6c]'
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
              placeholder="Search by technology (e.g. Kafka, PyTorch, LangGraph, PostgreSQL)..."
              className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-white dark:bg-pearl/[0.03] border border-slate-200 dark:border-pearl/15 text-xs sm:text-sm text-slate-900 dark:text-pearl placeholder:text-slate-400 dark:placeholder:text-slate focus:outline-none focus:border-slate-400 dark:focus:border-pearl/40 transition-all duration-300 shadow-sm"
            />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate">
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
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-pearl dark:text-obsidian dark:border-pearl font-semibold'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 dark:bg-pearl/[0.02] dark:border-pearl/10 dark:text-mist dark:hover:text-pearl dark:hover:bg-pearl/[0.05]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-slate-500 dark:text-mist text-sm border border-slate-200 dark:border-pearl/10 rounded-3xl bg-slate-50 dark:bg-pearl/[0.02]">
            No projects found matching your search. Try another tag or clear your filter.
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <SpotlightCard
              key={project.title}
              className="reveal-scale card-premium p-7 group relative overflow-hidden flex flex-col justify-between bg-white dark:bg-[#07080a] border border-slate-200/80 dark:border-[#1b1c1e] hover:border-slate-300 dark:hover:border-[#2f3031] rounded-2xl transition-all duration-300"
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
            >
              {/* Subtle hover wash */}
              <div
                className="absolute inset-0 bg-slate-900/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />

              {/* Badges */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                {!project.deployed && (
                  <span
                    title="Live Deployment: Work in Progress"
                    className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.12em] bg-slate-100 dark:bg-[#111214] text-slate-600 dark:text-[#9c9c9d] rounded border border-slate-200 dark:border-[#2f3031] flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-[#6a6b6c]" />
                    WIP
                  </span>
                )}
                {project.badge && (
                  <span className="px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.12em] bg-slate-100 dark:bg-[#111214] text-slate-700 dark:text-[#e6e6e6] rounded border border-slate-200 dark:border-[#2f3031]">
                    {project.badge}
                  </span>
                )}
                {project.highlight && (
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.12em] bg-rose-50 dark:bg-[#1b1c1e] text-[#ff6363] rounded border border-[#ff6363]/30">
                    Featured
                  </span>
                )}
              </div>

              <div className="relative z-10 tilt-pop transition-transform duration-300 group-hover:translate-z-10 flex-1">
                {/* Icon */}
                <div className="text-2xl mb-4 text-slate-700 dark:text-white/80 group-hover:scale-105 transition-all duration-300">
                  {project.icon}
                </div>

                <div className="mb-3">
                  <h3 className="text-slate-900 dark:text-white font-medium text-lg tracking-tight transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 dark:text-[#6a6b6c] text-xs mt-1 leading-snug">{project.subtitle}</p>
                </div>

                <p className="text-slate-600 dark:text-[#9c9c9d] text-xs sm:text-sm leading-relaxed mb-6 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <TechPill key={tag} name={tag} compact />
                  ))}
                </div>
              </div>

              {/* Action Links & Architecture Deep Dive Trigger */}
              <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-[#1b1c1e] space-y-2.5">
                {/* Architecture Deep Dive Button */}
                <button
                  type="button"
                  onClick={() => setSelectedArchProject(project.title)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 dark:text-[#e6e6e6] dark:hover:text-white dark:bg-[#111214] dark:hover:bg-[#1b1c1e] dark:border-[#2f3031] dark:hover:border-[#454647] shadow-sm transition-all duration-200 cursor-pointer"
                >
                  {BlueprintIcon}
                  <span>System Architecture Deep Dive</span>
                </button>

                {/* External links */}
                <div className="flex items-center justify-between px-1">
                  <LiveProjectButton project={project} />
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
