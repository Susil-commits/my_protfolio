import profilePic from '../../assets/Profile_pic.png';

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
  title: 'Full-Stack Developer',
  location: 'Odisha, India',
  email: 'nayaksusil963@gmail.com',
  phone: '+91 8984339007',
  resumeUrl: '',
  logo: 'Portfolio',
  avatar: profilePic,
  social: {
    linkedin: 'https://www.linkedin.com/in/susil-kumar-nayak-5180472b6/',
    github: 'https://github.com/Susil-commits',
    twitter: '',
  },
};

export const hero = {
  eyebrow: 'Full-Stack Development',
  roles: ['Full-Stack Development', 'Data Science', 'AI / ML'],
  tagline:
    'Engineering secure, scalable web platforms end-to-end — from real-time APIs to polished, responsive interfaces that ship.',
};

export const about = {
  headline: ['Engineer who ships —', 'across web, data & AI.'],
  paragraphs: [
    "I build production-grade software end-to-end: secure REST APIs, real-time features, and the responsive interfaces on top of them. Three full-stack platforms — a farmer marketplace, a food redistribution network, and a driver booking system — are live evidence that I own a product from blank repo to deployment.",
    'Beyond the web stack, I bring data science and AI/ML into the loop — qualified on Oracle Cloud Gen AI & Data Science, NPTEL-certified in IoT, and a NASSCOM Gold tag in Big Data. That means I can wire an analytics dashboard, a model, or an intelligent feature into the products I build.',
    'Internship-tested across backend (Techgeering, MERN), Java full-stack, and embedded IoT. I write secure, well-architected code with JWT, RBAC, rate-limiting, and logging — and I am ready to contribute from day one.',
  ],
  highlights: [
    { label: 'MERN end-to-end', value: '3 shipped platforms' },
    { label: 'Security-first', value: 'JWT · RBAC · Helmet' },
    { label: 'AI/ML & Data', value: 'Oracle + NASSCOM Gold' },
    { label: 'Open to work', value: 'Graduating Jun 2026' },
  ],
};

export const skills = [
  {
    category: 'Programming',
    icon: '⌘',
    items: ['C++', 'Java', 'Python', 'JavaScript'],
  },
  {
    category: 'Frontend',
    icon: '▣',
    items: ['HTML', 'CSS', 'React.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: '◈',
    items: ['Node.js', 'Express.js', 'REST APIs', 'SQL', 'MongoDB'],
  },
  {
    category: 'Tools & Cloud',
    icon: '⚙',
    items: ['Git', 'GitHub', 'Vercel', 'Render', 'Jira', 'Cloudinary'],
  },
];

export const projects = [
  {
    title: 'FaRm',
    subtitle: 'Farmer-to-Consumer Marketplace',
    icon: '🌾',
    gradient: 'from-emerald-500/10 to-green-500/5',
    description:
      'Full-stack marketplace enabling farmers to sell agricultural products directly to consumers, eliminating intermediaries and increasing profits. Features secure JWT authentication, real-time order updates via Socket.IO, Cloudinary image uploads, React Query API caching, and analytics dashboards.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'Cloudinary', 'React Query'],
    link: 'https://farm-direct-marketplace-eta.vercel.app/',
    github: 'https://github.com/Susil-commits/FarmDirect',
    highlight: true,
  },
  {
    title: 'Left2Serve',
    subtitle: 'Food Redistribution Platform',
    icon: '🍲',
    gradient: 'from-orange-500/10 to-amber-500/5',
    description:
      'Full-stack platform connecting food donors, NGOs, volunteers, and administrators to reduce food waste by redistributing surplus food. Includes food listing, reservation, collection tracking, real-time status updates, JWT auth, role-based access control (RBAC), and an admin dashboard for donation management.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS', 'JWT', 'RBAC', 'Cloudinary'],
    link: '',
    github: 'https://github.com/Susil-commits/Left2Serve',
    highlight: false,
  },
  {
    title: 'MyMate',
    subtitle: 'Driver Booking Platform',
    icon: '🚗',
    gradient: 'from-blue-500/10 to-indigo-500/5',
    description:
      'Full-stack driver hiring platform allowing users to search, compare, book, and pay professional drivers for temporary or permanent requirements. Built secure REST APIs with JWT authentication, Cloudinary media storage, email notifications, and security features including Helmet, rate limiting, input validation, bcrypt, and Winston logging.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Helmet', 'Winston'],
    link: '',
    github: 'https://github.com/Susil-commits/MyMate',
    highlight: false,
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
      'Awarded a Gold tag by NASSCOM for successfully clearing the assessment on Big Data Technology.',
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
    title: 'Oracle Cloud Infrastructure — Gen AI & Data Science',
    description:
      'Qualified the Gen AI and Data Science curriculum on Oracle Cloud Infrastructure.',
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
