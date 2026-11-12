import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function RaycastBackground() {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Track window scroll to smoothly dissolve hero artwork as user explores lower sections
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track cursor for dynamic cockpit spotlight & gentle 3D parallax on hero artwork
  useEffect(() => {
    let animId = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.35;
    let currX = targetX;
    let currY = targetY;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });

      // Calculate normalized offset from viewport center (-1 to 1)
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const nx = (e.clientX - cx) / cx;
      const ny = (e.clientY - cy) / cy;

      setParallax({
        x: nx * 18,
        y: ny * 12,
        tiltX: ny * -3,
        tiltY: nx * 3.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Ultra-lightweight ambient drifting micro-motes for deep-space atmosphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 35 quiet monochrome dust particles (strictly 1px, low opacity, no clutter)
    const count = window.innerWidth < 768 ? 16 : 32;
    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.2 + 0.6,
      opacity: Math.random() * 0.25 + 0.08,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.12,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const isDark = theme === 'dark';
    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.speedX;
        m.y += m.speedY;

        if (m.x < 0) m.x = width;
        else if (m.x > width) m.x = 0;
        if (m.y < 0) m.y = height;
        else if (m.y > height) m.y = 0;

        const currentOpacity =
          m.opacity + Math.sin(frame * m.pulseSpeed + m.pulsePhase) * 0.06;

        ctx.fillStyle = isDark
          ? `rgba(230, 230, 230, ${Math.max(0.04, currentOpacity)})`
          : `rgba(71, 85, 105, ${Math.max(0.06, currentOpacity * 1.2)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // Calculate hero artwork opacity: fully visible in hero, softly fades out down to 0 by 800px scroll
  const heroOpacity = Math.max(0, 1 - scrollY / 720);

  const isDark = theme === 'dark';

  return (
    <div
      id="raycast-default-bg"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-300"
      style={{
        backgroundColor: 'var(--theme-obsidian, #040506)',
      }}
    >
      {/* ── Global Technical Micro-Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, #ffffff 1px, transparent 1px)'
            : 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: isDark ? 0.035 : 0.045,
        }}
      />

      {/* ── Global Subtle Cursor Spotlight ── */}
      {mousePos.x > 0 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: isDark
              ? `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 99, 99, 0.035) 0%, rgba(20, 60, 163, 0.016) 40%, transparent 75%)`
              : `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 99, 99, 0.05) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 75%)`,
          }}
        />
      )}

      {/* ── Hero Artwork: Raycast Diagonal 3D Coral Neon Beams ── */}
      <div
        className="absolute top-0 inset-x-0 h-screen min-h-[640px] max-h-[960px] pointer-events-none transition-opacity duration-150 ease-out will-change-transform"
        style={{
          opacity: heroOpacity,
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
        }}
      >
        {/* Deep atmospheric radial wash */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-300"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 70% 55% at 50% 28%, rgba(4, 63, 150, 0.65) 0%, rgba(20, 60, 163, 0.38) 32%, rgba(2, 25, 59, 0.18) 60%, transparent 85%)'
              : 'radial-gradient(ellipse 70% 55% at 50% 28%, rgba(191, 219, 254, 0.45) 0%, rgba(219, 234, 254, 0.28) 32%, rgba(241, 245, 249, 0.1) 60%, transparent 85%)',
          }}
        />

        {/* Supporting electric sky / cobalt ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 90% 45% at 50% 34%, rgba(99, 161, 255, 0.08) 0%, rgba(20, 60, 163, 0.12) 40%, transparent 70%)'
              : 'radial-gradient(ellipse 90% 45% at 50% 34%, rgba(147, 197, 253, 0.12) 0%, rgba(191, 219, 254, 0.1) 40%, transparent 70%)',
          }}
        />

        {/* ── Vector 3D Diagonal Beams SVG with Volumetric Bloom & Specular Highlights ── */}
        <svg
          viewBox="0 0 1200 680"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
          style={{
            filter: 'drop-shadow(0 0 50px rgba(255, 99, 99, 0.35))',
          }}
        >
          <defs>
            {/* 3D cylinder cross-section gradient (perpendicular across width) */}
            <linearGradient id="raycastCylinder3D" x1="0%" y1="0%" x2="100%" y2="0%">
              {/* Top-left cobalt edge highlight */}
              <stop offset="0%" stopColor="#143ca3" stopOpacity="0.65" />
              <stop offset="4%" stopColor="#63a1ff" stopOpacity="0.6" />
              {/* Dark transition before specular peak */}
              <stop offset="11%" stopColor="#a3192f" stopOpacity="0.9" />
              {/* Sharp, radiant specular ridge highlight */}
              <stop offset="21%" stopColor="#fff2f4" stopOpacity="1" />
              <stop offset="30%" stopColor="#ffaab3" stopOpacity="1" />
              {/* Radiant coral core */}
              <stop offset="45%" stopColor="#ff6363" stopOpacity="1" />
              <stop offset="65%" stopColor="#db1c35" stopOpacity="0.98" />
              {/* Cylinder shadow wrap */}
              <stop offset="84%" stopColor="#800b1a" stopOpacity="0.95" />
              <stop offset="94%" stopColor="#452324" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0a0507" stopOpacity="0.75" />
            </linearGradient>

            {/* Longitudinal opacity fade mask (soft caps at cylinder ends) */}
            <linearGradient id="raycastBeamFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="10%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="20%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="80%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="90%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <mask id="raycastCapsuleMask">
              <rect x="-600" y="-600" width="1200" height="1200" fill="url(#raycastBeamFade)" />
            </mask>

            {/* Volumetric soft neon bloom */}
            <filter id="raycastNeonBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="38" />
            </filter>

            {/* High-frequency tactile stipple grain noise for authentic Raycast 3D cylinder texture */}
            <filter id="raycastBeamGrain" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.95"
                numOctaves="4"
                stitchTiles="stitch"
                result="stippleNoise"
              />
              <feColorMatrix
                type="matrix"
                values="
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0.38 0
                "
                result="stippleAlpha"
              />
              <feBlend mode="overlay" in="SourceGraphic" in2="stippleAlpha" />
            </filter>
          </defs>

          {/* ── Layer A: Volumetric Radiant Neon Bloom ── */}
          <g
            transform="translate(600, 310) rotate(43)"
            filter="url(#raycastNeonBloom)"
            opacity="0.88"
            className="animate-pulse"
            style={{ animationDuration: '6s' }}
          >
            {/* Outer flank left */}
            <rect x="-240" y="-280" width="56" height="560" rx="28" fill="#e0283e" />
            {/* Primary left cylinder */}
            <rect x="-140" y="-330" width="80" height="660" rx="40" fill="#ff6363" />
            {/* Primary center cylinder */}
            <rect x="-42" y="-360" width="86" height="710" rx="43" fill="#ff5252" />
            {/* Primary right cylinder */}
            <rect x="56" y="-340" width="82" height="680" rx="41" fill="#ff6363" />
            {/* Outer flank right */}
            <rect x="156" y="-290" width="54" height="580" rx="27" fill="#e0283e" />
          </g>

          {/* ── Layer B: Crisp 3D Cylindrical Light Beams with Tactile Grain ── */}
          <g transform="translate(600, 310) rotate(43)" filter="url(#raycastBeamGrain)">
            {/* Beam 0: Far-left accent filament */}
            <g transform="translate(-315, 0)">
              <rect
                x="-12"
                y="-190"
                width="24"
                height="380"
                rx="12"
                fill="url(#raycastCylinder3D)"
                opacity="0.65"
                mask="url(#raycastCapsuleMask)"
              />
            </g>

            {/* Beam 1: Outer left beam */}
            <g transform="translate(-235, 0)">
              <rect
                x="-26"
                y="-275"
                width="52"
                height="550"
                rx="26"
                fill="url(#raycastCylinder3D)"
                mask="url(#raycastCapsuleMask)"
              />
            </g>

            {/* Beam 2: Center-left primary cylinder */}
            <g transform="translate(-140, 0)">
              <rect
                x="-39"
                y="-330"
                width="78"
                height="660"
                rx="39"
                fill="url(#raycastCylinder3D)"
                mask="url(#raycastCapsuleMask)"
              />
            </g>

            {/* Beam 3: Center primary massive cylinder */}
            <g transform="translate(-42, 0)">
              <rect
                x="-43"
                y="-355"
                width="86"
                height="710"
                rx="43"
                fill="url(#raycastCylinder3D)"
                mask="url(#raycastCapsuleMask)"
              />
            </g>

            {/* Beam 4: Center-right primary cylinder */}
            <g transform="translate(56, 0)">
              <rect
                x="-40"
                y="-340"
                width="80"
                height="680"
                rx="40"
                fill="url(#raycastCylinder3D)"
                mask="url(#raycastCapsuleMask)"
              />
            </g>

            {/* Beam 5: Outer right beam */}
            <g transform="translate(154, 0)">
              <rect
                x="-26"
                y="-285"
                width="52"
                height="570"
                rx="26"
                fill="url(#raycastCylinder3D)"
                mask="url(#raycastCapsuleMask)"
              />
            </g>

            {/* Beam 6: Far-right accent cylinder */}
            <g transform="translate(235, 0)">
              <rect
                x="-16"
                y="-225"
                width="32"
                height="450"
                rx="16"
                fill="url(#raycastCylinder3D)"
                mask="url(#raycastCapsuleMask)"
              />
            </g>

            {/* Beam 7: Far outer filament ray */}
            <g transform="translate(305, 0)">
              <rect
                x="-9"
                y="-165"
                width="18"
                height="330"
                rx="9"
                fill="url(#raycastCylinder3D)"
                opacity="0.6"
                mask="url(#raycastCapsuleMask)"
              />
            </g>
          </g>
        </svg>

        {/* Soft bottom vignette to merge seamlessly with the page canvas */}
        <div
          className="absolute bottom-0 inset-x-0 h-44 pointer-events-none transition-colors duration-300"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, transparent, rgba(4, 5, 6, 0.8) 60%, #040506 100%)'
              : 'linear-gradient(to bottom, transparent, rgba(248, 250, 252, 0.8) 60%, #f8fafc 100%)',
          }}
        />
      </div>

      {/* ── Deep Atmosphere Background Glows for lower sections (Ember Hush & Cobalt) ── */}
      <div
        className="absolute top-[1200px] -left-48 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-[0.045]"
        style={{ background: 'var(--color-ember-hush, #452324)' }}
      />
      <div
        className="absolute top-[2200px] -right-48 w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none opacity-[0.035]"
        style={{ background: 'var(--color-cobalt-edge, #143ca3)' }}
      />
      <div
        className="absolute top-[3400px] left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-[0.03]"
        style={{ background: 'var(--color-ember-hush, #452324)' }}
      />

      {/* ── Ambient Drifting Monochrome Motes Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ display: 'block' }}
      />

      {/* ── Subtle Film Grain Texture Overlay for the Entire Cockpit ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />
    </div>
  );
}
