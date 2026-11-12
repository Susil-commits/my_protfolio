import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const COLORS_DARK = [
  'oklch(70% 0.2 240)',   // cyan-blue
  'oklch(65% 0.25 290)',  // purple
  'oklch(72% 0.22 220)',  // sky
  'oklch(75% 0.18 160)',  // emerald
  'oklch(68% 0.2 265)',   // violet
  'oklch(78% 0.15 180)',  // teal
];

const COLORS_LIGHT = [
  'oklch(55% 0.2 240)',
  'oklch(50% 0.25 290)',
  'oklch(52% 0.22 220)',
  'oklch(55% 0.18 160)',
  'oklch(50% 0.2 265)',
  'oklch(55% 0.15 180)',
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

class Particle {
  constructor(canvas, colors) {
    this.canvas = canvas;
    this.colors = colors;
    this.reset();
  }

  reset() {
    const { width, height } = this.canvas;
    this.x = randomBetween(0, width);
    this.y = randomBetween(-50, height * 0.3);
    this.size = randomBetween(1, 3.5);
    this.baseOpacity = randomBetween(0.3, 0.9);
    this.opacity = this.baseOpacity;
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    // Drift velocity
    this.vx = randomBetween(-0.3, 0.3);
    this.vy = randomBetween(0.15, 0.55);
    // Gravity
    this.gravity = randomBetween(0.0005, 0.002);
    // Twinkle
    this.twinkleSpeed = randomBetween(0.01, 0.04);
    this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
    this.life = 0;
    this.maxLife = randomBetween(200, 600);
  }

  update(mouse) {
    // Gravity accumulation
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // Mouse repulsion
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 100;
      if (dist < repelRadius && dist > 0) {
        const force = ((repelRadius - dist) / repelRadius) * 0.8;
        this.vx += (dx / dist) * force * 0.5;
        this.vy += (dy / dist) * force * 0.5;
        // Dampen
        this.vx *= 0.92;
        this.vy *= 0.92;
      }
    }

    // Twinkle opacity
    this.opacity += this.twinkleSpeed * this.twinkleDir;
    if (this.opacity > this.baseOpacity) {
      this.opacity = this.baseOpacity;
      this.twinkleDir = -1;
    } else if (this.opacity < 0.1) {
      this.opacity = 0.1;
      this.twinkleDir = 1;
    }

    this.life++;

    // Reset if out of bounds or too old
    if (
      this.y > this.canvas.height + 20 ||
      this.x < -20 ||
      this.x > this.canvas.width + 20 ||
      this.life > this.maxLife
    ) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.size * 4;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function ParticlesBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    animId: null,
    mouse: { x: null, y: null },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
    const colors = isDark ? COLORS_DARK : COLORS_LIGHT;
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 30 : 80;
    const LINK_DIST = isMobile ? 100 : 150;

    // Resize
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    // Init particles
    state.particles = Array.from({ length: COUNT }, () => new Particle(canvas, colors));

    // Mouse
    function onMouseMove(e) {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
    }
    function onMouseLeave() {
      state.mouse.x = null;
      state.mouse.y = null;
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    // Animation loop
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = state.particles;

      // Draw connections
      ctx.save();
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.25;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = isDark
              ? `oklch(70% 0.2 240)`
              : `oklch(55% 0.2 240)`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Update + draw particles
      for (const p of pts) {
        p.update(state.mouse);
        p.draw(ctx);
      }

      state.animId = requestAnimationFrame(draw);
    }

    state.animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <div id="particles-bg" className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
