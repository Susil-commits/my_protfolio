import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = mx;
    let ry = my;
    let raf;
    let lastTargetCheck = 0;
    let hasMoved = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        setVisible(true);
        document.body.classList.add('premium-cursor');
      }

      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      const now = performance.now();
      if (now - lastTargetCheck > 60) {
        lastTargetCheck = now;
        const isInteractive = e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-grow, [tabindex="0"]');
        if (isInteractive) {
          ring.classList.add('hovering');
          dot.classList.add('hovering');
        } else {
          ring.classList.remove('hovering');
          dot.classList.remove('hovering');
        }
      }
    };

    const onLeave = () => {
      setVisible(false);
    };

    const onEnter = () => {
      if (hasMoved) setVisible(true);
    };

    const loop = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
      document.body.classList.remove('premium-cursor');
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`cursor-ring transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`cursor-dot transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  );
}
