import { useState, useEffect, useRef } from 'react';
import InteractiveTopology from './InteractiveTopology';
import SlaMathCalculator from './SlaMathCalculator';
import TradeOffMatrix from './TradeOffMatrix';

const LAB_TABS = [
  {
    id: 'topology',
    label: 'Distributed Topology Tracer',
    icon: '⚡',
    badge: 'Real-Time Packet Flow',
    description: 'Inspect multi-node packet hops, sub-millisecond feature store latencies, and circuit breaker recovery notes.',
  },
  {
    id: 'sla',
    label: 'SLA & Latency Math Simulator',
    icon: '⏱️',
    badge: 'Interactive Calculus',
    description: 'Tune streaming rates, worker concurrency, and neural surrogate vs. exact CP-SAT solvers to calculate live p50/p95/p99 curves.',
  },
  {
    id: 'tradeoff',
    label: 'PACELC & Architectural Trade-Offs',
    icon: '⚖️',
    badge: 'Systems Decisions',
    description: 'Analysis of engineering compromises: why specific patterns were chosen, what was rejected, and fault-tolerance guarantees.',
  },
];

export default function SystemLab() {
  const [activeTab, setActiveTab] = useState('topology');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale')
              .forEach((el) => {
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
    <section ref={sectionRef} id="systems-lab" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow ambient-glow-accent1 w-[500px] h-[500px] top-1/4 -left-40 opacity-10 animate-float-slow pointer-events-none" />
      <div className="ambient-glow ambient-glow-accent2 w-[400px] h-[400px] bottom-10 right-0 opacity-10 animate-glow-pulse pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="reveal-on-scroll inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive Telemetry & Sandbox</span>
          </div>

          <h2 className="reveal-on-scroll section-title text-pearl mt-2">
            Systems Architecture & <span className="text-gradient-accent">Telemetry Lab</span>
          </h2>

          <p className="reveal-on-scroll text-mist text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Hands-on systems engineering simulators. Trace live Kafka packet hops, calculate mathematical SLA latency bounds, and inspect PACELC distributed trade-off decisions.
          </p>

          {/* Mode Selector Tabs */}
          <div className="reveal-scale flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-pearl/[0.03] border border-pearl/10 max-w-2xl mx-auto">
            {LAB_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-pearl text-obsidian shadow-lg font-bold scale-[1.02]'
                      : 'text-mist hover:text-pearl hover:bg-pearl/[0.05]'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Sandbox Container */}
        <div className="reveal-on-scroll card-morph-border p-4 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          {/* Active Tab Explainer Header */}
          <div className="mb-6 pb-4 border-b border-pearl/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400">
                  {LAB_TABS.find((t) => t.id === activeTab)?.badge}
                </span>
              </div>
              <p className="text-xs text-mist mt-1 max-w-2xl">
                {LAB_TABS.find((t) => t.id === activeTab)?.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Interactive Model Active</span>
            </div>
          </div>

          {/* Render Active Component */}
          <div className="animate-fade-in">
            {activeTab === 'topology' && <InteractiveTopology />}
            {activeTab === 'sla' && <SlaMathCalculator />}
            {activeTab === 'tradeoff' && <TradeOffMatrix />}
          </div>
        </div>
      </div>
    </section>
  );
}
