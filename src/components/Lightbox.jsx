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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close preview"
        className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-6xl max-h-full w-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="block max-w-[92vw] max-h-[86vh] w-auto h-auto rounded-xl shadow-2xl object-contain"
        />
        {alt && (
          <p className="text-center text-white/70 text-sm mt-4 font-medium">{alt}</p>
        )}
      </div>
    </div>
  );
}
