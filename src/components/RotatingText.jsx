import { useEffect, useState } from 'react';

export default function RotatingText({ words, interval = 2200, className = '' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  if (!words || words.length === 0) return null;

  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        key={index}
        className="inline-block animate-rotating-text"
      >
        {words[index]}
      </span>
    </span>
  );
}
