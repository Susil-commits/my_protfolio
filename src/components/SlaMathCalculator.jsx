import { useState, useMemo } from 'react';

export default function SlaMathCalculator() {
  const [ingestRate, setIngestRate] = useState(60); // Hz
  const [activeWorkers, setActiveWorkers] = useState(8);
  const [solverMode, setSolverMode] = useState('surrogate'); // 'surrogate' (PyTorch) or 'exact' (CP-SAT)
  const [compression, setCompression] = useState('snappy'); // 'none', 'snappy', 'zstd'
  const [batchSize] = useState(32);

  const stats = useMemo(() => {
    // Compression factor
    const compFactor = compression === 'zstd' ? 0.35 : compression === 'snappy' ? 0.55 : 1.0;
    const rawBandwidthPerSec = (ingestRate * 128 * 4.2) / 1024; // KB/s per sensor car/node
    const netBandwidth = (rawBandwidthPerSec * compFactor).toFixed(2);

    // Latency math in milliseconds
    const tIngest = 0.0245 * (60 / Math.max(10, ingestRate)); // Kafka partition fetch
    const tFeature = 0.12 * (32 / Math.max(8, batchSize)); // Redis feature store read
    const tSolver = solverMode === 'surrogate' ? 0.78 : 14.2; // Neural surrogate vs CP-SAT
    const tConsensus = 0.45 * (8 / Math.max(2, activeWorkers)); // 5-agent deliberation

    const p50 = (tIngest + tFeature + tSolver * 0.85 + tConsensus * 0.8).toFixed(3);
    const p95 = (tIngest * 1.3 + tFeature * 1.2 + tSolver + tConsensus * 1.15).toFixed(3);
    const p99 = (tIngest * 1.8 + tFeature * 1.6 + tSolver * 1.25 + tConsensus * 1.4).toFixed(3);

    const throughputOps = Math.round((ingestRate * activeWorkers * (100 / (solverMode === 'surrogate' ? 1.2 : 18))) * 10);
    const memoryPerWorkerMB = Math.round(14.5 + (batchSize * 0.45));

    return {
      netBandwidth,
      p50,
      p95,
      p99,
      tIngest: tIngest.toFixed(3),
      tFeature: tFeature.toFixed(3),
      tSolver: tSolver.toFixed(3),
      tConsensus: tConsensus.toFixed(3),
      throughputOps: throughputOps.toLocaleString(),
      memoryPerWorkerMB,
    };
  }, [ingestRate, activeWorkers, solverMode, compression, batchSize]);

  return (
    <div className="p-6 rounded-3xl border border-pearl/10 bg-pearl/[0.02] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-pearl/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Interactive SLA & Latency Breakdown Simulator
            </span>
          </div>
          <p className="text-xs text-mist mt-1">
            Simulate parameter tuning across streaming pipelines, neural surrogates, and exact constraint solvers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIngestRate(60);
              setActiveWorkers(8);
              setSolverMode('surrogate');
              setCompression('snappy');
            }}
            className="text-[11px] font-mono text-mist hover:text-pearl px-2.5 py-1 rounded-lg bg-pearl/[0.04] border border-pearl/10 hover:border-pearl/20 transition-all cursor-pointer"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Control Sliders Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Control 1: Ingest Frequency */}
        <div className="p-3.5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-pearl">Ingest Rate</span>
            <span className="font-mono text-cyan-400 font-bold">{ingestRate} Hz</span>
          </div>
          <input
            type="range"
            min="10"
            max="240"
            step="10"
            value={ingestRate}
            onChange={(e) => setIngestRate(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-pearl/10 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate font-mono">
            <span>10 Hz (IoT)</span>
            <span>60 Hz (F1)</span>
            <span>240 Hz</span>
          </div>
        </div>

        {/* Control 2: Active Worker Pools */}
        <div className="p-3.5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-pearl">Worker Threads</span>
            <span className="font-mono text-cyan-400 font-bold">{activeWorkers} Cores</span>
          </div>
          <input
            type="range"
            min="2"
            max="32"
            step="2"
            value={activeWorkers}
            onChange={(e) => setActiveWorkers(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-pearl/10 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate font-mono">
            <span>2 Cores</span>
            <span>8 (Standard)</span>
            <span>32 Cores</span>
          </div>
        </div>

        {/* Control 3: Solver Strategy */}
        <div className="p-3.5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-pearl">Decision Engine</span>
            <span className="font-mono text-cyan-400 font-bold text-[10px]">
              {solverMode === 'surrogate' ? 'Neural (<1ms)' : 'Exact (CP-SAT)'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 p-0.5 rounded-xl bg-pearl/[0.05] border border-pearl/10 text-[11px]">
            <button
              type="button"
              onClick={() => setSolverMode('surrogate')}
              className={`py-1 rounded-lg font-medium transition-all cursor-pointer ${
                solverMode === 'surrogate' ? 'bg-pearl text-obsidian font-bold shadow-sm' : 'text-mist'
              }`}
            >
              Surrogate
            </button>
            <button
              type="button"
              onClick={() => setSolverMode('exact')}
              className={`py-1 rounded-lg font-medium transition-all cursor-pointer ${
                solverMode === 'exact' ? 'bg-pearl text-obsidian font-bold shadow-sm' : 'text-mist'
              }`}
            >
              Exact Solver
            </button>
          </div>
        </div>

        {/* Control 4: Serialization Compression */}
        <div className="p-3.5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-pearl">Wire Framing</span>
            <span className="font-mono text-cyan-400 font-bold uppercase text-[10px]">{compression}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-0.5 rounded-xl bg-pearl/[0.05] border border-pearl/10 text-[10px]">
            {['none', 'snappy', 'zstd'].map((comp) => (
              <button
                key={comp}
                type="button"
                onClick={() => setCompression(comp)}
                className={`py-1 rounded-lg uppercase font-mono transition-all cursor-pointer ${
                  compression === comp ? 'bg-pearl text-obsidian font-bold shadow-sm' : 'text-mist'
                }`}
              >
                {comp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Mathematical Latency Breakdown */}
      <div className="grid lg:grid-cols-12 gap-5">
        {/* Latency Pipeline Bar */}
        <div className="lg:col-span-7 p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-pearl">Stage-by-Stage Latency Decomposition</span>
            <span className="text-xs font-mono font-bold text-emerald-400">p95: {stats.p95} ms</span>
          </div>

          {/* Breakdown progress bar */}
          <div className="h-3 rounded-full overflow-hidden bg-pearl/10 flex">
            <div
              style={{ width: `${Math.max(10, (Number(stats.tIngest) / Number(stats.p95)) * 100)}%` }}
              className="bg-cyan-500 h-full transition-all duration-500"
              title={`Ingress: ${stats.tIngest}ms`}
            />
            <div
              style={{ width: `${Math.max(10, (Number(stats.tFeature) / Number(stats.p95)) * 100)}%` }}
              className="bg-blue-500 h-full transition-all duration-500"
              title={`Feature Store: ${stats.tFeature}ms`}
            />
            <div
              style={{ width: `${Math.max(25, (Number(stats.tSolver) / Number(stats.p95)) * 100)}%` }}
              className="bg-purple-500 h-full transition-all duration-500"
              title={`Inference / Solver: ${stats.tSolver}ms`}
            />
            <div
              style={{ width: `${Math.max(10, (Number(stats.tConsensus) / Number(stats.p95)) * 100)}%` }}
              className="bg-emerald-500 h-full transition-all duration-500"
              title={`Consensus: ${stats.tConsensus}ms`}
            />
          </div>

          {/* Stage Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <span className="text-cyan-400 block text-[10px]">1. Kafka Ingress</span>
              <span className="text-pearl font-bold">{stats.tIngest} ms</span>
            </div>
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400 block text-[10px]">2. Redis Feature</span>
              <span className="text-pearl font-bold">{stats.tFeature} ms</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <span className="text-purple-400 block text-[10px]">3. Decision Core</span>
              <span className="text-pearl font-bold">{stats.tSolver} ms</span>
            </div>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-emerald-400 block text-[10px]">4. Consensus/Ack</span>
              <span className="text-pearl font-bold">{stats.tConsensus} ms</span>
            </div>
          </div>
        </div>

        {/* SLA Summary Card */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
            <span className="text-[10px] uppercase font-mono text-slate block">p50 Latency</span>
            <span className="text-lg font-bold text-pearl font-mono block mt-1">{stats.p50} ms</span>
            <span className="text-[10px] text-emerald-400 mt-1 block">Median turnaround</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <span className="text-[10px] uppercase font-mono text-emerald-400 block">p99 Max SLA</span>
            <span className="text-lg font-bold text-emerald-300 font-mono block mt-1">{stats.p99} ms</span>
            <span className="text-[10px] text-slate mt-1 block">Upper tail bound</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
            <span className="text-[10px] uppercase font-mono text-slate block">Estimated Throughput</span>
            <span className="text-lg font-bold text-pearl font-mono block mt-1">{stats.throughputOps}</span>
            <span className="text-[10px] text-slate mt-1 block">Events / second</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
            <span className="text-[10px] uppercase font-mono text-slate block">Wire Bandwidth</span>
            <span className="text-lg font-bold text-cyan-400 font-mono block mt-1">{stats.netBandwidth} KB/s</span>
            <span className="text-[10px] text-slate mt-1 block">Per active sensor</span>
          </div>
        </div>
      </div>
    </div>
  );
}
