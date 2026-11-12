import { useState, useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';
import SpotlightCard from './SpotlightCard';
import TechPill from './TechPill';

const SKILL_APPLICATIONS = {
  'Distributed & AI': {
    lead: 'High-Frequency Streaming, Reinforcement Learning & Socratic AI Systems',
    projects: [
      { name: 'APEX', desc: '60Hz Kafka telemetry partition routing, BullMQ async rollouts, Safe RL ActionMaskGuardrail' },
      { name: 'Veritas', desc: 'LangGraph multi-agent Socratic inquiry, Gemini vision scratchpad OCR, Bayesian Knowledge Tracing (BKT)' },
    ],
  },
  'Cloud & DevOps': {
    lead: 'Industrial ML Observability, Telemetry Drift & CI/CD Pipelines',
    projects: [
      { name: 'Predictive Maintenance', desc: 'Platt sigmoid calibration, SHAP TreeExplainer attributions, PSI data drift monitoring' },
      { name: 'Prometheus & Docker', desc: 'Pre-configured Grafana metrics, containerized microservices, and automated GitHub Actions CI' },
    ],
  },
  'Backend & Data': {
    lead: 'High-Concurrency Go 1.24 Cores, Kafka Streaming & Compound Indexing',
    projects: [
      { name: 'MyMate & Left2Serve', desc: 'Compiled Go 1.24 (Gin) backends: 19.4K req/sec (3.6x throughput), Kafka event stream & PostgreSQL B-tree (96.4% latency drop)' },
      { name: 'Veritas & FaRm', desc: 'Supabase pgvector 768-dim embeddings with RLS and MongoDB compound indexing cutting query latency by 95%' },
    ],
  },
  'Frontend & Languages': {
    lead: 'Reactive UIs, WebGL 3D Digital Twins & Interactive Dashboards',
    projects: [
      { name: 'APEX HUD', desc: 'Three.js 60FPS WebGL telemetry digital twin HUD & WebXR virtual cockpit' },
      { name: 'Veritas & PMS UIs', desc: 'React 19, TypeScript, interactive CCSS mastery radar charts, and real-time sensor dashboards' },
    ],
  },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);
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
            Skills & Engineering Tooling
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4 text-glow-accent">
            Technologies & <span className="text-gradient-animated">Systems Mastery</span>
          </h2>
          <p className="reveal-on-scroll text-mist mt-4 max-w-xl mx-auto text-sm">
            Core technologies, distributed systems tools, and AI frameworks applied across 7 production platforms.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {skills.map((group, i) => {
            const isSelected = activeCategory === group.category;
            return (
              <SpotlightCard
                key={group.category}
                onClick={() => setActiveCategory(isSelected ? null : group.category)}
                className={`reveal-scale card-morph-border p-6 group cursor-pointer transition-all duration-300 ${
                  isSelected ? 'border-pearl bg-pearl/[0.04] shadow-xl' : 'hover:border-pearl/20'
                }`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {/* Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl text-slate-800 dark:text-white/80 group-hover:scale-105 transition-all duration-200">
                    {group.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-[#6a6b6c] group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">
                    {group.items.length} Tools
                  </span>
                </div>

                <h3 className="text-slate-900 dark:text-white font-medium text-base sm:text-lg mb-3 transition-colors duration-200">
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {group.items.map((item) => (
                    <TechPill key={item} name={item} compact />
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1b1c1e] flex items-center justify-between text-[11px] text-slate-500 dark:text-[#6a6b6c] group-hover:text-slate-700 dark:group-hover:text-[#9c9c9d] transition-colors duration-200">
                  <span>{isSelected ? 'Hide Production Scope' : 'View Production Scope'}</span>
                  <span>{isSelected ? '↑' : '→'}</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Selected Category Production Scope Drawer */}
        {activeCategory && SKILL_APPLICATIONS[activeCategory] && (
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#2f3031] bg-white dark:bg-[#07080a] animate-fade-in space-y-4 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1b1c1e]">
              <div className="flex items-center gap-2">
                <span className="text-[#ff6363] font-mono font-medium text-xs">● PRODUCTION IMPACT</span>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white">{activeCategory}</h4>
              </div>
              <button
                onClick={() => setActiveCategory(null)}
                className="text-xs text-slate-500 hover:text-slate-900 dark:text-[#6a6b6c] dark:hover:text-white cursor-pointer font-mono"
              >
                [✕ Close]
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-[#9c9c9d] leading-relaxed font-normal">
              {SKILL_APPLICATIONS[activeCategory].lead}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {SKILL_APPLICATIONS[activeCategory].projects.map((pr) => (
                <div key={pr.name} className="p-4 rounded-xl border border-slate-200 dark:border-[#1b1c1e] bg-slate-50 dark:bg-[#111214] space-y-1">
                  <span className="text-xs font-medium text-slate-900 dark:text-white font-mono block">
                    {pr.name}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-[#9c9c9d] leading-relaxed">
                    {pr.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}