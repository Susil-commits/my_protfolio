import { useEffect, useRef, useState } from 'react';
import { personal } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

const LOAD_STEPS = [
  'INITIALIZING RUNTIME ENGINE',
  'COMPILING RAYCAST COCKPIT TOKENS',
  'VERIFYING DISTRIBUTED ARCHITECTURE',
  'CONNECTING SYSTEM ASSETS',
  'COMMAND CENTER READY',
];

export default function Loader({ onComplete }) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Preload avatar & smooth progress progression over ~1.8s
  useEffect(() => {
    if (personal?.avatar) {
      const img = new Image();
      img.src = personal.avatar;
    }

    const startTime = performance.now();
    const duration = 1800;

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
          setTimeout(() => {
            onCompleteRef.current();
          }, 500);
        }, 180);
      }
    }, 20);

    return () => clearInterval(updateInterval);
  }, []);

  // Allow instant skip on click or Escape
  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 250);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      onClick={handleSkip}
      className="fixed inset-0 flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer"
      style={{
        zIndex: 99999,
        backgroundColor: isDark ? '#040506' : '#f8fafc',
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.02) translateY(-6px)' : 'scale(1) translateY(0)',
        filter: isExiting ? 'blur(8px)' : 'blur(0px)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* ── Background Raycast Coral Glow Diagonal Geometry ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Atmospheric Radial Wash */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20, 60, 163, 0.25) 0%, rgba(4, 5, 6, 0.95) 75%)'
              : 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(219, 234, 254, 0.5) 0%, rgba(248, 250, 252, 0.95) 75%)',
          }}
        />

        {/* Diagonal Coral Beams SVG behind the loader */}
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 35px rgba(255, 99, 99, 0.45))' }}
        >
          <g transform="translate(500, 300) rotate(43)">
            <rect x="-120" y="-300" width="48" height="600" rx="24" fill="#ff6363" opacity="0.35" />
            <rect x="-40" y="-340" width="80" height="680" rx="40" fill="#ff6363" opacity="0.75" />
            <rect x="60" y="-310" width="56" height="620" rx="28" fill="#e0283e" opacity="0.45" />
          </g>
        </svg>

        {/* Technical Micro-Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle, #ffffff 1px, transparent 1px)'
              : 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ── Central Raycast Command Cockpit Loader Card ── */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
        {/* Raycast 4-point Diamond Emblem with Ambient Pulse */}
        <div className="relative mb-6 flex items-center justify-center">
          <div
            className="absolute w-16 h-16 rounded-full blur-xl pointer-events-none"
            style={{
              background: '#ff6363',
              opacity: 0.45,
              animation: 'glowPulse 3s ease-in-out infinite',
            }}
          />
          <div
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300"
            style={{
              background: isDark ? '#07080a' : '#ffffff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : '#e2e8f0',
              boxShadow: isDark
                ? '0 8px 24px -4px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.16)'
                : '0 8px 24px -4px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Signature Raycast 4-pointed Diamond */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              className="transform hover:rotate-12 transition-transform duration-300"
            >
              <path
                d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"
                fill="#ff6363"
              />
              <circle cx="19" cy="5" r="1.5" fill="#ffaab3" />
            </svg>
          </div>
        </div>

        {/* Digital Counter Display */}
        <div className="flex items-baseline gap-1 mb-2">
          <span
            className="font-bold tracking-tight leading-none"
            style={{
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '3rem',
              color: isDark ? '#ffffff' : '#0f172a',
              letterSpacing: '-0.04em',
            }}
          >
            {progress}
          </span>
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: '#ff6363' }}
          >
            %
          </span>
        </div>

        {/* Developer Identification */}
        <h1
          className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-center mb-1"
          style={{
            fontFamily: 'var(--font-inter, sans-serif)',
            color: isDark ? '#ffffff' : '#0f172a',
          }}
        >
          {personal.name}
        </h1>
        <p
          className="text-[10px] font-mono tracking-[0.2em] uppercase text-center mb-6"
          style={{
            color: isDark ? '#9c9c9d' : '#64748b',
          }}
        >
          {personal.title}
        </p>

        {/* Precision Raycast Linear Progress Bar */}
        <div className="w-full space-y-2.5 mb-6">
          <div
            className="w-full h-1.5 rounded-full overflow-hidden p-0.5 border"
            style={{
              background: isDark ? '#111214' : '#e2e8f0',
              borderColor: isDark ? '#1b1c1e' : '#cbd5e1',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-75 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #ff6363 0%, #ff7b7b 100%)',
                boxShadow: '0 0 12px rgba(255, 99, 99, 0.85)',
              }}
            />
          </div>

          {/* Stepper Status Telemetry */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#ff6363',
                  boxShadow: '0 0 8px rgba(255, 99, 99, 0.9)',
                  animation: 'pingSlow 1.6s ease-in-out infinite',
                }}
              />
              <span
                className="font-mono text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: '#ff6363' }}
              >
                [{String(stepIdx + 1).padStart(2, '0')}/05] {LOAD_STEPS[stepIdx]}
              </span>
            </div>
            <span
              className="font-mono text-[9px] uppercase tracking-wider"
              style={{ color: isDark ? '#6a6b6c' : '#94a3b8' }}
            >
              SYS.OK
            </span>
          </div>
        </div>

        {/* Telemetry Footer */}
        <div
          className="flex items-center justify-center gap-3 pt-3 border-t w-full text-[9px] font-mono tracking-wider uppercase"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : '#e2e8f0',
            color: isDark ? '#6a6b6c' : '#64748b',
          }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59d499]" />
            SYSTEM: ONLINE
          </span>
          <span>•</span>
          <span>LATENCY: 0.02ms</span>
          <span>•</span>
          <span>{personal.location}</span>
        </div>

        {/* Skip hint */}
        <p
          className="text-[9px] font-mono uppercase tracking-widest mt-4 opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: isDark ? '#9c9c9d' : '#64748b' }}
        >
          Click anywhere or press Esc to enter
        </p>
      </div>
    </div>
  );
}
