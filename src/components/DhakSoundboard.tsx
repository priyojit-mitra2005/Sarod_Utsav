import { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Music,
  Play,
  Pause,
  ExternalLink,
  Volume2,
  VolumeX,
  Radio,
} from 'lucide-react';
import { soundEngine, DhaakPatternType } from '../utils/audioEngine';
import { musicState, DHAK_SPECIAL_YT_ID } from '../utils/musicState';

export function DhakSoundboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState<DhaakPatternType>('aarti');
  const [currentBeatStep, setCurrentBeatStep] = useState<number>(-1);
  const [activePad, setActivePad] = useState<string | null>(null);
  const [musicStateData, setMusicStateData] = useState(musicState.getState());
  const [showVideo, setShowVideo] = useState(false);
  const [volume, setVolume] = useState<number>(soundEngine.getVolume());
  const [isMuted, setIsMuted] = useState(false);

  // Subscribe to audio engine states
  useEffect(() => {
    const unsubDhak = soundEngine.subscribeDhakState((playing) => {
      setIsPlaying(playing);
      if (!playing) setCurrentBeatStep(-1);
    });
    const unsubPat = soundEngine.subscribePattern(setPattern);
    const unsubBeat = soundEngine.subscribeBeat((step) => setCurrentBeatStep(step));
    const unsubMusic = musicState.subscribe(() => {
      setMusicStateData(musicState.getState());
    });

    return () => {
      unsubDhak();
      unsubPat();
      unsubBeat();
      unsubMusic();
    };
  }, []);

  const triggerPad = useCallback(async (type: string, fn: () => void) => {
    await soundEngine.resume();
    setActivePad(type);
    fn();
    setTimeout(() => setActivePad(null), 160);
  }, []);

  // Keyboard shortcut listener to play pads live via keyboard (1, 2, 3, 4, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1' || e.key.toLowerCase() === 't') {
        e.preventDefault();
        triggerPad('taak', () => soundEngine.playDhaakTaak(0, 0.95));
      } else if (e.key === '2' || e.key.toLowerCase() === 'd') {
        e.preventDefault();
        triggerPad('dum', () => soundEngine.playDhaakDum(0, 1.05));
      } else if (e.key === '3' || e.key.toLowerCase() === 'k') {
        e.preventDefault();
        triggerPad('kashor', () => soundEngine.playKashor(0, 0.65));
      } else if (e.key === '4' || e.key.toLowerCase() === 's') {
        e.preventDefault();
        triggerPad('shankha', () => soundEngine.playShankha(3.2, 0.85));
      } else if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        soundEngine.toggleDhaakRhythm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerPad]);

  // Is YouTube Dhak track currently playing?
  const isDhakTrackPlaying =
    musicStateData.currentTrack.youtubeId === DHAK_SPECIAL_YT_ID && musicStateData.isPlaying;

  // Toggle YouTube Authentic Dhak Track
  const toggleYouTubeAuthenticDhak = async () => {
    if (isDhakTrackPlaying) {
      musicState.togglePlay();
    } else {
      // Stop live synthesized dhaak if playing to prevent acoustic collision
      if (isPlaying) {
        soundEngine.stopDhaakRhythm();
      }
      musicState.playDhakTrack();
    }
  };

  // Toggle Live Synthesizer Rhythm
  const toggleLiveDhak = async () => {
    if (isPlaying) {
      soundEngine.stopDhaakRhythm();
    } else {
      // If YouTube track was playing, pause it for clarity
      if (musicStateData.isPlaying) {
        musicState.togglePlay();
      }
      await soundEngine.resume();
      soundEngine.startDhaakRhythm();
    }
  };

  // Handle pattern click: switches pattern AND starts immediately if stopped
  const handleSelectPattern = (newPat: DhaakPatternType) => {
    // If YouTube track was playing, pause it
    if (musicStateData.isPlaying) {
      musicState.togglePlay();
    }
    soundEngine.setPattern(newPat, true);
  };

  // Volume slider change
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    soundEngine.setVolume(newVol);
  };

  const toggleMute = () => {
    if (isMuted) {
      const restored = volume > 0 ? volume : 0.8;
      setIsMuted(false);
      soundEngine.setVolume(restored);
    } else {
      setIsMuted(true);
      soundEngine.setVolume(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#261510] via-[#161017] to-[#0c0a10] border border-orange-500/40 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Authentic Dhak Recording from YouTube (DZ21CSg22nc) */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-950/80 via-amber-950/60 to-black/85 border border-orange-500/40 shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={toggleYouTubeAuthenticDhak}
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-black flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                isDhakTrackPlaying ? 'animate-pulse-ring ring-2 ring-amber-400' : ''
              }`}
              title={isDhakTrackPlaying ? 'Pause Dhak Audio' : 'Play Authentic Pujar Badya Dhak'}
              aria-label="Play or pause authentic Dhak audio"
            >
              {isDhakTrackPlaying ? (
                <Pause size={20} className="text-black" />
              ) : (
                <Play size={20} className="ml-0.5 text-black" />
              )}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/35 text-red-300">
                  YouTube অরিজিনাল
                </span>
                <span className="text-xs text-orange-300 font-semibold">
                  বাংলার দুর্গা পূজোর ঢাক আরতি
                </span>
              </div>
              <p className="text-[11px] text-white/60 mt-0.5">
                ঐতিহ্যবাহী শারদ আরতি ঢাক ও কাঁসর বাদন • BDS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            {isDhakTrackPlaying && (
              <div className="flex items-end gap-0.5 h-4 mr-2" title="Playing YouTube track">
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
          <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
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

      {/* Main Interactive Synthesizer & Soundboard */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Dhaak Visualizer & Live Rhythm Toggle */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div
            onClick={toggleLiveDhak}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative select-none shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600 border-amber-300 text-black shadow-2xl shadow-orange-500/50 scale-105 animate-pulse-ring'
                : 'bg-black/50 hover:bg-black/70 border-orange-500/30 text-white/80 hover:border-orange-400/60'
            }`}
            title={isPlaying ? 'ঢাক থামান (Stop Dhaak)' : 'ঢাক বাজান (Play Live Dhaak)'}
          >
            <span className="text-2xl sm:text-3xl font-serif font-extrabold block">ঢাক</span>
            <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
              {isPlaying ? 'বাজছে (Stop)' : 'বাজান (Play)'}
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-1.5">
              <Sparkles size={11} />
              ঐতিহ্যবাহী পূজোর ঢাক ও কাঁসর
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
              ঢাকের খাঁটি মাটির বোল
            </h3>
            <p className="text-xs text-white/70 max-w-sm mt-1 leading-relaxed">
              কাঁসরের ঝংকার আর ঢাকের গুরুগম্ভীর গমকে শারদোৎসবের খাঁটি আবহ। ক্লিক করে রিদম শুনুন বা নিজেই কাঠি দিন!
            </p>

            {/* Live Beat Visualizer Dots */}
            <div className="flex items-center gap-1.5 mt-3">
              {[...Array(8)].map((_, i) => {
                const isCurrent = isPlaying && currentBeatStep % 8 === i;
                return (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-100 ${
                      isCurrent
                        ? 'w-4 bg-amber-400 shadow-md shadow-amber-400'
                        : isPlaying
                        ? 'w-1.5 bg-orange-400/30'
                        : 'w-1.5 bg-white/10'
                    }`}
                  />
                );
              })}
              <span className="text-[10px] text-white/40 ml-1 font-mono">
                {isPlaying ? `${(currentBeatStep % 16) + 1}/16` : 'Standby'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Rhythms & Live Percussion Pads */}
        <div className="w-full md:w-auto flex flex-col gap-3">
          {/* Rhythm Selector Buttons (Clicking activates and starts beat) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectPattern('aarti')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                pattern === 'aarti' && isPlaying
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black border-amber-300 shadow-lg shadow-orange-500/30 font-bold'
                  : pattern === 'aarti'
                  ? 'bg-orange-500/30 border-orange-400 text-orange-200'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title="Click to play Dhunuchi Aarti Bol"
            >
              ধুনুচি আরতি বোল
            </button>
            <button
              onClick={() => handleSelectPattern('agomoni')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                pattern === 'agomoni' && isPlaying
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black border-amber-300 shadow-lg shadow-orange-500/30 font-bold'
                  : pattern === 'agomoni'
                  ? 'bg-orange-500/30 border-orange-400 text-orange-200'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title="Click to play Vorer Agomoni Bodhon Bol"
            >
              ভোরের আগমনী
            </button>
            <button
              onClick={() => handleSelectPattern('bisarjan')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                pattern === 'bisarjan' && isPlaying
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black border-amber-300 shadow-lg shadow-orange-500/30 font-bold'
                  : pattern === 'bisarjan'
                  ? 'bg-orange-500/30 border-orange-400 text-orange-200'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title="Click to play Bisarjan Procession Bol"
            >
              বিসর্জন নাচ
            </button>
          </div>

          {/* Interactive Live Strike Pads (Manual Play + Keyboard 1,2,3,4) */}
          <div className="grid grid-cols-4 gap-2 text-center select-none">
            <button
              onClick={() => triggerPad('taak', () => soundEngine.playDhaakTaak(0, 0.95))}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 cursor-pointer flex flex-col items-center justify-center relative ${
                activePad === 'taak'
                  ? 'bg-amber-400 text-black border-amber-300 scale-95 shadow-lg shadow-amber-400/50'
                  : 'bg-black/50 hover:bg-black/70 border-white/15 text-white/90'
              }`}
              title="Click or press [1] / [T] on keyboard"
            >
              <span>তাক (Stick)</span>
              <span className="text-[9px] opacity-50 font-mono">[1]</span>
            </button>
            <button
              onClick={() => triggerPad('dum', () => soundEngine.playDhaakDum(0, 1.05))}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 cursor-pointer flex flex-col items-center justify-center relative ${
                activePad === 'dum'
                  ? 'bg-orange-500 text-black border-orange-400 scale-95 shadow-lg shadow-orange-500/50'
                  : 'bg-black/50 hover:bg-black/70 border-white/15 text-white/90'
              }`}
              title="Click or press [2] / [D] on keyboard"
            >
              <span>দুম (Bass)</span>
              <span className="text-[9px] opacity-50 font-mono">[2]</span>
            </button>
            <button
              onClick={() => triggerPad('kashor', () => soundEngine.playKashor(0, 0.65))}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 cursor-pointer flex flex-col items-center justify-center relative ${
                activePad === 'kashor'
                  ? 'bg-yellow-400 text-black border-yellow-300 scale-95 shadow-lg shadow-yellow-400/50'
                  : 'bg-black/50 hover:bg-black/70 border-white/15 text-white/90'
              }`}
              title="Click or press [3] / [K] on keyboard"
            >
              <span>কাঁসর (Bell)</span>
              <span className="text-[9px] opacity-50 font-mono">[3]</span>
            </button>
            <button
              onClick={() => triggerPad('shankha', () => soundEngine.playShankha(3.2, 0.85))}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-90 cursor-pointer flex flex-col items-center justify-center relative ${
                activePad === 'shankha'
                  ? 'bg-emerald-400 text-black border-emerald-300 scale-95 shadow-lg shadow-emerald-400/50'
                  : 'bg-black/50 hover:bg-black/70 border-white/15 text-white/90'
              }`}
              title="Click or press [4] / [S] on keyboard"
            >
              <span>শঙ্খ (Conch)</span>
              <span className="text-[9px] opacity-50 font-mono">[4]</span>
            </button>
          </div>

          {/* Volume Control & Keyboard Hint */}
          <div className="flex items-center justify-between px-1 text-[11px] text-white/50">
            <span className="hidden sm:inline">কিবোর্ড শর্টকাট: [1] তাক • [2] দুম • [3] কাঁসর • [4] শঙ্খ</span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={toggleMute}
                className="hover:text-amber-400 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={13} className="text-red-400" /> : <Volume2 size={13} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 sm:w-20 accent-amber-400 cursor-pointer h-1 bg-white/20 rounded-lg"
                aria-label="Soundboard volume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
