export function ShiuliFlower({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#drop-shadow)">
        {/* Petals */}
        <path d="M50 20 C60 10, 70 30, 50 40 Z" fill="#FFFFFF" />
        <path d="M50 40 C70 30, 80 50, 60 60 Z" fill="#FFFFFF" />
        <path d="M60 60 C70 80, 50 80, 50 60 Z" fill="#FFFFFF" />
        <path d="M50 60 C30 80, 20 60, 40 50 Z" fill="#FFFFFF" />
        <path d="M40 50 C20 40, 30 20, 50 40 Z" fill="#FFFFFF" />
        {/* Orange Center (Stem part) */}
        <circle cx="50" cy="50" r="6" fill="#FF7A00" />
        <circle cx="50" cy="50" r="3" fill="#D34B00" />
      </g>
      <defs>
        <filter id="drop-shadow" x="-10" y="-10" width="120" height="120">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
    </svg>
  );
}
