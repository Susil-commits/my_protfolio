import { useState, useEffect, useRef, useTransition } from 'react';
import { sendChatMessage, getContextualSuggestions } from '../services/geminiService';
import { personal } from '../data/portfolio';

// Initial pre-suggestions categorized for quick selection
const INITIAL_CATEGORIES = [
  {
    category: '🏛️ System Architecture',
    suggestions: [
      { label: 'FaRm MongoDB Indexing (95% Cut)', query: 'Explain how Susil cut FaRm latency by 95% using MongoDB compound indexing.' },
      { label: 'Left2Serve PostgreSQL & 19K Load Test', query: 'What is Left2Serve’s PostgreSQL B-tree indexing and Artillery load test result?' },
      { label: 'MyMate WebSocket Race Condition Fix', query: 'How did Susil architect MyMate’s real-time WebSockets and fix the race condition?' },
      { label: 'Security & Defense-in-Depth Pipeline', query: 'How is security, JWT, and RBAC architected across Susil\'s platforms?' },
    ],
  },
  {
    category: '🚀 Projects',
    suggestions: [
      { label: 'FaRm (Marketplace & 95% Latency Cut)', query: 'Tell me about the FaRm project and how Susil optimized it.' },
      { label: 'Left2Serve (19k+ Artillery Load Test)', query: 'What is Left2Serve and what optimizations did Susil implement?' },
      { label: 'MyMate (Driver Booking & Real-time Tracking)', query: 'Tell me about the MyMate project and its tech stack.' },
    ],
  },
  {
    category: '🛠 Skills & Experience',
    suggestions: [
      { label: 'Core Technical Stack', query: 'What are Susil\'s key programming languages, frameworks, and tools?' },
      { label: 'Techgeering Internship', query: 'Tell me about Susil\'s backend internship at Techgeering Solutions.' },
      { label: 'Other Internships (IIG Varsity & SDI)', query: 'What other internships and practical experience does Susil have?' },
    ],
  },
  {
    category: '🎓 Education & Certifications',
    suggestions: [
      { label: 'Education & CGPA', query: 'What is Susil\'s educational background, college, and CGPA?' },
      { label: 'Oracle Agentic AI & Data Science (88%)', query: 'Tell me about Susil\'s Oracle certifications and AI credentials.' },
      { label: 'NASSCOM Gold & IIIT Hackfest', query: 'What are Susil\'s top achievements and awards?' },
    ],
  },
  {
    category: '📫 Resume & Contact',
    suggestions: [
      { label: 'How to hire or contact Susil', query: 'How can I get in touch with Susil or hire him?' },
      { label: 'Download Resume', query: 'Where can I find and download Susil\'s resume?' },
    ],
  },
];

// Quick bar pills
const QUICK_BAR_PROMPTS = [
  '🏛️ Architecture & DB',
  '🚀 Top Projects',
  '⚡ Core Tech Stack',
  '🌾 FaRm Optimization',
  '🍲 Left2Serve 19k Load',
  '🚗 MyMate WebSockets',
  '💼 Internship Experience',
  '🎓 Education & CGPA',
  '📜 Oracle Agentic AI',
  '📄 Download Resume',
  '📫 Contact Info',
];

const QUICK_BAR_MAP = {
  '🏛️ Architecture & DB': 'Explain the system architecture and database indexing optimizations across Susil\'s full-stack projects.',
  '🚀 Top Projects': 'What are the top full-stack projects Susil has built?',
  '⚡ Core Tech Stack': 'What are Susil\'s core technical skills and tools?',
  '🌾 FaRm Optimization': 'How did Susil optimize MongoDB queries by 95% in FaRm?',
  '🍲 Left2Serve 19k Load': 'Tell me about Left2Serve’s PostgreSQL compound indexing and 19k Artillery load test results.',
  '🚗 MyMate WebSockets': 'How does MyMate handle real-time driver tracking and Socket.IO race conditions?',
  '💼 Internship Experience': 'Tell me about Susil\'s work experience and internships.',
  '🎓 Education & CGPA': 'What is Susil\'s college, degree, and CGPA?',
  '📜 Oracle Agentic AI': 'Tell me about Susil\'s Oracle Agentic AI certification.',
  '📄 Download Resume': 'Can you provide the link to Susil\'s resume?',
  '📫 Contact Info': 'How can I contact Susil Kumar Nayak via email, LinkedIn, or phone?',
};

// Safe Markdown Parser Component
function FormattedMessage({ text }) {
  // Parse code blocks, bold, italics, links, lists
  const renderFormatted = (raw) => {
    if (!raw) return null;

    // Split by code blocks first
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
            className="my-2 p-3 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto selection:bg-cyan-900 selection:text-white"
          >
            <code>{part.code}</code>
          </pre>
        );
      }

      // Process standard markdown lines
      const lines = part.content.split('\n');
      return (
        <div key={pIdx} className="space-y-1.5 leading-relaxed text-sm">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) {
              return <div key={lIdx} className="h-1.5" />;
            }

            // Headings
            if (trimmed.startsWith('### ')) {
              return (
                <h4 key={lIdx} className="font-bold text-sm text-[var(--theme-pearl)] mt-2 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {parseInline(trimmed.slice(4))}
                </h4>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h3 key={lIdx} className="font-bold text-base text-[var(--theme-pearl)] mt-2.5 mb-1 text-gradient-accent">
                  {parseInline(trimmed.slice(3))}
                </h3>
              );
            }
            if (trimmed.startsWith('# ')) {
              return (
                <h2 key={lIdx} className="font-extrabold text-lg text-[var(--theme-pearl)] mt-3 mb-1">
                  {parseInline(trimmed.slice(2))}
                </h2>
              );
            }

            // Unordered list item
            if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                  <span className="text-cyan-400 mt-1 text-xs select-none">▸</span>
                  <span className="flex-1">{parseInline(trimmed.slice(2))}</span>
                </div>
              );
            }

            // Numbered list item
            const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
            if (numMatch) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                  <span className="font-mono text-xs text-purple-400 font-semibold mt-0.5 select-none">{numMatch[1]}.</span>
                  <span className="flex-1">{parseInline(numMatch[2])}</span>
                </div>
              );
            }

            // Horizontal rule
            if (trimmed === '---' || trimmed === '***') {
              return <hr key={lIdx} className="border-white/10 my-2" />;
            }

            // Regular paragraph
            return (
              <p key={lIdx} className="text-[var(--theme-pearl)]/90">
                {parseInline(line)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  // Helper for inline markdown: bold, italic, code, links
  const parseInline = (str) => {
    // Replace markdown links: [text](url)
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
          className="inline-flex items-center gap-1 font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors mx-0.5 group"
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

      // Handle Bold **text**
      const boldParts = seg.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          const boldText = bPart.slice(2, -2);
          return (
            <strong key={`${sIdx}-${bIdx}`} className="font-bold text-[var(--theme-pearl)]">
              {boldText}
            </strong>
          );
        }

        // Handle inline code `code`
        const codeParts = bPart.split(/(`[^`]+`)/g);
        return codeParts.map((cPart, cIdx) => {
          if (cPart.startsWith('`') && cPart.endsWith('`')) {
            return (
              <code
                key={`${sIdx}-${bIdx}-${cIdx}`}
                className="px-1.5 py-0.5 mx-0.5 text-xs font-mono bg-white/10 dark:bg-black/40 text-cyan-300 rounded border border-white/10"
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
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('susil_portfolio_chat');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [followUps, setFollowUps] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Initialize Speech Recognition & Synthesis
  useEffect(() => {
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

        recognizer.onerror = () => {
          setIsListening(false);
        };

        recognizer.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognizer;
        setSpeechSupported(true);
      }

      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
    }

    // Global event listener to open chatbot from any hero/navbar CTA
    const handleOpenAiEvent = (e) => {
      setIsOpen(true);
      setIsMinimized(false);
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

  // Save conversation to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('susil_portfolio_chat', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Keyboard shortcut: Esc to close
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

    // Stop speaking if was active
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }

    const newMessages = [...messages, { role: 'user', text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
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

    // Strip markdown formatting for speech
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
      {/* ── FLOATING LAUNCHER BUTTON ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {!isOpen && (
          <div className="mb-2.5 animate-bounce hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-charcoal)]/90 backdrop-blur-md border border-[var(--theme-pearl)]/15 shadow-xl text-xs font-medium text-[var(--theme-pearl)] cursor-pointer hover:border-cyan-400/50 transition-all"
               onClick={() => setIsOpen(true)}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Ask AI about Susil</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono font-bold">Gemini</span>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          aria-label="Open AI Assistant"
          className="relative group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-white/20"
        >
          {/* Ambient Glow */}
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-40 blur-lg group-hover:opacity-75 transition duration-500 -z-10 animate-pulse"></span>

          {isOpen ? (
            <svg className="w-6 h-6 transition-transform duration-300 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative">
              <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full animate-bounce">
                  {unreadCount}
                </span>
              )}
            </div>
          )}
        </button>
      </div>

      {/* ── CHAT WINDOW MODAL / DRAWER ── */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col ${
            isMinimized
              ? 'bottom-20 right-6 w-72 h-14 rounded-2xl'
              : 'bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[440px] h-[580px] sm:h-[620px] max-h-[calc(100vh-6.5rem)] rounded-2xl sm:rounded-3xl'
          } bg-[var(--theme-charcoal)]/95 backdrop-blur-2xl border border-[var(--theme-pearl)]/15 shadow-2xl shadow-black/40 overflow-hidden`}
        >
          {/* ── HEADER ── */}
          <div className="px-4 py-3 bg-[var(--theme-obsidian)]/80 border-b border-[var(--theme-pearl)]/10 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-9 h-9 rounded-full object-cover border border-cyan-500/40"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--theme-obsidian)] animate-pulse"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[var(--theme-pearl)]">Susil's AI</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase rounded bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30">
                    Gemini 3.5
                  </span>
                </div>
                <p className="text-[11px] text-[var(--theme-mist)]">Ask anything about my portfolio</p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1 text-[var(--theme-mist)]">
              {messages.length > 0 && !isMinimized && (
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-[var(--theme-pearl)] transition-colors cursor-pointer"
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
                title="Close chat"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-[var(--theme-pearl)] transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── BODY (MESSAGES + WELCOME SUGGESTIONS) ── */}
          {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {/* WELCOME CARD (When no messages) */}
              {messages.length === 0 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent border border-cyan-500/20 text-center">
                    <div className="inline-flex p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-2">
                      <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-base text-[var(--theme-pearl)]">
                      Hi! I'm Susil's AI Assistant 🤖
                    </h3>
                    <p className="text-xs text-[var(--theme-mist)] mt-1 max-w-xs mx-auto">
                      Powered by Gemini with full access to Susil's projects, optimizations, skills, experience, and certifications.
                    </p>
                  </div>

                  {/* CATEGORIZED PRE-SUGGESTIONS */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-[var(--theme-mist)] uppercase tracking-wider px-1">
                      Explore Topics
                    </p>
                    <div className="space-y-2.5">
                      {INITIAL_CATEGORIES.map((cat, cIdx) => (
                        <div key={cIdx} className="space-y-1.5">
                          <span className="text-[11px] font-medium text-[var(--theme-pearl)]/70 px-1">
                            {cat.category}
                          </span>
                          <div className="grid grid-cols-1 gap-1.5">
                            {cat.suggestions.map((s, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => handleSend(s.query)}
                                className="w-full text-left px-3 py-2 rounded-xl text-xs bg-[var(--theme-obsidian)]/60 hover:bg-cyan-500/10 border border-[var(--theme-pearl)]/10 hover:border-cyan-500/40 text-[var(--theme-pearl)] hover:text-cyan-300 transition-all duration-200 flex items-center justify-between group cursor-pointer"
                              >
                                <span>{s.label}</span>
                                <svg className="w-3.5 h-3.5 text-[var(--theme-mist)] group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
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
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none border border-cyan-400/20'
                        : msg.isError
                        ? 'bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-bl-none'
                        : 'bg-[var(--theme-obsidian)]/80 text-[var(--theme-pearl)] rounded-bl-none border border-[var(--theme-pearl)]/10'
                    }`}
                  >
                    <FormattedMessage text={msg.text} />
                  </div>

                  {/* Message footer: timestamp + copy & speak actions */}
                  <div className="flex items-center gap-2 px-1 text-[10px] text-[var(--theme-mist)] select-none">
                    <span>{msg.time}</span>
                    {msg.role === 'model' && !msg.isError && (
                      <>
                        <span>•</span>
                        <button
                          onClick={() => handleCopy(msg.text, idx)}
                          className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy response"
                        >
                          {copiedIndex === idx ? (
                            <span className="text-emerald-400 font-medium">Copied!</span>
                          ) : (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>

                        {synthRef.current && (
                          <button
                            onClick={() => handleToggleSpeak(msg.text)}
                            className="hover:text-cyan-400 transition-colors cursor-pointer"
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
                <div className="flex items-start gap-2 animate-pulse">
                  <div className="p-3 rounded-2xl rounded-bl-none bg-[var(--theme-obsidian)]/80 border border-[var(--theme-pearl)]/10 text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    <span className="text-xs text-[var(--theme-mist)] ml-1 font-mono">Thinking...</span>
                  </div>
                </div>
              )}

              {/* DYNAMIC CONTEXTUAL FOLLOW-UP PILLS */}
              {!isLoading && followUps.length > 0 && messages.length > 0 && (
                <div className="pt-2 space-y-1.5 animate-fadeIn">
                  <span className="text-[10px] font-semibold text-[var(--theme-mist)] uppercase tracking-wider">
                    Suggested Follow-ups:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {followUps.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSend(prompt)}
                        className="px-2.5 py-1 rounded-full text-xs bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 transition-all cursor-pointer text-left"
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
            <div className="p-3 bg-[var(--theme-obsidian)]/90 border-t border-[var(--theme-pearl)]/10 space-y-2">
              {/* HORIZONTAL QUICK SCROLL BAR */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px] select-none">
                {QUICK_BAR_PROMPTS.map((label, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => handleSend(QUICK_BAR_MAP[label] || label)}
                    disabled={isLoading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[var(--theme-charcoal)] hover:bg-cyan-500/15 border border-[var(--theme-pearl)]/10 hover:border-cyan-500/40 text-[var(--theme-mist)] hover:text-cyan-300 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
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
                    placeholder={isListening ? 'Listening...' : 'Ask about projects, skills, resume...'}
                    disabled={isLoading}
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm bg-[var(--theme-charcoal)] border border-[var(--theme-pearl)]/15 rounded-xl text-[var(--theme-pearl)] placeholder-[var(--theme-mist)] focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all disabled:opacity-60"
                  />

                  {/* SPEECH TO TEXT MIC BUTTON */}
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={toggleListening}
                      title={isListening ? 'Stop listening' : 'Speak question'}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isListening
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'text-[var(--theme-mist)] hover:text-cyan-400'
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
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer flex items-center justify-center"
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
