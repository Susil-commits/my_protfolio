import { useState } from 'react';

/**
 * Robust image component with loading skeleton, smooth fade-in,
 * and elegant fallback on network or file error.
 */
export default function SafeImage({
  src,
  alt = '',
  className = '',
  fallbackIcon = 'cert',
  title = '',
  loading = 'lazy',
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Shimmer Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-pearl/[0.04] animate-pulse flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-pearl/20 border-t-pearl/60 animate-spin" />
        </div>
      )}

      {/* Fallback Display if Image Fails */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian-card p-2 text-center border border-pearl/10">
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
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
}
