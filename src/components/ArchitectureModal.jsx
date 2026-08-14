import { useState, useEffect } from 'react';
import { projectArchitectures } from '../data/architecture';

export default function ArchitectureModal({ projectTitle, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('blueprint');

  const archData = projectArchitectures[projectTitle];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !archData) return null;

  const tabs = [
    { id: 'blueprint', label: 'System Blueprint', icon: '🏛️' },
    { id: 'db', label: 'DB & Indexing', icon: '⚡' },
    { id: 'security', label: 'Security & Auth', icon: '🛡️' },
    { id: 'loadtest', label: 'Artillery Load Tests', icon: '📊' },
    { id: 'scenario', label: 'Fault Scenarios', icon: '🔥' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-obsidian/95 border border-pearl/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden z-10 my-4 sm:my-8 max-h-[92vh] flex flex-col">
        {/* Ambient Modal Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pearl/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-8 border-b border-pearl/10 relative z-10 shrink-0">
          <div className="min-w-0 flex-1 pr-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 sm:py-1 bg-pearl/10 text-pearl/80 rounded-full border border-pearl/10">
                System Design & Architecture
              </span>
            </div>
            <h3 id="arch-modal-title" className="text-lg sm:text-2xl font-bold text-pearl drop-shadow-sm truncate">
              {archData.title}
            </h3>
            <p className="text-slate text-[11px] sm:text-sm mt-0.5 sm:mt-1 truncate">{archData.tagline}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Architecture Modal"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-pearl/15 bg-pearl/[0.04] text-mist hover:text-pearl hover:border-pearl/30 hover:bg-pearl/10 flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 sm:px-8 py-2.5 sm:py-3 border-b border-pearl/10 bg-pearl/[0.02] shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-pearl text-black shadow-lg font-semibold'
                    : 'text-mist hover:text-pearl hover:bg-pearl/[0.05]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-8 overflow-y-auto relative z-10 space-y-6 flex-1">
          {/* TAB 1: BLUEPRINT & FLOW */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6 animate-fade-in">
              <p className="text-mist text-sm leading-relaxed">{archData.summary}</p>

              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate">
                  End-to-End Request & Data Flow
                </h4>
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-pearl/40 before:via-pearl/15 before:to-transparent">
                  {archData.systemFlow.map((step) => (
                    <div key={step.step} className="relative group">
                      {/* Node Bullet */}
                      <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border border-pearl/30 bg-obsidian text-pearl text-[10px] font-bold flex items-center justify-center group-hover:border-pearl group-hover:bg-pearl group-hover:text-black transition-all duration-300">
                        {step.step}
                      </div>

                      <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] hover:border-pearl/20 hover:bg-pearl/[0.04] transition-all duration-300">
                        <h5 className="text-sm font-semibold text-pearl flex items-center justify-between">
                          {step.title}
                        </h5>
                        <p className="text-mist text-xs leading-relaxed mt-1.5">{step.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {step.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-pearl/[0.06] border border-pearl/10 text-pearl/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DB & INDEXING */}
          {activeTab === 'db' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Database Engine</span>
                  <p className="text-base font-bold text-pearl mt-1">{archData.dbOptimization.engine}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Latency Optimization</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-rose-400 line-through">{archData.dbOptimization.beforeLatency}</span>
                    <span className="text-xs text-slate">→</span>
                    <span className="text-base font-bold text-emerald-400">{archData.dbOptimization.afterLatency}</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400">Total Latency Cut</span>
                  <p className="text-xl font-bold text-emerald-300 mt-0.5">
                    {archData.dbOptimization.improvementPercent} Faster
                  </p>
                </div>
              </div>

              {/* Index Code Block */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-slate">Applied Index Definition</span>
                <div className="p-4 rounded-2xl bg-black/70 border border-pearl/15 font-mono text-xs text-emerald-300 overflow-x-auto select-all">
                  <code>{archData.dbOptimization.indexDefinition}</code>
                </div>
              </div>

              {/* Rationale & Explanation */}
              <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                <h5 className="text-sm font-semibold text-pearl">Optimization Mechanics</h5>
                <p className="text-mist text-xs leading-relaxed">{archData.dbOptimization.details}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {archData.dbOptimization.metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-xl border border-pearl/10 bg-pearl/[0.02]">
                    <span className="text-[10px] text-slate block truncate">{m.label}</span>
                    <span className="text-xs font-semibold text-pearl block mt-1">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & AUTH */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                  <div className="flex items-center gap-2 text-pearl font-semibold text-sm">
                    <span>🔑</span> Authentication Protocol
                  </div>
                  <p className="text-mist text-xs leading-relaxed">{archData.security.auth}</p>
                </div>

                <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                  <div className="flex items-center gap-2 text-pearl font-semibold text-sm">
                    <span>🛡️</span> Authorization & RBAC
                  </div>
                  <p className="text-mist text-xs leading-relaxed">{archData.security.rbac}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-3">
                <h5 className="text-sm font-semibold text-pearl flex items-center gap-2">
                  <span>🔒</span> Protective Middleware Pipeline
                </h5>
                <div className="grid sm:grid-cols-2 gap-2">
                  {archData.security.middleware.map((m) => (
                    <div
                      key={m}
                      className="flex items-center gap-2 text-xs text-mist bg-pearl/[0.03] border border-pearl/10 rounded-xl p-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ARTILLERY LOAD TESTS */}
          {activeTab === 'loadtest' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Load Tool</span>
                  <p className="text-sm font-bold text-pearl mt-1">{archData.loadTesting.tool}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Concurrency / RPS</span>
                  <p className="text-sm font-bold text-pearl mt-1">{archData.loadTesting.concurrency}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Latency (p95)</span>
                  <p className="text-sm font-bold text-emerald-400 mt-1">{archData.loadTesting.p95Latency}</p>
                </div>
                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400">Error Rate</span>
                  <p className="text-sm font-bold text-emerald-300 mt-1">{archData.loadTesting.errorRate}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                <h5 className="text-sm font-semibold text-pearl">Benchmark Summary & Resilience</h5>
                <p className="text-mist text-xs leading-relaxed">{archData.loadTesting.summary}</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] text-xs text-mist">
                <span>Total Stress Tested Requests</span>
                <span className="font-semibold text-pearl font-mono">{archData.loadTesting.totalRequests}</span>
              </div>
            </div>
          )}

          {/* TAB 5: FAULT SCENARIO & RECOVERY */}
          {activeTab === 'scenario' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-3xl border border-pearl/15 bg-pearl/[0.02] space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                    Real-World Production Case Study
                  </span>
                </div>
                <h4 className="text-lg font-bold text-pearl">
                  {archData.scenario?.title || 'Production Fault Tolerance'}
                </h4>
                <p className="text-mist text-sm leading-relaxed">
                  {archData.scenario?.summary}
                </p>

                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 block">
                    Core Architectural Recovery Mechanism
                  </span>
                  <p className="text-pearl text-xs font-mono font-semibold">
                    {archData.scenario?.recoveryKey}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-pearl/10 bg-pearl/[0.02] flex items-center justify-between text-xs text-slate">
          <span>Engineered with production-first resilience</span>
          <button
            onClick={onClose}
            className="btn-outline !py-1.5 !px-4 text-xs font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
