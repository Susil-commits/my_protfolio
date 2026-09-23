import { useState } from 'react';

const TRADEOFF_DATA = [
  {
    id: 'apex',
    title: 'APEX (F1 Intelligence)',
    focus: 'Real-Time Streaming & Safe RL Masking',
    tradeoff: 'Optimality vs Ingestion SLA',
    choice: 'Sub-millisecond Action Masking with 5-Agent Consensus',
    rejected: 'Unconstrained Deep RL or pure heuristic lookup',
    why: 'Pure RL causes catastrophic crashes in extreme weather; heuristics lose 0.4s/lap. Safe RL ensures 100% legal compound selection while keeping p95 < 1.4ms.',
    concurrency: 'BullMQ partitioned queues + Redis atomic feature caching',
    pacelc: 'PC/EC (Consistent state over partition, low-latency execution)',
    resilience: 'Fallback to heuristic tire model on agent timeout (<50ms threshold)',
  },
  {
    id: 'veritas',
    title: 'Veritas (AI Socratic Math Tutor)',
    focus: 'Anti-Leak Guardrails & Knowledge Tracing',
    tradeoff: 'Direct Answer Generation vs Guided Socratic Scaffolding',
    choice: 'LangGraph Multi-Agent State Machine + Deterministic Math Evaluator & Anti-Leak Shield',
    rejected: 'Raw unconstrained LLM completion or single prompt generation',
    why: 'Standard LLMs dump direct answers immediately, bypassing learning struggle. Veritas enforces zero answer leakage with secondary verification and weighted Bayesian updates.',
    concurrency: 'FastAPI async streaming (SSE) with dual RAM / Redis session management',
    pacelc: 'PC/EC (Consistent pedagogical session state and reliable knowledge tracing)',
    resilience: 'Fallback to cached misconception templates and deterministic algebra evaluator upon LLM latency spike',
  },
  {
    id: 'pms',
    title: 'Predictive Maintenance (Industrial ML)',
    focus: 'Calibrated Risk & Telemetry Drift Monitoring',
    tradeoff: 'Default Thresholding on Imbalanced Data vs Calibrated Probability Estimation',
    choice: 'CalibratedClassifierCV (Platt Sigmoid Scaling) + PR Threshold Tuning (0.2619)',
    rejected: 'Raw uncalibrated XGBoost with default 0.50 decision cutoff',
    why: 'In severe 28:1 class imbalance, uncalibrated scores distort true risk. Platt scaling cuts Brier score error by 62.9% (0.0638 -> 0.0237), making probabilities actionable for operations.',
    concurrency: 'FastAPI async inference pipeline with slowapi rate-limiting (60 req/min)',
    pacelc: 'PA/EL (High availability on real-time sensor streams, low latency inference)',
    resilience: 'Population Stability Index (PSI >= 0.25) alerts trigger automated retraining and hot-reload',
  },
  {
    id: 'farm',
    title: 'FaRm (Smart Agriculture)',
    focus: 'High-Volume Query Latency & Sensor Ingestion',
    tradeoff: 'Write Overhead vs Read Acceleration',
    choice: 'MongoDB Compound B-Tree indexes + aggregation pipeline projections',
    rejected: 'Unindexed collection scans ($collscan) and in-memory JS sorting',
    why: 'Cut p95 read latency by 95% (~240ms down to ~12ms), maintaining 60+ FPS responsive analytics across 50,000+ simulated soil sensor readings.',
    concurrency: 'MongoDB WiredTiger document-level concurrency & MVCC',
    pacelc: 'PA/EC (Eventual consistency for sensor logs, low-latency analytics)',
    resilience: 'Graceful aggregation degradation with fallback caching layer',
  },
];

export default function TradeOffMatrix() {
  const [selectedId, setSelectedId] = useState('apex');
  const active = TRADEOFF_DATA.find((item) => item.id === selectedId) || TRADEOFF_DATA[0];

  return (
    <div className="p-6 rounded-3xl border border-pearl/10 bg-pearl/[0.02] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-pearl/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Distributed Systems Engineering & PACELC Trade-Off Matrix
            </span>
          </div>
          <p className="text-xs text-mist mt-1">
            Real architectural decisions, discarded alternatives, and failure recovery trade-offs.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-pearl/[0.03] border border-pearl/10">
          {TRADEOFF_DATA.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-pearl text-obsidian shadow-md font-bold'
                    : 'text-mist hover:text-pearl hover:bg-pearl/[0.06]'
                }`}
              >
                {item.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Decision & Rationale */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {active.focus}
            </span>
            <span className="text-xs text-slate font-mono">{active.title}</span>
          </div>

          {/* Primary Trade-Off Statement */}
          <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-slate font-mono block">
              Core Engineering Dilemma
            </span>
            <h4 className="text-base font-bold text-pearl leading-snug">
              {active.tradeoff}
            </h4>
            <div className="mt-3 grid sm:grid-cols-2 gap-3 pt-2 border-t border-pearl/10">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                  ✓ Chosen Architecture
                </span>
                <p className="text-pearl font-medium leading-relaxed">{active.choice}</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                  ✗ Rejected Alternative
                </span>
                <p className="text-mist leading-relaxed">{active.rejected}</p>
              </div>
            </div>
          </div>

          {/* Rationale & Defense */}
          <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-slate font-mono block">
              Technical Rationale & Defense
            </span>
            <p className="text-xs sm:text-sm text-mist leading-relaxed">
              {active.why}
            </p>
          </div>
        </div>

        {/* Right Column: PACELC, Concurrency & Failover */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                PACELC Classification
              </span>
              <span className="text-xs font-mono font-bold text-pearl">{active.pacelc.split(' ')[0]}</span>
            </div>
            <p className="text-xs text-mist leading-relaxed">
              {active.pacelc}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-slate block">
              Concurrency & Lock Model
            </span>
            <p className="text-xs text-pearl font-mono leading-relaxed">
              {active.concurrency}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block">
              Resilience & Failover Boundary
            </span>
            <p className="text-xs text-mist leading-relaxed">
              {active.resilience}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
