import { useState, useEffect, useMemo } from 'react';
import { Play, Pause, Radio, Volume2, Sparkles, Music, Disc, Search, Filter } from 'lucide-react';
import { musicState, PLAYLIST_TRACKS, DHAK_SPECIAL_YT_ID } from '../utils/musicState';

export function SongsSection() {
  const [state, setState] = useState(musicState.getState());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredTracks = useMemo(() => {
    return PLAYLIST_TRACKS.map((track, originalIndex) => ({ track, originalIndex })).filter(
      ({ track }) => {
        // Category filter
        if (selectedCategory === 'saregama' && track.youtubeId !== 'LOlyrK53QM4') {
          return false;
        }
        if (selectedCategory === 'singles' && (track.youtubeId === 'LOlyrK53QM4' || track.youtubeId === DHAK_SPECIAL_YT_ID)) {
          return false;
        }
        if (selectedCategory === 'dhak' && track.youtubeId !== DHAK_SPECIAL_YT_ID) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitleBn = track.titleBn.toLowerCase().includes(q);
          const matchTitleEn = track.titleEn.toLowerCase().includes(q);
          const matchArtist = track.artist.toLowerCase().includes(q);
          const matchTag = track.tag.toLowerCase().includes(q);
          return matchTitleBn || matchTitleEn || matchArtist || matchTag;
        }

        return true;
      }
    );
  }, [selectedCategory, searchQuery]);

  return (
    <section id="songs" className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 relative z-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Radio size={14} className="text-amber-400" />
          আকাশবাণী কলকাতা ও মহিষাসুরমর্দ্দিনী গীতিসমগ্র
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff5ea] via-[#fcd34d] to-[#f59e0b]">
          শারদ আগমনী সুর ও চণ্ডীপাঠ
        </h2>
        <p className="font-serif text-sm sm:text-base italic text-orange-100/70 max-w-2xl mx-auto mt-2.5">
          বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ, পঙ্কজ মল্লিকের অমর সুর, আর মহিষাসুরমর্দ্দিনীর প্রতিটি কালজয়ী গান সময়ভিত্তিক বিভক্ত
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
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
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

      {/* Filter and Search Controls */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 custom-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
            }`}
          >
            সব গান ({PLAYLIST_TRACKS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('saregama')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'saregama'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
            }`}
          >
            মহিষাসুরমর্দ্দিনী অ্যালবাম (১৯টি গান)
          </button>
          <button
            onClick={() => setSelectedCategory('singles')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'singles'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
            }`}
          >
            একক আগমনী ও স্তোত্র
          </button>
          <button
            onClick={() => setSelectedCategory('dhak')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'dhak'
                ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
            }`}
          >
            পূজার বাদ্য ঢাক
          </button>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="গান বা শিল্পী খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400/80 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredTracks.map(({ track, originalIndex }) => {
          const isCurrent = state.currentTrackIndex === originalIndex;
          const isTrackPlaying = isCurrent && state.isPlaying;

          return (
            <div
              key={track.id}
              onClick={() => musicState.selectTrack(originalIndex)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group ${
                isCurrent
                  ? 'bg-gradient-to-r from-orange-950/60 to-black/80 border-orange-400/70 shadow-lg shadow-orange-950/40 ring-1 ring-orange-500/40'
                  : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
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

              {/* Duration & Timestamp */}
              <div className="text-right shrink-0">
                <span className="font-mono text-xs text-white/50">{track.durationEst}</span>
                {track.startSeconds > 0 && (
                  <span className="block text-[9px] text-white/30 font-mono">
                    {Math.floor(track.startSeconds / 60)}:{(track.startSeconds % 60).toString().padStart(2, '0')}
                  </span>
                )}
                {isCurrent && (
                  <span className="block text-[10px] text-orange-400 font-bold uppercase tracking-wider mt-0.5">
                    {isTrackPlaying ? 'বাজছে' : 'স্থগিত'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center py-12 p-6 rounded-2xl bg-black/30 border border-white/10">
          <p className="text-white/60 text-sm">কোনো গান পাওয়া যায়নি</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 text-xs hover:bg-amber-400/30 transition-colors cursor-pointer"
          >
            সব গান দেখুন
          </button>
        </div>
      )}
    </section>
  );
}
