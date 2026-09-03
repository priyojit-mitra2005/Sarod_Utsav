import { useState, useEffect } from 'react';
import { Play, Pause, Radio, Volume2, Sparkles, Music, Disc } from 'lucide-react';
import { musicState, PLAYLIST_TRACKS } from '../utils/musicState';

export function SongsSection() {
  const [state, setState] = useState(musicState.getState());

  useEffect(() => {
    const unsubscribe = musicState.subscribe(() => {
      setState(musicState.getState());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const featured = PLAYLIST_TRACKS[0];
  const isFeaturedPlaying = state.currentTrackIndex === 0 && state.isPlaying;

  return (
    <section id="songs" className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 relative z-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Radio size={14} className="text-amber-400" />
          আকাশবাণী কলকাতা ও আগমনী ঐতিহ্য
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff5ea] via-[#fcd34d] to-[#f59e0b]">
          শারদ আগমনী সুর ও চণ্ডীপাঠ
        </h2>
        <p className="font-serif text-sm sm:text-base italic text-orange-100/70 max-w-2xl mx-auto mt-2.5">
          বীরেন্দ্রকৃষ্ণ ভদ্রের জাদুকরী চণ্ডীপাঠ থেকে সুপ্রীতি ঘোষ ও দ্বিজেন মুখোপাধ্যায়ের অমর আগমনী গান
        </p>
      </div>

      {/* Featured Mahalaya Masterpiece Banner */}
      <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#24130f] via-[#1a1219] to-[#120d15] border border-orange-500/40 shadow-2xl relative overflow-hidden group">
        {/* Background glow & radio frequency graphics */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          {/* Left: Vintage Radio Visual + Play Button */}
          <div className="flex items-center gap-5 sm:gap-6 w-full lg:w-auto">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 flex items-center justify-center shadow-xl shadow-orange-950/60 overflow-hidden relative border border-orange-400/40">
                <Disc
                  size={42}
                  className={`text-white/90 ${isFeaturedPlaying ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '4s' }}
                />
              </div>

              {/* Floating play button badge */}
              <button
                onClick={() => musicState.selectTrack(0)}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                title={isFeaturedPlaying ? 'Pause Mahishasuramardini' : 'Play Mahishasuramardini'}
                aria-label="Play or pause featured song"
              >
                {isFeaturedPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/25 text-orange-300 border border-orange-500/35 mb-1.5">
                <Sparkles size={11} />
                {featured.tag}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                {featured.titleBn}
              </h3>
              <p className="text-xs sm:text-sm text-orange-300/90 font-medium">
                {featured.artist} • পূর্ণাঙ্গ সম্প্রচার ({featured.durationEst})
              </p>
              <p className="mt-2 text-xs text-white/70 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
                {featured.descriptionBn}
              </p>
            </div>
          </div>

          {/* Right: Sacred Shloka Card */}
          <div className="w-full lg:w-96 p-4 rounded-2xl bg-black/50 border border-orange-400/20 text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 block mb-1">
              মহিষাসুরমর্দিনী মূল স্তোত্র:
            </span>
            <p className="font-serif text-xs sm:text-sm leading-relaxed text-amber-100/90 italic">
              "{featured.shlokaBn}"
            </p>
            <div className="mt-3 flex items-center justify-center lg:justify-start gap-2 text-[11px] text-white/50">
              <Radio size={13} className="text-orange-400" />
              <span>১৯৩১ সাল থেকে আকাশবাণীর ইতিহাস</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLAYLIST_TRACKS.map((track, idx) => {
          const isCurrent = state.currentTrackIndex === idx;
          const isTrackPlaying = isCurrent && state.isPlaying;

          return (
            <div
              key={track.id}
              onClick={() => musicState.selectTrack(idx)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group ${
                isCurrent
                  ? 'bg-gradient-to-r from-orange-950/40 to-black/60 border-orange-400/60 shadow-lg shadow-orange-950/40'
                  : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Play Button or Equalizer */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-black shadow-md shadow-orange-500/30'
                      : 'bg-white/10 group-hover:bg-white/20 text-white'
                  }`}
                >
                  {isTrackPlaying ? (
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-0.5 bg-black rounded-full h-3 animate-bounce" />
                      <span className="w-0.5 bg-black rounded-full h-4 animate-pulse" />
                      <span className="w-0.5 bg-black rounded-full h-2 animate-bounce" />
                    </div>
                  ) : (
                    <Play size={16} className="ml-0.5" />
                  )}
                </div>

                {/* Track Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                      {track.titleBn}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/50 shrink-0">
                      {track.tag}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 truncate">{track.artist}</p>
                  <p className="text-[11px] text-white/40 italic truncate mt-0.5">
                    "{track.shlokaBn || track.descriptionBn}"
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="text-right shrink-0">
                <span className="font-mono text-xs text-white/50">{track.durationEst}</span>
                {isCurrent && (
                  <span className="block text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                    {isTrackPlaying ? 'বাজছে' : 'স্থগিত'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
