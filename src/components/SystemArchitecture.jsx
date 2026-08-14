import { useState } from 'react';
import { systemPrinciples, productionScenarios } from '../data/architecture';
import SpotlightCard from './SpotlightCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ARCHITECTURE_MODES = [
  {
    id: 'gateway',
    title: 'Stateless API Ingress & Security',
    badge: 'Security Layer',
    description:
      'All client interactions hit an edge reverse-proxy with strict CORS, Helmet security headers, rate limiting (100 req/15min), and cryptographic JWT validation before dispatching to business controllers.',
    diagram: [
      { step: '01', title: 'Client Request', note: 'HTTPS / TLS 1.3 payload' },
      { step: '02', title: 'Edge Rate Limiter', note: 'Express Rate Limit & Brute-force block' },
      { step: '03', title: 'Security Headers', note: 'Helmet CSP, X-Frame-Options' },
      { step: '04', title: 'JWT Token Verify', note: 'Stateless verification & RBAC check' },
      { step: '05', title: 'Controller Handler', note: 'Async decoupled domain logic' },
    ],
  },
  {
    id: 'database',
    title: 'Compound Indexing & Query Acceleration',
    badge: 'Data Layer',
    description:
      'Eliminated costly sequential collection and table scans (COLLSCAN / Seq Scan). Applied composite B-Tree and 2dsphere indexes in MongoDB and PostgreSQL, dropping p95 query latency by up to 95% (240ms → 12ms).',
    diagram: [
      { step: '01', title: 'Filter Query', note: 'e.g. category, price, location' },
      { step: '02', title: 'B-Tree Index Scan', note: 'Covered IXSCAN without disk fetch' },
      { step: '03', title: 'In-Memory Sort', note: 'Pre-ordered index leaf nodes' },
      { step: '04', title: 'Document Return', note: '~12ms response time' },
    ],
  },
  {
    id: 'websocket',
    title: 'Real-Time WebSocket & State Synchronization',
    badge: 'Real-Time Layer',
    description:
      'Bi-directional Socket.IO topology with isolated communication rooms, heartbeat ping/pong health monitoring, and atomic locking to prevent asynchronous race conditions during high-volume events.',
    diagram: [
      { step: '01', title: 'Handshake Auth', note: 'Token-validated socket connect' },
      { step: '02', title: 'Channel Joining', note: 'Isolated room subscribe' },
      { step: '03', title: 'Event Dispatch', note: 'Sub-50ms broadcast telemetry' },
      { step: '04', title: 'Race Condition Lock', note: 'Atomic mutex state resolution' },
    ],
  },
];

export default function SystemArchitecture() {
  const [viewType, setViewType] = useState('scenarios'); // 'scenarios' | 'pipelines'
  const [selectedMode, setSelectedMode] = useState('gateway');
  const [selectedScenario, setSelectedScenario] = useState(productionScenarios[0].id);
  const sectionRef = useIntersectionObserver();

  const activeMode = ARCHITECTURE_MODES.find((m) => m.id === selectedMode) || ARCHITECTURE_MODES[0];
  const activeScenario = productionScenarios.find((s) => s.id === selectedScenario) || productionScenarios[0];

  return (
    <section ref={sectionRef} id="architecture" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow ambient-glow-accent1 w-[500px] h-[500px] top-1/3 -left-32 opacity-10 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-accent2 w-[400px] h-[400px] bottom-10 right-0 opacity-10 animate-float-slow" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Architecture & System Design
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4 text-glow-accent">
            System <span className="text-gradient-accent">Architecture</span>
          </h2>
          <p className="reveal-on-scroll text-mist mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            Production-grade engineering principles, real-world failure mode recovery, and high-throughput system topologies.
          </p>
        </div>

        {/* 4 Core Principles Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {systemPrinciples.map((item, idx) => (
            <SpotlightCard
              key={item.title}
              className="reveal-scale card-morph-border p-6 group relative overflow-hidden"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="text-3xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="text-emerald-400 font-mono text-sm font-bold tracking-tight mb-1">
                {item.metric}
              </div>
              <h3 className="text-pearl font-semibold text-base mb-2 group-hover:text-black transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-mist text-xs leading-relaxed mb-3">
                {item.description}
              </p>
              <span className="text-[10px] text-slate font-medium block">
                {item.subtext}
              </span>
            </SpotlightCard>
          ))}
        </div>

        {/* Interactive Explorer Container */}
        <div className="reveal-on-scroll rounded-2xl sm:rounded-3xl border border-pearl/15 bg-obsidian/80 backdrop-blur-2xl p-4 sm:p-10 shadow-2xl relative overflow-hidden space-y-6 sm:space-y-8">
          {/* View Type Toggle (Scenarios vs Pipelines) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-pearl/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate block mb-1">
                Interactive Explorer
              </span>
              <h3 className="text-lg font-bold text-pearl">
                {viewType === 'scenarios' ? 'Real-World Production Scenarios & Fault Recovery' : 'Core Architecture Pipelines'}
              </h3>
            </div>

            <div className="flex items-center p-1 rounded-2xl bg-pearl/[0.04] border border-pearl/10 shrink-0">
              <button
                type="button"
                onClick={() => setViewType('scenarios')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-300 flex items-center gap-1.5 ${
                  viewType === 'scenarios'
                    ? 'bg-pearl text-black shadow-md'
                    : 'text-mist hover:text-pearl'
                }`}
              >
                <span>⚡</span>
                <span>Production Scenarios</span>
              </button>
              <button
                type="button"
                onClick={() => setViewType('pipelines')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-300 flex items-center gap-1.5 ${
                  viewType === 'pipelines'
                    ? 'bg-pearl text-black shadow-md'
                    : 'text-mist hover:text-pearl'
                }`}
              >
                <span>🏛️</span>
                <span>Architecture Pipelines</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: PRODUCTION SCENARIOS */}
          {viewType === 'scenarios' && (
            <div className="space-y-8 animate-fade-in">
              {/* Scenario Selector Chips */}
              <div className="flex flex-wrap gap-2">
                {productionScenarios.map((sc) => {
                  const isSelected = selectedScenario === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedScenario(sc.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        isSelected
                          ? 'bg-pearl text-black shadow-lg font-semibold scale-102'
                          : 'text-mist hover:text-pearl bg-pearl/[0.04] hover:bg-pearl/[0.08] border border-pearl/10'
                      }`}
                    >
                      <span>{sc.icon}</span>
                      <span>{sc.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Scenario Card */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                      {activeScenario.badge}
                    </span>
                    <span className="text-xs text-slate font-mono">{activeScenario.project}</span>
                  </div>

                  <h3 className="text-xl font-bold text-pearl drop-shadow-sm">
                    {activeScenario.title}
                  </h3>

                  {/* Context & Failure Mode Alert */}
                  <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-rose-400 block">
                      ⚠️ Failure Mode Without Architecture
                    </span>
                    <p className="text-mist text-xs leading-relaxed">
                      {activeScenario.failureMode}
                    </p>
                  </div>

                  {/* Architectural Solution */}
                  <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 block">
                      ✅ Architectural Solution & Recovery
                    </span>
                    <p className="text-mist text-xs leading-relaxed">
                      {activeScenario.architecturalSolution}
                    </p>
                  </div>
                </div>

                {/* Scenario Execution Pipeline */}
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3 relative">
                  {activeScenario.steps.map((st, i) => (
                    <div
                      key={st.step}
                      className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] hover:border-pearl/20 hover:bg-pearl/[0.05] transition-all duration-300 space-y-2 group relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-emerald-400">
                          PHASE {st.step}
                        </span>
                        {i < activeScenario.steps.length - 1 && (
                          <span className="text-pearl/20 font-mono text-xs hidden sm:inline-block">→</span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-pearl leading-snug">
                        {st.title}
                      </h4>
                      <p className="text-[11px] text-slate leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: CORE ARCHITECTURE PIPELINES */}
          {viewType === 'pipelines' && (
            <div className="space-y-8 animate-fade-in">
              {/* Pipeline Mode Switcher */}
              <div className="flex flex-wrap gap-2">
                {ARCHITECTURE_MODES.map((mode) => {
                  const isSelected = selectedMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        isSelected
                          ? 'bg-pearl text-black shadow-lg font-semibold scale-102'
                          : 'text-mist hover:text-pearl bg-pearl/[0.04] hover:bg-pearl/[0.08] border border-pearl/10'
                      }`}
                    >
                      <span>{mode.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Mode Overview */}
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-pearl/10 text-pearl/80 rounded-full border border-pearl/10 inline-block">
                    {activeMode.badge}
                  </span>
                  <h3 className="text-xl font-bold text-pearl drop-shadow-sm">
                    {activeMode.title}
                  </h3>
                  <p className="text-mist text-xs sm:text-sm leading-relaxed">
                    {activeMode.description}
                  </p>
                </div>

                {/* Diagram Pipeline */}
                <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 relative">
                  {activeMode.diagram.map((step, i) => (
                    <div
                      key={step.step}
                      className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] hover:border-pearl/20 hover:bg-pearl/[0.05] transition-all duration-300 space-y-2 group relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-pearl/50 group-hover:text-emerald-400 transition-colors duration-300">
                          STEP {step.step}
                        </span>
                        {i < activeMode.diagram.length - 1 && (
                          <span className="hidden md:inline-block text-pearl/20 font-mono text-xs">→</span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-pearl leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate leading-relaxed">
                        {step.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom engineering note */}
          <div className="p-4 rounded-2xl bg-pearl/[0.02] border border-pearl/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mist">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">●</span>
              <span>All 3 platforms (FaRm, Left2Serve, MyMate) are stress-tested against these scenarios.</span>
            </div>
            <a
              href="#projects"
              className="text-pearl hover:underline font-medium inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore Projects Architecture</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
