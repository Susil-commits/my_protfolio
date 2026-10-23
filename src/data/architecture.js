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
    id: 'veritas_answer_leak',
    title: 'Direct Answer Leak Prevention & Socratic Guardrail Interception',
    project: 'Veritas Math Tutor',
    badge: 'Pedagogical Safety Guard',
    icon: '🎓',
    context: 'A student prompts the conversational agent directly for a homework solution ("What is 3/4 + 2/5?").',
    failureMode: 'Standard LLMs calculate and output final numerical answers immediately, destroying cognitive struggle and deeper learning.',
    architecturalSolution:
      'A two-stage verification shield intercepts the generated response before streaming. A deterministic symbolic math evaluator verifies reasoning rules, and secondary safety heuristics replace direct answers with scaffolded Socratic questioning.',
    steps: [
      { step: '01', title: 'Direct Solution Prompt', desc: 'Student inputs direct numerical calculation query' },
      { step: '02', title: 'Intent Classification', desc: 'LangGraph state router categorizes request as calculation shortcut' },
      { step: '03', title: 'Anti-Leak Safety Shield', desc: 'Secondary verifier checks draft for numerical answers and derivations' },
      { step: '04', title: 'Socratic Scaffolding', desc: 'Agent outputs a conceptual hint on finding common denominators' },
    ],
  },
  {
    id: 'pms_sensor_drift',
    title: 'Sensor Telemetry Distribution Shift & Automated Drift Alert',
    project: 'Predictive Maintenance System',
    badge: 'MLOps Drift Resilience',
    icon: '⚙️',
    context: 'After 3,000 continuous operating hours, high-temperature environmental cycles cause sensor reading distributions to drift.',
    failureMode: 'Unmonitored feature drift degrades model calibration, causing silent false negatives and missed critical equipment failures.',
    architecturalSolution:
      'Continuous Population Stability Index (PSI) drift engine evaluates incoming telemetry against baseline distributions. When PSI exceeds 0.25, automated alerts flag drift and trigger background model retraining with updated Platt scaling.',
    steps: [
      { step: '01', title: 'Telemetry Ingestion', desc: 'Sensors stream continuous operating metrics (Temp, RPM, Pressure, Vib)' },
      { step: '02', title: 'PSI Calculation', desc: 'Drift monitor calculates Population Stability Index against baseline reference' },
      { step: '03', title: 'Threshold Breach Alert', desc: 'PSI score (0.28) flags significant distribution drift on Temperature feature' },
      { step: '04', title: 'Calibration Retraining', desc: 'Alert triggers background retraining and hot-reloads calibrated model artifacts' },
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

  Veritas: {
    id: 'veritas',
    title: 'Veritas — AI Socratic Math Tutor',
    tagline: 'LangGraph State Machine, Multimodal Handwritten Diagnostics & Bayesian Knowledge Tracing',
    summary:
      'A voice-first AI Socratic math tutor engineered under a strict zero-answer-leakage pedagogical mandate. Coordinates multi-turn dialogue with a compiled LangGraph state machine, analyzes handwritten scratchpad work using Gemini vision with bounding-box error reticles, and tracks 10 CCSS standards using calibrated Bayesian Knowledge Tracing (BKT) and Supabase pgvector.',
    systemFlow: [
      {
        step: 1,
        title: 'Multimodal Student Ingress (Audio & Scratchpad)',
        description: 'Ingests voice queries via Web Speech API or camera photos of student handwritten scratchpads for step-by-step reasoning analysis.',
        tech: ['Web Speech STT', 'Canvas Reticle Overlay', 'FastAPI Async', 'ElevenLabs TTS'],
      },
      {
        step: 2,
        title: 'LangGraph Multi-Agent State Machine',
        description: 'Session state machine coordinates pedagogical routing between the Socratic Tutor, Diagnostic Vision Agent, and Content Retrieval Agent.',
        tech: ['LangGraph', 'State Machine', 'Google Gemini Vision', 'Pydantic v2'],
      },
      {
        step: 3,
        title: 'Deterministic Math Evaluator & Anti-Leak Shield',
        description: 'Verifies mathematical equivalence using symbolic computation (Fraction / AST) and intercepts direct answer leaks before streaming.',
        tech: ['Symbolic Evaluator', 'Anti-Leak Safety Shield', 'Secondary Verifier', 'Regex Intent Parsing'],
      },
      {
        step: 4,
        title: 'Bayesian Knowledge Tracing (BKT) Engine',
        description: 'Updates latent skill mastery probabilities P(Lt) across 10 Common Core standards with observation weighting (independent vs hint-assisted).',
        tech: ['Bayesian Knowledge Tracing', 'Hidden Markov Models', 'MLE Calibration', 'ASSISTments Data'],
      },
      {
        step: 5,
        title: 'Misconception-Targeted Adaptive RAG & Radar',
        description: 'Retrieves targeted remediation problems from Supabase pgvector and updates an interactive 10-axis CCSS mastery radar in real time.',
        tech: ['Supabase pgvector', 'gemini-embedding-001', 'Realtime WebSockets', 'SVG Mastery Radar'],
      },
    ],
    dbOptimization: {
      engine: 'Supabase PostgreSQL + pgvector',
      strategy: 'Cosine Similarity Indexing on Misconception Vectors & JSONB Session Cache',
      indexDefinition: 'CREATE INDEX ON math_problems USING ivfflat (embedding vector_cosine_ops);',
      beforeLatency: 'Stateless / Uncalibrated',
      afterLatency: '< 150ms Full Pipeline',
      improvementPercent: '100% Zero Leakage',
      details:
        'Combines dense 768-dimensional problem embeddings with composite pedagogical utility scoring (balancing error remediation, semantic similarity, and Zone of Proximal Development). Prevents mastery inflation with weighted Bayesian updates.',
      metrics: [
        { label: 'Answer Leakage Rate', value: '0.00% Guaranteed' },
        { label: 'Skills Calibrated', value: '10 CCSS Standards' },
        { label: 'Vector Dimension', value: '768-dim pgvector' },
        { label: 'Unit Test Coverage', value: '12 / 12 Tests Passing' },
      ],
    },
    security: {
      auth: 'HMAC-SHA256 session token authentication and IDOR protection on student learning histories.',
      rbac: 'Role boundaries: Student (interaction session), Parent (read-only progress radar & alert preferences), Educator (curriculum review).',
      middleware: ['Anti-Leak Output Scanner', 'Dual-Tier Memory/Redis Rate Limiter', 'Row Level Security (RLS)', 'CORS Strict Whitelist'],
    },
    loadTesting: {
      tool: 'PyTest & Automated Socratic Safety Suite',
      concurrency: 'Multi-Turn Conversational Sessions',
      totalRequests: '12 / 12 Automated Verification Tests Passing',
      p95Latency: '< 150ms API Gateway Overhead',
      errorRate: '0.00%',
      summary:
        'Validated against adversarial answer-extraction prompts, handwritten photo noise variations, and concurrent session state persistence across SQLite/Redis fallbacks.',
    },
    scenario: {
      title: 'Direct Answer Leak Prevention & Socratic Interception',
      summary: 'When a student requests direct homework answers, Veritas intercepts the response and substitutes a scaffolded Socratic question to guide the student toward independent discovery.',
      recoveryKey: 'Socratic Safety Shield + Secondary Verifier Guardrail',
    },
  },

  'Predictive Maintenance System': {
    id: 'pms',
    title: 'Predictive Maintenance System — Industrial Telemetry ML',
    tagline: 'CalibratedClassifierCV Platt Scaling, SHAP TreeExplainer & PSI Data Drift Engine',
    summary:
      'An end-to-end industrial machine learning platform for real-time equipment telemetry risk assessment. Combines hyperparameter-tuned XGBoost with Platt sigmoid calibration to cut Brier score error by 62.9% on severely imbalanced datasets (28:1 ratio), providing explainable diagnostics via SHAP and continuous distribution drift monitoring via PSI.',
    systemFlow: [
      {
        step: 1,
        title: 'Industrial Telemetry Ingestion',
        description: 'Ingests real-time sensor streams (RPM, Temperature, Vibration, Pressure, Operating Hours) with client-level rate limiting via slowapi.',
        tech: ['FastAPI 0.115', 'slowapi Rate Limiter', 'Pydantic v2', 'Batch CSV/Parquet Parser'],
      },
      {
        step: 2,
        title: 'Calibrated Risk Inference (XGBoost + Platt Scaling)',
        description: 'Evaluates failure probability using XGBoost wrapped in CalibratedClassifierCV (sigmoid calibration), aligning outputs with true empirical risk frequencies.',
        tech: ['XGBoost', 'CalibratedClassifierCV', 'Platt Scaling (cv=3)', 'scikit-learn'],
      },
      {
        step: 3,
        title: 'Real-Time Explainability Engine (SHAP)',
        description: 'Calculates local Shapley values via TreeExplainer to deliver per-prediction feature attribution ranking the physical drivers behind elevated risk.',
        tech: ['SHAP TreeExplainer', 'Feature Attributions', 'Local Explanations', 'NumPy'],
      },
      {
        step: 4,
        title: 'Statistical Data Drift Monitor (PSI Engine)',
        description: 'Computes Population Stability Index comparing incoming telemetry distributions against baseline reference statistics, flagging operational drift.',
        tech: ['Population Stability Index', 'Baseline Statistics', 'Automated Drift Alerts', 'Threshold Profiler'],
      },
      {
        step: 5,
        title: 'Observability & Interactive React Dashboard',
        description: 'Exposes Prometheus metrics (/metrics) for Grafana dashboards, persists inference audit logs in PostgreSQL/SQLite, and renders a live React 19 UI.',
        tech: ['React 19', 'Prometheus /metrics', 'PostgreSQL Audit Store', 'Grafana Dashboards'],
      },
    ],
    dbOptimization: {
      engine: 'PostgreSQL / SQLite + Joblib Artifacts',
      strategy: 'Sigmoid Probability Calibration & Structured Inference Audit Logging',
      indexDefinition: 'CREATE INDEX idx_inference_time ON inference_logs(timestamp DESC, failure_risk);',
      beforeLatency: 'Brier: 0.0638 (Uncalibrated)',
      afterLatency: 'Brier: 0.0237 (Calibrated)',
      improvementPercent: '62.9% Error Drop',
      details:
        'Platt sigmoid calibration transforms distorted monotonic boosting ranks into empirically trustworthy probabilities. Tuning the decision threshold across the PR curve to 0.2619 elevates F1-score to 0.4966 under severe class imbalance.',
      metrics: [
        { label: 'ROC-AUC Score', value: '0.9489 Test AUC' },
        { label: 'Brier Score Loss', value: '0.0237 (62.9% Drop)' },
        { label: 'Calibrated F1 Score', value: '0.4966 (PR-Tuned)' },
        { label: 'Inference Latency', value: '< 15ms per payload' },
      ],
    },
    security: {
      auth: 'Administrative X-API-Key and JWT bearer tokens protecting mutating administrative endpoints (retrain, history purge).',
      rbac: 'Public inference / metrics access with strict client IP rate limiting (60 req/min) alongside authenticated admin privileges.',
      middleware: ['slowapi Rate Limiter', 'Pydantic Strict Validation', 'X-API-Key Verification', 'Prometheus Instrumentation'],
    },
    loadTesting: {
      tool: 'GitHub Actions CI & PyTest Performance Suite',
      concurrency: 'Batch Processing up to 5,000 rows / 5MB payloads',
      totalRequests: 'Full Benchmark Suite Passing',
      p95Latency: '< 15ms Single / < 450ms 5K Batch',
      errorRate: '0.00%',
      summary:
        'Benchmark validated across 5 distinct model architectures (Logistic Regression, Random Forest, LightGBM, uncalibrated XGBoost, and calibrated XGBoost).',
    },
    scenario: {
      title: 'Sensor Distribution Shift & Population Stability Drift Alert',
      summary: 'When extended industrial runtime causes sensor drift (PSI >= 0.25), the drift detection engine immediately issues an alert and triggers background retraining with hot reload.',
      recoveryKey: 'Population Stability Index (PSI) Engine + Hot Retraining',
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
    tagline: 'High-Throughput Go 1.24 Engine, Strangler Fig Dual Frontend & Sub-Millisecond Food Rescue',
    summary:
      'A cloud-native food rescue ecosystem connecting surplus donors with community shelters and NGOs. Features a high-concurrency Go 1.24 Gin backend, Next.js 15 App Router & React 19 dual frontends, Google Gemini 2.5 Flash multimodal intake, PostgreSQL compound B-tree indexing, and Redis 7 caching.',
    systemFlow: [
      {
        step: 1,
        title: 'Presentation & Ingress (Next.js 15 + React 19)',
        description: 'Strangler Fig dual frontend: Next.js 15 App Router handles public feeds, SEO, and AI donor intake; React 19 Vite SPA powers live Leaflet maps, Socket.IO chat, and HTML5 camera QR scanning.',
        tech: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Leaflet'],
      },
      {
        step: 2,
        title: 'High-Performance Go API Gateway (Gin :5000)',
        description: 'Compiled Go 1.24 static binary with Gin routing, dynamic CORS origin whitelisting, tiered rate limiters (API, Auth, AI), and JWT authentication with token versioning for instant global revocation.',
        tech: ['Go 1.24', 'Gin Gonic', 'JWT Versioning', 'CORS'],
      },
      {
        step: 3,
        title: 'Dispatch, Reservations & Goroutines',
        description: 'Atomic reservation claims with PostgreSQL row-level locks (SELECT FOR UPDATE) preventing double-claims, alongside native Go concurrent schedulers for automated listing expiration sweeps.',
        tech: ['Go Goroutines', 'ACID Row Locks', 'Cron Schedulers'],
      },
      {
        step: 4,
        title: 'Persistence & Cache Tier (PostgreSQL + Redis)',
        description: 'PostgreSQL with compound B-tree index on (status, pickup_window, location_id) and automated schema/column sync on boot, backed by Redis 7 (go-redis/v9) for high-frequency cache and rate limiting.',
        tech: ['PostgreSQL 15', 'Redis 7', 'B-Tree Indexing', 'lib/pq'],
      },
      {
        step: 5,
        title: 'AI Multimodal & Verification Vault',
        description: 'Google Gemini 2.5 Flash multimodal AI analyzes donor photos in 5s with food safety tags, paired with time-locked HMAC QR validation tokens and Razorpay payment verification.',
        tech: ['Gemini 2.5 Flash', 'HMAC QR Tokens', 'Razorpay Gateway', 'Cloudinary'],
      },
    ],
    dbOptimization: {
      engine: 'PostgreSQL 15 / Native Go Driver',
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
      auth: 'Argon2id/Bcrypt password hashing with JWT access tokens featuring an incrementing token_version on user records for instantaneous multi-device revocation on reset.',
      rbac: 'Hierarchical RBAC: Donors (create & manage batches), NGOs (view unallocated items, execute claims), Volunteers (pickup logistics), and Admins (KYC & system audit logs).',
      middleware: ['AI Dual Guardrails (PII Redaction & Secret Leaks)', 'HMAC Signature Verification', 'Tiered Rate Limiters', 'Security Headers (CSP, HSTS)', 'Fail-Closed CORS'],
    },
    loadTesting: {
      tool: 'Artillery & Go Goroutine Benchmarking',
      concurrency: '187 requests/sec peak (Go 1.24 Gin Engine)',
      totalRequests: '19,000+ total requests',
      p95Latency: '12.4ms (sub-millisecond Go core)',
      errorRate: '0.00%',
      summary:
        'Pushed 19K+ requests over multi-phase stress scenarios. Validated rate-limit defenses, sub-millisecond Go API responses, zero double-allocation race conditions under concurrency, and resilient PostgreSQL connection pool management.',
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
    tagline: 'Compiled Golang 1.24 Engine, Distributed Kafka Streaming & Haskell-Verified Matchmaking',
    summary:
      'An enterprise on-demand driver hiring ecosystem engineered with a compiled Go 1.24 Gin backend (3.6x throughput at ~19,400 req/sec, 8.4ms p99), dual-stream dispatch (Gorilla WebSockets + durable Apache Kafka), Haskell-verified pure functional scoring with Gemini AI re-ranking, and MongoDB 2dsphere indexing.',
    systemFlow: [
      {
        step: 1,
        title: 'Client Portal & PWA (React 19 + Tailwind v4)',
        description: 'Progressive Web App with customer booking, driver radar, and admin consoles. Features OpenStreetMap & Leaflet geospatial routing and real-time GPS coordinate streaming.',
        tech: ['React 19', 'Vite 8', 'TailwindCSS v4', 'Leaflet'],
      },
      {
        step: 2,
        title: 'High-Performance Go Gateway (Gin :5000)',
        description: 'Compiled Go 1.24 static binary with dual /api/v1 and /api routes, fail-closed CORS, double-submit HMAC-SHA256 CSRF protection, TOTP 2FA, and request correlation IDs.',
        tech: ['Golang 1.24', 'Gin Gonic', 'TOTP 2FA', 'HMAC CSRF'],
      },
      {
        step: 3,
        title: 'Dual-Stream Dispatch & Kafka Streaming',
        description: 'Separates sub-50ms Gorilla WebSocket room-based dispatch alerts from durable Apache Kafka SASL/TLS enterprise domain event logs for auditability and zero lost updates.',
        tech: ['Gorilla WebSocket', 'Apache Kafka', 'segmentio/kafka-go', 'Room Hub'],
      },
      {
        step: 4,
        title: 'Algorithmic Matchmaking Core',
        description: 'Deterministic multi-variable scoring model (Haversine distance, driver rating, acceptance rate, idle time) verified in Haskell (fp-poc/) with Gemini 2.5 Flash contextual AI re-ranking.',
        tech: ['Haskell-Verified Engine', 'Gemini 2.5 Flash', 'Heuristic Scoring'],
      },
      {
        step: 5,
        title: 'Geospatial Persistence & Fintech Tier',
        description: 'MongoDB Atlas with 2dsphere indexing for sub-1ms driver discovery, paired with automated Razorpay digital driver wallets (90% instant payout on ride completion) and in-memory TTL caching.',
        tech: ['MongoDB Atlas', '2dsphere Indexing', 'Razorpay Gateway', 'Go Driver v1.17'],
      },
    ],
    dbOptimization: {
      engine: 'MongoDB Atlas (Official Go Driver v1.17+)',
      strategy: 'Geospatial 2dsphere & Compound Availability Indexing with In-Memory TTL Cache',
      indexDefinition: 'db.drivers.createIndex({ location: "2dsphere", isAvailable: 1, rating: -1 })',
      beforeLatency: '~180ms',
      afterLatency: '~1ms (0.84ms in benchmarks)',
      improvementPercent: '99%',
      details:
        'Matching nearby available drivers required calculating spherical distances across driver coordinates. Implementing a 2dsphere compound index reduced search complexity from O(N) to O(log N). Sub-millisecond execution is paired with in-memory TTL driver cache.',
      metrics: [
        { label: 'Search Complexity', value: 'O(N) → O(log N)' },
        { label: 'Geospatial Latency', value: '0.84ms sustained' },
        { label: 'Dispatch Latency', value: '< 50ms WebSocket alert' },
        { label: 'Kafka Delivery', value: 'At-least-once offset commit' },
      ],
    },
    security: {
      auth: 'Bcrypt password hashing (12 salt rounds), JWT authentication, and TOTP Two-Factor Authentication with QR enrollment.',
      rbac: 'Role-Based Access Control isolating Customer portals, Driver dispatches, and Admin KYC review suites.',
      middleware: ['Double-submit HMAC-SHA256 CSRF', 'HTTP-only SameSite Cookies', 'Fail-Closed CORS Whitelist', 'Gin Recovery Interceptor', 'IP Rate Limiting'],
    },
    loadTesting: {
      tool: 'Golang Engine Concurrent Load Benchmark & Artillery',
      concurrency: '~19,400 req/sec (3.6x Throughput boost)',
      totalRequests: '100 Virtual Users Concurrent Stress',
      p95Latency: '8.4ms p99 latency (down from 43ms in Express)',
      errorRate: '0.00%',
      summary:
        'Post-Golang migration audit benchmarked 19,400 req/sec throughput with 3.12ms average latency, 8.4ms p99 latency, 88% idle memory drop down to 21MB, and <15ms cold start time across 48 Go REST endpoints.',
    },
    scenario: {
      title: 'Dual-Stream Dispatch & Kafka Audit Durability',
      summary: 'Sub-50ms Gorilla WebSocket alerts provide immediate UI feedback to nearby drivers while Apache Kafka commits durable partition offsets, preventing lost ride dispatches during sudden network partitions.',
      recoveryKey: 'Gorilla WebSocket Hub + Kafka SASL/TLS Durable Stream',
    },
  },
};
