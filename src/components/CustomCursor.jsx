import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth < 768) return;

    document.body.classList.add('premium-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      const t = e.target.closest('a, button, input, textarea, [role="button"], .cursor-grow');
      if (t && !t.dataset.cursorGrowHandled) {
        ring.classList.add('hovering');
        dot.classList.add('hovering');
      } else if (!t) {
        ring.classList.remove('hovering');
        dot.classList.remove('hovering');
      }
    };

    const onDown = () => ring.style.setProperty('transform', `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(0.8)`);
    const onUp = () => {};

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
      document.body.classList.remove('premium-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
    </>
  );
}
