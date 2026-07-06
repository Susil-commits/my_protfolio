import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? st / h : 0;
      if (barRef.current) {
        barRef.current.style.width = `${p * 100}%`;
        barRef.current.style.opacity = p > 0.005 ? '1' : '0';
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" style={{ width: '0%', opacity: 0 }} aria-hidden="true" />;
}
