import { useState, useEffect } from 'react';
import { projectArchitectures } from '../data/architecture';

const TERMINAL_OUTPUTS = {
  APEX: [
    { text: '$ apex stream --topic telemetry.car44 --rate 60hz --eval-safety', type: 'cmd' },
    { text: '[KAFKA] Connected to broker:9092. Subscribed to telemetry.car44 (partition 2)', type: 'info' },
    { text: '[FEATURE_STORE] Ingestion rate: 66,800 ops/sec | p99 latency: 0.0245ms', type: 'success' },
    { text: '[TYRE_MODEL] MAE: 0.342s/lap | Grip level: 64.2% | Wear slope: 0.12%/lap', type: 'info' },
    { text: '[SAFE_RL] Action proposed: "Soft Slick (Lap 38)" -> ActionMaskGuardrail: VETO (Rain: 94%)', type: 'warn' },
    { text: '[SAFE_RL] Action adjusted: "Intermediate Compound (Lap 39)" -> Status: APPROVED (Safety: 1.00)', type: 'success' },
    { text: '[CONSENSUS] 5/5 Agents aligned: Race Strategist, Tyre Engineer, Weather, Aero, Chief.', type: 'success' },
    { text: '[THREEJS] WebGL 60FPS digital twin updated. Simulation completed with 0 errors.', type: 'info' },
  ],
  'ORBIT-X': [
    { text: '$ orbitx solve --targets 24 --constellation 12 --method cp-sat', type: 'cmd' },
    { text: '[ORBIT-X] Propagating 12 LEO orbits via WGS-84 J2 Keplerian equations (34.2k sats/sec)...', type: 'info' },
    { text: '[NEURAL] Multi-Head Cross-Attention inference: 0.74ms (100% P4/P5 emergency bid)', type: 'success' },
    { text: '[CP-SAT] Google OR-Tools exact solver started. Variables: 864 | Constraints: 1,420', type: 'info' },
    { text: '[CP-SAT] Status: OPTIMAL found in 3.42ms. Objective value: 98.4% efficiency.', type: 'success' },
    { text: '[THERMAL] Stefan-Boltzmann check: Peak temp 42.1°C (Within +/- 0.5K tolerance).', type: 'info' },
    { text: '[ISL_MESH] Laser cross-link routing confirmed. 55/55 PyTest tests passed.', type: 'success' },
  ],
  EdgeGuard: [
    { text: '$ edgeguard monitor --ewma-predict --simulate-wan-drop', type: 'cmd' },
    { text: '[EWMA] Metric telemetry stream active. Calculating exponential trend (alpha=0.30)...', type: 'info' },
    { text: '[ALERT] Disk inode exhaustion projected in 5h 42m (Target: /var/log/syslog).', type: 'warn' },
    { text: '[EDA] Event-Driven Ansible rulebook triggered: rulebooks/remediation.yml', type: 'info' },
    { text: '[SECURITY] ALLOWED_PLAYBOOKS validation: "disk_cleanup.yml" [AUTHORIZED]', type: 'success' },
    { text: '[PLAYBOOK] Executing idempotent remediation... Status: changed=0, failed=0, ok=4.', type: 'success' },
    { text: '[WAN_DROP] Simulating 4h connection loss -> Spooled 1,420 events to SQLite WAL.', type: 'warn' },
    { text: '[RECONNECT] Replaying spool buffer with UUID idempotency -> 0 duplicates committed.', type: 'success' },
  ],
  HyperDeploy: [
    { text: '$ hyperdeploy rollout --app payment-service --image sha256:7f9a88c...', type: 'cmd' },
    { text: '[COSIGN] Verifying cryptographic signature against Rekor transparency log...', type: 'info' },
    { text: '[COSIGN] Status: VERIFIED (Signed by release-signer key)', type: 'success' },
    { text: '[K8S] Deploying Canary Pods (20% traffic split)...', type: 'info' },
    { text: '[HEALTH_GATE] Warning: CrashLoopBackOff detected in pod/payment-v2-d87f', type: 'warn' },
    { text: '[RECOVERY] Readiness threshold breached (>2 retries). Initiating Auto-Rollback!', type: 'warn' },
    { text: '[ROLLBACK] Reverted deployment to revision 14 (payment-service:v1.9.4) in 2.74s.', type: 'success' },
    { text: '[GITOPS] Auto-healing complete. Zero customer-facing downtime observed.', type: 'success' },
  ],
  FaRm: [
    { text: '$ farm db --benchmark-ixscan', type: 'cmd' },
    { text: '[COLLSCAN] Query: { category: "Organic", price: { $lte: 50 }, createdAt: { $gte: ... } }', type: 'info' },
    { text: '[COLLSCAN] Execution time: 242.4ms | Docs scanned: 48,200 | Returned: 12', type: 'warn' },
    { text: '[INDEX] Applied Compound B-Tree Index: { category: 1, price: 1, createdAt: -1 }', type: 'info' },
    { text: '[IXSCAN] Execution time: 11.8ms | Keys examined: 12 | Docs examined: 12', type: 'success' },
    { text: '[RESULT] Query latency reduced by 95.1% under 200 concurrent users.', type: 'success' },
  ],
  Left2Serve: [
    { text: '$ left2serve test --concurrency 200 --duration 60s', type: 'cmd' },
    { text: '[ARTILLERY] Launching 19,420 requests across 200 virtual concurrent users...', type: 'info' },
    { text: '[INDEX] PostgreSQL B-Tree Index: (status, pickup_window, location_id)', type: 'info' },
    { text: '[METRICS] Peak RPS: 187 req/sec | p95 Latency: 12.4ms (down from 340ms) | Errors: 0.00%', type: 'success' },
    { text: '[ACID] Row-level locking (FOR UPDATE) resolved all double-claim race conditions.', type: 'success' },
  ],
  MyMate: [
    { text: '$ mymate stream --geospatial-match', type: 'cmd' },
    { text: '[GEO] 2dsphere index: findNearestDrivers(coords: [12.9716, 77.5946], radius: 5000m)', type: 'info' },
    { text: '[GEO] Query latency: 0.84ms | Drivers located: 8 within 2.5km radius.', type: 'success' },
    { text: '[SOCKET] Bi-directional telemetry broadcast to room:ride_7721', type: 'info' },
    { text: '[MUTEX] Atomic lock acquired for driver accept state -> 0 race conditions.', type: 'success' },
  ],
};

export default function ArchitectureModal({ projectTitle, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('blueprint');
  const [copiedLog, setCopiedLog] = useState(false);

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
    { id: 'db', label: 'DB & Indexing / AI', icon: '⚡' },
    { id: 'security', label: 'Security & Auth', icon: '🛡️' },
    { id: 'loadtest', label: 'Benchmarks & Testing', icon: '📊' },
    { id: 'scenario', label: 'Fault Scenarios', icon: '🔥' },
    { id: 'terminal', label: 'Live CLI & Telemetry', icon: '💻' },
  ];

  const terminalLines = TERMINAL_OUTPUTS[projectTitle] || TERMINAL_OUTPUTS.FaRm;

  const handleCopyLogs = () => {
    const raw = terminalLines.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(raw);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

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
                    ? 'bg-pearl text-obsidian shadow-lg font-semibold'
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
                      <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border border-pearl/30 bg-obsidian text-pearl text-[10px] font-bold flex items-center justify-center group-hover:border-pearl group-hover:bg-pearl group-hover:text-obsidian transition-all duration-300">
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
                  <span className="text-[10px] uppercase tracking-wider text-slate">Database / Optimization</span>
                  <p className="text-base font-bold text-pearl mt-1">{archData.dbOptimization.engine}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Latency Profile</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-rose-400 line-through">{archData.dbOptimization.beforeLatency}</span>
                    <span className="text-xs text-slate">→</span>
                    <span className="text-base font-bold text-emerald-400">{archData.dbOptimization.afterLatency}</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400">Improvement / Agreement</span>
                  <p className="text-xl font-bold text-emerald-300 mt-0.5">
                    {archData.dbOptimization.improvementPercent}
                  </p>
                </div>
              </div>

              {/* Index Code Block */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-slate">Applied Index / Model Definition</span>
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

          {/* TAB 4: BENCHMARKS & TESTING */}
          {activeTab === 'loadtest' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Framework / Harness</span>
                  <p className="text-sm font-bold text-pearl mt-1">{archData.loadTesting.tool}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Scale / Concurrency</span>
                  <p className="text-sm font-bold text-pearl mt-1">{archData.loadTesting.concurrency}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Latency / Speed SLA</span>
                  <p className="text-sm font-bold text-emerald-400 mt-1">{archData.loadTesting.p95Latency}</p>
                </div>
                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400">Error / DNF Rate</span>
                  <p className="text-sm font-bold text-emerald-300 mt-1">{archData.loadTesting.errorRate}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                <h5 className="text-sm font-semibold text-pearl">Benchmark Summary & Resilience</h5>
                <p className="text-mist text-xs leading-relaxed">{archData.loadTesting.summary}</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] text-xs text-mist">
                <span>Total Benchmark Scenarios / Tests Executed</span>
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

          {/* TAB 6: LIVE CLI & TELEMETRY */}
          {activeTab === 'terminal' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate ml-2">
                    {projectTitle.toLowerCase()}-telemetry-node
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyLogs}
                  className="text-[11px] font-mono text-mist hover:text-pearl px-2.5 py-1 rounded-lg bg-pearl/[0.04] border border-pearl/10 hover:border-pearl/20 transition-all duration-300 cursor-pointer"
                >
                  {copiedLog ? '✓ Copied' : 'Copy Output'}
                </button>
              </div>

              {/* Terminal Window */}
              <div className="p-5 rounded-2xl bg-slate-950 text-slate-100 border border-pearl/15 font-mono text-xs space-y-2 select-all overflow-x-auto shadow-inner">
                {terminalLines.map((line, idx) => {
                  let colorClass = 'text-slate-300';
                  if (line.type === 'cmd') colorClass = 'text-cyan-400 font-bold';
                  if (line.type === 'success') colorClass = 'text-emerald-400';
                  if (line.type === 'warn') colorClass = 'text-amber-400';
                  if (line.type === 'info') colorClass = 'text-slate-200';

                  return (
                    <div key={idx} className={`${colorClass} leading-relaxed`}>
                      {line.text}
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl border border-pearl/10 bg-pearl/[0.02] text-xs text-mist flex items-center justify-between">
                <span className="text-[11px]">Simulated live telemetry output from verified tests & benchmarks</span>
                <span className="text-emerald-400 font-mono font-bold text-[10px]">STATUS: OK</span>
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
