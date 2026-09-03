import { useState, useRef, useEffect, type MouseEvent } from 'react';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ListMusic,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Tv,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { musicState, PLAYLIST_TRACKS } from '../utils/musicState';

export function MusicPlayer() {
  const [state, setState] = useState(musicState.getState());
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Subscribe to musicState changes
  useEffect(() => {
    const unsubscribe = musicState.subscribe(() => {
      setState(musicState.getState());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onReady: YouTubeProps['onReady'] = (event: YouTubeEvent) => {
    musicState.setPlayer(event.target);
    const dur = event.target.getDuration() || 0;
    musicState.setDuration(dur);
    try {
      event.target.unMute();
    } catch {
      // Ignore
    }
    event.target.setVolume(state.volume);
    setHasError(false);
    setIsLoading(false);
    if (state.isPlaying) {
      try {
        if (state.progress > 0) {
          event.target.seekTo(state.progress, true);
        }
        event.target.playVideo();
      } catch {
        // Autoplay may need user gesture
      }
    }
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event: YouTubeEvent) => {
    // 1 = playing, 2 = paused, 0 = ended, 3 = buffering
    if (event.data === 1) {
      musicState.setIsPlaying(true);
      setIsLoading(false);
      startProgressTimer(event.target);
    } else if (event.data === 3) {
      setIsLoading(true);
    } else {
      musicState.setIsPlaying(false);
      setIsLoading(false);
      stopProgressTimer();
      if (event.data === 0) {
        musicState.nextTrack();
      }
    }
  };

  const onError: YouTubeProps['onError'] = () => {
    setHasError(true);
    musicState.setIsPlaying(false);
    setIsLoading(false);
    stopProgressTimer();
  };

  const startProgressTimer = (ytPlayer: any) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
        const cur = ytPlayer.getCurrentTime();
        musicState.setProgress(cur);
        const dur = ytPlayer.getDuration();
        if (dur && dur > 0) musicState.setDuration(dur);
      }
    }, 1000);
  };

  const stopProgressTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopProgressTimer();
    };
  }, []);

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || state.duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percent * state.duration;
    musicState.seekTo(newTime);
  };

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return '0:00';
    const totalSecs = Math.floor(timeInSeconds);
    const hours = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = Math.floor(totalSecs % 60);

    if (hours > 0) {
      return `${hours}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = state.duration > 0 ? (state.progress / state.duration) * 100 : 0;
  const currentTrack = state.currentTrack;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-6 pb-3 pt-1 pointer-events-none custom-no-blossom">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        {/* Playlist Drawer */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-2.5 p-4 rounded-3xl bg-black/90 backdrop-blur-2xl border border-orange-500/35 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <span className="text-xs font-semibold uppercase tracking-widest text-orange-300 flex items-center gap-2">
                  <ListMusic size={15} />
                  শারদ আগমনী প্লে-লিস্ট (Agomoni Playlist)
                </span>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="text-xs text-white/50 hover:text-white"
                >
                  বন্ধ করুন
                </button>
              </div>
              <div className="mt-2 space-y-1.5 max-h-64 sm:max-h-80 overflow-y-auto custom-scrollbar pr-1">
                {PLAYLIST_TRACKS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      musicState.selectTrack(idx);
                      setShowPlaylist(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      state.currentTrackIndex === idx
                        ? 'bg-orange-500/25 border border-orange-400/40 text-orange-200'
                        : 'hover:bg-white/5 text-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-[10px] opacity-40 shrink-0">{idx + 1}</span>
                      <div className="min-w-0">
                        <div className="font-semibold text-white/90 truncate">{t.titleBn}</div>
                        <div className="text-[10px] text-white/50 truncate">
                          {t.artist}
                          {t.startSeconds > 0 && (
                            <span className="ml-1 text-amber-400/70 font-mono">
                              ({Math.floor(t.startSeconds / 60)}:{(t.startSeconds % 60).toString().padStart(2, '0')})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/40 shrink-0 ml-2">{t.durationEst}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Dock Player */}
        <div className="bg-black/75 hover:bg-black/85 backdrop-blur-2xl border border-orange-500/30 hover:border-orange-500/45 rounded-3xl p-3 sm:p-4 shadow-2xl shadow-black/80 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4 transition-all">
          {/* Left: Track info + visualizer */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-950/60 relative shrink-0 overflow-hidden border border-orange-400/30">
                {/* Visualizer bars */}
                <div className="flex items-end gap-0.5 h-5 z-10">
                  <span
                    className={`w-1 bg-white rounded-full transition-all duration-300 ${
                      state.isPlaying ? 'animate-bounce h-3.5' : 'h-1.5'
                    }`}
                  />
                  <span
                    className={`w-1 bg-white rounded-full transition-all duration-300 ${
                      state.isPlaying ? 'animate-pulse h-5' : 'h-2.5'
                    }`}
                  />
                  <span
                    className={`w-1 bg-white rounded-full transition-all duration-300 ${
                      state.isPlaying ? 'animate-bounce h-4' : 'h-2'
                    }`}
                  />
                </div>
              </div>
              <div className="min-w-0 max-w-[160px] sm:max-w-[220px]">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {currentTrack.titleBn}
                </h4>
                <p className="text-[10px] text-white/50 truncate">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Mobile buttons: playlist toggle */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                onClick={() => setShowPlaylist((prev) => !prev)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-orange-400"
                aria-label="Toggle playlist"
              >
                <ListMusic size={15} />
              </button>
            </div>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="flex flex-col items-center gap-1.5 flex-1 w-full max-w-md px-1 sm:px-4">
            <div className="flex items-center gap-4 text-white/80">
              <button
                onClick={() => musicState.prevTrack()}
                className="hover:text-white transition-colors active:scale-90"
                title="Previous Track"
                aria-label="Previous Track"
              >
                <SkipBack size={17} />
              </button>

              <button
                onClick={() => musicState.togglePlay()}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-black flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
                aria-label={state.isPlaying ? 'Pause' : 'Play'}
              >
                {isLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : state.isPlaying ? (
                  <Pause size={17} />
                ) : (
                  <Play size={17} className="ml-0.5" />
                )}
              </button>

              <button
                onClick={() => musicState.nextTrack()}
                className="hover:text-white transition-colors active:scale-90"
                title="Next Track"
                aria-label="Next Track"
              >
                <SkipForward size={17} />
              </button>
            </div>

            {/* Scrubbable Progress Bar */}
            <div className="w-full flex items-center gap-2 text-[10px] font-mono text-white/50 select-none">
              <span className="w-9 text-right">{formatTime(state.progress)}</span>
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                className="flex-1 bg-white/10 hover:bg-white/20 h-1.5 rounded-full relative cursor-pointer overflow-hidden transition-all group"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="w-9">
                {state.duration > 0 ? formatTime(state.duration) : currentTrack.durationEst}
              </span>
            </div>

            {hasError && (
              <div className="flex items-center gap-1 text-[9px] text-amber-400">
                <AlertCircle size={11} />
                <span>গানটি লোড না হলে তালিকা থেকে অন্য গান নির্বাচন করুন।</span>
              </div>
            )}
          </div>

          {/* Right: Playlist trigger, Video toggle & Mute */}
          <div className="hidden md:flex items-center gap-2.5 w-auto justify-end">
            <button
              onClick={() => setShowVideo((prev) => !prev)}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showVideo
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white/70 hover:text-white'
              }`}
              title="ভিডিও স্ক্রিন"
            >
              <Tv size={13} />
              <span>{showVideo ? 'ভিডিও বন্ধ' : 'ভিডিও'}</span>
            </button>

            <button
              onClick={() => setShowPlaylist((prev) => !prev)}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showPlaylist
                  ? 'bg-orange-500/30 border-orange-400 text-orange-200'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white/70 hover:text-white'
              }`}
            >
              <ListMusic size={13} />
              <span>প্লেলিস্ট</span>
            </button>

            <button
              onClick={() => musicState.toggleMute()}
              className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                state.isMuted
                  ? 'bg-red-500/20 border-red-500/40 text-red-300'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white/70 hover:text-white'
              }`}
              title={state.isMuted ? 'Unmute' : 'Mute'}
              aria-label={state.isMuted ? 'Unmute' : 'Mute'}
            >
              {state.isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* YouTube Player Container (kept in-viewport to guarantee Chromium audio decoding pipeline never suspends) */}
      <div
        className={`fixed bottom-24 right-4 z-50 w-72 sm:w-80 p-2.5 rounded-2xl bg-black/95 border border-orange-500/40 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          showVideo
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={!showVideo ? { opacity: 0.001, transform: 'scale(0.8)' } : undefined}
      >
        <div className="flex items-center justify-between pb-2 px-1 border-b border-white/10 text-xs text-white/80">
          <span className="font-serif font-semibold truncate text-amber-200">
            {currentTrack.titleBn}
          </span>
          <button
            onClick={() => setShowVideo(false)}
            className="p-1 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
            title="ভিডিও মিনিমাইজ করুন"
          >
            <X size={14} />
          </button>
        </div>
        <div className="w-full aspect-video rounded-xl overflow-hidden mt-2 bg-black border border-white/10">
          <YouTube
            videoId={currentTrack.youtubeId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                controls: 1,
                playsinline: 1,
                modestbranding: 1,
                rel: 0,
              },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
            onError={onError}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
