export function DurgaEyeMotif({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 240 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_0_20px_rgba(251,191,36,0.35)]"
      >
        <defs>
          <linearGradient id="goldEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="redChandanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>

        {/* Sacred Third Eye (ত্রিনয়ন) Center */}
        <path
          d="M120 18 C112 36, 112 50, 120 68 C128 50, 128 36, 120 18 Z"
          fill="url(#redChandanGrad)"
          stroke="#fef08a"
          strokeWidth="1.2"
        />
        <circle cx="120" cy="43" r="3" fill="#fef08a" />

        {/* Chandan Bindu above third eye */}
        <circle cx="120" cy="10" r="2.5" fill="#fef08a" opacity="0.9" />

        {/* Left Eye (বাম নয়ন) */}
        <path
          d="M40 65 C60 42, 95 44, 108 65 C95 80, 60 78, 40 65 Z"
          fill="none"
          stroke="url(#goldEyeGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Left Eyelash sweep */}
        <path
          d="M32 68 C45 62, 70 50, 108 65"
          stroke="#fef08a"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Left Pupil */}
        <circle cx="78" cy="63" r="7.5" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="76" cy="61" r="2.5" fill="#ffffff" />

        {/* Right Eye (ডান নয়ন) */}
        <path
          d="M200 65 C180 42, 145 44, 132 65 C145 80, 180 78, 200 65 Z"
          fill="none"
          stroke="url(#goldEyeGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Right Eyelash sweep */}
        <path
          d="M208 68 C195 62, 170 50, 132 65"
          stroke="#fef08a"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Right Pupil */}
        <circle cx="162" cy="63" r="7.5" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="164" cy="61" r="2.5" fill="#ffffff" />

        {/* Decorative Chandan Dots under eyes */}
        <circle cx="78" cy="78" r="1.8" fill="#fef08a" opacity="0.75" />
        <circle cx="68" cy="76" r="1.5" fill="#fef08a" opacity="0.6" />
        <circle cx="88" cy="76" r="1.5" fill="#fef08a" opacity="0.6" />

        <circle cx="162" cy="78" r="1.8" fill="#fef08a" opacity="0.75" />
        <circle cx="152" cy="76" r="1.5" fill="#fef08a" opacity="0.6" />
        <circle cx="172" cy="76" r="1.5" fill="#fef08a" opacity="0.6" />
      </svg>
    </div>
  );
}
