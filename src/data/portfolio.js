import profilePic from '../../assets/PF.jpeg';

import nasscomBigDataCert from '../../assets/nasscombigdata.png';
import nasscomDataTag from '../../assets/data_tag.jpg';
import nasscomAiTag from '../../assets/ai_tag.jpg';
import hackathonCert from '../../assets/hackathoniiitcert.jpeg';
import nptelTestingCert from '../../assets/testingcerrt.jpeg';
import nptelIotCert from '../../assets/iotnptelcert.jpeg';
import oracleGenAiCert from '../../assets/ORacle_gen_ai_cert.jpg';
import oracleGenAiScore from '../../assets/gen_ai_score_report.jpg';
import oracleDataScienceCert from '../../assets/Data_Science_cert.jpg';
import oracleDataScienceScore from '../../assets/Score_Report_Data_Science.jpg';

import techgeeringCert from '../../assets/Techgeering_Cert.png';
import fullstackJavaCert from '../../assets/Fullstackjava.jpeg';
import sdiCert from '../../assets/sdicert.jpeg';

import htmlCssBootcamp from '../../assets/htmlcssbootcamp.png';
import reactBootcamp from '../../assets/reactbootcamp.png';
import restNodeExpressBootcamp from '../../assets/restwithnodeexpressbootcamp.png';

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
    'Engineering resilient, high-throughput distributed systems, autonomous AI digital twins, and full-stack cloud platforms — from Apache Kafka streaming pipelines and Kubernetes orchestration to sub-millisecond mathematical optimization and production-tested web architectures.',
};

export const about = {
  headline: ['Engineer who ships —', 'across distributed systems, AI & cloud.'],
  paragraphs: [
    'I engineer production-grade distributed architectures, autonomous AI digital twins, and high-performance full-stack web platforms. From event-driven telemetry streaming on Apache Kafka (APEX F1 Strategy Engine) and combinatorial satellite constellation solvers (ORBIT-X) to self-healing edge remediation (EdgeGuard) and cryptographic GitOps delivery controllers (HyperDeploy), I own systems from blank repository to cloud deployment.',
    'My work couples mathematical rigor and deep learning with cloud-native reliability: Google OR-Tools CP-SAT constraint solvers, PyTorch Multi-Head Cross-Attention neural surrogates, TreeSHAP explainability, and Safe-RL action masking guardrails. On the infrastructure front, I build with Docker, Kubernetes, Helm, Event-Driven Ansible (EDA), Redis/BullMQ, and full Prometheus/Grafana observability.',
    'Internship-tested across backend development (Techgeering Solutions, MERN stack), Java full-stack systems, and embedded IoT. Backed by Oracle Cloud Gen AI & Data Science certifications, NPTEL IoT & Software Testing, and NASSCOM Gold in Big Data, I design secure, zero-trust architectures with strict RBAC, automated rollbacks, and verified sub-millisecond latencies.',
  ],
  highlights: [
    { label: 'Production Platforms', value: '7 Shipped Systems' },
    { label: 'Streaming & Queues', value: 'Kafka · Redis · BullMQ' },
    { label: 'Cloud & Orchestration', value: 'Kubernetes · Helm · EDA' },
    { label: 'AI / ML & Optimization', value: 'PyTorch · CP-SAT · RL' },
  ],
};

export const skills = [
  {
    category: 'Distributed & AI',
    icon: '⚡',
    items: ['Kafka', 'PyTorch', 'Google OR-Tools', 'Redis', 'BullMQ', 'Python', 'FastAPI', 'Three.js'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁',
    items: ['Kubernetes', 'Docker', 'Helm', 'Ansible', 'Prometheus', 'Grafana', 'OpenTelemetry', 'AWS', 'CI/CD'],
  },
  {
    category: 'Backend & Data',
    icon: '◈',
    items: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'REST APIs', 'JWT'],
  },
  {
    category: 'Frontend & Languages',
    icon: '⌘',
    items: ['React.js', 'TypeScript', 'JavaScript', 'C++', 'Java', 'Tailwind CSS', 'Socket.IO', 'React Query'],
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
    link: 'https://github.com/Susil-commits/F1-s-APEX----Autonomous-Predictive-EXecutive-Race-Intelligence-',
    github: 'https://github.com/Susil-commits/F1-s-APEX----Autonomous-Predictive-EXecutive-Race-Intelligence-',
    highlight: true,
    badge: 'Flagship AI & Streaming',
  },
  {
    title: 'ORBIT-X',
    subtitle: 'Autonomous Orbital Resource Intelligence Network',
    category: 'Distributed Systems & AI',
    icon: '🛰️',
    gradient: 'from-cyan-500/15 via-blue-500/10 to-transparent',
    description:
      'Autonomous LEO multi-satellite constellation dispatching and 3D digital twin platform. Combines Google OR-Tools CP-SAT exact constraint optimization with a PyTorch Multi-Head Cross-Attention neural surrogate (<0.8ms inference, 84.6% top-1 agreement), WGS-84 J2 orbital propagator, Isolation Forest health anomaly detection, Stefan-Boltzmann radiative cooling ODEs, and 10-scenario space disaster resilience.',
    tags: ['Google OR-Tools', 'PyTorch', 'FastAPI', 'Redis', 'Kafka', 'Docker', 'Three.js', 'PostgreSQL', 'Python', 'TypeScript'],
    link: 'https://github.com/Susil-commits/ORBIT-X---Autonomous-Orbital-Resource-Intelligence-Network',
    github: 'https://github.com/Susil-commits/ORBIT-X---Autonomous-Orbital-Resource-Intelligence-Network',
    highlight: true,
    badge: 'Flagship Space AI',
  },
  {
    title: 'EdgeGuard',
    subtitle: 'Red Hat-Oriented Edge Monitoring & Self-Healing Platform',
    category: 'Cloud & DevOps',
    icon: '🛡️',
    gradient: 'from-red-500/15 via-orange-500/10 to-transparent',
    description:
      'Enterprise hybrid-edge monitoring and self-healing remediation platform powered by Red Hat Event-Driven Ansible (EDA) rulebooks. Features EWMA predictive trend forecasting (breach detection up to 6 hours ahead), offline-first SQLite WAL spooling with zero-duplication UUID idempotency, and an ALLOWED_PLAYBOOKS security allow-list registry.',
    tags: ['Ansible', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Python', 'React.js'],
    link: 'https://github.com/Susil-commits/EdgeGuard',
    github: 'https://github.com/Susil-commits/EdgeGuard',
    highlight: true,
    badge: 'Self-Healing Edge & EDA',
  },
  {
    title: 'HyperDeploy',
    subtitle: 'Hybrid Bare-Metal & K8s Continuous Delivery Controller',
    category: 'Cloud & DevOps',
    icon: '⚡',
    gradient: 'from-indigo-500/15 via-violet-500/10 to-transparent',
    description:
      'Enterprise-grade hybrid continuous delivery controller unifying bare-metal / VM management (via Ansible) and containerized workloads (via Kubernetes). Enforces Sigstore/Cosign cryptographic container verification, automated health-gated zero-downtime rollouts with instant single-function rollback (CrashLoopBackOff), and environment-aware GitOps drift reconciliation.',
    tags: ['Kubernetes', 'Ansible', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker', 'Python', 'TypeScript'],
    link: 'https://github.com/Susil-commits/HyperDeploy',
    github: 'https://github.com/Susil-commits/HyperDeploy',
    highlight: true,
    badge: 'GitOps & Delivery Engine',
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
    badge: 'Full-Stack MERN',
  },
  {
    title: 'Left2Serve',
    subtitle: 'Food Redistribution Platform',
    category: 'Full-Stack Web',
    icon: '🍲',
    gradient: 'from-orange-500/10 to-amber-500/5',
    description:
      'Full-stack food redistribution platform connecting donors and NGOs. Engineered a compound B-tree index in PostgreSQL to reduce average query latency from 340ms to 12ms. Load-tested the API with Artillery (19K+ requests at 187 req/sec), validating rate-limit defenses and maintaining 383ms median latency.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'JWT', 'Cloudinary', 'TypeScript'],
    link: 'https://left2-serve.vercel.app/',
    github: 'https://github.com/Susil-commits/Left2Serve',
    highlight: false,
    badge: 'ACID Concurrency',
  },
  {
    title: 'MyMate',
    subtitle: 'Driver Booking Platform',
    category: 'Full-Stack Web',
    icon: '🚗',
    gradient: 'from-blue-500/10 to-indigo-500/5',
    description:
      'Full-stack driver booking platform featuring real-time WebSocket location tracking, AI-heuristic driver matching, and Tesseract.js OCR. Implemented MongoDB compound indexing to cut execution time to ~1ms. Load-tested API at 200 concurrent users, sustaining 115 req/sec while resolving a Socket.IO chat race condition.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Socket.IO', 'TypeScript'],
    link: 'https://my-mate-tawny.vercel.app/',
    github: 'https://github.com/Susil-commits/MyMate',
    highlight: false,
    badge: 'Real-Time Telemetry',
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
    certificate: techgeeringCert,
    certificateLabel: 'Internship Certificate',
  },
  {
    role: 'Full Stack Java Intern',
    company: 'IIG Varsity, Bhubaneswar',
    period: 'Internship',
    description:
      'Developed a responsive Music Player with play/pause, volume, seek bar, and playlist functionality using HTML, CSS, and JavaScript.',
    highlights: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    certificate: fullstackJavaCert,
    certificateLabel: 'Completion Certificate',
  },
  {
    role: 'Embedded Systems Intern',
    company: 'Skill Development Institute, Bhubaneswar',
    period: 'Internship',
    description:
      'Developed a cloud-connected real-time weather monitoring module using embedded systems and IoT concepts.',
    highlights: ['Embedded Systems', 'IoT', 'Cloud', 'Real-time'],
    certificate: sdiCert,
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
    certificates: [nasscomBigDataCert],
  },
  {
    title: 'IIIT Hackfest Finalist — Team Leader',
    description:
      'Finalist at IIIT Bhubaneswar Hackfest, leading a team to build a real-time PVP quiz trivia application.',
    icon: '🏆',
    certificates: [hackathonCert],
  },
  {
    title: 'NPTEL — Software Testing & IoT 4.0',
    description:
      'Successfully cleared NPTEL exams in Software Testing and IoT 4.0, covering QA, test design, IoT architecture, and embedded systems.',
    icon: '📜',
    certificates: [nptelTestingCert, nptelIotCert],
  },
  {
    title: 'Oracle Certified Foundations Associate (Agentic AI)',
    description:
      'Exam 1Z0-1157-26; passed with 88% (Jul \'26). Also qualified the Gen AI and Data Science curriculum on Oracle Cloud Infrastructure.',
    icon: '☁',
    certificates: [oracleGenAiCert, oracleGenAiScore, oracleDataScienceCert, oracleDataScienceScore, nasscomDataTag, nasscomAiTag],
  },
];

export const certifications = [
  {
    title: 'HTML & CSS Bootcamp',
    description:
      'Completed an intensive bootcamp covering semantic HTML structure, modern CSS layout techniques, and responsive design fundamentals.',
    icon: '🎨',
    certificate: htmlCssBootcamp,
  },
  {
    title: 'React.js Bootcamp',
    description:
      'Hands-on bootcamp on React fundamentals — components, hooks, state management, and building production-ready single-page applications.',
    icon: '⚛',
    certificate: reactBootcamp,
  },
  {
    title: 'REST APIs with Node & Express',
    description:
      'Bootcamp focused on designing and building RESTful APIs using Node.js and Express, including routing, middleware, and authentication patterns.',
    icon: '🔌',
    certificate: restNodeExpressBootcamp,
  },
];
