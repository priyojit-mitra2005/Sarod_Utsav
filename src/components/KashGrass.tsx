export function KashGrass() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10 overflow-hidden opacity-25 select-none">
      <svg
        viewBox="0 0 1200 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="kashGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Left cluster of Kash phool stalks */}
        <g className="animate-kash-sway">
          <path d="M 50,300 Q 80,180 70,80 Q 65,40 55,20" stroke="url(#kashGrad)" strokeWidth="3" />
          {/* Feather fluffs */}
          <path d="M 70,80 Q 90,60 80,30 Q 70,25 55,20" stroke="#fff" strokeWidth="2" opacity="0.8" />
          <path d="M 68,90 Q 50,70 60,40" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
          <path d="M 72,110 Q 95,95 85,60" stroke="#fff" strokeWidth="2" opacity="0.75" />
        </g>

        <g className="animate-kash-sway-delayed">
          <path d="M 120,300 Q 140,200 160,110 Q 170,70 180,40" stroke="url(#kashGrad)" strokeWidth="3.5" />
          <path d="M 160,110 Q 185,90 190,50 Q 180,45 180,40" stroke="#fff" strokeWidth="2.5" opacity="0.9" />
          <path d="M 158,125 Q 135,100 150,70" stroke="#fff" strokeWidth="1.8" opacity="0.7" />
        </g>

        <g className="animate-kash-sway">
          <path d="M 220,300 Q 240,210 230,130 Q 220,80 205,50" stroke="url(#kashGrad)" strokeWidth="3" />
          <path d="M 230,130 Q 250,105 235,65" stroke="#fff" strokeWidth="2" opacity="0.85" />
        </g>

        {/* Right cluster of Kash phool stalks */}
        <g className="animate-kash-sway-delayed">
          <path d="M 980,300 Q 960,200 970,100 Q 975,50 960,25" stroke="url(#kashGrad)" strokeWidth="3" />
          <path d="M 970,100 Q 950,75 970,40" stroke="#fff" strokeWidth="2" opacity="0.85" />
          <path d="M 972,120 Q 995,90 985,60" stroke="#fff" strokeWidth="1.8" opacity="0.75" />
        </g>

        <g className="animate-kash-sway">
          <path d="M 1060,300 Q 1040,190 1020,110 Q 1010,60 1000,35" stroke="url(#kashGrad)" strokeWidth="3.5" />
          <path d="M 1020,110 Q 1000,80 1015,45" stroke="#fff" strokeWidth="2" opacity="0.9" />
        </g>

        <g className="animate-kash-sway-delayed">
          <path d="M 1140,300 Q 1120,220 1100,140 Q 1090,90 1075,60" stroke="url(#kashGrad)" strokeWidth="3" />
          <path d="M 1100,140 Q 1080,110 1090,75" stroke="#fff" strokeWidth="2" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
