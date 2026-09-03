import { useEffect, useState, useRef } from 'react';
import { ShiuliFlower } from './ShiuliFlower';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
}

export function ShiuliInteraction() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    // Ambient gentle drifting flowers (one flower drops gently every 3.5 seconds)
    const ambientInterval = setInterval(() => {
      if (document.hidden) return;
      const randomX = Math.random() * (window.innerWidth - 60) + 30;
      createParticles(randomX, -20, 1);
    }, 3500);

    const handleClick = (e: MouseEvent) => {
      // Ignore clicks on buttons, inputs, links, or inside modals
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('input') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('.custom-no-blossom')
      ) {
        return;
      }

      createParticles(e.clientX, e.clientY, Math.floor(Math.random() * 3) + 2);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        const randomX = Math.random() * (window.innerWidth - 80) + 40;
        createParticles(randomX, 60, 3);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(ambientInterval);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const createParticles = (x: number, y: number, count = 2) => {
    const newParticles: Particle[] = [];
    const baseId = Date.now() + Math.random();

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: baseId + i,
        x: Math.max(10, Math.min(window.innerWidth - 40, x + (Math.random() * 50 - 25))),
        y: y + (Math.random() * 30 - 15),
        size: Math.random() * 14 + 18, // 18px to 32px
        rotation: Math.random() * 360,
        speed: Math.random() * 1.5 + 3.5, // 3.5s to 5s fall duration
      });
    }

    setParticles((prev) => {
      // Limit maximum active particles to 40 for optimal 60fps performance
      const combined = [...prev, ...newParticles];
      return combined.slice(-40);
    });

    // Cleanup after animation finishes
    const timer = window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 4800);

    timeoutsRef.current.push(timer);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="shiuli"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.speed}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          <ShiuliFlower className="w-full h-full drop-shadow-md" />
        </div>
      ))}
    </div>
  );
}
