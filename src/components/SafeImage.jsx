import { useState, useRef, useEffect } from 'react';

/**
 * Robust image component with instant cache detection, loading skeleton,
 * configurable object-fit (cover vs contain), and fallback.
 */
export default function SafeImage({
  src,
  alt = '',
  className = '',
  fit = 'cover',
  title = '',
  loading = 'lazy',
  placeholder = null,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  // If image is already in memory or cached by browser, mark loaded immediately
  useEffect(() => {
    setLoaded(false);
    setError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const fitClass =
    fit === 'contain'
      ? 'max-w-full max-h-full w-auto h-auto object-contain block mx-auto my-auto'
      : 'w-full h-full object-cover';

  return (
    <div
      className={`relative ${
        fit === 'contain' ? 'flex items-center justify-center' : 'overflow-hidden'
      } ${className}`}
    >
      {/* Optional Low-Res Blurred Placeholder for Instant Preview */}
      {placeholder && !loaded && !error && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full ${
            fit === 'contain' ? 'object-contain' : 'object-cover'
          } filter blur-[2px] opacity-70 pointer-events-none transition-opacity duration-300`}
        />
      )}

      {/* Loading Shimmer Skeleton (shown only if no placeholder is available) */}
      {!placeholder && !loaded && !error && (
        <div className="absolute inset-0 bg-pearl/[0.04] animate-pulse flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 rounded-full border border-pearl/20 border-t-pearl/60 animate-spin" />
        </div>
      )}

      {/* Fallback Display if Image Fails */}
      {error ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian-card p-2 text-center border border-pearl/10"
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-pearl/40 mb-1"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
          <span className="text-[9px] font-mono text-pearl/50 line-clamp-1">
            {title || alt || 'Verified Proof'}
          </span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          title={title}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            console.warn(`[SafeImage] Failed to load image: ${src}`);
            setError(true);
          }}
          className={`${fitClass} transition-opacity duration-200 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
}
