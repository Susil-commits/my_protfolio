import { useState, useRef } from 'react';
import { personal } from '../data/portfolio';
import SafeImage from './SafeImage';

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
        </div>
      </div>
    </div>
  );
}
