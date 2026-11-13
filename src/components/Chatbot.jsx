import { useState, useEffect, useRef } from 'react';
import { sendChatMessage, getContextualSuggestions } from '../services/geminiService';
import { personal } from '../data/portfolio';
import { sound } from '../services/sound';
import { useTheme } from '../context/ThemeContext';

// Pre-suggestions categorized for quick cockpit exploration
const INITIAL_CATEGORIES = [
  {
    category: '⚡ Flagship Distributed & AI',
    suggestions: [
      {
        label: 'APEX (F1 Digital Twin & 5-Agent Consensus)',
        query: 'Tell me about APEX — the autonomous F1 race strategy engine, Kafka streaming telemetry, and multi-agent consensus.',
      },
      {
        label: 'Veritas (LangGraph & Socratic AI)',
        query: 'Explain Veritas — the AI Socratic Math Tutor, zero answer leakage guardrails, and Bayesian Knowledge Tracing.',
      },
      {
        label: 'Predictive Maintenance (Calibrated ML)',
        query: 'What is the Predictive Maintenance System and how does Platt calibration reduce Brier score error by 62.9%?',
      },
      {
        label: 'FaRm (Marketplace & 95% Latency Cut)',
        query: 'Tell me about the FaRm marketplace project and how Susil optimized MongoDB indexing to cut query latency by 95%.',
      },
    ],
  },
  {
    category: '🏛️ System Architecture',
    suggestions: [
      {
        label: 'APEX 0.0245ms Feature Store SLA',
        query: 'How is APEX’s sub-millisecond feature store and L1/L2/L3 cache hierarchy architected?',
      },
      {
        label: 'Veritas BKT & pgvector RAG',
        query: 'How does Veritas track 10 CCSS standards using Bayesian Knowledge Tracing and Supabase pgvector?',
      },
      {
        label: 'Predictive Maintenance PSI Drift',
        query: 'How does the Predictive Maintenance System monitor Population Stability Index (PSI) drift?',
      },
      {
        label: 'Left2Serve Go Core & B-Tree Index',
        query: 'What is Left2Serve’s Go 1.24 backend, Next.js dual frontend, PostgreSQL B-tree indexing, and Artillery load test result?',
      },
      {
        label: 'MyMate 19.4K RPS Go Engine',
        query: 'Tell me about MyMate’s Golang 1.24 migration achieving 19,400 req/sec, 8.4ms p99 latency, and Kafka streaming.',
      },
    ],
  },
  {
    category: '🚀 Full-Stack Web Projects',
    suggestions: [
      {
        label: 'FaRm Marketplace (MERN Stack)',
        query: 'Tell me about the FaRm marketplace project, its compound MongoDB indexing, and Artillery stress tests.',
      },
      {
        label: 'Left2Serve (Go 1.24 & Gemini Multimodal)',
        query: 'What is Left2Serve, how does its Go Gin core work, and what Gemini AI multimodal intake did Susil implement?',
      },
      {
        label: 'MyMate (Dual-Stream Dispatch & Kafka)',
        query: 'Tell me about the MyMate ride sharing project, its 19.4k req/sec Go throughput, and Kafka dual-stream event architecture.',
      },
    ],
  },
  {
    category: '🛠 Skills & Experience',
    suggestions: [
      {
        label: 'Distributed Systems & Cloud Stack',
        query: 'What are Susil\'s key engineering skills across Kafka, Kubernetes, PyTorch, Docker, Go, and Redis?',
      },
      {
        label: 'Techgeering Internship',
        query: 'Tell me about Susil\'s backend engineering internship at Techgeering Solutions.',
      },
      {
        label: 'Other Practical Experience (IIG & SDI)',
        query: 'What other internships and hands-on practical experience does Susil have?',
      },
    ],
  },
  {
    category: '🎓 Education & Certifications',
    suggestions: [
      {
        label: 'Education & Degree',
        query: 'What is Susil\'s educational background, college, and degree?',
      },
      {
        label: 'Oracle Agentic AI & Data Science',
        query: 'Tell me about Susil\'s Oracle professional certifications and AI credentials.',
      },
      {
        label: 'NASSCOM & IIIT Hackfest',
        query: 'What are Susil\'s top hackathon awards and technical achievements?',
      },
    ],
  },
  {
    category: '📫 Resume & Contact',
    suggestions: [
      {
        label: 'How to contact Susil',
        query: 'How can I get in touch or connect with Susil Kumar Nayak?',
      },
      {
        label: 'Download Resume',
        query: 'Where can I find and download Susil\'s resume?',
      },
    ],
  },
];

// Quick bar prompt chips
const QUICK_BAR_PROMPTS = [
  '🏎️ APEX F1 Brain',
  '🎓 Veritas Socratic AI',
  '⚙️ Predictive Maintenance',
  '🏛️ System Architecture',
  '🌾 FaRm Marketplace',
  '🍲 Left2Serve Go & Next.js',
  '🚗 MyMate 19.4k RPS Go',
  '💼 Internship Experience',
  '🎓 Education & Degree',
  '📜 Oracle Agentic AI',
  '📄 Download Resume',
  '📫 Contact Info',
];

const QUICK_BAR_MAP = {
  '🏎️ APEX F1 Brain': 'Explain the APEX autonomous F1 race strategy engine, Kafka streaming telemetry, BullMQ queues, and Safe RL.',
  '🎓 Veritas Socratic AI': 'Tell me about Veritas, LangGraph multi-agent orchestration, handwritten scratchpad OCR, and Bayesian Knowledge Tracing.',
  '⚙️ Predictive Maintenance': 'What is the Predictive Maintenance System, how does Platt calibration work, and how is PSI data drift detected?',
  '🏛️ System Architecture': 'Explain the system architecture and performance optimizations across Susil\'s engineering platforms.',
  '🌾 FaRm Marketplace': 'How did Susil optimize MongoDB queries by 95% in FaRm?',
  '🍲 Left2Serve Go & Next.js': 'Tell me about Left2Serve’s Go 1.24 Gin backend, Next.js dual frontend, Gemini multimodal AI intake, and Artillery load tests.',
  '🚗 MyMate 19.4k RPS Go': 'How did Susil migrate MyMate to Go 1.24 to achieve ~19,400 req/sec throughput, 8.4ms p99 latency, and Apache Kafka dual-stream logs?',
  '💼 Internship Experience': 'Tell me about Susil\'s work experience and internships at Techgeering, IIG Varsity, and SDI.',
  '🎓 Education & Degree': 'What is Susil\'s college, degree, and engineering background?',
  '📜 Oracle Agentic AI': 'Tell me about Susil\'s Oracle Agentic AI certification and credentials.',
  '📄 Download Resume': 'Can you provide the link to Susil\'s resume?',
  '📫 Contact Info': 'How can I contact Susil Kumar Nayak via email, LinkedIn, or phone?',
};

// Markdown Formatter Component styled with Raycast precision
function FormattedMessage({ text }) {
  const renderFormatted = (raw) => {
    if (!raw) return null;

    // Split code blocks
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIdx = 0;
    let match;

    while ((match = codeBlockRegex.exec(raw)) !== null) {
      if (match.index > lastIdx) {
        parts.push({ type: 'text', content: raw.substring(lastIdx, match.index) });
      }
      parts.push({ type: 'codeblock', lang: match[1] || '', code: match[2] });
      lastIdx = match.index + match[0].length;
    }
    if (lastIdx < raw.length) {
      parts.push({ type: 'text', content: raw.substring(lastIdx) });
    }

    return parts.map((part, pIdx) => {
      if (part.type === 'codeblock') {
        return (
          <pre
            key={pIdx}
            className="my-2 p-3 bg-[#040506] border border-[#1b1c1e] rounded-xl text-xs font-mono text-[#63a1ff] overflow-x-auto selection:bg-[#ff6363]/30 selection:text-white"
          >
            <code>{part.code}</code>
          </pre>
        );
      }

      // Process standard markdown lines
      const lines = part.content.split('\n');
      return (
        <div key={pIdx} className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) {
              return <div key={lIdx} className="h-1.5" />;
            }

            // Headings
            if (trimmed.startsWith('### ')) {
              return (
                <h4 key={lIdx} className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-2 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6363]"></span>
                  {parseInline(trimmed.slice(4))}
                </h4>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h3 key={lIdx} className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-2.5 mb-1 text-gradient-accent">
                  {parseInline(trimmed.slice(3))}
                </h3>
              );
            }
            if (trimmed.startsWith('# ')) {
              return (
                <h2 key={lIdx} className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mt-3 mb-1">
                  {parseInline(trimmed.slice(2))}
                </h2>
              );
            }

            // Unordered list item
            if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                  <span className="text-[#ff6363] mt-0.5 text-xs select-none">▸</span>
                  <span className="flex-1 text-slate-700 dark:text-[#e6e6e6]">{parseInline(trimmed.slice(2))}</span>
                </div>
              );
            }

            // Numbered list item
            const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
            if (numMatch) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                  <span className="font-mono text-xs text-[#63a1ff] font-semibold mt-0.5 select-none">{numMatch[1]}.</span>
                  <span className="flex-1 text-slate-700 dark:text-[#e6e6e6]">{parseInline(numMatch[2])}</span>
                </div>
              );
            }

            // Horizontal rule
            if (trimmed === '---' || trimmed === '***') {
              return <hr key={lIdx} className="border-slate-200 dark:border-white/10 my-2" />;
            }

            // Regular paragraph
            return (
              <p key={lIdx} className="text-slate-800 dark:text-[#e6e6e6]">
                {parseInline(line)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  const parseInline = (str) => {
    // Replace markdown links
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        segments.push(str.substring(lastIndex, match.index));
      }
      segments.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-[#ff6363] hover:text-[#ffaab3] underline underline-offset-2 transition-colors mx-0.5 group"
        >
          <span>{match[1]}</span>
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < str.length) {
      segments.push(str.substring(lastIndex));
    }

    return segments.map((seg, sIdx) => {
      if (typeof seg !== 'string') return seg;

      // Handle Bold
      const boldParts = seg.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          const boldText = bPart.slice(2, -2);
          return (
            <strong key={`${sIdx}-${bIdx}`} className="font-bold text-slate-900 dark:text-white">
              {boldText}
            </strong>
          );
        }

        // Handle inline code
        const codeParts = bPart.split(/(`[^`]+`)/g);
        return codeParts.map((cPart, cIdx) => {
          if (cPart.startsWith('`') && cPart.endsWith('`')) {
            return (
              <code
                key={`${sIdx}-${bIdx}-${cIdx}`}
                className="px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 dark:bg-[#111214] border border-slate-200 dark:border-[#2f3031] text-[#ff6363] mx-0.5"
              >
                {cPart.slice(1, -1)}
              </code>
            );
          }
          return cPart;
        });
      });
    });
  };

  return <div>{renderFormatted(text)}</div>;
}

export default function Chatbot() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [followUps, setFollowUps] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Pop-up cloud state above assistant logo
  const [cloudVisible, setCloudVisible] = useState(false);
  const [cloudStep, setCloudStep] = useState(0);
  const [cloudClosing, setCloudClosing] = useState(false);
  const [cloudDismissed, setCloudDismissed] = useState(false);

  const isDark = theme === 'dark';

  // Time-based greeting helper
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { phrase: 'Good morning', icon: '🌅' };
    } else if (hour >= 12 && hour < 17) {
      return { phrase: 'Good afternoon', icon: '☀️' };
    } else if (hour >= 17 && hour < 22) {
      return { phrase: 'Good evening', icon: '🌆' };
    } else {
      return { phrase: 'Good night', icon: '🌙' };
    }
  };

  const dismissCloud = () => {
    setCloudClosing(true);
    setTimeout(() => {
      setCloudDismissed(true);
    }, 300);
  };

  // Pop-up greeting tooltip after 2.2s delay
  useEffect(() => {
    const popTimer = setTimeout(() => {
      setCloudVisible(true);
      sound.playJulePop();
    }, 2200);

    const stepTimer = setTimeout(() => {
      setCloudStep(1);
    }, 3800);

    return () => {
      clearTimeout(popTimer);
      clearTimeout(stepTimer);
    };
  }, []);

  // Auto-hide pop-up cloud after 5 seconds OR on scroll
  useEffect(() => {
    if (!cloudVisible || cloudDismissed) return;

    const autoHideTimer = setTimeout(() => {
      dismissCloud();
    }, 5500);

    const handleScroll = () => {
      if (window.scrollY > 25) {
        dismissCloud();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(autoHideTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cloudVisible, cloudDismissed]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Speech Recognition & Synthesis initialization
  useEffect(() => {
    try {
      sessionStorage.removeItem('susil_portfolio_chat');
      localStorage.removeItem('susil_portfolio_chat');
    } catch {
      // ignore
    }

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognizer = new SpeechRecognition();
        recognizer.continuous = false;
        recognizer.interimResults = false;
        recognizer.lang = 'en-US';

        recognizer.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInput(transcript);
            handleSend(transcript);
          }
          setIsListening(false);
        };

        recognizer.onerror = () => setIsListening(false);
        recognizer.onend = () => setIsListening(false);
        recognitionRef.current = recognizer;
        setSpeechSupported(true);
      }

      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
    }

    // Global event listener to open chatbot from external CTAs
    const handleOpenAiEvent = (e) => {
      setIsOpen(true);
      setIsMinimized(false);
      dismissCloud();
      sound.playJulePop();
      if (e.detail?.query) {
        setTimeout(() => {
          handleSend(e.detail.query);
        }, 150);
      }
    };

    window.addEventListener('open-portfolio-ai', handleOpenAiEvent);
    return () => {
      window.removeEventListener('open-portfolio-ai', handleOpenAiEvent);
    };
  }, []);

  // Global toggle shortcut: Cmd+J or Ctrl+J to toggle assistant
  useEffect(() => {
    const handleGlobalShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setIsMinimized(false);
        dismissCloud();
        sound.playClick();
      }
    };
    window.addEventListener('keydown', handleGlobalShortcut);
    return () => window.removeEventListener('keydown', handleGlobalShortcut);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Esc to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (overrideText = null) => {
    const query = (overrideText || input).trim();
    if (!query || isLoading) return;

    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }

    const newMessages = [
      ...messages,
      {
        role: 'user',
        text: query,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const botReply = await sendChatMessage(newMessages);
      const updatedMessages = [
        ...newMessages,
        {
          role: 'model',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ];
      setMessages(updatedMessages);
      setFollowUps(getContextualSuggestions(query, botReply));

      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'model',
          text: `⚠️ **Connection Notice**: ${err.message || 'Unable to fetch response from Gemini.'}\n\nPlease verify your network or try again in a few moments.`,
          isError: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (synthRef.current) synthRef.current.cancel();
    setMessages([]);
    setFollowUps([]);
    sessionStorage.removeItem('susil_portfolio_chat');
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleToggleSpeak = (text) => {
    if (!synthRef.current) return;

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*#`_>-]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.cancel();
    synthRef.current.speak(utterance);
    setIsSpeaking(true);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  return (
    <>
      {/* ── FLOATING LAUNCHER COCKPIT (BOTTOM-RIGHT) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
        {/* ── POP-UP GREETING TOOLTIP (AFTER 2.2S) ── */}
        {cloudVisible && !cloudDismissed && !isOpen && (
          <div
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
              dismissCloud();
            }}
            className={`relative group mb-3 w-[280px] sm:w-[320px] p-4 rounded-2xl backdrop-blur-2xl transition-all duration-300 cursor-pointer select-none border ${
              cloudClosing
                ? 'opacity-0 scale-90 translate-y-3 pointer-events-none'
                : 'animate-sudden-cloud'
            }`}
            style={{
              backgroundColor: isDark ? 'rgba(7, 8, 10, 0.96)' : 'rgba(255, 255, 255, 0.96)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0',
              boxShadow: isDark
                ? '0 16px 36px -4px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 20px -2px rgba(255, 99, 99, 0.15)'
                : '0 16px 36px -4px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 16px -2px rgba(255, 99, 99, 0.12)',
            }}
          >
            {/* Speech bubble tail */}
            <div
              className="absolute -bottom-2 right-6 w-3.5 h-3.5 transform rotate-45 border-b border-r"
              style={{
                backgroundColor: isDark ? '#07080a' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0',
              }}
            />

            {/* Header: Coral Pulsing Dot + Badge + Dismiss */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: '#ff6363' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: '#ff6363' }}
                  />
                </span>
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: '#ff6363' }}
                >
                  RAYCAST AI · JULE
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissCloud();
                }}
                className="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 rounded hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Dismiss greeting"
                aria-label="Dismiss greeting"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Greeting Body */}
            {cloudStep === 0 ? (
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-xl">👋</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Hey, {getGreeting().phrase}!</span>
                  <span>{getGreeting().icon}</span>
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">👋</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Hey, {getGreeting().phrase}!</span>
                    <span>{getGreeting().icon}</span>
                  </p>
                </div>
                <p className="text-xs text-slate-600 dark:text-[#9c9c9d] leading-snug font-medium">
                  I am <strong className="text-slate-900 dark:text-white">Jule</strong>, Susil's AI Assistant. Ask about distributed systems, architecture, or request his resume.
                </p>
                <div className="flex items-center justify-between pt-1.5 text-[11px] font-semibold">
                  <span className="text-[#ff6363] group-hover:text-[#ff7b7b] flex items-center gap-1 transition-colors">
                    Ask Jule
                    <svg className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <kbd className="px-1.5 py-0.5 text-[9px] font-mono rounded border bg-slate-100 dark:bg-white/[0.08] border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300">
                    ⌘J
                  </kbd>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── REDESIGNED RAYCAST TRIGGER LAUNCHER BUTTON ── */}
        <button
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            setIsMinimized(false);
            dismissCloud();
            if (next) {
              sound.playJulePop();
            } else {
              sound.playClose();
            }
          }}
          aria-label="Toggle Raycast AI Assistant"
          className="relative group p-3.5 sm:p-4 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 border select-none active:scale-95"
          style={{
            backgroundColor: isDark ? '#07080a' : '#ffffff',
            borderColor: isOpen
              ? '#ff6363'
              : isDark
              ? 'rgba(255, 255, 255, 0.14)'
              : '#cbd5e1',
            boxShadow: isDark
              ? '0 12px 32px -4px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 0 24px -4px rgba(255, 99, 99, 0.25)'
              : '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 20px -4px rgba(255, 99, 99, 0.2)',
          }}
        >
          {/* Ambient Coral Bloom on Hover */}
          <span
            className="absolute -inset-1 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
            style={{
              background: 'radial-gradient(circle, rgba(255, 99, 99, 0.4) 0%, transparent 70%)',
            }}
          />

          {isOpen ? (
            /* Close "✕" icon */
            <svg
              className="w-5 h-5 text-slate-800 dark:text-white transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Raycast 4-point Diamond Star AI Emblem */
            <div className="relative flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="transform group-hover:scale-110 transition-transform duration-300"
              >
                {/* 4-point Diamond Star */}
                <path
                  d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"
                  fill="#ff6363"
                />
                {/* Micro accent satellite diamond */}
                <circle cx="19" cy="5" r="1.5" fill="#ffaab3" />
              </svg>

              {/* Unread Message Pill Badge */}
              {unreadCount > 0 && (
                <span
                  className="absolute -top-2.5 -right-2.5 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold text-white shadow-md animate-bounce"
                  style={{ background: '#ff6363' }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
          )}
        </button>
      </div>

      {/* ── CHAT WINDOW MODAL / COCKPIT DRAWER ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Jule AI Assistant"
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col ${
            isMinimized
              ? 'bottom-20 right-6 w-72 h-14 rounded-2xl'
              : 'bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] md:w-[450px] h-[580px] sm:h-[620px] max-h-[calc(100vh-6.5rem)] rounded-2xl sm:rounded-3xl'
          } backdrop-blur-2xl border shadow-2xl overflow-hidden`}
          style={{
            backgroundColor: isDark ? 'rgba(7, 8, 10, 0.96)' : 'rgba(255, 255, 255, 0.97)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
            boxShadow: isDark
              ? '0 24px 64px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 35px -6px rgba(255, 99, 99, 0.15)'
              : '0 24px 64px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 24px -6px rgba(255, 99, 99, 0.12)',
          }}
        >
          {/* ── HEADER ── */}
          <div
            className="px-4 py-3 border-b flex items-center justify-between select-none"
            style={{
              backgroundColor: isDark ? '#040506' : '#f8fafc',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-8 h-8 rounded-full object-cover border"
                  style={{ borderColor: 'rgba(255, 99, 99, 0.4)' }}
                />
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                  style={{
                    backgroundColor: '#59d499',
                    borderColor: isDark ? '#040506' : '#ffffff',
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Jule
                  </span>
                  <span
                    className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold text-white"
                    style={{ background: '#ff6363' }}
                  >
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-[#9c9c9d] font-mono">
                  Susil's Portfolio Assistant
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              {messages.length > 0 && !isMinimized && (
                <button
                  onClick={handleClearChat}
                  title="Start fresh conversation"
                  className="px-2 py-1 rounded-lg border text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f1f5f9',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
                    color: isDark ? '#9c9c9d' : '#64748b',
                  }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Clear</span>
                </button>
              )}

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-[#9c9c9d] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMinimized ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  )}
                </svg>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat (Esc)"
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-[#9c9c9d] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── BODY (MESSAGES + WELCOME SCREEN) ── */}
          {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {/* WELCOME SCREEN */}
              {messages.length === 0 && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Raycast AI Command Cockpit Card */}
                  <div
                    className="p-4 rounded-2xl border text-center relative overflow-hidden"
                    style={{
                      backgroundColor: isDark ? '#0d0e11' : '#f8fafc',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
                    }}
                  >
                    <div className="inline-flex p-2.5 rounded-xl border mb-2"
                      style={{
                        backgroundColor: isDark ? '#111214' : '#ffffff',
                        borderColor: isDark ? 'rgba(255, 99, 99, 0.3)' : '#cbd5e1',
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" fill="#ff6363" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Raycast AI · Jule Assistant
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-[#9c9c9d] mt-1 max-w-xs mx-auto leading-relaxed">
                      Powered by Gemini 2.5 with live access to Susil's architecture, ML telemetry, full-stack projects, and credentials.
                    </p>
                  </div>

                  {/* TOPIC EXPLORATION ROWS */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-mono font-semibold uppercase tracking-wider px-1 text-slate-500 dark:text-[#6a6b6c]">
                      EXPLORE TOPICS
                    </p>
                    <div className="space-y-2.5">
                      {INITIAL_CATEGORIES.map((cat, cIdx) => (
                        <div key={cIdx} className="space-y-1">
                          <span className="text-[11px] font-medium text-slate-700 dark:text-[#9c9c9d] px-1">
                            {cat.category}
                          </span>
                          <div className="grid grid-cols-1 gap-1">
                            {cat.suggestions.map((s, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => handleSend(s.query)}
                                className="w-full text-left px-3 py-2 rounded-xl text-xs border text-slate-800 dark:text-white flex items-center justify-between group transition-all duration-200 cursor-pointer"
                                style={{
                                  backgroundColor: isDark ? '#0d0e11' : '#ffffff',
                                  borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : '#e2e8f0',
                                }}
                              >
                                <span className="truncate pr-2">{s.label}</span>
                                <span
                                  className="text-xs font-mono font-semibold text-slate-400 group-hover:text-[#ff6363] group-hover:translate-x-0.5 transition-all"
                                >
                                  →
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MESSAGES LIST */}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  } space-y-1`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-sm ${
                      msg.role === 'user'
                        ? 'rounded-br-none border'
                        : msg.isError
                        ? 'bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-bl-none'
                        : 'rounded-bl-none border'
                    }`}
                    style={
                      msg.role === 'user'
                        ? {
                            backgroundColor: isDark ? '#18191c' : '#0f172a',
                            color: '#ffffff',
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : '#0f172a',
                          }
                        : !msg.isError
                        ? {
                            backgroundColor: isDark ? '#0b0c0e' : '#ffffff',
                            color: isDark ? '#e6e6e6' : '#1e293b',
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
                          }
                        : undefined
                    }
                  >
                    <FormattedMessage text={msg.text} />
                  </div>

                  {/* Message footer actions */}
                  <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500 dark:text-[#6a6b6c] select-none font-mono">
                    <span>{msg.time}</span>
                    {msg.role === 'model' && !msg.isError && (
                      <>
                        <span>•</span>
                        <button
                          onClick={() => handleCopy(msg.text, idx)}
                          className="hover:text-[#ff6363] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy response"
                        >
                          {copiedIndex === idx ? (
                            <span className="text-[#59d499] font-medium">Copied!</span>
                          ) : (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>

                        {synthRef.current && (
                          <button
                            onClick={() => handleToggleSpeak(msg.text)}
                            className="hover:text-[#ff6363] transition-colors cursor-pointer"
                            title="Read out loud"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div
                    className="p-3 rounded-2xl rounded-bl-none border flex items-center gap-1.5"
                    style={{
                      backgroundColor: isDark ? '#0b0c0e' : '#ffffff',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#ff6363] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#63a1ff] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#59d499] animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-xs text-slate-500 dark:text-[#9c9c9d] ml-1 font-mono">Thinking...</span>
                  </div>
                </div>
              )}

              {/* DYNAMIC CONTEXTUAL FOLLOW-UPS */}
              {!isLoading && followUps.length > 0 && messages.length > 0 && (
                <div className="pt-2 space-y-1.5 animate-fadeIn">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#6a6b6c]">
                    SUGGESTED FOLLOW-UPS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {followUps.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSend(prompt)}
                        className="px-2.5 py-1 rounded-full text-xs border text-slate-700 dark:text-[#9c9c9d] hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer text-left font-medium"
                        style={{
                          backgroundColor: isDark ? '#111214' : '#f1f5f9',
                          borderColor: isDark ? '#2f3031' : '#cbd5e1',
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* ── FOOTER: QUICK CHIPS BAR & INPUT ── */}
          {!isMinimized && (
            <div
              className="p-3 border-t space-y-2 select-none"
              style={{
                backgroundColor: isDark ? '#040506' : '#f8fafc',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
              }}
            >
              {/* HORIZONTAL QUICK SCROLL BAR */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
                {QUICK_BAR_PROMPTS.map((label, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => handleSend(QUICK_BAR_MAP[label] || label)}
                    disabled={isLoading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full border transition-colors shrink-0 cursor-pointer disabled:opacity-50 font-mono text-[10px]"
                    style={{
                      backgroundColor: isDark ? '#111214' : '#ffffff',
                      borderColor: isDark ? '#2f3031' : '#e2e8f0',
                      color: isDark ? '#9c9c9d' : '#64748b',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* INPUT BOX */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? 'Listening...' : 'Ask Jule about architecture, skills, resume...'}
                    disabled={isLoading}
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl transition-all disabled:opacity-60 border focus:outline-none"
                    style={{
                      backgroundColor: isDark ? '#111214' : '#ffffff',
                      borderColor: isDark ? '#2f3031' : '#cbd5e1',
                      color: isDark ? '#ffffff' : '#0f172a',
                    }}
                  />

                  {/* SPEECH MIC BUTTON */}
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={toggleListening}
                      title={isListening ? 'Stop listening' : 'Speak question'}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isListening
                          ? 'bg-[#ff6363] text-white animate-pulse'
                          : 'text-slate-400 hover:text-[#ff6363]'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3z" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* SEND BUTTON */}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="p-2.5 rounded-xl text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer flex items-center justify-center border shadow-md"
                  style={{
                    backgroundColor: '#ff6363',
                    borderColor: '#ff6363',
                    boxShadow: '0 4px 16px -2px rgba(255, 99, 99, 0.4)',
                  }}
                >
                  <svg className="w-4 h-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
