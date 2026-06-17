import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const sectionRef = useRef(null);

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
    setStatus('sending');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setCharCount(0);
    } catch {
      setStatus('error');
    }
  };

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

        <form onSubmit={handleSubmit} className="reveal-on-scroll space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="group">
              <label className="block text-sm text-mist mb-2 ml-1 group-focus-within:text-pearl transition-colors duration-300">
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
              <label className="block text-sm text-mist mb-2 ml-1 group-focus-within:text-pearl transition-colors duration-300">
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
            disabled={status === 'sending'}
            className="btn-primary w-full justify-center group"
          >
            {status === 'sending' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                Sending...
              </span>
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
              <p className="text-sm text-green-400 flex items-center justify-center gap-2">
                <span className="text-base">✓</span>
                Message sent successfully! I'll get back to you soon.
              </p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-center py-3 px-4 bg-red-500/5 border border-red-500/10 rounded-xl animate-scale-in">
              <p className="text-sm text-red-400 flex items-center justify-center gap-2">
                <span className="text-base">✗</span>
                Something went wrong. Please try again or email me directly.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}