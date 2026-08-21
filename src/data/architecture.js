/**
 * Comprehensive System Architecture & Engineering Blueprints
 * Ground truth data for interactive modals, system design section, and Gemini AI Assistant.
 */

export const systemPrinciples = [
  {
    title: 'Distributed Event Streaming & Queues',
    description: 'High-frequency 60Hz telemetry ingestion on Apache Kafka decoupled from asynchronous Monte Carlo & BullMQ worker pools.',
    icon: '⚡',
    metric: '66.8k ops/sec',
    subtext: '0.0245ms p99 feature extraction SLA',
  },
  {
    title: 'Exact Constraint & Neural Surrogates',
    description: 'Google OR-Tools CP-SAT global solver combined with PyTorch Multi-Head Cross-Attention neural networks for sub-millisecond edge bidding.',
    icon: '🛰️',
    metric: '< 0.8ms Inference',
    subtext: '84.6% top-1 agreement on held-out test splits',
  },
  {
    title: 'GitOps & Self-Healing Automation',
    description: 'Event-Driven Ansible (EDA) remediation, Sigstore/Cosign container verification, and automated rollbacks on CrashLoopBackOff.',
    icon: '🛡️',
    metric: 'Zero-Downtime',
    subtext: 'Auto-correct in dev · Instant rollback on probe fail',
  },
  {
    title: 'Compound Indexing & Query Acceleration',
    description: 'Tailored compound B-tree and 2dsphere indexes in MongoDB and PostgreSQL eliminating collection scans and sort bottlenecks.',
    icon: '🎯',
    metric: '95% Latency Cut',
    subtext: '~240ms down to ~12ms execution time',
  },
];

export const productionScenarios = [
  {
    id: 'apex_rain_surge',
    title: 'Sudden Monsoon Rainstorm & Multi-Car Pit Chaos',
    project: 'APEX F1 Strategy Engine',
    badge: 'Safe RL & Multi-Agent Deliberation',
    icon: '🏎️',
    context: 'Torrential rain hits sector 3 on Lap 34, causing 18 cars to dive for the pitlane while track grip plummets by 42%.',
    failureMode: 'Heuristic algorithms experience deadlock or double-stack delay, while unconstrained RL selects aggressive slicks, causing a terminal crash.',
    architecturalSolution:
      'Safe RL ActionMaskGuardrail strictly vetoes dry compounds. The 5-specialist Multi-Agent Consensus synthesizes a rain-window delta, triggering an optimal Inter-to-Wet double-box call with 0.024ms feature lookup and zero safety violations.',
    steps: [
      { step: '01', title: 'Telemetry Anomaly', desc: 'Sector 3 grip drops 42%; Kafka dispatches weather event' },
      { step: '02', title: 'Safe RL Masking', desc: 'ActionMaskGuardrail prohibits Soft/Medium/Hard compound actions' },
      { step: '03', title: 'Consensus Vote', desc: '5 agents (Chief, Tyre, Met, Engine, Coach) reach 92% unanimous call' },
      { step: '04', title: 'Execution Order', desc: 'Pit order broadcast over WebSocket & synthesized radio DSP' },
    ],
  },
  {
    id: 'orbitx_solar_storm',
    title: 'Extreme Solar Radiation Flare & Space Debris Conjunction',
    project: 'ORBIT-X Constellation',
    badge: 'Autonomous Physics Resilience',
    icon: '🛰️',
    context: 'Class-X solar flare degrades solar panel yield by 60% while Space Track computes a 1-in-1,000 debris collision conjunction.',
    failureMode: 'Spacecraft batteries drain below the 20% critical floor, causing permanent loss of orbital control or catastrophic debris impact.',
    architecturalSolution:
      'The 10-Scenario Resilience Subsystem automatically initiates power-shedding on non-critical payloads, recalculates Stefan-Boltzmann cooling ODEs, and triggers an autonomous J2-compensated orbital avoidance burn while rerouting optical laser mesh links.',
    steps: [
      { step: '01', title: 'Conjunction Alert', desc: 'Debris tracking detects <500m proximity threshold' },
      { step: '02', title: 'Power-Shedding', desc: 'Non-critical camera sensors powered down (SoC preserved >20%)' },
      { step: '03', title: 'Evasion Solver', desc: 'CP-SAT calculates delta-V burn trajectory in 12.1ms' },
      { step: '04', title: 'Mesh Reroute', desc: 'Downlink traffic hopped to adjacent satellite via optical laser ISL' },
    ],
  },
  {
    id: 'edgeguard_wan_drop',
    title: 'Remote Edge WAN Disconnection & Telemetry Replay',
    project: 'EdgeGuard Platform',
    badge: 'Offline-First WAL Resilience',
    icon: '🛡️',
    context: 'Edge host loses internet connectivity for 4 hours while disk usage continues to grow exponentially toward 100%.',
    failureMode: 'Telemetry drops lead to silent disk overflow on the host, causing OS kernel panic and corrupted production databases.',
    architecturalSolution:
      'Python edge agent transparently spools telemetry into local SQLite WAL mode (spool.db). Upon WAN reconnect, the replay engine batches payloads with UUID event_id deduplication. The EWMA forecaster detects the trend breach and EDA auto-executes disk cleanup.',
    steps: [
      { step: '01', title: 'WAN Outage', desc: 'HTTPS connection fails; collector routes telemetry to SQLite spool' },
      { step: '02', title: 'Local Buffering', desc: 'Over 14,000 metric rows buffered in WAL mode without memory bloat' },
      { step: '03', title: 'Idempotent Replay', desc: 'Network restored; API ingests batch with UUID deduplication' },
      { step: '04', title: 'EDA Self-Healing', desc: 'EWMA flags 6-hour disk fill; Ansible executes cleanup playbook' },
    ],
  },
  {
    id: 'hyperdeploy_rollback',
    title: 'Unhealthy Canary Deployment & CrashLoopBackOff Rollback',
    project: 'HyperDeploy Controller',
    badge: 'Health-Gated Rollback',
    icon: '⚡',
    context: 'A developer submits a release that passes staging tests but fails in production due to a missing runtime environment secret.',
    failureMode: 'Broken pods crash-loop in production, causing 100% HTTP 500 errors for end users and prolonged service downtime.',
    architecturalSolution:
      'HyperDeploy ARQ worker polls pod health every 5 seconds. Upon detecting CrashLoopBackOff or failing readiness probes, it halts rollout progression, undoes K8s state, and atomically triggers a single-function rollback to the last-known-good signed Cosign release.',
    steps: [
      { step: '01', title: 'Manifest Apply', desc: 'Cosign-verified digest applied to Kubernetes cluster' },
      { step: '02', title: 'Health Gate Poll', desc: 'Worker detects pod entering CrashLoopBackOff status' },
      { step: '03', title: 'Rollout Halt', desc: 'Deployment halted before affecting remaining production traffic' },
      { step: '04', title: 'Instant Rollback', desc: 'Worker reapplies last-known-good release in <3 seconds' },
    ],
  },
  {
    id: 'surge',
    title: 'High-Volume Flash Sale Traffic Surge',
    project: 'FaRm Marketplace',
    badge: 'Throughput Resilience',
    icon: '🌾',
    context: '1,000+ buyers simultaneously filter and checkout seasonal harvest drops within a 30-second window.',
    failureMode: 'Without indexing, multi-field catalog queries trigger 100% CPU lockups and connection pool timeouts (HTTP 504).',
    architecturalSolution:
      'Compound B-Tree indexes ({ category: 1, price: 1, createdAt: -1 }) convert COLLSCANs to index-covered queries. Rate limiters throttle abusive bots, maintaining p95 latency under 150ms with 0% error rate.',
    steps: [
      { step: '01', title: 'Traffic Spike', desc: '1,000+ concurrent requests hit API gateway' },
      { step: '02', title: 'Rate Limiter Ingress', desc: 'Express rate-limit permits legitimate users & drops bot bursts' },
      { step: '03', title: 'Index-Covered Query', desc: 'MongoDB executes IXSCAN without reading unindexed documents' },
      { step: '04', title: 'Sub-150ms Response', desc: 'Catalog and checkout data served in 12ms average latency' },
    ],
  },
  {
    id: 'race_condition',
    title: 'Simultaneous NGO Food Claim Race Condition',
    project: 'Left2Serve Redistribution',
    badge: 'Concurrency & ACID',
    icon: '🍲',
    context: '5 distinct NGOs attempt to claim the exact same perishable surplus meal batch within a 200ms window.',
    failureMode: 'Phantom reads allow two NGOs to be assigned the same pickup, leading to physical conflict and wasted volunteer trips.',
    architecturalSolution:
      'Atomic transaction blocks with row-level locking (SELECT FOR UPDATE) ensure serializable isolation. The first claim succeeds; subsequent 4 concurrent transactions fail gracefully and automatically receive real-time recommendations of adjacent available batches.',
    steps: [
      { step: '01', title: 'Concurrent Claims', desc: '5 NGOs trigger claim action simultaneously' },
      { step: '02', title: 'Atomic Mutex Lock', desc: 'Database locks donation record during status evaluation' },
      { step: '03', title: 'Single Winner Commit', desc: 'Donation status flips to CLAIMED for 1st NGO' },
      { step: '04', title: 'Smart Batch Reroute', desc: 'Other 4 NGOs receive immediate alternative batch suggestions' },
    ],
  },
  {
    id: 'disconnect_recovery',
    title: 'Cellular Dead Zone & Socket Reconnect Recovery',
    project: 'MyMate Driver Telemetry',
    badge: 'Event-Driven Fault Tolerance',
    icon: '🚗',
    context: 'Driver enters an underground tunnel or low-reception zone during an active transit trip, dropping WebSocket connection.',
    failureMode: 'Socket disconnection drops GPS tracking, rider panics, and trip fares calculate incorrectly due to missing route coordinates.',
    architecturalSolution:
      'Client-side circular buffer stores up to 100 offline waypoints. Automated exponential backoff initiates socket reconnection upon cellular restore, atomically syncing buffered coordinates and recalculating trip telemetry with zero data loss.',
    steps: [
      { step: '01', title: 'Network Drop', desc: 'Cellular disconnects during active ride' },
      { step: '02', title: 'Offline Waypoint Ring', desc: 'Client caches GPS telemetry in local ring buffer' },
      { step: '03', title: 'Backoff Reconnect', desc: 'Exponential retry triggers instant handshake when online' },
      { step: '04', title: 'Atomic Batch Sync', desc: 'Replays 100 waypoints to server; ride state smoothly resumes' },
    ],
  },
  {
    id: 'malicious_defense',
    title: 'Malicious Payload & Injection Defense',
    project: 'Defense-in-Depth Pipeline',
    badge: 'Zero-Trust Security',
    icon: '🛡️',
    context: 'Attacker attempts NoSQL injection operators ({"$gt": ""}) in login and uploads disguised executable scripts into driver license vaults.',
    failureMode: 'Authentication bypass, administrative account takeover, and arbitrary code execution on backend servers.',
    architecturalSolution:
      'Mongo-Sanitize middleware recursively strips dollar-prefixed operators. Helmet enforces strict CSP headers. Cloudinary server-side MIME verification blocks non-image payloads before Tesseract OCR processing, logging attacker IP via Winston.',
    steps: [
      { step: '01', title: 'Malicious Payload', desc: 'Attacker injects query operators & suspicious script files' },
      { step: '02', title: 'Sanitization Filter', desc: 'Mongo-Sanitize & xss middleware strip operator tokens' },
      { step: '03', title: 'MIME Verification', desc: 'Server rejects non-image binaries before OCR stage' },
      { step: '04', title: 'Winston Security Audit', desc: 'IP logged, alert triggered, request rejected with HTTP 403' },
    ],
  },
];

export const projectArchitectures = {
  APEX: {
    id: 'apex',
    title: 'APEX — Autonomous Race Strategy Intelligence',
    tagline: 'Distributed 60Hz Telemetry Streaming, Multi-Agent Consensus & Safe RL Digital Twin',
    summary:
      'An enterprise-grade, distributed Formula 1 race strategy intelligence and digital twin mission control platform. Streams 60Hz telemetry across Apache Kafka topics, offloads 10,000+ Monte Carlo rollouts to BullMQ/Redis worker pools, and enforces physical safety via Safe RL Action Masking with 172/172 automated tests passing.',
    systemFlow: [
      {
        step: 1,
        title: 'Telemetry Ingestion & Kafka Event Stream',
        description: 'FastF1 & Jolpica multi-car live bridge dispatches 60Hz telemetry into partitioned Kafka topics (f1.telemetry.raw, f1.weather.events, f1.race.control).',
        tech: ['Apache Kafka', 'Redpanda', 'Pydantic Schemas', 'DLQ Poison-Pill Isolation'],
      },
      {
        step: 2,
        title: 'Sub-Millisecond Feature Store (L1/L2/L3)',
        description: 'L1 zero-copy RAM ring buffer (<0.1ms) + L2 Redis hot cache (1-3ms) + L3 PostgreSQL cold store extracting 28-dimensional vectors at 66.8k ops/sec.',
        tech: ['In-Memory Ring Buffer', 'Redis Streams', 'PostgreSQL 16', 'OpenTelemetry'],
      },
      {
        step: 3,
        title: 'Multi-Agent Pit Wall Consensus Protocol',
        description: '5 specialized autonomous agents (Chief Strategist, Tyre Specialist, Meteorologist, Powertrain Engineer, Driver Coach) debate and cast weighted votes.',
        tech: ['Multi-Agent Consensus', 'Speech DSP Synthesis', 'TreeSHAP Explainability'],
      },
      {
        step: 4,
        title: 'Safe RL Action Masking & Worker Queue',
        description: 'ActionMaskGuardrail eliminates invalid/unsafe actions before offloading 10k forward Monte Carlo rollouts to BullMQ workers with SHA-256 idempotency.',
        tech: ['Safe Reinforcement Learning', 'BullMQ', 'Redis Workers', 'SHA-256 Idempotency'],
      },
      {
        step: 5,
        title: '3D WebGL Digital Twin & Cockpit HUD',
        description: 'Three.js 3D track spline extrusion, WebXR stereoscopic VR cockpit, Brembo brake pyrometry, and real-time audio synthesizer.',
        tech: ['Three.js', 'WebXR', 'React 18', 'Tailwind CSS', 'FastAPI WebSocket'],
      },
    ],
    dbOptimization: {
      engine: 'Feature Store & Redis Hot Cache',
      strategy: 'Zero-Copy Ring Buffer & SHA-256 Job Deduplication',
      indexDefinition: 'L1 Ring Buffer: 0.0245ms p99 | Redis: apex:job:<type>:<hash> (Idempotent)',
      beforeLatency: '0.50ms SLA',
      afterLatency: '0.0245ms',
      improvementPercent: '95.1%',
      details:
        'Extracting 28-dimensional feature vectors across 20 concurrent cars previously threatened the 0.50ms per-lap SLA. A custom zero-copy memory layout and L1 ring buffer achieved a sustained throughput of 66,798 extractions/sec at 0.0245ms p99 latency.',
      metrics: [
        { label: 'Feature Extraction SLA', value: '0.0245ms (p99)' },
        { label: 'Feature Throughput', value: '66,798 extractions/s' },
        { label: 'Tyre Model Error', value: 'MAE = 0.35s / lap' },
        { label: 'Tournament Win Rate', value: '90% Win / 95% Podium' },
      ],
    },
    security: {
      auth: 'Stateless HMAC-SHA256 JWT authentication with cryptographic bearer verification on all REST and WebSocket channels.',
      rbac: 'Role-Based Access Control: VIEWER (Read telemetry), ANALYST (Sandbox simulations), STRATEGIST (Execute pit orders), ADMIN (Model retrain & chaos injection).',
      middleware: ['Safe RL ActionMaskGuardrail', 'Tiered Token Bucket Rate Limiting', 'OpenTelemetry Traceparent Context', 'Dead-Letter Queue (DLQ)'],
    },
    loadTesting: {
      tool: 'Chaos Resilience Suite & PyTest Harness',
      concurrency: '20 Cars @ 60Hz Telemetry Stream',
      totalRequests: '172 / 172 Automated Tests Passed',
      p95Latency: '< 0.025ms (Feature Store)',
      errorRate: '0.00%',
      summary:
        'Passed all 172 unit, integration, and streaming tests. Verified 100% self-healing resilience during 500-message burst streams, broker dropouts, and poison-pill DLQ routing.',
    },
    scenario: {
      title: 'Monsoon Rain & Safe-RL Pit Deliberation',
      summary: 'When sudden rain creates track chaos, Safe RL masks invalid dry slicks while 5 autonomous pit-wall agents vote on the optimal inters-to-wets double-stack window.',
      recoveryKey: 'Safe RL Action Masking + 5-Agent Weighted Consensus',
    },
  },

  'ORBIT-X': {
    id: 'orbitx',
    title: 'ORBIT-X — Autonomous Orbital Resource Intelligence',
    tagline: 'Google OR-Tools CP-SAT Global Optimization, PyTorch Neural Surrogate & 3D Earth Digital Twin',
    summary:
      'An autonomous Low Earth Orbit (LEO) satellite constellation resource allocation and digital twin platform. Couples Google OR-Tools CP-SAT exact integer programming with a PyTorch Multi-Head Cross-Attention neural surrogate, WGS-84 J2 orbital ODEs, and an official MCP server with 55/55 passing tests.',
    systemFlow: [
      {
        step: 1,
        title: 'Mission Dispatch & CelesTrak Ingestion',
        description: 'Operators dispatch imaging targets via 3D globe coordinates or API. Ingests live CelesTrak TLEs with SHA-256 disk caching and WGS-84 J2 orbital drift propagation.',
        tech: ['CelesTrak TLE', 'WGS-84 J2 Propagator', 'FastAPI Async', 'Pydantic v2'],
      },
      {
        step: 2,
        title: 'Deep Learning Valuation Surrogate',
        description: 'ConstellationCrossAttentionNet (4 heads, D=32) correlates satellite states with mission targets to produce sub-millisecond bidding valuations (<0.8ms).',
        tech: ['PyTorch', 'Cross-Attention Net', 'TreeSHAP Distillation', 'Edge Inference'],
      },
      {
        step: 3,
        title: 'Exact CP-SAT Constraint Optimization',
        description: 'Google OR-Tools CP-SAT solver guarantees zero camera task collisions, preserves battery reserve floors (SoC >= 20%), and optimizes downlink contact windows.',
        tech: ['Google OR-Tools', 'CP-SAT Solver', 'Constraint Programming'],
      },
      {
        step: 4,
        title: 'Spacecraft Health AI & Physics ODEs',
        description: 'Isolation Forest monitors 6 sensor vitals for hardware anomalies while Stefan-Boltzmann ODEs model thermal radiative cooling and battery drain during eclipses.',
        tech: ['Isolation Forest', 'Stefan-Boltzmann ODE', '10-Scenario Resilience'],
      },
      {
        step: 5,
        title: '3D WebGL Digital Twin HUD & MCP Server',
        description: 'Three.js 3D Earth console with laser mesh ISL visualization, comparative 6-scheduler benchmark trigger, and Model Context Protocol (MCP) server.',
        tech: ['Three.js', 'WebGL', 'React 18', 'MCP Protocol', 'Redis Pub/Sub'],
      },
    ],
    dbOptimization: {
      engine: 'Google OR-Tools CP-SAT + PyTorch Cross-Attention',
      strategy: 'Hybrid Neural Candidate Pruning + Exact Global Solver',
      indexDefinition: 'Global CP-SAT Formulation: Non-overlap intervals + Stefan-Boltzmann ODEs',
      beforeLatency: '12.12ms (Solver)',
      afterLatency: '< 0.8ms (Neural)',
      improvementPercent: '93.4%',
      details:
        'Exact CP-SAT guarantees 100% completion of high-priority emergency missions (P4/P5) and maximum reward (2,572.3). The neural cross-attention surrogate predicts winning satellite assignments in <0.8ms with 84.6% top-1 agreement on held-out test splits.',
      metrics: [
        { label: 'Emergency Mission Delivery', value: '100.0% (P4 & P5)' },
        { label: 'Neural Inference Latency', value: '< 0.8ms per target' },
        { label: 'Anomaly Detection Rate', value: '89.5% (2.1% false alarms)' },
        { label: 'Constellation Scaling', value: '> 34k satellites/sec' },
      ],
    },
    security: {
      auth: 'Bearer JWT security tokens for ground station dispatch and Model Context Protocol (MCP) server validation.',
      rbac: 'Granular permissions: Ground Operator, Flight Director, and Autonomous Payload Agent with immutable mission ledger.',
      middleware: ['Hard Battery Reserve Floor (SoC >= 20%)', 'Thermal Dissipation Cutoffs', 'Laser Mesh ISL Fallback', 'Collision Buffer Checks'],
    },
    loadTesting: {
      tool: 'Multi-Seed 6-Scheduler Benchmark Suite',
      concurrency: 'Scalable from 12 to 1,000 Spacecraft Nodes',
      totalRequests: '55 / 55 PyTest Tests Passed (6 Gates)',
      p95Latency: '< 2.4ms (Neural) / 12ms (CP-SAT)',
      errorRate: '0.00% (Zero Violations)',
      summary:
        'Evaluated across 6 distinct scheduling paradigms (Random, Greedy EDF, Sealed-Bid Auction, Neural Surrogate, Hybrid, Exact CP-SAT). Sustained >34,000 satellites/sec propagation throughput with zero constraint violations.',
    },
    scenario: {
      title: 'Solar Flare & Orbital Debris Evasion',
      summary: 'When a solar storm degrades power and space debris threatens a satellite, the 10-scenario resilience system sheds non-critical power and executes a J2-compensated avoidance burn.',
      recoveryKey: '10-Scenario Resilience Subsystem + Laser Mesh Rerouting',
    },
  },

  EdgeGuard: {
    id: 'edgeguard',
    title: 'EdgeGuard — Red Hat-Oriented Edge Monitoring',
    tagline: 'Event-Driven Ansible (EDA) Self-Healing & EWMA Predictive Trend Alerting',
    summary:
      'An enterprise hybrid-edge monitoring and self-healing remediation platform. Decouples telemetry detection from automation execution using Red Hat Event-Driven Ansible (EDA), EWMA predictive forecasting (up to 6 hours ahead), and offline-first SQLite WAL spooling with zero duplicate rows.',
    systemFlow: [
      {
        step: 1,
        title: 'Lightweight Edge Collector Daemon',
        description: 'Python 3.12 daemon polls host metrics (CPU, RAM, disk, network, systemd) via psutil and spools to SQLite in WAL mode during WAN outages.',
        tech: ['Python 3.12', 'psutil', 'SQLite WAL (spool.db)', 'Systemd Service'],
      },
      {
        step: 2,
        title: 'FastAPI Control Plane & Idempotency Gate',
        description: 'High-throughput async REST API ingesting telemetry payloads with server-side UUID event_id deduplication and PostgreSQL 16 time-series indexing.',
        tech: ['FastAPI', 'Pydantic v2', 'PostgreSQL 16', 'SQLAlchemy Async'],
      },
      {
        step: 3,
        title: 'Worker Analytics & EWMA Forecaster',
        description: 'Asynchronous workers evaluate static thresholds and calculate Exponentially Weighted Moving Average (alpha=0.3) trend forecasts to project threshold breaches.',
        tech: ['Celery / RQ', 'Redis 7 Pub/Sub', 'EWMA Predictive Engine', 'Fingerprint Dedup'],
      },
      {
        step: 4,
        title: 'Event-Driven Ansible (EDA) Runner',
        description: 'ansible-rulebook engine matches webhook incident events against declarative YAML policies and dispatches remediation playbooks over SSH.',
        tech: ['Event-Driven Ansible', 'ansible-rulebook', 'Ansible Core Runner'],
      },
      {
        step: 5,
        title: 'Security Registry & Operations Dashboard',
        description: 'Server-side ALLOWED_PLAYBOOKS allow-list prevents command injection while React + TypeScript glassmorphic HUD streams live node telemetry.',
        tech: ['ALLOWED_PLAYBOOKS Registry', 'Keycloak OIDC', 'React 18', 'Prometheus'],
      },
    ],
    dbOptimization: {
      engine: 'PostgreSQL 16 + SQLite WAL Mode',
      strategy: 'Time-Series Composite Indexing & WAL Buffer Spooling',
      indexDefinition: 'CREATE INDEX idx_metrics_node_time ON metrics(node_id, timestamp DESC);',
      beforeLatency: 'Reactive (Post-failure)',
      afterLatency: 'Predictive (6 hrs ahead)',
      improvementPercent: '100% Proactive',
      details:
        'Traditional monitoring alerts after disk exhaustion or crash occurs. EdgeGuard applies EWMA linear trend extrapolation (alpha=0.3) to forecast breaches up to 6 hours in advance, triggering idempotent automated remediation before service degradation occurs.',
      metrics: [
        { label: 'Forecast Horizon', value: 'Up to 6 Hours Ahead' },
        { label: 'EWMA Smoothing', value: 'alpha = 0.30' },
        { label: 'Offline Spool Replay', value: 'Zero duplicate rows' },
        { label: 'Security Enforcement', value: 'ALLOWED_PLAYBOOKS Allow-list' },
      ],
    },
    security: {
      auth: 'Dual-mode authentication supporting local cryptographic JWT signed tokens and enterprise Keycloak OpenID Connect (OIDC) SSO.',
      rbac: 'Multi-tenant RBAC (Viewer, Operator, Admin) paired with an immutable audit_events ledger recording all human and automated playbook runs.',
      middleware: ['ALLOWED_PLAYBOOKS Server-Side Allow-List', 'Idempotent UUID event_id Ingress', 'SQLAlchemy Async Connection Pooling', 'Prometheus /metrics'],
    },
    loadTesting: {
      tool: 'Pytest Suite (Unit, Integration, E2E Drift)',
      concurrency: 'Multi-Node Hybrid Edge Fleet',
      totalRequests: '100% Test Pass Rate',
      p95Latency: '< 45ms Ingestion API',
      errorRate: '0.00%',
      summary:
        'End-to-end drift detection and automated remediation tested across simulated disk filling and service crashes with zero playbook execution failures.',
    },
    scenario: {
      title: 'Edge WAN Drop & Spool Replay',
      summary: 'When WAN fails, edge collector buffers telemetry in SQLite WAL mode (spool.db). Upon reconnection, payloads replay seamlessly with zero duplicate rows.',
      recoveryKey: 'SQLite WAL Spooling + UUID Idempotent Replay + EDA',
    },
  },

  HyperDeploy: {
    id: 'hyperdeploy',
    title: 'HyperDeploy — Hybrid Bare-Metal & K8s Continuous Delivery',
    tagline: 'Sigstore Cosign Verification, Automated Health-Gated Rollbacks & GitOps Reconciliation',
    summary:
      'An enterprise-grade hybrid deployment platform unifying bare-metal / VM management (via Ansible) and containerized workloads (via Kubernetes). Enforces Cosign digital signature verification, health-gated zero-downtime rollouts with instantaneous rollback on CrashLoopBackOff, and GitOps self-healing.',
    systemFlow: [
      {
        step: 1,
        title: 'Release Submission & Cosign Verification',
        description: 'Validates strict SHA-256 image digests and verifies Sigstore / Cosign cryptographic digital signatures prior to database persistence.',
        tech: ['Sigstore / Cosign', 'SHA-256 Digest Immutability', 'Pydantic v2', 'FastAPI'],
      },
      {
        step: 2,
        title: 'Dual-Control RBAC & Approval Guard',
        description: 'Enforces enterprise role separation (Viewer, Developer, Operator, Approver, Admin) and cryptographically blocks self-approval on production releases.',
        tech: ['PyJWT (HS256)', 'ActorContext Parser', 'Self-Approval Prevention'],
      },
      {
        step: 3,
        title: 'ARQ Async Queue & Job Manager',
        description: 'Asynchronous Redis job queue orchestrates manifests with idempotency deduplication, stale job reaper background tasks, and exponential retries.',
        tech: ['ARQ Worker Engine', 'Redis 7', 'Stale Job Reaper', 'PostgreSQL Async'],
      },
      {
        step: 4,
        title: 'Health-Gated Rollout & Instant Rollback',
        description: 'Worker polls pod readiness every 5s. If CrashLoopBackOff, readiness probe failure, or rollout stall is detected, it triggers instant automated rollback.',
        tech: ['Kubernetes API', 'Health Gate Polling', 'trigger_rollback() Engine'],
      },
      {
        step: 5,
        title: 'GitOps Reconciler & Ansible Runner',
        description: 'Autonomous reconciliation loop auto-fixes drift in dev environments, while Ansible runner manages bare-metal host idempotency (changed=0).',
        tech: ['GitOps Reconciler Loop', 'ansible-runner', 'structlog Secret Redaction'],
      },
    ],
    dbOptimization: {
      engine: 'PostgreSQL 16 / SQLAlchemy 2.0 Async',
      strategy: 'Release Immutability & Concurrency Locking',
      indexDefinition: 'Unique digest index on releases(digest) + ARQ Redis Idempotency Key',
      beforeLatency: 'Manual Rollback (Mins/Hours)',
      afterLatency: '< 3s Instant Auto-Rollback',
      improvementPercent: '99% Faster Recovery',
      details:
        'Manual rollback processes cause extended downtime during broken canary deployments. HyperDeploy automatically classifies pod health and triggers a unified single-function rollback to the last-known-good signed release in under 3 seconds.',
      metrics: [
        { label: 'Auto-Rollback Time', value: '< 3.0 seconds' },
        { label: 'Image Verification', value: '100% Cosign Signed' },
        { label: 'Ansible Idempotency', value: 'Strict changed=0 check' },
        { label: 'Log Security', value: 'structlog Auto-Redaction' },
      ],
    },
    security: {
      auth: 'Stateless JWT with ActorContext parsing and cryptographically enforced role hierarchy.',
      rbac: 'Dual-control production approval preventing release creators from self-approving their own deployments.',
      middleware: ['Sigstore / Cosign Cryptographic Verifier', 'structlog Automated Secret Key Redaction', 'Per-Host SSH Failure Isolation', 'Immutable Audit Ledger'],
    },
    loadTesting: {
      tool: 'PyTest-Asyncio Suite (Unit, Integration, E2E)',
      concurrency: 'Multi-Environment (Dev, Staging, Prod)',
      totalRequests: 'Full Matrix (A1 – F3) Scenarios Passing',
      p95Latency: '< 15ms Control Plane API',
      errorRate: '0.00%',
      summary:
        'E2E tested against broken pod crash loops (B1), probe failures (B2), delayed memory leaks (B3), stalled rollouts (B4), and GitOps configuration drift (F1/F2).',
    },
    scenario: {
      title: 'CrashLoopBackOff & Instant Auto-Rollback',
      summary: 'When a broken container enters CrashLoopBackOff, the health gate immediately detects pod failure and rolls back to the last-known-good signed Cosign release.',
      recoveryKey: 'Health-Gated Polling + trigger_rollback() Engine',
    },
  },

  FaRm: {
    id: 'farm',
    title: 'FaRm — Direct Marketplace',
    tagline: 'High-Performance Farmer-to-Consumer Distributed Commerce Architecture',
    summary:
      'A full-stack agricultural marketplace built to eliminate intermediary overhead. Engineered for ultra-low read latency across high-volume product catalogs and resilient checkout flows.',
    systemFlow: [
      {
        step: 1,
        title: 'Client Tier (React + Vite)',
        description: 'Single-page application featuring responsive glassmorphic UI, optimistic UI updates, and cached API requests.',
        tech: ['React 19', 'Vite', 'Tailwind CSS', 'React Query'],
      },
      {
        step: 2,
        title: 'API & Security Gateway',
        description: 'Express.js reverse-proxy ingress with rate-limiting, CORS origin isolation, and JWT session validation.',
        tech: ['Express.js', 'Helmet', 'express-rate-limit', 'JWT'],
      },
      {
        step: 3,
        title: 'Core Business Controllers',
        description: 'Decoupled domain services managing marketplace listings, order life cycles, real-time stock deductions, and payments.',
        tech: ['Node.js', 'Async Handlers', 'Socket.IO Server'],
      },
      {
        step: 4,
        title: 'Optimized Data Tier (MongoDB)',
        description: 'Mongoose ODM connecting to replica sets with compound indexing for multi-attribute filtering & sorting.',
        tech: ['MongoDB', 'Compound B-Tree Indexes', 'Aggregation Pipelines'],
      },
      {
        step: 5,
        title: 'Media & CDN Pipeline',
        description: 'Cloudinary server-side upload stream with automatic WebP conversion, thumbnail generation, and edge caching.',
        tech: ['Cloudinary SDK', 'Edge CDN'],
      },
    ],
    dbOptimization: {
      engine: 'MongoDB',
      strategy: 'Compound Indexing on High-Cardinality Filter Fields',
      indexDefinition: 'db.products.createIndex({ category: 1, price: 1, createdAt: -1 })',
      beforeLatency: '240ms',
      afterLatency: '12ms',
      improvementPercent: '95%',
      details:
        'Without indexes, multi-filter catalog queries triggered expensive COLLSCAN operations and in-memory sort stages exceeding memory limits. The compound index enabled an index-covered IXSCAN and pre-sorted index retrieval, eliminating CPU bottlenecks.',
      metrics: [
        { label: 'Query Stage Before', value: 'COLLSCAN + SORT' },
        { label: 'Query Stage After', value: 'IXSCAN (Covered)' },
        { label: 'Documents Examined', value: 'Reduced from 10,000 to ~20' },
        { label: 'Memory Footprint', value: '92% Reduction in RAM usage' },
      ],
    },
    security: {
      auth: 'JWT (JSON Web Token) with HTTP-only cookies and cryptographically signed payload verification.',
      rbac: 'Role-Based Access Control enforcing strict separation between Farmers (listing CRUD, inventory control), Buyers (cart, checkout, review), and Admins.',
      middleware: ['Helmet Security Headers', 'Express Rate Limiting (100 req/15min)', 'Mongo-Sanitize against NoSQL injection', 'CORS whitelisting'],
    },
    loadTesting: {
      tool: 'Artillery',
      concurrency: '200 Virtual Concurrent Users',
      totalRequests: '12,500+ requests',
      p95Latency: '< 148ms',
      errorRate: '0.00%',
      summary:
        'Executed sustained load tests simulating concurrent flash-sale buyer traffic. Successfully maintained zero HTTP 5xx responses and sub-150ms p95 latency under peak throughput.',
    },
    scenario: {
      title: 'Flash Sale Concurrency Resilience',
      summary: 'When 200 concurrent users flood seasonal vegetable harvest drops, the compound index ensures sub-150ms catalog responses while rate-limiting blocks bot hoarding.',
      recoveryKey: 'Compound IXSCAN + Connection Pool Management',
    },
  },

  Left2Serve: {
    id: 'left2serve',
    title: 'Left2Serve — Food Redistribution Network',
    tagline: 'Reliable Real-Time Logistics & Food Donation Dispatching Engine',
    summary:
      'A real-time food rescue platform connecting surplus food donors with certified NGOs. Designed for strict ACID transactional consistency, location-based query acceleration, and high burst tolerance.',
    systemFlow: [
      {
        step: 1,
        title: 'Client Tier (React + Tailwind)',
        description: 'Dynamic donor and NGO portals with real-time pickup status tracking and image verification.',
        tech: ['React.js', 'Tailwind CSS', 'Lucide Icons'],
      },
      {
        step: 2,
        title: 'API Gateway & Middleware',
        description: 'Express router implementing granular role authorization, request payload size limits, and sanitization.',
        tech: ['Express.js', 'JWT RBAC', 'Cors', 'Morgan'],
      },
      {
        step: 3,
        title: 'Dispatch & Claims Engine',
        description: 'Atomic claim processing logic ensuring food items cannot be double-claimed simultaneously by multiple NGOs.',
        tech: ['Node.js Service Layer', 'Transaction Blocks'],
      },
      {
        step: 4,
        title: 'Relational Database (PostgreSQL/MySQL)',
        description: 'Structured relational schema with compound B-tree index on donation statuses, pickup windows, and geo-coordinates.',
        tech: ['PostgreSQL / MySQL', 'B-Tree Indexing', 'Foreign Key Constraints'],
      },
      {
        step: 5,
        title: 'Verification Vault',
        description: 'Cloudinary image pipeline ensuring donor meals undergo visual verification before NGO dispatch.',
        tech: ['Cloudinary API', 'Signed Uploads'],
      },
    ],
    dbOptimization: {
      engine: 'PostgreSQL / Relational SQL',
      strategy: 'Multi-column B-Tree Indexing on Active Donation Queries',
      indexDefinition: 'CREATE INDEX idx_donations_status_pickup ON donations (status, pickup_window, location_id);',
      beforeLatency: '340ms',
      afterLatency: '12ms',
      improvementPercent: '96.4%',
      details:
        'High NGO traffic querying available donations within tight pickup windows caused sequential table scans on the donations table. Creating a composite B-tree index allowed the query optimizer to execute an Index Scan directly filtering non-expired, unclaimed food items.',
      metrics: [
        { label: 'Query Execution', value: 'Seq Scan → Index Scan' },
        { label: 'Cost Metric', value: 'Dropped from 480.20 to 8.15' },
        { label: 'Throughput', value: '3.4x boost in concurrent queries' },
        { label: 'Buffer Cache Hit', value: '> 99.8%' },
      ],
    },
    security: {
      auth: 'JWT access token with stateless bearer verification on every protected route.',
      rbac: 'Hierarchical RBAC: Donors (create & manage batches), NGOs (view unallocated items, execute claims), Volunteers (pickup logistics).',
      middleware: ['SQL Injection Parameterized Queries', 'Express Brute Force Prevention', 'Helmet HTTP Protection', 'CORS Isolation'],
    },
    loadTesting: {
      tool: 'Artillery',
      concurrency: '187 requests/sec peak',
      totalRequests: '19,000+ total requests',
      p95Latency: '383ms (median)',
      errorRate: '< 0.05%',
      summary:
        'Pushed 19K+ requests over multi-phase stress scenarios. Validated rate-limit defenses, zero double-allocation race conditions under concurrency, and resilient database connection pool management.',
    },
    scenario: {
      title: 'Zero Double-Claim Guarantee',
      summary: 'ACID transaction blocks with row-level locks prevent conflicting concurrent NGO claims, automatically rerouting unassigned NGOs to alternative meals in real-time.',
      recoveryKey: 'Serializable DB Mutex + Live NGO Rerouting',
    },
  },

  MyMate: {
    id: 'mymate',
    title: 'MyMate — Smart Driver Booking Platform',
    tagline: 'Real-Time Event-Driven Geolocation & Automated Verification Architecture',
    summary:
      'An on-demand chauffeur and driver booking ecosystem powered by WebSockets for live telemetry, OCR document verification pipelines, and sub-millisecond driver matching.',
    systemFlow: [
      {
        step: 1,
        title: 'Client Tier (React + Geolocation)',
        description: 'Interactive booking dashboard with live driver beacon rendering and instant messaging overlay.',
        tech: ['React.js', 'Leaflet / Maps', 'Socket.IO Client'],
      },
      {
        step: 2,
        title: 'Real-Time WebSocket Hub',
        description: 'Socket.IO cluster handling continuous driver location coordinates, chat events, and state synchronization.',
        tech: ['Socket.IO', 'Room Isolation', 'Heartbeat Healthchecks'],
      },
      {
        step: 3,
        title: 'OCR & AI Verification Layer',
        description: 'Client/Server Tesseract.js engine scanning driver licenses and vehicle registration documents automatically.',
        tech: ['Tesseract.js OCR', 'Image Pre-processing'],
      },
      {
        step: 4,
        title: 'Driver Matching & MongoDB Tier',
        description: 'Sub-millisecond geospatial query execution indexing available drivers by proximity and rating.',
        tech: ['MongoDB Geospatial Index', '2dsphere Indexing'],
      },
      {
        step: 5,
        title: 'Observability & Logging',
        description: 'Winston structured file & console transports capturing API request traces, socket disconnects, and errors.',
        tech: ['Winston Logger', 'Morgan Stream'],
      },
    ],
    dbOptimization: {
      engine: 'MongoDB',
      strategy: 'Geospatial 2dsphere & Compound Availability Indexing',
      indexDefinition: 'db.drivers.createIndex({ location: "2dsphere", isAvailable: 1, rating: -1 })',
      beforeLatency: '~180ms',
      afterLatency: '~1ms',
      improvementPercent: '99%',
      details:
        'Matching nearby available drivers required calculating spherical distances across entire driver collections. Implementing a 2dsphere compound index reduced search complexity from O(N) to O(log N) utilizing quadtrees/geohashes.',
      metrics: [
        { label: 'Search Complexity', value: 'O(N) → O(log N)' },
        { label: 'Geospatial Execution', value: '~1ms sustained' },
        { label: 'Socket Broadcast', value: '< 25ms propagation delay' },
        { label: 'Race Condition Fix', value: 'Atomic lock on driver booking state' },
      ],
    },
    security: {
      auth: 'JWT authentication with verified phone/email credentials and driver identity verification.',
      rbac: 'Rider, Driver, and Fleet Admin role separation with encrypted driver document storage.',
      middleware: ['Winston Structured Audit Trail', 'Helmet Strict CSP', 'Socket Auth Handshake Middleware', 'Rate Limiting'],
    },
    loadTesting: {
      tool: 'Artillery & Custom Socket Load Generator',
      concurrency: '200 Virtual Concurrent Users',
      totalRequests: '115 req/sec sustained',
      p95Latency: '< 120ms',
      errorRate: '0.00%',
      summary:
        'Simulated 200 riders requesting live rides and streaming telemetry concurrently. Fixed an asynchronous Socket.IO chat race condition under heavy packet volume.',
    },
    scenario: {
      title: 'Dead Zone Telemetry Replay',
      summary: 'Circular offline waypoint buffer stores GPS tracking points when driver travels through signal dead zones, automatically replaying coordinates upon reconnect with zero fare discrepancies.',
      recoveryKey: 'Exponential Backoff + Ring Buffer Telemetry Replay',
    },
  },
};
