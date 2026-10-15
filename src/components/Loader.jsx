import { useEffect, useRef, useState } from 'react';
import { personal } from '../data/portfolio';

const SYSTEM_BOOT_STEPS = [
  'INITIALIZING SYSTEM ARCHITECTURE',
  'SYNCING DISTRIBUTED KAFKA STREAMS',
  'CALIBRATING ML RISK SURROGATES',
  'OPTIMIZING B-TREE COMPOUND INDEXES',
  'ENGINEERING READY · LAUNCHING MISSION CONTROL',
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  // Stable ref so the effect doesn't restart if the parent re-renders
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    // Preload key hero and certificate assets while loader is active
    const preloadImages = [
      '/assets/thumbs/oracle_gen_ai_cert.webp',
      '/assets/thumbs/data_science_cert.webp',
      '/assets/thumbs/gen_ai_score_report.webp',
      '/assets/PF.jpeg',
    ];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const startTime = performance.now();
    const duration = 1900; // ~1.9s smooth, cinematic loading experience

    const updateInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      // Ease out progress smoothly
      setProgress(rawProgress);

      const stepNumber = Math.min(
        SYSTEM_BOOT_STEPS.length - 1,
        Math.floor((rawProgress / 100) * SYSTEM_BOOT_STEPS.length)
      );
      setStepIdx(stepNumber);

      if (rawProgress >= 100) {
        clearInterval(updateInterval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onCompleteRef.current();
          }, 500); // Wait for exit animation
        }, 200);
      }
    }, 25);

    return () => clearInterval(updateInterval);
  // Run only once on mount — onComplete is accessed via stable ref
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07090e] text-pearl select-none transition-all duration-500 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none -top-10 -right-10" />

      {/* Cybernetic grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
        {/* Animated Brand Emblem */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.15)] relative group">
            {/* Rotating border glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-emerald-400 opacity-60 blur-[2px] animate-spin-slow" />
            <div className="relative w-full h-full rounded-2xl bg-[#07090e] flex items-center justify-center">
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-br from-white via-pearl to-slate bg-clip-text text-transparent font-mono">
                SN
              </span>
            </div>
          </div>
        </div>

        {/* Name and Role Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold tracking-wider text-pearl uppercase">
            {personal.name}
          </h2>
          <p className="text-[11px] font-mono tracking-[0.25em] text-cyan-400/80 mt-1 uppercase">
            Distributed Systems · AI/ML
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/[0.06] h-[3px] rounded-full overflow-hidden relative mb-4 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Status Line */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-mist">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="truncate max-w-[200px] text-pearl/80">
              {SYSTEM_BOOT_STEPS[stepIdx]}
            </span>
          </span>
          <span className="font-bold text-pearl font-mono">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
