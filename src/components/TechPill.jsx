import { techIcons } from '../data/techIcons';

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function TechPill({ name, compact = false }) {
  const icon = techIcons[name];
  const hasLogo = Boolean(icon);

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-normal rounded-md border transition-all duration-200 ${
        compact
          ? 'px-2 py-0.5 text-[11px] bg-slate-100/90 dark:bg-[#111214] border-slate-200 dark:border-[#1b1c1e] text-slate-700 dark:text-[#9c9c9d] hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-[#2f3031] hover:bg-slate-200/80 dark:hover:bg-[#1b1c1e]'
          : 'px-2.5 py-1 text-xs bg-slate-100/90 dark:bg-[#111214] border-slate-200 dark:border-[#1b1c1e] text-slate-700 dark:text-[#9c9c9d] hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-[#2f3031] hover:bg-slate-200/80 dark:hover:bg-[#1b1c1e]'
      }`}
    >
      {hasLogo ? (
        <span
          className="w-3.5 h-3.5 shrink-0 rounded flex items-center justify-center opacity-85"
          style={{ backgroundColor: hexToRgba(icon.hex, 0.14) }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill={icon.hex}
            aria-hidden="true"
            className="shrink-0"
          >
            <path d={icon.path} />
          </svg>
        </span>
      ) : (
        <span className="w-1 h-1 shrink-0 rounded-full bg-slate-400 dark:bg-[#6a6b6c]" aria-hidden="true" />
      )}
      <span className="font-mono text-[11px]">{name}</span>
    </span>
  );
}
