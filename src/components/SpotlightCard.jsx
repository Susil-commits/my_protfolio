import { useRef } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  tilt = true,
  maxTilt = 7,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (tilt) {
      const rx = (py - 0.5) * 2 * maxTilt;
      const ry = -(px - 0.5) * 2 * maxTilt;
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${-ry}deg`);
      el.classList.add('tilt-active');
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.classList.remove('tilt-active');
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`spotlight-card ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
