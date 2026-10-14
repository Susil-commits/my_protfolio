import SafeImage from './SafeImage';

export default function Lightbox({ src, alt = '', onClose }) {
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 animate-fade-in"
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
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:rotate-90 transition-all duration-300 shadow-lg"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-5xl max-h-[90vh] w-auto animate-scale-in flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-obsidian-card max-h-[82vh] flex items-center justify-center">
          <SafeImage
            src={src}
            alt={alt}
            title={alt}
            loading="eager"
            className="block max-w-[92vw] max-h-[80vh] w-auto h-auto object-contain"
          />
        </div>
        {alt && (
          <div className="mt-3.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent1 animate-pulse" />
            <p className="text-center text-pearl/90 text-xs sm:text-sm font-medium tracking-wide">
              {alt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
