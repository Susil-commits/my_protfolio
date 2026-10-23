import profilePic from '../assets/PF.jpeg';

// Optimized certificate assets (fast 5KB thumbs + crisp 100KB full web previews)
import nasscomBigDataThumb from '../assets/thumbs/nasscombigdata.webp';
import nasscomBigDataFull from '../assets/optimized/nasscombigdata.webp';

import hackathonCertThumb from '../assets/thumbs/hackathoniiitcert.webp';
import hackathonCertFull from '../assets/optimized/hackathoniiitcert.webp';

import nptelTestingCertThumb from '../assets/thumbs/testingcerrt.webp';
import nptelTestingCertFull from '../assets/optimized/testingcerrt.webp';

import nptelIotCertThumb from '../assets/thumbs/iotnptelcert.webp';
import nptelIotCertFull from '../assets/optimized/iotnptelcert.webp';

// Oracle Cloud Infrastructure — Generative AI Professional (1Z0-1127-25)
import oracleGenAiCertThumb from '../assets/thumbs/oracle_gen_ai_cert.webp';
import oracleGenAiCertFull from '../assets/optimized/oracle_gen_ai_cert.webp';
import oracleGenAiScoreThumb from '../assets/thumbs/gen_ai_score_report.webp';
import oracleGenAiScoreFull from '../assets/optimized/gen_ai_score_report.webp';
import oracleGenAiBadgeThumb from '../assets/thumbs/ai_tag.webp';
import oracleGenAiBadgeFull from '../assets/optimized/ai_tag.webp';

// Oracle Cloud Infrastructure — Data Science Professional (1Z0-1110-25)
import oracleDataScienceCertThumb from '../assets/thumbs/data_science_cert.webp';
import oracleDataScienceCertFull from '../assets/optimized/data_science_cert.webp';
import oracleDataScienceScoreThumb from '../assets/thumbs/score_report_data_science.webp';
import oracleDataScienceScoreFull from '../assets/optimized/score_report_data_science.webp';
import oracleDataScienceBadgeThumb from '../assets/thumbs/data_tag.webp';
import oracleDataScienceBadgeFull from '../assets/optimized/data_tag.webp';

// Oracle Certified Foundations Associate — Agentic AI (1Z0-1157-26)
import oracleAgenticAiCertThumb from '../assets/thumbs/oracle_agentic_ai_cert.webp';
import oracleAgenticAiCertFull from '../assets/optimized/oracle_agentic_ai_cert.webp';
import oracleAgenticAiScoreThumb from '../assets/thumbs/agentic_ai_score_report.webp';
import oracleAgenticAiScoreFull from '../assets/optimized/agentic_ai_score_report.webp';
import oracleAgenticAiBadgeThumb from '../assets/thumbs/agentic_ai_badge.webp';
import oracleAgenticAiBadgeFull from '../assets/optimized/agentic_ai_badge.webp';

// Experience certificates
import techgeeringCertThumb from '../assets/thumbs/techgeering_cert.webp';
import techgeeringCertFull from '../assets/optimized/techgeering_cert.webp';
import fullstackJavaCertThumb from '../assets/thumbs/fullstackjava.webp';
import fullstackJavaCertFull from '../assets/optimized/fullstackjava.webp';
import sdiCertThumb from '../assets/thumbs/sdicert.webp';
import sdiCertFull from '../assets/optimized/sdicert.webp';

// Bootcamps & Courses
import htmlCssBootcampThumb from '../assets/thumbs/htmlcssbootcamp.webp';
import htmlCssBootcampFull from '../assets/optimized/htmlcssbootcamp.webp';
import reactBootcampThumb from '../assets/thumbs/reactbootcamp.webp';
import reactBootcampFull from '../assets/optimized/reactbootcamp.webp';
import restNodeExpressBootcampThumb from '../assets/thumbs/restwithnodeexpressbootcamp.webp';
import restNodeExpressBootcampFull from '../assets/optimized/restwithnodeexpressbootcamp.webp';

export const personal = {
  name: 'Susil Kumar Nayak',
  firstName: 'Susil',
  lastName: 'Nayak',
  title: 'Full-Stack & Distributed Systems Engineer',
  location: 'Odisha, India',
  email: 'nayaksusil963@gmail.com',
  phone: '+91 8984339007',
  resumes: [
    {
      role: 'AI / ML & Cloud Infrastructure',
      subtitle: 'Engineering',
      url: 'https://drive.google.com/file/d/1i8YK3XQLwm5e_ow4Hq5ypD0TxwoLzS0O/view?usp=sharing',
      icon: 'ai',
    },
  ],
  logo: 'Portfolio',
  avatar: profilePic,
  social: {
    linkedin: 'https://www.linkedin.com/in/susil-kumar-nayak-5180472b6/',
    github: 'https://github.com/Susil-commits',
    twitter: '',
  },
};

export const hero = {
  eyebrow: 'Distributed Systems · Cloud-Native · Full-Stack',
  roles: ['Distributed Systems', 'Cloud-Native & DevOps', 'Full-Stack Development', 'Autonomous AI / ML'],
  tagline:
    "Hey there, I'm Susil! 👋 I'm a full-stack developer passionate about building intelligent, production-ready applications — blending Go, React/Next.js, and Node.js with AI/ML systems like RAG, LLMs, and predictive modeling.",
};

export const about = {
  headline: ['Software Engineer building', 'practical systems, web apps & AI.'],
  principles: {
    howIThink: [
      {
        title: 'Clarify before coding',
        description: 'Break complex requirements into clear, testable parts before implementing them.',
        tag: 'Decomposition',
        icon: 'puzzle',
      },
      {
        title: 'Target root causes',
        description: 'Understand why a system fails rather than applying quick symptom patches.',
        tag: 'Root-Cause',
        icon: 'target',
      },
      {
        title: 'Ship and iterate',
        description: 'Deliver working, verified increments and refine them with real feedback.',
        tag: 'Iteration',
        icon: 'rocket',
      },
      {
        title: 'Disciplined debugging',
        description: 'Analyze logs, study the documentation, and verify assumptions methodically.',
        tag: 'Investigation',
        icon: 'terminal',
      },
      {
        title: 'Production standards',
        description: 'Write clean commits, handle edge cases defensively, and test critical user paths.',
        tag: 'Reliability',
        icon: 'shield',
      },
    ],
    whatIBring: [
      {
        title: 'Full-stack development',
        description: 'Responsive React and Next.js frontends backed by high-concurrency Go (Golang), Node.js, and Python APIs.',
        tag: 'Full-Stack',
        icon: 'layers',
      },
      {
        title: 'Applied AI & ML',
        description: 'Integrating LLMs, RAG, and predictive models into functional applications.',
        tag: 'AI/ML',
        icon: 'brain',
      },
      {
        title: 'Backend & databases',
        description: 'Designing REST endpoints, data models, indexing strategies, and background tasks.',
        tag: 'Backend',
        icon: 'code',
      },
      {
        title: 'Testing & quality',
        description: 'Writing automated unit tests, load tests, and CI checks to prevent regressions.',
        tag: 'Quality',
        icon: 'check',
      },
      {
        title: 'Continuous learning',
        description: 'Proactively picking up new tools, learning from reviews, and collaborating cleanly.',
        tag: 'Growth',
        icon: 'sparkles',
      },
    ],
  },
};

export const skills = [
  {
    category: 'Distributed & AI',
    icon: '⚡',
    items: ['Kafka', 'PyTorch', 'LangGraph', 'XGBoost', 'Redis', 'BullMQ', 'Python', 'FastAPI'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁',
    items: ['Kubernetes', 'Docker', 'Prometheus', 'Grafana', 'CI/CD', 'OpenTelemetry', 'AWS', 'Linux'],
  },
  {
    category: 'Backend & Data',
    icon: '◈',
    items: ['Go', 'Gin', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Supabase', 'REST APIs'],
  },
  {
    category: 'Frontend & Languages',
    icon: '⌘',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'C++', 'Java', 'Tailwind CSS', 'Socket.IO'],
  },
];

export const projects = [
  {
    title: 'APEX',
    subtitle: 'Autonomous F1 Race Strategy Intelligence & Digital Twin',
    category: 'Distributed Systems & AI',
    icon: '🏎️',
    gradient: 'from-rose-500/15 via-amber-500/10 to-transparent',
    description:
      'Distributed autonomous Formula 1 pit-wall mission control platform streaming 60Hz telemetry across Apache Kafka topics. Coupled with BullMQ/Redis asynchronous worker queues, Safe RL action masking guardrails, Multi-Agent Pit Wall Consensus (5 specialist agents), TreeSHAP feature attributions, and a Three.js 3D WebGL Digital Twin HUD. 172/172 automated tests passing with 0.0245ms p99 feature store extraction.',
    tags: ['Kafka', 'PyTorch', 'FastAPI', 'Redis', 'BullMQ', 'Kubernetes', 'Helm', 'Prometheus', 'Three.js', 'Python', 'React.js'],
    link: 'https://f1-s-apex-autonomous-predictive-e-x.vercel.app/',
    github: 'https://github.com/Susil-commits/F1-s-APEX----Autonomous-Predictive-EXecutive-Race-Intelligence-',
    highlight: true,
    deployed: true,
    badge: 'Flagship AI & Streaming',
  },
  {
    title: 'Veritas',
    subtitle: 'AI Socratic Math Tutor & Cognitive Diagnostics',
    category: 'Distributed Systems & AI',
    icon: '🎓',
    gradient: 'from-cyan-500/15 via-blue-500/10 to-transparent',
    description:
      'Voice-first AI Socratic math tutor engineered around zero answer leakage. Coordinates multi-turn pedagogical dialogue through a compiled LangGraph state machine, analyzes handwritten scratchpad work using Gemini vision with bounding-box error reticles, and tracks curriculum mastery across 10 CCSS standards using Bayesian Knowledge Tracing (BKT) and Supabase pgvector.',
    tags: ['FastAPI', 'LangGraph', 'Gemini', 'PostgreSQL', 'pgvector', 'React 19', 'TypeScript', 'Supabase', 'Redis', 'Python'],
    link: 'https://veritas-tutor.vercel.app/',
    github: 'https://github.com/Susil-commits/Veritas',
    highlight: true,
    deployed: true,
    badge: 'AI Socratic Tutor',
  },
  {
    title: 'Predictive Maintenance System',
    subtitle: 'Industrial Equipment Telemetry & Calibrated ML Risk Platform',
    category: 'Distributed Systems & AI',
    icon: '⚙️',
    gradient: 'from-amber-500/15 via-orange-500/10 to-transparent',
    description:
      'End-to-end ML platform for industrial equipment telemetry and failure prediction. Combines hyperparameter-tuned XGBoost with Platt sigmoid calibration (CalibratedClassifierCV) to cut Brier score error by 62.9% on imbalanced data. Features real-time SHAP feature attributions, Population Stability Index (PSI) drift monitoring, Prometheus observability, and an interactive React dashboard.',
    tags: ['FastAPI', 'XGBoost', 'scikit-learn', 'SHAP', 'React 19', 'PostgreSQL', 'Prometheus', 'Grafana', 'Python'],
    link: 'https://predictive-maintenance-system-swart.vercel.app/',
    github: 'https://github.com/Susil-commits/Predictive-Maintenance-System',
    highlight: true,
    deployed: true,
    badge: 'Industrial ML & MLOps',
  },
  {
    title: 'FaRm',
    subtitle: 'Farmer-to-Consumer Marketplace',
    category: 'Full-Stack Web',
    icon: '🌾',
    gradient: 'from-emerald-500/10 to-green-500/5',
    description:
      'Full-stack marketplace enabling farmers to sell agricultural products directly to consumers. Optimized MongoDB queries with compound indexing to cut filter latency by 95% (~240ms to ~12ms). Load-tested the REST API with Artillery (200 concurrent users), sustaining sub-150ms p95 latency at 0% errors.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'Cloudinary', 'React Query', 'TypeScript'],
    link: 'https://farm-direct-marketplace-eta.vercel.app/',
    github: 'https://github.com/Susil-commits/FarmDirect',
    highlight: false,
    deployed: true,
    badge: 'Full-Stack MERN',
  },
  {
    title: 'Left2Serve',
    subtitle: 'AI Food Rescue & Redistribution Network',
    category: 'Full-Stack Web',
    icon: '🍲',
    gradient: 'from-orange-500/10 to-amber-500/5',
    description:
      'Cloud-native surplus food rescue ecosystem connecting donors with community shelters and NGOs. Migrated entire backend to a compiled Go 1.24 Gin engine delivering sub-millisecond API responses and concurrent goroutine job sweepers. Engineered a Strangler Fig dual frontend (Next.js 15 App Router for SSR discovery + React 19 for real-time dispatch and HTML5 QR scanner), Google Gemini 2.5 Flash multimodal AI image intake with automated shelf-life estimation, PostgreSQL compound B-tree indexing cutting query latency from 340ms to 12ms (96.4% drop), Redis 7 caching, time-locked HMAC QR handoff tokens, and Razorpay donations. Artillery benchmarked at 19K+ requests (187 req/sec peak) with zero double-claim race conditions.',
    tags: ['Go', 'Gin', 'Next.js', 'React.js', 'PostgreSQL', 'Redis', 'Gemini AI', 'Tailwind CSS', 'Docker'],
    link: 'https://left2-serve.vercel.app/',
    github: 'https://github.com/Susil-commits/Left2Serve',
    highlight: false,
    deployed: true,
    badge: 'Go 1.24 · Next.js · ACID',
  },
  {
    title: 'MyMate',
    subtitle: 'High-Concurrency On-Demand Driver Hiring Infrastructure',
    category: 'Full-Stack Web',
    icon: '🚗',
    gradient: 'from-blue-500/10 to-indigo-500/5',
    description:
      'Enterprise driver booking platform connecting individuals and businesses with verified professional drivers. Migrated backend to Golang 1.24 (Gin), boosting throughput by 3.6x (~19,400 req/sec), slashing p99 latency by 80% to 8.4ms, and reducing memory footprint by 88% down to 21MB with <15ms cold starts across 48 Go REST endpoints. Engineered a dual-stream architecture separating sub-50ms Gorilla WebSocket dispatches from durable Apache Kafka SASL/TLS event logs. Powered by a Haskell-verified pure functional scoring engine combined with Google Gemini 2.5 Flash contextual AI re-ranking, MongoDB 2dsphere indexing (~1ms), automated Razorpay digital driver wallets (90% instant payout), TOTP 2FA, and double-submit HMAC-SHA256 CSRF protection.',
    tags: ['Go', 'Gin', 'Apache Kafka', 'React.js', 'MongoDB', 'Redis', 'WebSockets', 'Gemini AI', 'Docker'],
    link: 'https://my-mate-tawny.vercel.app/',
    github: 'https://github.com/Susil-commits/MyMate',
    highlight: false,
    deployed: true,
    badge: 'Go 1.24 · Kafka · 19.4K RPS',
  },
];

export const experiences = [
  {
    role: 'Backend Developer Intern',
    company: 'Techgeering Solutions Pvt. Ltd., Bhubaneswar',
    period: 'Oct 2025 – Feb 2026',
    description:
      'Developed backend modules for a Document Verification System using the MERN stack — implementing REST APIs, authentication, and database operations — and a secured video management module, while collaborating on backend integration, debugging, and API testing.',
    highlights: ['MERN Stack', 'REST APIs', 'Auth', 'API Testing', 'MongoDB', 'Debugging'],
    certificate: {
      thumb: techgeeringCertThumb,
      full: techgeeringCertFull,
      label: 'Certificate',
      title: 'Techgeering Solutions — Internship Certificate',
    },
    certificateLabel: 'Internship Certificate',
  },
  {
    role: 'Full Stack Java Intern',
    company: 'IIG Varsity, Bhubaneswar',
    period: 'Internship',
    description:
      'Developed a responsive Music Player with play/pause, volume, seek bar, and playlist functionality using HTML, CSS, and JavaScript.',
    highlights: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    certificate: {
      thumb: fullstackJavaCertThumb,
      full: fullstackJavaCertFull,
      label: 'Certificate',
      title: 'IIG Varsity — Full Stack Java Certificate',
    },
    certificateLabel: 'Completion Certificate',
  },
  {
    role: 'Embedded Systems Intern',
    company: 'Skill Development Institute, Bhubaneswar',
    period: 'Internship',
    description:
      'Developed a cloud-connected real-time weather monitoring module using embedded systems and IoT concepts.',
    highlights: ['Embedded Systems', 'IoT', 'Cloud', 'Real-time'],
    certificate: {
      thumb: sdiCertThumb,
      full: sdiCertFull,
      label: 'Certificate',
      title: 'Skill Development Institute — IoT Internship Certificate',
    },
    certificateLabel: 'Internship Certificate',
  },
];

export const education = [
  {
    institution: 'Gandhi Institute for Technology',
    location: 'Bhubaneswar, Odisha',
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    period: 'Dec 2022 – Jun 2026',
    score: 'CGPA: 7.77',
  },
  {
    institution: 'Gyan Bharti Institute of Science & Technology',
    location: 'Bhubaneswar, Odisha',
    degree: 'CHSE · Class XII',
    field: 'Higher Secondary',
    period: 'Apr 2020 – Mar 2022',
    score: 'Aggregate: 75.83%',
  },
  {
    institution: 'Saraswati Shishu Vidya Mandir',
    location: 'Banki, Odisha',
    degree: 'Matriculation · Class X',
    field: 'Secondary',
    period: '2020',
    score: 'Aggregate: 71.83%',
  },
];

export const achievements = [
  {
    title: 'NASSCOM Gold — Big Data Technology',
    description:
      'Gold-certified (70%+ score), assessed under IT-ITeS Sector Skills Council standards backed by the Ministry of Electronics & IT, Government of India.',
    icon: '🥇',
    certificates: [
      {
        thumb: nasscomBigDataThumb,
        full: nasscomBigDataFull,
        label: 'Certificate',
        title: 'NASSCOM Gold Big Data Assessment Certificate',
      },
    ],
  },
  {
    title: 'IIIT Hackfest Finalist — Team Leader',
    description:
      'Finalist at IIIT Bhubaneswar Hackfest, leading a team to build a real-time PVP quiz trivia application.',
    icon: '🏆',
    certificates: [
      {
        thumb: hackathonCertThumb,
        full: hackathonCertFull,
        label: 'Certificate',
        title: 'IIIT Bhubaneswar Hack Fest Finalist Certificate',
      },
    ],
  },
  {
    title: 'NPTEL — Software Testing & IoT 4.0',
    description:
      'Successfully cleared NPTEL exams in Software Testing and IoT 4.0, covering QA, test design, IoT architecture, and embedded systems.',
    icon: '📜',
    certificates: [
      {
        thumb: nptelTestingCertThumb,
        full: nptelTestingCertFull,
        label: 'Testing Cert',
        title: 'NPTEL Elite Software Testing Certification',
      },
      {
        thumb: nptelIotCertThumb,
        full: nptelIotCertFull,
        label: 'IoT Cert (73%)',
        title: 'NPTEL Elite Industry 4.0 & IoT Certification',
      },
    ],
  },
  {
    title: 'Oracle Cloud — Generative AI Professional',
    description:
      'Exam 1Z0-1127-25 (80% score). Certified in OCI GenAI services, LLM fine-tuning, RAG architecture, LangChain integration, and Oracle 23ai vector database.',
    icon: '🤖',
    certificates: [
      {
        thumb: oracleGenAiCertThumb,
        full: oracleGenAiCertFull,
        label: 'Certificate',
        title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
      },
      {
        thumb: oracleGenAiScoreThumb,
        full: oracleGenAiScoreFull,
        label: 'Score (80%)',
        title: 'OCI Generative AI Professional — Score Report (80% / 1Z0-1127-25)',
      },
      {
        thumb: oracleGenAiBadgeThumb,
        full: oracleGenAiBadgeFull,
        label: 'Badge',
        title: 'Oracle Certified Professional Generative AI 2025 Official Badge',
      },
    ],
  },
  {
    title: 'Oracle Cloud — Data Science Professional',
    description:
      'Exam 1Z0-1110-25 (82% score). Certified in OCI Data Science, ADS SDK, AI Quick Actions, custom training jobs, Model Catalog, and production MLOps deployment.',
    icon: '📊',
    certificates: [
      {
        thumb: oracleDataScienceCertThumb,
        full: oracleDataScienceCertFull,
        label: 'Certificate',
        title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
      },
      {
        thumb: oracleDataScienceScoreThumb,
        full: oracleDataScienceScoreFull,
        label: 'Score (82%)',
        title: 'OCI Data Science Professional — Score Report (82% / 1Z0-1110-25)',
      },
      {
        thumb: oracleDataScienceBadgeThumb,
        full: oracleDataScienceBadgeFull,
        label: 'Badge',
        title: 'Oracle Certified Professional Data Science 2025 Official Badge',
      },
    ],
  },
  {
    title: 'Oracle Certified Associate — Agentic AI',
    description:
      'Exam 1Z0-1157-26 (88% score). Certified in autonomous enterprise AI agent lifecycle, multi-agent workflows, tool execution, LangChain agent flow, OCI AI Vector Search, and MCP integration.',
    icon: '⚡',
    certificates: [
      {
        thumb: oracleAgenticAiCertThumb,
        full: oracleAgenticAiCertFull,
        label: 'Certificate',
        title: 'Oracle Certified Foundations Associate — Agentic AI Certificate of Recognition',
      },
      {
        thumb: oracleAgenticAiScoreThumb,
        full: oracleAgenticAiScoreFull,
        label: 'Score (88%)',
        title: 'Oracle Agentic AI Foundations Associate — Score Report (88% / 1Z0-1157-26)',
      },
      {
        thumb: oracleAgenticAiBadgeThumb,
        full: oracleAgenticAiBadgeFull,
        label: 'Badge',
        title: 'Oracle Certified Foundations Associate Agentic AI 2026 Official Badge',
      },
    ],
  },
];

export const certifications = [
  {
    title: 'HTML & CSS Bootcamp',
    description:
      'Completed an intensive bootcamp covering semantic HTML structure, modern CSS layout techniques, and responsive design fundamentals.',
    icon: '🎨',
    certificate: {
      thumb: htmlCssBootcampThumb,
      full: htmlCssBootcampFull,
      label: 'Bootcamp Cert',
      title: 'HTML & CSS Bootcamp Certificate',
    },
  },
  {
    title: 'React.js Bootcamp',
    description:
      'Hands-on bootcamp on React fundamentals — components, hooks, state management, and building production-ready single-page applications.',
    icon: '⚛',
    certificate: {
      thumb: reactBootcampThumb,
      full: reactBootcampFull,
      label: 'React Cert',
      title: 'React.js Bootcamp Certificate',
    },
  },
  {
    title: 'REST APIs with Node & Express',
    description:
      'Bootcamp focused on designing and building RESTful APIs using Node.js and Express, including routing, middleware, and authentication patterns.',
    icon: '🔌',
    certificate: {
      thumb: restNodeExpressBootcampThumb,
      full: restNodeExpressBootcampFull,
      label: 'REST API Cert',
      title: 'Create REST APIs with Node.js & Express Certificate',
    },
  },
];
