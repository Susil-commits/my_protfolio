import { personal } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 border-t border-pearl/[0.06] overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-pearl/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-pearl group relative"
          >
            {personal.logo}<span className="text-mist group-hover:text-pearl/70 transition-colors duration-300">.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-pearl/30 group-hover:w-full transition-all duration-500" />
          </a>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Achievements', 'Certifications', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-mist hover:text-pearl transition-all duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-pearl/30 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-pearl/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate text-xs">
            &copy; {year} All rights reserved. Built with passion & precision.
          </p>
          <p className="text-slate text-xs flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
            Designed & Developed with care
          </p>
        </div>
      </div>
    </footer>
  );
}