import { useState, useRef } from 'react';
import { personal } from '../data/portfolio';

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

    // Max 18 degree 3D tilt
    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 18;

    setRotate({ x: rotateX, y: rotateY });
    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.45,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

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
        style={{ perspective: 1000 }}
      >
        {/* Ambient Underglow Halo */}
        <div
          className="absolute -inset-6 rounded-full bg-gradient-to-tr from-cyan-500/25 via-purple-500/20 to-emerald-500/20 blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            opacity: isHovered ? 0.7 : 0.25,
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          }}
        />

        {/* Counter-Rotating Orbital Ring */}
        <div className="absolute -inset-4 rounded-full border border-dashed border-pearl/15 animate-spin-slow pointer-events-none" />

        {/* 3D Tilting Frame */}
        <div
          className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-1.5 transition-transform duration-200 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? 'scale3d(1.05, 1.05, 1.05)' : 'scale3d(1, 1, 1)'}`,
            boxShadow: isHovered
              ? '0 30px 60px -15px rgba(0,0,0,0.4), 0 0 40px -10px rgba(56, 189, 248, 0.3)'
              : '0 20px 45px -20px rgba(0,0,0,0.25)',
          }}
        >
          {/* Prismatic Conic Glow Border */}
          <div
            className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-emerald-400 animate-gradient-shift"
            style={{
              transform: 'translateZ(5px)',
            }}
          >
            <div className="w-full h-full rounded-[22px] bg-obsidian" />
          </div>

          {/* Avatar Picture Container */}
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden bg-obsidian border border-pearl/20"
            style={{ transform: 'translateZ(15px)' }}
          >
            <img
              src={personal.avatar}
              alt={personal.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
            />

            {/* Specular 3D Holographic Shine Overlay */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: shine.opacity,
                background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Inner Vignette / Rim Shadow */}
            <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none ring-1 ring-inset ring-white/15" />
          </div>

          {/* Floating 3D Badge */}
          <div
            className="absolute -bottom-3 -right-2 sm:-right-4 px-3 py-1.5 rounded-full bg-obsidian/90 border border-pearl/20 backdrop-blur-xl shadow-xl flex items-center gap-1.5 transition-transform duration-300"
            style={{ transform: 'translateZ(35px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-[10px] sm:text-xs font-bold text-pearl tracking-tight whitespace-nowrap">
              Software Engineer
            </span>
          </div>

          {/* 3D Depth Top Label */}
          <div
            className="absolute -top-3 -left-2 px-2.5 py-0.5 rounded-full bg-pearl/10 border border-pearl/15 backdrop-blur-md text-[9px] font-mono font-bold text-pearl/80 uppercase tracking-widest transition-transform duration-300"
            style={{ transform: 'translateZ(30px)' }}
          >
            Full-Stack
          </div>
        </div>
      </div>
    </div>
  );
}
