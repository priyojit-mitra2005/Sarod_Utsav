import { useState, useEffect } from 'react';
import { Volume2, Sparkles, Disc, Flame, Music, Activity, Play, Pause, ExternalLink } from 'lucide-react';
import { soundEngine, DhaakPatternType } from '../utils/audioEngine';
import { musicState, DHAK_SPECIAL_YT_ID } from '../utils/musicState';

export function DhakSoundboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState<DhaakPatternType>('aarti');
  const [activePad, setActivePad] = useState<string | null>(null);
  const [musicStateData, setMusicStateData] = useState(musicState.getState());

  useEffect(() => {
    const unsubDhak = soundEngine.subscribeDhakState(setIsPlaying);
    const unsubPat = soundEngine.subscribePattern(setPattern);
    const unsubMusic = musicState.subscribe(() => {
      setMusicStateData(musicState.getState());
    });
    return () => {
      unsubDhak();
      unsubPat();
      unsubMusic();
    };
  }, []);

  const triggerPad = async (type: string, fn: () => void) => {
    await soundEngine.resume();
    setActivePad(type);
    fn();
    setTimeout(() => setActivePad(null), 180);
  };

  const [showVideo, setShowVideo] = useState(false);

  const isDhakTrackPlaying =
    musicStateData.currentTrack.youtubeId === DHAK_SPECIAL_YT_ID && musicStateData.isPlaying;

  const isAnyDhakActive = isPlaying || isDhakTrackPlaying;

  const toggleAuthenticDhak = async () => {
    if (isAnyDhakActive) {
      if (isPlaying) soundEngine.stopDhaakRhythm();
      if (isDhakTrackPlaying) musicState.togglePlay();
    } else {
      await soundEngine.resume();
      // Immediate audible percussion rhythm (boosted, punchy, unmuted)
      soundEngine.startDhaakRhythm();
      // Also queue YouTube track
      musicState.playDhakTrack();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#261510] via-[#161017] to-[#0c0a10] border border-orange-500/40 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Authentic Dhak from YouTube (DZ21CSg22nc) */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-950/70 via-amber-950/50 to-black/80 border border-orange-500/40 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={toggleAuthenticDhak}
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-black flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                isAnyDhakActive ? 'animate-pulse-ring ring-2 ring-amber-400' : ''
              }`}
              title={isAnyDhakActive ? 'Pause Dhak' : 'Play Authentic Pujar Badya Dhak'}
              aria-label="Play or pause authentic Dhak audio"
            >
              {isAnyDhakActive ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-0.5" />
              )}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/35 text-red-300">
                  YouTube অরিজিনাল
                </span>
                <span className="text-xs text-orange-300 font-semibold">
                  বাংলার দূর্গা পূজোর ঢাক আরতি
                </span>
              </div>
              <p className="text-[11px] text-white/60 mt-0.5">
                ঐতিহ্যবাহী শারদ আরতি ঢাক ও কাঁসর বাদন • BDS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            {isAnyDhakActive && (
              <div className="flex items-end gap-0.5 h-4 mr-2">
                <span className="w-1 bg-amber-400 rounded-full h-3 animate-bounce" />
                <span className="w-1 bg-orange-400 rounded-full h-4 animate-pulse" />
                <span className="w-1 bg-amber-400 rounded-full h-2 animate-bounce" />
              </div>
            )}
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-[11px] text-orange-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Music size={12} />
              <span>{showVideo ? 'ভিডিও বন্ধ' : 'ভিডিও দেখুন'}</span>
            </button>
            <a
              href="https://youtu.be/DZ21CSg22nc"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>YouTube-এ শুনুন</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Embedded Responsive YouTube Player */}
        {showVideo && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-orange-500/30">
              <iframe
                src="https://www.youtube-nocookie.com/embed/DZ21CSg22nc?autoplay=1&rel=0&modestbranding=1"
                title="বাংলার দূর্গা পূজোর ঢাক আরতি - YouTube"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="text-[10px] text-amber-200/60 mt-2 text-center">
              বাংলার দুর্গাপূজার খাঁটি আরতি ঢাক ও কাঁসর সরাসরি বাজছে
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Dhaak Visualizer & Live Rhythm Toggle */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div
            onClick={() => soundEngine.toggleDhaakRhythm()}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative select-none shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600 border-amber-300 text-black shadow-2xl shadow-orange-500/50 scale-105 animate-pulse-ring'
                : 'bg-black/50 hover:bg-black/70 border-orange-500/30 text-white/80 hover:border-orange-400/60'
            }`}
            title={isPlaying ? 'Stop Dhaak' : 'Play Live Synthesized Dhaak Rhythm'}
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
