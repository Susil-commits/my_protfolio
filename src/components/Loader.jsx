import { useEffect, useRef, useState } from 'react';
import { personal } from '../data/portfolio';

const LOAD_STEPS = [
  'Initializing portfolio',
  'Loading projects',
  'Connecting assets',
  'Applying design system',
  'Ready',
];

const CIRCUMFERENCE = 2 * Math.PI * 45; // r=45

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    if (personal?.avatar) {
      const img = new Image();
      img.src = personal.avatar;
    }

    const startTime = performance.now();
    const duration = 2000;

    const updateInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);
      setStepIdx(
        Math.min(LOAD_STEPS.length - 1, Math.floor((rawProgress / 100) * LOAD_STEPS.length))
      );

      if (rawProgress >= 100) {
        clearInterval(updateInterval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => { onCompleteRef.current(); }, 600);
        }, 200);
      }
    }, 20);

    return () => clearInterval(updateInterval);
  }, []);

  // SVG ring offset: full circle = 283, empty = 0
  const ringOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  // Name letter stagger
  const nameLetters = personal.name.split('').map((ch, i) => (
    <span
      key={i}
      className="loader-char"
      style={{
        animationDelay: `${0.1 + i * 0.045}s`,
        display: ch === ' ' ? 'inline-block' : undefined,
        width: ch === ' ' ? '0.4em' : undefined,
      }}
    >
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center select-none"
      style={{
        zIndex: 99999,
        background: '#030712',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.04) translateY(-12px)' : 'scale(1) translateY(0)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Background morphing blobs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '70vmax',
          height: '70vmax',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at 40% 40%, oklch(70% 0.2 240 / 0.07) 0%, transparent 60%), radial-gradient(circle at 70% 70%, oklch(65% 0.25 290 / 0.06) 0%, transparent 55%)',
          animation: 'blob-morph 10s ease-in-out infinite',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '40vmax',
          height: '40vmax',
          top: '20%',
          right: '10%',
          background: 'radial-gradient(circle, oklch(65% 0.25 290 / 0.06) 0%, transparent 65%)',
          animation: 'blob-morph 15s ease-in-out infinite reverse',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(oklch(70% 0.2 240 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(70% 0.2 240 / 0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8 max-w-xs w-full px-8">
        {/* SVG Ring Progress */}
        <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Track ring */}
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="oklch(70% 0.2 240 / 0.08)"
              strokeWidth="2"
            />
            {/* Progress ring */}
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="url(#loaderGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={ringOffset}
              style={{ transition: 'stroke-dashoffset 0.08s linear' }}
            />
            <defs>
              <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(70% 0.2 240)" />
                <stop offset="50%" stopColor="oklch(65% 0.25 290)" />
                <stop offset="100%" stopColor="oklch(75% 0.18 160)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center: percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 700,
                lineHeight: 1,
                color: '#f8fafc',
                letterSpacing: '-0.03em',
              }}
            >
              {progress}
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                color: 'oklch(70% 0.2 240)',
                letterSpacing: '0.15em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              %
            </span>
          </div>
        </div>

        {/* Name with staggered letter reveal */}
        <div className="text-center">
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#f8fafc',
              lineHeight: 1.2,
              textTransform: 'uppercase',
            }}
          >
            {nameLetters}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'oklch(70% 0.2 240)',
              marginTop: '0.4rem',
              textTransform: 'uppercase',
            }}
          >
            Full-Stack Developer
          </p>
        </div>

        {/* Progress bar track */}
        <div className="w-full">
          <div
            className="w-full rounded-full overflow-hidden"
            style={{
              height: '2px',
              background: 'oklch(70% 0.2 240 / 0.1)',
              border: '1px solid oklch(70% 0.2 240 / 0.08)',
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, oklch(70% 0.2 240), oklch(65% 0.25 290), oklch(75% 0.18 160))',
                boxShadow: '0 0 12px oklch(70% 0.2 240 / 0.6)',
                transition: 'width 0.08s linear',
              }}
            />
          </div>

          {/* Step label */}
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-2">
              <span
                className="rounded-full"
                style={{
                  width: '5px',
                  height: '5px',
                  background: 'oklch(70% 0.2 240)',
                  boxShadow: '0 0 8px oklch(70% 0.2 240 / 0.8)',
                  animation: 'pingSlow 1.5s ease-in-out infinite',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'oklch(70% 0.2 240 / 0.7)',
                  letterSpacing: '0.06em',
                }}
              >
                {LOAD_STEPS[stepIdx]}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--theme-slate)',
                letterSpacing: '0.08em',
              }}
            >
              v2.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
