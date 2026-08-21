import { useState, useEffect } from 'react';

const TOPOLOGY_PRESETS = {
  apex: {
    id: 'apex',
    title: 'APEX: 60Hz Kafka Streaming & 5-Agent Pit Wall',
    badge: 'Distributed AI Streaming',
    nodes: [
      { id: 'n1', label: 'FastF1 / Jolpica', sub: '60Hz Telemetry Stream', type: 'ingress', icon: '🏎️', latency: '0.1ms' },
      { id: 'n2', label: 'Apache Kafka', sub: 'session_id:car_id Partitions', type: 'broker', icon: '⚡', latency: '0.02ms' },
      { id: 'n3', label: 'Ring Buffer Store', sub: '0.0245ms p99 Feature Cache', type: 'feature', icon: '🧠', latency: '0.0245ms' },
      { id: 'n4', label: '5-Agent Consensus', sub: 'TreeSHAP & Safe RL Masking', type: 'ai', icon: '👥', latency: '0.45ms' },
      { id: 'n5', label: 'BullMQ & Redis', sub: '10k Async Monte Carlo Jobs', type: 'queue', icon: '📊', latency: '1.2ms' },
      { id: 'n6', label: 'Three.js Digital Twin', sub: 'WebGL 60FPS HUD & WebXR', type: 'egress', icon: '🌐', latency: '16.6ms' },
    ],
    liveMetrics: {
      throughput: '66,800 ops/sec',
      p99Latency: '0.0245 ms',
      errorRate: '0.000%',
      activeStreams: '20 Cars @ 60Hz',
    },
    recoveryNote: 'Safe RL ActionMaskGuardrail automatically vetoes invalid compound actions during sudden monsoon weather shifts.',
  },
  orbitx: {
    id: 'orbitx',
    title: 'ORBIT-X: CP-SAT Constraint Solver & Neural Surrogates',
    badge: 'Space AI & Optimization',
    nodes: [
      { id: 'n1', label: 'Target Ingress', sub: 'Multi-Hazard Disaster Points', type: 'ingress', icon: '🛰️', latency: '0.5ms' },
      { id: 'n2', label: 'WGS-84 J2 ODEs', sub: 'Keplerian Orbit Propagator', type: 'broker', icon: '🌍', latency: '0.03ms' },
      { id: 'n3', label: 'Cross-Attention Net', sub: 'PyTorch Surrogate Edge Valuation', type: 'ai', icon: '✨', latency: '< 0.8ms' },
      { id: 'n4', label: 'Google CP-SAT', sub: 'Exact Constraint Optimization', type: 'feature', icon: '📐', latency: '3.4ms' },
      { id: 'n5', label: 'Stefan-Boltzmann', sub: 'Thermal & Battery SoC Guard', type: 'queue', icon: '🔋', latency: '0.1ms' },
      { id: 'n6', label: 'Laser Mesh ISL', sub: 'Downlink Ground Station Mesh', type: 'egress', icon: '📡', latency: '12ms' },
    ],
    liveMetrics: {
      throughput: '34,200 sats/sec',
      p99Latency: '< 0.80 ms',
      errorRate: '0.000%',
      activeStreams: '100% P4/P5 Delivered',
    },
    recoveryNote: 'Isolation Forest AI detects anomalous battery degradation and safely shifts mission payloads to adjacent satellites.',
  },
  hyperdeploy: {
    id: 'hyperdeploy',
    title: 'HyperDeploy & EdgeGuard: GitOps & EDA Self-Healing',
    badge: 'Cloud-Native Resilience',
    nodes: [
      { id: 'n1', label: 'GitOps Webhook', sub: 'Signed Image Release', type: 'ingress', icon: '🐙', latency: '1.2ms' },
      { id: 'n2', label: 'Sigstore / Cosign', sub: 'Cryptographic SHA-256 Digest', type: 'broker', icon: '🔐', latency: '8.4ms' },
      { id: 'n3', label: 'Health-Gated Rollout', sub: 'CrashLoopBackOff Poller', type: 'feature', icon: '🛡️', latency: '5.0s' },
      { id: 'n4', label: 'Auto-Rollback Hub', sub: 'Single-Function Rollback (<3s)', type: 'ai', icon: '⚡', latency: '< 3.0s' },
      { id: 'n5', label: 'EDA EventBus', sub: 'Red Hat ansible-rulebook', type: 'queue', icon: '📜', latency: '14ms' },
      { id: 'n6', label: 'Ansible Idempotence', sub: 'changed=0 Target Node State', type: 'egress', icon: '🖥️', latency: '180ms' },
    ],
    liveMetrics: {
      throughput: '100% Signed Releases',
      p99Latency: '2.8s Rollback SLA',
      errorRate: '0.000%',
      activeStreams: '6hr EWMA Forecasting',
    },
    recoveryNote: 'Offline SQLite WAL spooling buffers metrics locally during WAN dropouts and replays with UUID deduplication upon reconnect.',
  },
};

export default function InteractiveTopology() {
  const [activePresetKey, setActivePresetKey] = useState('apex');
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [packetTick, setPacketTick] = useState(0);

  const preset = TOPOLOGY_PRESETS[activePresetKey];

  // Packet animation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketTick((prev) => (prev + 1) % 6);
    }, 1400);
    return () => clearInterval(timer);
  }, [activePresetKey]);

  return (
    <div className="space-y-6">
      {/* Preset Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-pearl/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Live Interactive Topology Visualizer
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-pearl/[0.03] border border-pearl/10">
          {Object.values(TOPOLOGY_PRESETS).map((p) => {
            const isSelected = activePresetKey === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActivePresetKey(p.id);
                  setActiveNodeIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-pearl text-obsidian shadow-md font-bold'
                    : 'text-mist hover:text-pearl hover:bg-pearl/[0.06]'
                }`}
              >
                <span>{p.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Metrics Ticker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl border border-pearl/10 bg-pearl/[0.02]">
          <span className="text-[10px] uppercase font-mono text-slate block">Throughput</span>
          <span className="text-xs font-bold text-emerald-400 font-mono block mt-0.5">{preset.liveMetrics.throughput}</span>
        </div>
        <div className="p-3 rounded-xl border border-pearl/10 bg-pearl/[0.02]">
          <span className="text-[10px] uppercase font-mono text-slate block">p99 Latency SLA</span>
          <span className="text-xs font-bold text-emerald-300 font-mono block mt-0.5">{preset.liveMetrics.p99Latency}</span>
        </div>
        <div className="p-3 rounded-xl border border-pearl/10 bg-pearl/[0.02]">
          <span className="text-[10px] uppercase font-mono text-slate block">Error Rate</span>
          <span className="text-xs font-bold text-pearl font-mono block mt-0.5">{preset.liveMetrics.errorRate}</span>
        </div>
        <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <span className="text-[10px] uppercase font-mono text-emerald-400 block">Stream Guarantees</span>
          <span className="text-xs font-bold text-emerald-300 font-mono block mt-0.5">{preset.liveMetrics.activeStreams}</span>
        </div>
      </div>

      {/* Visual Topology Pipeline */}
      <div className="relative p-6 rounded-2xl border border-pearl/10 bg-pearl/[0.03] overflow-x-auto">
        <div className="min-w-[640px] flex items-center justify-between relative">
          {/* Animated Connecting Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-pearl/15 z-0" />
          <div
            className="absolute h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 transition-all duration-700 z-0"
            style={{
              left: '24px',
              width: `${(packetTick / (preset.nodes.length - 1)) * 92}%`,
            }}
          />

          {/* Node Elements */}
          {preset.nodes.map((node, idx) => {
            const isActive = packetTick === idx;
            const isSelected = activeNodeIndex === idx;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeIndex(idx)}
                className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {/* Node Orb */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg transition-all duration-300 border backdrop-blur-md ${
                    isActive
                      ? 'bg-emerald-400 text-obsidian border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.6)]'
                      : isSelected
                      ? 'bg-pearl text-obsidian border-pearl shadow-lg'
                      : 'bg-obsidian text-pearl border-pearl/20 hover:border-pearl/40'
                  }`}
                >
                  <span>{node.icon}</span>
                </div>

                {/* Node Label */}
                <div className="mt-2.5 text-center max-w-[100px]">
                  <span className="text-[11px] font-bold text-pearl block leading-tight truncate">
                    {node.label}
                  </span>
                  <span className="text-[9px] font-mono text-slate block mt-0.5 truncate">
                    {node.latency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep Dive Inspector */}
      {preset.nodes[activeNodeIndex] && (
        <div className="p-4 rounded-2xl border border-pearl/15 bg-pearl/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pearl/10 border border-pearl/15 flex items-center justify-center text-xl shrink-0">
              {preset.nodes[activeNodeIndex].icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-pearl">
                  {preset.nodes[activeNodeIndex].label}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {preset.nodes[activeNodeIndex].latency} SLA
                </span>
              </div>
              <p className="text-xs text-mist mt-0.5">{preset.nodes[activeNodeIndex].sub}</p>
            </div>
          </div>

          <div className="text-xs text-slate font-mono bg-pearl/[0.04] px-3 py-1.5 rounded-xl border border-pearl/10 shrink-0">
            Node {activeNodeIndex + 1} of {preset.nodes.length}
          </div>
        </div>
      )}

      {/* Resilience Highlight */}
      <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-mist flex items-center gap-2">
        <span className="text-emerald-400">🛡️</span>
        <span className="text-pearl font-medium">{preset.recoveryNote}</span>
      </div>
    </div>
  );
}
