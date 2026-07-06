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
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-all duration-300 ${
        compact
          ? 'px-2 py-1 text-[11px] bg-smoke/80 border-pearl/10 text-mist hover:text-pearl hover:border-pearl/20 hover:bg-ash/80'
          : 'px-3 py-1.5 text-xs bg-smoke border-pearl/15 text-mist hover:text-pearl hover:border-pearl/30 hover:bg-ash'
      }`}
    >
      {hasLogo ? (
        <span
          className="w-4 h-4 shrink-0 rounded-[5px] flex items-center justify-center"
          style={{ backgroundColor: hexToRgba(icon.hex, 0.12) }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill={icon.hex}
            aria-hidden="true"
            className="shrink-0"
          >
            <path d={icon.path} />
          </svg>
        </span>
      ) : (
        <span className="w-1 h-1 shrink-0 rounded-full bg-pearl/30" aria-hidden="true" />
      )}
      <span>{name}</span>
    </span>
  );
}
