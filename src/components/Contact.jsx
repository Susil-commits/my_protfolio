import { useState, useEffect, useRef } from 'react';
import { personal } from '../data/portfolio';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const sectionRef = useRef(null);
  const submitMag = useMagnetic(0.3);

  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
              el.classList.add('revealed');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'message') setCharCount(e.target.value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ACCESS_KEY) {
      setStatus('nokey');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio inquiry',
          message: form.message,
          from_name: 'Portfolio Contact',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setCharCount(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const socials = [
    { label: 'LinkedIn', url: personal.social.linkedin, icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { label: 'GitHub', url: personal.social.github, icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' },
    { label: 'Twitter', url: personal.social.twitter, icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63A9.936 9.936 0 0024 4.59z' },
  ].filter((s) => s.url);

  const contactCards = [
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
      extra: <polyline points="22,6 12,13 2,6" />,
    },
    {
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s/g, '')}`,
      icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
      extra: null,
    },
    {
      label: 'Location',
      value: personal.location,
      href: null,
      icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
      extra: <circle cx="12" cy="10" r="3" />,
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="ambient-glow ambient-glow-white w-[450px] h-[450px] -bottom-20 right-1/4 opacity-10 animate-glow-pulse" />
      <div className="ambient-glow ambient-glow-white w-[200px] h-[200px] top-10 left-1/4 opacity-5 animate-float-slow" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal-on-scroll section-badge mb-4 inline-flex">
            Contact
          </span>
          <h2 className="reveal-on-scroll section-title text-pearl mt-4">
            Let's <span className="text-gradient-animated">connect</span>
          </h2>
          <p className="reveal-on-scroll text-mist mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Have a project in mind? I'd love to hear about it. Drop me a
            message and I'll get back within 24 hours.
          </p>
        </div>

        {/* Direct contact info */}
        <div className="reveal-on-scroll grid sm:grid-cols-3 gap-4 mb-12">
          {contactCards.map((card) => {
            const content = (
              <>
                <div className="w-10 h-10 rounded-xl bg-pearl/[0.04] border border-pearl/15 flex items-center justify-center text-pearl/60 group-hover:text-pearl transition-colors duration-300 mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={card.icon} />
                    {card.extra}
                  </svg>
                </div>
                <p className="text-xs text-slate uppercase tracking-[0.12em] mb-1">{card.label}</p>
                <p className="text-sm text-pearl font-medium break-all">{card.value}</p>
              </>
            );
            return card.href ? (
              <a key={card.label} href={card.href} className="card-morph-border p-5 group block">
                {content}
              </a>
            ) : (
              <div key={card.label} className="card-morph-border p-5 group">
                {content}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="reveal-on-scroll space-y-5">
          {/* Honeypot anti-spam field */}
          <input
            type="text"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="group">
              <label className="block text-sm text-mist mb-2 ml-1 group-focus-within:text-pearl group-focus-within:-translate-y-1 transition-all duration-300 inline-block">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="input-field"
              />
            </div>
            <div className="group">
              <label className="block text-sm text-mist mb-2 ml-1 group-focus-within:text-pearl group-focus-within:-translate-y-1 transition-all duration-300 inline-block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="input-field"
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-sm text-mist mb-2 ml-1 group-focus-within:text-pearl transition-colors duration-300">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Project inquiry"
              className="input-field"
            />
          </div>
          <div className="group">
            <label className="flex justify-between text-sm text-mist mb-2 ml-1">
              <span className="group-focus-within:text-pearl transition-colors duration-300">
                Message
              </span>
              <span className="text-xs text-slate font-mono">
                {charCount}/500
              </span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              maxLength={500}
              rows={5}
              placeholder="Tell me about your project..."
              className="input-field resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
            {...submitMag}
          >
            {status === 'loading' ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="text-center py-3 px-4 bg-green-500/5 border border-green-500/10 rounded-xl animate-scale-in">
              <p className="text-sm text-green-700 flex items-center justify-center gap-2">
                <span className="text-base">✓</span>
                Message sent! Thanks for reaching out — I'll get back to you within 24 hours.
              </p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-center py-3 px-4 bg-red-500/5 border border-red-500/10 rounded-xl animate-scale-in">
              <p className="text-sm text-red-700 flex items-center justify-center gap-2">
                <span className="text-base">✕</span>
                Something went wrong. Please email me directly at {personal.email}.
              </p>
            </div>
          )}
          {status === 'nokey' && (
            <div className="text-center py-3 px-4 bg-amber-500/5 border border-amber-500/10 rounded-xl animate-scale-in">
              <p className="text-sm text-amber-700 flex items-center justify-center gap-2">
                <span className="text-base">!</span>
                Form delivery isn't configured yet. Email me at {personal.email}.
              </p>
            </div>
          )}
        </form>

        {/* Social links — only render when URLs are provided */}
        {socials.length > 0 && (
          <div className="reveal-on-scroll flex items-center justify-center gap-4 mt-12">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 rounded-full bg-pearl/[0.04] border border-pearl/15 flex items-center justify-center text-mist hover:text-pearl hover:border-pearl/30 hover:bg-ash/60 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
