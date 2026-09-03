import { useState, useEffect } from 'react';
import { Volume2, Sparkles, Disc, Flame, Music, Activity } from 'lucide-react';
import { soundEngine, DhaakPatternType } from '../utils/audioEngine';

export function DhakSoundboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState<DhaakPatternType>('aarti');
  const [activePad, setActivePad] = useState<string | null>(null);

  useEffect(() => {
    const unsubDhak = soundEngine.subscribeDhakState(setIsPlaying);
    const unsubPat = soundEngine.subscribePattern(setPattern);
    return () => {
      unsubDhak();
      unsubPat();
    };
  }, []);

  const triggerPad = (type: string, fn: () => void) => {
    setActivePad(type);
    fn();
    setTimeout(() => setActivePad(null), 180);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#261510] via-[#161017] to-[#0c0a10] border border-orange-500/40 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Dhaak Visualizer & Main Toggle */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div
            onClick={() => soundEngine.toggleDhaakRhythm()}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative select-none shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600 border-amber-300 text-black shadow-2xl shadow-orange-500/50 scale-105 animate-pulse-ring'
                : 'bg-black/50 hover:bg-black/70 border-orange-500/30 text-white/80 hover:border-orange-400/60'
            }`}
            title={isPlaying ? 'Stop Dhaak' : 'Play Live Dhaak Rhythm'}
          >
            <span className="text-2xl sm:text-3xl font-serif font-extrabold block">ঢাক</span>
            <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
              {isPlaying ? 'বাজছে (Stop)' : 'বাজান (Play)'}
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-1.5">
              <Sparkles size={11} />
              ঐতিহ্যবাহী পুজোর ঢাক ও কাঁসর
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
              ঢাকের খাঁটি মাটির বোল
            </h3>
            <p className="text-xs text-white/70 max-w-sm mt-1 leading-relaxed">
              কাঁসরের ঝংকার আর ঢাকের গুরুগম্ভীর গমকে শারদোৎসবের খাঁটি আবহ। ক্লিক করে রিদম শুনুন বা নিজেই কাঠি দিন!
            </p>
          </div>
        </div>

        {/* Right: Rhythms & Live Percussion Pads */}
        <div className="w-full md:w-auto flex flex-col gap-3">
          {/* Rhythm Selector Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => soundEngine.setPattern('aarti')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                pattern === 'aarti'
                  ? 'bg-orange-500/30 border-orange-400 text-orange-200 shadow-md'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              ধুনুচি আরতি বোল
            </button>
            <button
              onClick={() => soundEngine.setPattern('agomoni')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                pattern === 'agomoni'
                  ? 'bg-orange-500/30 border-orange-400 text-orange-200 shadow-md'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              ভোরের আগমনী
            </button>
            <button
              onClick={() => soundEngine.setPattern('bisarjan')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                pattern === 'bisarjan'
                  ? 'bg-orange-500/30 border-orange-400 text-orange-200 shadow-md'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              বিসর্জন নাচ
            </button>
          </div>

          {/* Interactive Live Strike Pads (Manual Play) */}
          <div className="grid grid-cols-4 gap-2 text-center select-none">
            <button
              onClick={() => triggerPad('taak', () => soundEngine.playDhaakTaak(0, 0.9))}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 ${
                activePad === 'taak'
                  ? 'bg-amber-400 text-black border-amber-300 scale-95 shadow-lg'
                  : 'bg-black/50 hover:bg-black/70 border-white/15 text-white/90'
              }`}
            >
              তাক (Stick)
            </button>
            <button
              onClick={() => triggerPad('dum', () => soundEngine.playDhaakDum(0, 1.0))}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 ${
                activePad === 'dum'
                  ? 'bg-orange-500 text-black border-orange-400 scale-95 shadow-lg'
                  : 'bg-black/50 hover:bg-black/70 border-white/15 text-white/90'
              }`}
            >
              দুম (Bass)
            </button>
            <button
              onClick={() => triggerPad('kashor', () => soundEngine.playKashor(0, 0.6))}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 ${
                activePad === 'kashor'
                  ? 'bg-yellow-400 text-black border-yellow-300 scale-95 shadow-lg'
                  : 'bg-black/50 hover:bg-black/70 border-white/15 text-white/90'
              }`}
            >
              কাঁসর (Bell)
            </button>
            <button
              onClick={() => triggerPad('shankha', () => soundEngine.playShankha(3.2, 0.8))}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 ${
                activePad === 'shankha'
                  ? 'bg-emerald-400 text-black border-emerald-300 scale-95 shadow-lg'
                  : 'bg-black/50 hover:bg-black/70 border-white/15 text-white/90'
              }`}
            >
              শঙ্খ (Conch)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
