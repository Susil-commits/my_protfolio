import { useEffect, useState } from 'react';
import { personal } from '../data/portfolio';

export default function Loader({ onComplete }) {
  const [stage, setStage] = useState('entering');

  useEffect(() => {
    // Ultra-snappy reveal and exit sequence to prevent loading lag
    const t1 = setTimeout(() => setStage('visible'), 50);
    const t2 = setTimeout(() => setStage('exiting'), 400);
    const t3 = setTimeout(() => onComplete(), 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-obsidian transition-opacity duration-300 ease-in-out ${
        stage === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center overflow-hidden h-12">
        <span
          className={`text-2xl font-bold tracking-widest uppercase text-pearl transition-transform duration-300 cubic-bezier(0.22, 1, 0.36, 1) ${
            stage === 'entering'
              ? 'translate-y-full opacity-0'
              : stage === 'visible'
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          }`}
        >
          {personal.logo || personal.name}
        </span>
      </div>
    </div>
  );
}
