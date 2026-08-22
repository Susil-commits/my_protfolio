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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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
        window.open(personal.resumes[0]?.url || 'https://drive.google.com/file/d/1i8YK3XQLwm5e_ow4Hq5ypD0TxwoLzS0O/view?usp=sharing', '_blank');
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
        className="fixed inset-0 bg-obsidian/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-obsidian/95 border border-pearl/20 rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden z-10 flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-pearl/10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate shrink-0">
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
            placeholder="Type a command, project, or skill (e.g. APEX, Kafka, AI, Resume)..."
            className="w-full bg-transparent text-sm sm:text-base text-pearl placeholder:text-slate focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex text-[10px] font-mono px-2 py-1 rounded bg-pearl/10 border border-pearl/15 text-slate">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate">
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
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-pearl text-obsidian shadow-md'
                      : 'text-mist hover:bg-pearl/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? 'text-obsidian' : 'text-pearl'}`}>
                        {item.title}
                      </div>
                      <div className={`text-[11px] truncate ${isSelected ? 'text-obsidian/80' : 'text-slate'}`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                    isSelected ? 'bg-obsidian/20 text-obsidian font-bold' : 'bg-pearl/[0.06] text-slate'
                  }`}>
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-pearl/10 bg-pearl/[0.02] flex items-center justify-between text-[11px] text-slate font-mono px-6">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Susil Kumar Nayak Portfolio</span>
        </div>
      </div>
    </div>
  );
}
