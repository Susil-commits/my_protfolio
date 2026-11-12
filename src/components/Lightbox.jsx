import { useState, useEffect } from 'react';

export default function Lightbox({ src, alt = '', placeholder = null, onClose }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (!src) return;
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image preview'}
      onClick={onClose}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Top right actions */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
        {src && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open full resolution in new tab"
            title="Open full resolution in new tab"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 shadow-xl cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}

        <button
          onClick={onClose}
          aria-label="Close preview"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white hover:rotate-90 transition-all duration-300 shadow-xl cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Image Container — flex-col with max-h-[96vh] to ensure everything fits comfortably */}
      <div
        className="relative max-w-5xl w-auto max-h-[96vh] animate-scale-in flex flex-col items-center justify-center min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Display Card — no overflow-hidden so bottom is never cut off */}
        <div className="relative rounded-2xl border border-white/20 shadow-2xl bg-slate-950/95 backdrop-blur-xl p-2 sm:p-3 flex items-center justify-center">
          {/* Low-res placeholder while full asset loads */}
          {placeholder && !loaded && (
            <img
              src={placeholder}
              alt=""
              aria-hidden="true"
              className="max-h-[74vh] sm:max-h-[78vh] max-w-[90vw] sm:max-w-[85vw] w-auto h-auto object-contain rounded-xl filter blur-sm opacity-60 pointer-events-none block"
            />
          )}

          {/* Full High-Resolution Certificate Image */}
          <img
            src={src}
            alt={alt}
            title={alt}
            loading="eager"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`max-h-[74vh] sm:max-h-[78vh] max-w-[90vw] sm:max-w-[85vw] w-auto h-auto object-contain rounded-xl block shadow-lg transition-opacity duration-200 ${
              loaded ? 'opacity-100' : placeholder ? 'absolute inset-0 m-auto opacity-0' : 'opacity-100'
            }`}
          />
        </div>

        {/* Title badge below certificate */}
        {alt && (
          <div className="mt-3 px-4 py-1.5 rounded-full bg-slate-900/95 border border-white/20 backdrop-blur-md flex items-center gap-2 shadow-xl max-w-[90vw] shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse shrink-0" />
            <p className="text-center text-white text-xs sm:text-sm font-medium tracking-wide truncate">
              {alt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
