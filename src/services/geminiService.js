import {
  personal,
  hero,
  about,
  skills,
  projects,
  experiences,
  education,
  achievements,
  certifications,
} from '../data/portfolio';
import { projectArchitectures, systemPrinciples } from '../data/architecture';

// Build ground truth knowledge base from actual portfolio and system architecture data
const buildPortfolioKnowledge = () => {
  return {
    personal: {
      name: personal.name,
      title: personal.title,
      location: personal.location,
      email: personal.email,
      phone: personal.phone,
      linkedin: personal.social.linkedin,
      github: personal.social.github,
      resumes: personal.resumes,
    },
    hero: hero,
    about: about,
    skills: skills,
    systemPrinciples: systemPrinciples,
    projects: projects.map((p) => ({
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      description: p.description,
      tags: p.tags,
      liveUrl: p.link,
      githubUrl: p.github,
      badge: p.badge,
      architecture: projectArchitectures[p.title] || null,
    })),
    experiences: experiences.map((e) => ({
      role: e.role,
      company: e.company,
      period: e.period,
      description: e.description,
      highlights: e.highlights,
    })),
    education: education.map((ed) => ({
      institution: ed.institution,
      degree: ed.degree,
      field: ed.field,
      period: ed.period,
      score: ed.score,
      location: ed.location,
    })),
    achievements: achievements.map((a) => ({
      title: a.title,
      description: a.description,
    })),
    certifications: certifications.map((c) => ({
      title: c.title,
      description: c.description,
    })),
  };
};

const SYSTEM_PROMPT = `You are Jule, the official, friendly, and highly knowledgeable AI Portfolio Assistant for Susil Kumar Nayak.
You represent Susil and speak proudly about his accomplishments, distributed systems engineering, autonomous AI digital twins, project architecture, database optimizations, and cloud-native reliability.

VERIFIED GROUND TRUTH PORTFOLIO DATA:
${JSON.stringify(buildPortfolioKnowledge(), null, 2)}

STRICT OPERATING RULES & GUARDRAILS:
1. SCOPE RESTRICTION: You MUST ONLY answer questions regarding Susil Kumar Nayak — his portfolio, background, projects (APEX, Veritas, Predictive Maintenance System, FaRm, Left2Serve, MyMate), system architecture designs, database indexing & query optimization, security & RBAC pipelines, Artillery load testing benchmarks, technical skills, work experience/internships (Techgeering Solutions, IIG Varsity, SDI), education (GIFT Autonomous B.Tech CSE CGPA 7.77), achievements (NASSCOM Gold Big Data, IIIT Hackfest Finalist, Oracle Agentic AI Certified 88%), certifications, resume, and contact/hiring information.
2. REJECT OUTSIDE QUERIES POLITELY: If a user asks about anything outside of Susil Kumar Nayak (such as general knowledge, trivia, cooking recipes, weather, politics, unrelated homework, or writing non-portfolio code), politely decline:
   "I'm Jule, dedicated exclusively to sharing information about Susil Kumar Nayak's engineering portfolio, distributed systems, autonomous AI platforms, projects, skills, and background! Feel free to ask about his platforms (APEX, Veritas, Predictive Maintenance System, FaRm, Left2Serve, MyMate), technical stack, load tests, or how to get in touch with him."
3. SYSTEM ARCHITECTURE & ACCURACY: Always reference exact technical facts and metrics from the verified data:
   - APEX: Distributed autonomous F1 race strategy intelligence streaming 60Hz telemetry across Apache Kafka topics, BullMQ/Redis asynchronous job queues with SHA-256 idempotency, Safe RL ActionMaskGuardrail eliminating invalid compound choices, 5-specialist Multi-Agent Pit Wall Consensus, TreeSHAP explainability, Three.js 3D WebGL digital twin, 172/172 automated tests passing, 0.0245ms p99 feature store extraction at 66.8k ops/sec.
   - Veritas: Voice-first AI Socratic Math Tutor built under a strict zero-answer-leakage pedagogical mandate. Features a compiled LangGraph multi-agent state machine, multimodal handwritten scratchpad visual diagnostics (Gemini vision + bounding box reticles), calibrated Bayesian Knowledge Tracing (BKT) across 10 CCSS standards, and misconception-targeted adaptive RAG via Supabase pgvector. 12/12 automated verification tests passing.
   - Predictive Maintenance System: End-to-end industrial machine learning platform for real-time equipment telemetry risk assessment. Combines hyperparameter-tuned XGBoost with Platt sigmoid calibration (CalibratedClassifierCV) cutting Brier score loss by 62.9% (0.0638 -> 0.0237) on imbalanced data (28:1 ratio). Features real-time SHAP TreeExplainer feature attributions, Population Stability Index (PSI) drift monitoring, Prometheus observability, and an interactive React dashboard.
   - FaRm: MongoDB compound index '{ category: 1, price: 1, createdAt: -1 }' cut latency by 95% (~240ms to ~12ms), IXSCAN covered queries, Artillery load tested at 200 concurrent users with 0% error rate and sub-150ms p95.
   - Left2Serve: PostgreSQL compound B-tree index '(status, pickup_window, location_id)' reduced latency from 340ms to 12ms (96.4% drop), Artillery load tested at 19K+ requests (187 req/sec peak), strict hierarchical RBAC, zero double-claim race conditions.
   - MyMate: 2dsphere compound indexing on MongoDB for sub-1ms geospatial driver queries, Tesseract.js OCR for license verification, Socket.IO real-time telemetry with atomic mutex locking for chat and ride status race conditions, Artillery tested at 200 concurrent users (115 req/sec).
   - Security: Zero-trust pipelines, Helmet headers, rate limiting, stateless JWT, Row-Level Security, CORS isolation, and SQL/NoSQL injection defenses.
4. FORMATTING: Use clean, professional Markdown (bullet points, bold text for key technologies, clear headings where appropriate).
5. LINKS: When mentioning projects, social profiles, resume, or contact info, always provide clickable Markdown links (e.g. [APEX on GitHub](https://github.com/Susil-commits/F1-s-APEX----Autonomous-Predictive-EXecutive-Race-Intelligence-), [Veritas Live Demo](https://veritas-tutor.vercel.app/), [Veritas on GitHub](https://github.com/Susil-commits/Veritas), [Predictive Maintenance System Live Demo](https://predictive-maintenance-system-swart.vercel.app/), [Predictive Maintenance System on GitHub](https://github.com/Susil-commits/Predictive-Maintenance-System), [FaRm Live Demo](https://farm-direct-marketplace-eta.vercel.app/), [GitHub Profile](https://github.com/Susil-commits), [LinkedIn](https://www.linkedin.com/in/susil-kumar-nayak-5180472b6/), [Resume](https://drive.google.com/file/d/1i8YK3XQLwm5e_ow4Hq5ypD0TxwoLzS0O/view?usp=sharing)).
6. TONE: Professional, enthusiastic, technically articulate, concise, and helpful.`;

const CANDIDATE_MODELS = [
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview',
];

/**
 * Send chat message to Gemini API with fallback models
 * @param {Array<{role: string, text: string}>} conversationHistory
 * @returns {Promise<string>} AI response text
 */
export async function sendChatMessage(conversationHistory) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!apiKey || apiKey === 'your-gemini-api-key-here') {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  // Format messages into Gemini API contents structure
  const contents = conversationHistory.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  let lastError = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: contents,
          generationConfig: {
            temperature: 0.3,
            topP: 0.8,
            maxOutputTokens: 1000,
          },
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        console.warn(`Model ${model} returned HTTP ${response.status}:`, errJson);
        lastError = new Error(errJson?.error?.message || `HTTP ${response.status}`);
        continue; // Try next model
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        return reply;
      }
    } catch (err) {
      console.warn(`Failed with model ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini AI model endpoints were unavailable. Please try again in a moment.');
}

/**
 * Suggested follow-ups based on the topic discussed
 */
export const getContextualSuggestions = (lastUserMsg = '', lastBotReply = '') => {
  const lowerUser = (lastUserMsg + ' ' + lastBotReply).toLowerCase();

  if (lowerUser.includes('apex') || lowerUser.includes('f1') || lowerUser.includes('kafka') || lowerUser.includes('race')) {
    return [
      '🏎️ How does APEX use Kafka 60Hz streaming and Safe RL?',
      '👥 Explain APEX’s 5-specialist Multi-Agent Pit Wall Consensus',
      '⚡ What is the 0.0245ms feature store architecture in APEX?',
      '📊 Tell me about the 172/172 automated tests in APEX',
    ];
  }

  if (lowerUser.includes('veritas') || lowerUser.includes('socratic') || lowerUser.includes('math') || lowerUser.includes('bkt')) {
    return [
      '🎓 How does Veritas prevent direct answer leaks using Socratic guardrails?',
      '🤖 How does Veritas use LangGraph for multi-agent state orchestration?',
      '📐 How does Bayesian Knowledge Tracing (BKT) model student mastery?',
      '👁️ How does Gemini vision detect handwritten scratchpad errors with bounding boxes?',
    ];
  }

  if (lowerUser.includes('predictive') || lowerUser.includes('maintenance') || lowerUser.includes('drift') || lowerUser.includes('xgboost')) {
    return [
      '⚙️ How does Platt sigmoid calibration reduce Brier error by 62.9%?',
      '📊 How does the PMS engine detect sensor distribution drift using PSI?',
      '🔍 How does SHAP TreeExplainer provide real-time feature attributions?',
      '📈 Tell me about PMS Prometheus metrics and the React dashboard',
    ];
  }

  if (lowerUser.includes('arch') || lowerUser.includes('system') || lowerUser.includes('design') || lowerUser.includes('index') || lowerUser.includes('artillery')) {
    return [
      '🏎️ Explain APEX’s distributed Kafka and Safe RL architecture',
      '🎓 Explain Veritas’s LangGraph multi-agent and BKT cognitive pipeline',
      '⚙️ Explain PMS’s calibrated ML pipeline and PSI drift engine',
      '🍲 Explain Left2Serve’s PostgreSQL B-tree indexing and 19k load tests',
    ];
  }

  if (lowerUser.includes('project') || lowerUser.includes('farm') || lowerUser.includes('left2serve') || lowerUser.includes('mymate')) {
    return [
      '🏎️ Tell me about APEX F1 race strategy engine',
      '🎓 Tell me about Veritas AI Socratic Math Tutor',
      '⚙️ What is the Predictive Maintenance System platform?',
      '🌾 How did Susil optimize FaRm with MongoDB compound indexing?',
    ];
  }

  if (lowerUser.includes('skill') || lowerUser.includes('stack') || lowerUser.includes('react') || lowerUser.includes('backend')) {
    return [
      '⚡ Tell me about your experience with Kafka, Redis, and PyTorch',
      '🤖 What is your experience with LangGraph, XGBoost, and Supabase?',
      '💼 Tell me about your Techgeering internship',
      '🏆 What are your top achievements & certifications?',
    ];
  }

  if (lowerUser.includes('experience') || lowerUser.includes('intern') || lowerUser.includes('techgeering')) {
    return [
      '🚀 What projects have you built end-to-end?',
      '🎓 What is your education background & CGPA?',
      '📜 What is your Oracle Agentic AI certification?',
      '📫 How can I reach you directly?',
    ];
  }

  return [
    '🏎️ Tell me about your flagship APEX F1 AI & Kafka streaming platform',
    '🎓 How does Veritas use Socratic inquiry and Bayesian Knowledge Tracing?',
    '⚡ Explain your system architecture & performance optimizations',
    '📄 Can I see your resume & contact info?',
  ];
};
