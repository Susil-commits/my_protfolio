import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth < 768) return;

    document.body.classList.add('premium-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;
    let lastTargetCheck = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      // Throttle DOM tree traversal to every 100ms for 60fps performance
      const now = performance.now();
      if (now - lastTargetCheck > 80) {
        lastTargetCheck = now;
        const isInteractive = e.target.closest('a, button, input, textarea, [role="button"], .cursor-grow');
        if (isInteractive) {
          ring.classList.add('hovering');
          dot.classList.add('hovering');
        } else {
          ring.classList.remove('hovering');
          dot.classList.remove('hovering');
        }
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('premium-cursor');
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  );
}
