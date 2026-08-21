import { useState, useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';
import SpotlightCard from './SpotlightCard';
import TechPill from './TechPill';

const SKILL_APPLICATIONS = {
  'Distributed & AI': {
    lead: 'High-Frequency Streaming, Reinforcement Learning & Constraint Optimization',
    projects: [
      { name: 'APEX', desc: '60Hz Kafka telemetry partition routing, BullMQ async rollouts, Safe RL ActionMaskGuardrail' },
      { name: 'ORBIT-X', desc: 'Google CP-SAT constraint optimization & PyTorch Cross-Attention neural surrogates (<0.8ms)' },
    ],
  },
  'Cloud & DevOps': {
    lead: 'GitOps Continuous Delivery, Infrastructure-as-Code & Self-Healing Automation',
    projects: [
      { name: 'HyperDeploy', desc: 'Sigstore/Cosign cryptographic verification, Kubernetes health-gated rollouts & <3s rollback' },
      { name: 'EdgeGuard', desc: 'Red Hat Event-Driven Ansible (EDA) rulebooks, EWMA 6h trend forecasting, SQLite WAL spooling' },
    ],
  },
  'Backend & Data': {
    lead: 'Sub-Millisecond Feature Stores, ACID Concurrency & Compound Indexing',
    projects: [
      { name: 'FaRm', desc: 'MongoDB compound B-Tree indexing cutting p95 query latency by 95% (~240ms to ~12ms)' },
      { name: 'Left2Serve', desc: 'PostgreSQL compound indexing (status, pickup_window) with 19K+ Artillery load testing' },
    ],
  },
  'Frontend & Languages': {
    lead: 'Reactive UIs, WebGL 3D Digital Twins & Type-Safe Systems',
    projects: [
      { name: 'APEX & ORBIT-X HUD', desc: 'Three.js 60FPS WebGL orbital digital twin HUD & WebXR virtual cockpit' },
      { name: 'MyMate', desc: 'Bi-directional Socket.IO telemetry with atomic mutex locking & Tesseract.js OCR' },
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
                  <div className="text-2xl text-pearl/40 group-hover:text-pearl/80 transition-colors duration-500">
                    {group.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate group-hover:text-emerald-400 transition-colors duration-300">
                    {group.items.length} Tools
                  </span>
                </div>

                <h3 className="text-pearl font-semibold text-base sm:text-lg mb-3 group-hover:text-white transition-colors duration-300">
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {group.items.map((item) => (
                    <TechPill key={item} name={item} compact />
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-pearl/[0.06] flex items-center justify-between text-[11px] text-slate group-hover:text-pearl transition-colors duration-300">
                  <span>{isSelected ? 'Hide Production Scope' : 'View Production Scope'}</span>
                  <span>{isSelected ? '↑' : '→'}</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Selected Category Production Scope Drawer */}
        {activeCategory && SKILL_APPLICATIONS[activeCategory] && (
          <div className="p-6 rounded-3xl border border-pearl/15 bg-obsidian/90 backdrop-blur-2xl animate-fade-in space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-pearl/10">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-bold text-xs">● PRODUCTION IMPACT</span>
                <h4 className="text-sm font-bold text-pearl">{activeCategory}</h4>
              </div>
              <button
                onClick={() => setActiveCategory(null)}
                className="text-xs text-slate hover:text-pearl cursor-pointer font-mono"
              >
                [✕ Close]
              </button>
            </div>

            <p className="text-xs text-mist leading-relaxed font-medium">
              {SKILL_APPLICATIONS[activeCategory].lead}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {SKILL_APPLICATIONS[activeCategory].projects.map((pr) => (
                <div key={pr.name} className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-1">
                  <span className="text-xs font-bold text-emerald-400 font-mono block">
                    {pr.name}
                  </span>
                  <p className="text-[11px] text-slate leading-relaxed">
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