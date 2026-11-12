import { useState, useEffect, useRef } from 'react';
import { projects, personal, skills } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export default function CommandPalette({ isOpen, onClose, onSelectProject }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle global shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('open-command-palette'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build command actions list
  const actions = [
    // Navigation / Actions
    {
      id: 'action-ai',
      category: 'Actions',
      title: 'Ask Gemini Portfolio AI',
      subtitle: 'Ask technical questions about Susil\'s architecture & background',
      icon: '✨',
      onSelect: () => {
        onClose();
        window.dispatchEvent(new CustomEvent('open-portfolio-ai'));
      },
    },
    {
      id: 'action-theme',
      category: 'Actions',
      title: `Toggle Theme (Current: ${theme})`,
      subtitle: 'Switch between Dark and Light theme',
      icon: theme === 'dark' ? '☀️' : '🌙',
      onSelect: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'action-resume',
      category: 'Actions',
      title: 'Download Technical Resume',
      subtitle: 'Open Google Drive resume PDF',
      icon: '📄',
      onSelect: () => {
        onClose();
        window.open(personal.resumes[0]?.url || 'https://drive.google.com/file/d/1z8z45lWVZR7NpLrhflG8PLT02Gn-SKoX/view?usp=sharing', '_blank');
      },
    },
    {
      id: 'action-contact',
      category: 'Actions',
      title: 'Get in Touch / Email Susil',
      subtitle: personal.email,
      icon: '📫',
      onSelect: () => {
        onClose();
        window.location.href = `mailto:${personal.email}`;
      },
    },
    // Projects
    ...projects.map((p) => ({
      id: `project-${p.title}`,
      category: 'Projects & Architecture',
      title: `${p.title} — ${p.subtitle}`,
      subtitle: `${p.category} | ${p.tags.slice(0, 4).join(', ')}`,
      icon: p.icon || '🚀',
      onSelect: () => {
        onClose();
        if (onSelectProject) onSelectProject(p.title);
      },
    })),
    // Skills
    ...skills.map((s) => ({
      id: `skill-${s.category}`,
      category: 'Skills & Tooling',
      title: s.category,
      subtitle: s.items.join(', '),
      icon: s.icon || '🛠️',
      onSelect: () => {
        onClose();
        const el = document.getElementById('skills');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    })),
  ];

  // Filter actions based on query
  const filtered = actions.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDownNav = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].onSelect();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-[#040506]/85 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Palette Container — Raycast Launcher Window */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#07080a] border border-slate-200 dark:border-[#2f3031] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-3xl overflow-hidden z-10 flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-200 dark:border-[#1b1c1e]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-[#9c9c9d] shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownNav}
            placeholder="Search commands, projects, or skills (e.g. APEX, Kafka, Resume)..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#6a6b6c] focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#111214] border border-slate-200 dark:border-[#2f3031] text-slate-500 dark:text-[#9c9c9d]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400 dark:text-[#6a6b6c]">
              No matching commands or projects found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-slate-100 text-slate-900 border border-slate-200 dark:bg-[#1b1c1e] dark:text-white dark:border-[#2f3031]'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-[#9c9c9d] dark:hover:bg-[#111214] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-[#6a6b6c] truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded shrink-0 ml-2 ${
                    isSelected ? 'bg-white text-slate-900 border border-slate-200 dark:bg-[#111214] dark:text-white dark:border-[#2f3031]' : 'bg-slate-100 text-slate-500 dark:bg-[#111214] dark:text-[#6a6b6c]'
                  }`}>
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 border-t border-slate-200 dark:border-[#1b1c1e] bg-slate-50 dark:bg-[#111214]/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-[#6a6b6c] font-mono px-5">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Raycast Command Palette</span>
        </div>
      </div>
    </div>
  );
}
