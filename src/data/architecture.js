/**
 * Comprehensive System Architecture & Engineering Blueprints
 * Ground truth data for interactive modals, system design section, and Gemini AI Assistant.
 */

export const systemPrinciples = [
  {
    title: 'High-Throughput API Gateway',
    description: 'Stateless Node/Express architecture backed by connection pooling, compression, and structured JSON logging.',
    icon: '⚡',
    metric: '187+ req/s',
    subtext: 'Sustained under Artillery load testing',
  },
  {
    title: 'Compound Indexing Strategy',
    description: 'Tailored compound B-tree indexes in MongoDB and PostgreSQL that eliminate collection scans and sort operations.',
    icon: '🎯',
    metric: '95% Latency Cut',
    subtext: '~240ms down to ~12ms execution time',
  },
  {
    title: 'Layered Defense-in-Depth',
    description: 'Enterprise-grade security pipeline spanning JWT authentication, Helmet HTTP headers, CORS policies, and fine-grained RBAC.',
    icon: '🛡️',
    metric: 'Zero Trust',
    subtext: 'Strict middleware validation per endpoint',
  },
  {
    title: 'Real-Time Event Synchronization',
    description: 'Bi-directional Socket.IO WebSocket channels with race-condition prevention mechanisms and automatic reconnection.',
    icon: '🔄',
    metric: 'Sub-50ms',
    subtext: 'Live geolocation & order status delivery',
  },
];

export const productionScenarios = [
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
