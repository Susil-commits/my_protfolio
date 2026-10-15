import SafeImage from './SafeImage';

export default function Lightbox({ src, alt = '', placeholder = null, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image preview'}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close preview"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white hover:rotate-90 transition-all duration-300 shadow-xl cursor-pointer"
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

      {/* Image Container */}
      <div
        className="relative max-w-5xl w-full max-h-[92vh] animate-scale-in flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Display Card with internal padding so corners and borders are never cut off */}
        <div className="relative rounded-2xl border border-white/20 shadow-2xl bg-slate-950/95 backdrop-blur-xl p-2.5 sm:p-4 max-w-[94vw] max-h-[80vh] flex items-center justify-center overflow-hidden">
          <SafeImage
            src={src}
            alt={alt}
            title={alt}
            fit="contain"
            placeholder={placeholder}
            loading="eager"
            className="max-w-[88vw] max-h-[74vh] flex items-center justify-center"
          />
        </div>

        {/* Title badge below certificate — pure white text on dark card ensures 100% visibility in both light & dark mode */}
        {alt && (
          <div className="mt-3.5 px-4 py-1.5 rounded-full bg-slate-900/95 border border-white/20 backdrop-blur-md flex items-center gap-2 shadow-xl max-w-[92vw]">
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
