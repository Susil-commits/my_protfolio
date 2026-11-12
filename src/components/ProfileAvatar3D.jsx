import { useState, useRef } from 'react';
import { personal } from '../data/portfolio';
import SafeImage from './SafeImage';

// Orbiting mini-badges (like a solar system)
const ORBIT_BADGES = [
  { label: 'Full-Stack', r: 95, dur: '12s', start: '0deg', color: 'oklch(70% 0.2 240)' },
  { label: 'AI/ML', r: 95, dur: '18s', start: '120deg', color: 'oklch(65% 0.25 290)' },
  { label: 'Open to Work', r: 95, dur: '14s', start: '240deg', color: 'oklch(75% 0.18 160)' },
];

export default function ProfileAvatar3D() {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Up to 25deg 3D tilt
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;

    setRotate({ x: rotateX, y: rotateY });
    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.55,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setShine({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div className="reveal-scale flex justify-center mb-10 select-none">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer group"
        style={{ perspective: 1200, width: 220, height: 220 }}
      >
        {/* Pulsing ambient halo */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-24px',
            background: isHovered
              ? 'radial-gradient(circle, oklch(70% 0.2 240 / 0.25) 0%, oklch(65% 0.25 290 / 0.15) 50%, transparent 70%)'
              : 'radial-gradient(circle, oklch(70% 0.2 240 / 0.1) 0%, transparent 60%)',
            filter: 'blur(20px)',
            transition: 'all 0.7s ease',
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            animation: 'glowPulse 5s ease-in-out infinite',
          }}
        />

        {/* Outer orbit ring (slow spin) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-20px',
            border: '1px dashed oklch(70% 0.2 240 / 0.15)',
            animation: 'spinSlow 25s linear infinite',
          }}
        />

        {/* Inner orbit ring (counter-spin) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-10px',
            border: '1px solid oklch(65% 0.25 290 / 0.1)',
            animation: 'spinSlow 18s linear infinite reverse',
          }}
        />

        {/* Orbiting mini-badges */}
        {ORBIT_BADGES.map((badge, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              width: 0,
              height: 0,
              '--orbit-r': `${badge.r}px`,
              '--orbit-dur': badge.dur,
              '--orbit-start': badge.start,
              animation: `orbiting ${badge.dur} linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div
              style={{
                transform: 'translate(-50%, -50%)',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: badge.color,
                background: `color-mix(in oklch, ${badge.color} 10%, oklch(10% 0.01 240 / 0.9))`,
                border: `1px solid color-mix(in oklch, ${badge.color} 25%, transparent)`,
                backdropFilter: 'blur(8px)',
                whiteSpace: 'nowrap',
                boxShadow: `0 0 10px color-mix(in oklch, ${badge.color} 20%, transparent)`,
              }}
            >
              {badge.label}
            </div>
          </div>
        ))}

        {/* 3D Tilting Frame */}
        <div
          className="relative w-full h-full transition-transform duration-200 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? 'scale3d(1.06, 1.06, 1.06)' : 'scale3d(1, 1, 1)'}`,
            willChange: 'transform',
          }}
        >
          {/* Chromatic aberration outer glow on hover */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              transform: 'translateZ(2px)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              boxShadow: isHovered
                ? `
                  0 0 0 1px oklch(70% 0.2 240 / 0.6),
                  4px 0 20px -4px oklch(70% 0.2 240 / 0.4),
                  -4px 0 20px -4px oklch(65% 0.25 290 / 0.4),
                  0 30px 60px -15px oklch(70% 0.2 240 / 0.5)
                `
                : 'none',
            }}
          />

          {/* Gradient border frame */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              padding: '2px',
              background: 'linear-gradient(135deg, oklch(70% 0.2 240), oklch(65% 0.25 290), oklch(75% 0.18 160), oklch(70% 0.2 240))',
              backgroundSize: '300% 300%',
              animation: 'gradientShift 5s ease infinite',
              transform: 'translateZ(5px)',
            }}
          >
            <div
              className="w-full h-full rounded-[22px]"
              style={{ background: 'var(--theme-obsidian)' }}
            />
          </div>

          {/* Avatar picture container */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              transform: 'translateZ(18px)',
              border: '1px solid oklch(70% 0.2 240 / 0.2)',
            }}
          >
            <SafeImage
              src={personal.avatar}
              alt={personal.name}
              title={personal.name}
              loading="eager"
              className="w-full h-full object-cover object-top transition-transform duration-500"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                filter: isHovered ? 'brightness(1.05) contrast(1.02)' : 'none',
              }}
            />

            {/* Specular holographic shine */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: shine.opacity,
                background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Chromatic aberration edge on hover */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.6 : 0,
                background: 'linear-gradient(135deg, oklch(70% 0.2 240 / 0.08) 0%, transparent 50%, oklch(65% 0.25 290 / 0.06) 100%)',
                mixBlendMode: 'overlay',
              }}
            />

            {/* Inner rim shadow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
            />
          </div>

          {/* Status badge (bottom-right) */}
          <div
            className="absolute -bottom-3 -right-3 sm:-right-5 backdrop-blur-xl rounded-full border flex items-center gap-1.5 transition-transform duration-300"
            style={{
              transform: `translateZ(40px) ${isHovered ? 'translateY(-2px)' : ''}`,
              padding: '5px 12px 5px 8px',
              background: 'color-mix(in oklch, var(--theme-obsidian) 85%, transparent)',
              borderColor: 'oklch(75% 0.18 160 / 0.3)',
              boxShadow: '0 4px 20px -4px oklch(75% 0.18 160 / 0.3)',
            }}
          >
            <span className="relative flex">
              <span
                className="absolute inline-flex rounded-full"
                style={{
                  inset: 0,
                  background: 'oklch(75% 0.18 160)',
                  animation: 'pingSlow 2s ease-in-out infinite',
                }}
              />
              <span
                className="relative rounded-full"
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'oklch(75% 0.18 160)',
                  boxShadow: '0 0 8px oklch(75% 0.18 160)',
                }}
              />
            </span>
            <span
              className="text-[11px] font-bold whitespace-nowrap"
              style={{ color: 'var(--theme-pearl)' }}
            >
              Software Engineer
            </span>
          </div>

          {/* Top-left label */}
          <div
            className="absolute -top-3 -left-2 backdrop-blur-md rounded-full border"
            style={{
              transform: `translateZ(32px)`,
              padding: '3px 10px',
              background: 'oklch(70% 0.2 240 / 0.08)',
              borderColor: 'oklch(70% 0.2 240 / 0.25)',
              fontSize: '9px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'oklch(70% 0.2 240)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Full-Stack
          </div>
        </div>
      </div>
    </div>
  );
}
