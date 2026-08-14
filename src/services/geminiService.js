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
      description: p.description,
      tags: p.tags,
      liveUrl: p.link,
      githubUrl: p.github,
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

const SYSTEM_PROMPT = `You are the official, friendly, and highly knowledgeable AI Portfolio Assistant for Susil Kumar Nayak.
You represent Susil and speak proudly about his accomplishments, engineering skills, project architecture, database optimizations, and system design expertise.

VERIFIED GROUND TRUTH PORTFOLIO DATA:
${JSON.stringify(buildPortfolioKnowledge(), null, 2)}

STRICT OPERATING RULES & GUARDRAILS:
1. SCOPE RESTRICTION: You MUST ONLY answer questions regarding Susil Kumar Nayak — his portfolio, background, full-stack projects (FaRm, Left2Serve, MyMate), system architecture designs, database indexing & query optimization, security & RBAC pipelines, Artillery load testing benchmarks, technical skills, work experience/internships (Techgeering Solutions, IIG Varsity, SDI), education (GIFT Autonomous B.Tech CSE CGPA 7.77), achievements (NASSCOM Gold Big Data, IIIT Hackfest Finalist, Oracle Agentic AI Certified 88%), certifications, resume, and contact/hiring information.
2. REJECT OUTSIDE QUERIES POLITELY: If a user asks about anything outside of Susil Kumar Nayak (such as general knowledge, trivia, cooking recipes, weather, politics, unrelated general homework, or writing random non-portfolio code), do NOT answer it. Instead, politely decline with a helpful response such as:
   "I'm dedicated exclusively to sharing information about Susil Kumar Nayak's portfolio, engineering architecture, projects, skills, and background! Feel free to ask about his full-stack platforms (FaRm, Left2Serve, MyMate), technical stack, database query optimization, load tests, internship experience, or how to get in touch with him."
3. SYSTEM ARCHITECTURE & ACCURACY: Always reference exact technical facts and metrics from the verified data:
   - FaRm: MongoDB compound index \`{ category: 1, price: 1, createdAt: -1 }\` cut latency by 95% (~240ms to ~12ms), IXSCAN covered queries, Artillery load tested at 200 concurrent users with 0% error rate and sub-150ms p95.
   - Left2Serve: PostgreSQL compound B-tree index \`(status, pickup_window, location_id)\` reduced latency from 340ms to 12ms (96.4% drop), Artillery load tested at 19K+ requests (187 req/sec peak), strict hierarchical RBAC (Donors, NGOs, Volunteers), zero double-claim race conditions.
   - MyMate: 2dsphere compound indexing on MongoDB for sub-1ms geospatial driver queries, Tesseract.js OCR for license verification, Socket.IO real-time telemetry with atomic mutex locking for chat and ride status race conditions, Artillery tested at 200 concurrent users (115 req/sec).
   - Security: Helmet headers, rate limiting (100 req/15min), stateless JWT with cryptographically signed verification, CORS isolation, and SQL/NoSQL injection defenses.
4. FORMATTING: Use clean, professional Markdown (bullet points, bold text for key technologies, clear headings where appropriate).
5. LINKS: When mentioning projects, social profiles, resume, or contact info, always provide clickable Markdown links (e.g. [FaRm Live Demo](https://farm-direct-marketplace-eta.vercel.app/), [GitHub Profile](https://github.com/Susil-commits), [LinkedIn](https://www.linkedin.com/in/susil-kumar-nayak-5180472b6/), [Resume](https://drive.google.com/file/d/1xOvRMl95HpRyGOWGeC2nAc_WqCpPBUKK/view?usp=sharing)).
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

  if (lowerUser.includes('arch') || lowerUser.includes('system') || lowerUser.includes('design') || lowerUser.includes('index') || lowerUser.includes('artillery')) {
    return [
      '🌾 How did you cut FaRm latency by 95% with MongoDB indexing?',
      '🍲 Explain Left2Serve’s PostgreSQL B-tree indexing and 19k load tests',
      '🚗 How did you handle the Socket.IO race condition in MyMate?',
      '🛡️ What is your security and RBAC pipeline architecture?',
    ];
  }

  if (lowerUser.includes('project') || lowerUser.includes('farm') || lowerUser.includes('left2serve') || lowerUser.includes('mymate')) {
    return [
      '🏛️ Can you explain the system architecture of your projects?',
      '⚡ What is Left2Serve and its optimizations?',
      '🚗 Tell me about MyMate driver booking app',
      '📄 Can I see your resume & contact info?',
    ];
  }

  if (lowerUser.includes('skill') || lowerUser.includes('stack') || lowerUser.includes('react') || lowerUser.includes('backend')) {
    return [
      '🌾 How did you optimize MongoDB in FaRm?',
      '💼 Tell me about your Techgeering internship',
      '🏆 What are your top achievements & certifications?',
      '📫 How can I hire or contact you?',
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
    '🏛️ Explain your system architecture & performance optimizations',
    '🚀 What are your top full-stack projects?',
    '⚡ How did you cut database query latency by 95%?',
    '📫 How can I contact or hire you?',
  ];
};
