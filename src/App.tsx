import { useState, useEffect, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Share2,
  Sparkles,
  Clock,
  Radio,
  Heart,
  Music,
  ChevronDown,
  Menu,
  X,
  Camera,
} from 'lucide-react';
import { ShiuliInteraction } from './components/ShiuliInteraction';
import { Quotes } from './components/Quotes';
import { MusicPlayer } from './components/MusicPlayer';
import { PujoCalendarModal } from './components/PujoCalendarModal';
import { GreetingModal } from './components/GreetingModal';
import { DurgaEyeMotif } from './components/DurgaEyeMotif';
import { KashGrass } from './components/KashGrass';
import { SongsSection } from './components/SongsSection';
import { DhakSoundboard } from './components/DhakSoundboard';
import { PujoScheduleSection } from './components/PujoScheduleSection';
import { NostalgiaSection } from './components/NostalgiaSection';
import { CommunityThoughtsSection } from './components/CommunityThoughtsSection';
import { soundEngine } from './utils/audioEngine';
import { musicState, DHAK_SPECIAL_YT_ID } from './utils/musicState';
import { calculateCountdown, toBengaliDigits, CountdownTime } from './utils/countdown';
import bgImage from './assets/images/mahalaya_nostalgia_1786888185454.jpg';

export default function App() {
  const [musicStateData, setMusicStateData] = useState(musicState.getState());
  const [isLiveDhakPlaying, setIsLiveDhakPlaying] = useState(false);
  const [isConchPlaying, setIsConchPlaying] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGreetingOpen, setIsGreetingOpen] = useState(false);
  const [countdown, setCountdown] = useState<CountdownTime>(calculateCountdown());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Subscribe to live synthesized Dhak state
  useEffect(() => {
    const unsubDhak = soundEngine.subscribeDhakState(setIsLiveDhakPlaying);
    return () => unsubDhak();
  }, []);

  // Subscribe to music state changes
  useEffect(() => {
    const unsubscribe = musicState.subscribe(() => {
      setMusicStateData(musicState.getState());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Real-time countdown timer tick every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDhakActive =
    isLiveDhakPlaying ||
    (musicStateData.currentTrack.youtubeId === DHAK_SPECIAL_YT_ID && musicStateData.isPlaying);

  const toggleDhak = async (e: MouseEvent) => {
    e.stopPropagation();
    if (isLiveDhakPlaying) {
      soundEngine.stopDhaakRhythm();
    } else {
      await soundEngine.resume();
      if (musicStateData.isPlaying) {
        musicState.togglePlay();
      }
      soundEngine.startDhaakRhythm();
    }
  };

  const playShankhaSound = (e: MouseEvent) => {
    e.stopPropagation();
    if (isConchPlaying) return;
    setIsConchPlaying(true);
    soundEngine.playShankha(3.5, 0.7);
    setTimeout(() => setIsConchPlaying(false), 3600);
  };

  const playKashorChime = (e: MouseEvent) => {
    e.stopPropagation();
    soundEngine.playKashor(0, 0.45);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#07050a] text-[#fdf6e3] select-none font-sans relative flex flex-col pb-28 sm:pb-32">
      {/* Background Ambience fixed for smooth multi-section scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={bgImage}
          alt="Mahalaya Nostalgia Background"
          className="w-full h-full object-cover opacity-50 mix-blend-screen scale-105 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160c07]/75 via-[#0a070e]/68 to-[#050407]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(245,158,11,0.24)_0%,transparent_65%)]" />
      </div>

      {/* Swaying Kash Phool at bottom of hero viewport */}
      <KashGrass />

      {/* Falling & interactive Shiuli flower particles */}
      <ShiuliInteraction />

      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center font-serif text-black font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform">
              পু
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400">
                শিউলিঝরা আগমনী
              </span>
              <span className="hidden sm:inline-block text-[10px] text-white/50 ml-2 tracking-wider">
                মহালয়া ও শারদোৎসব
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-white/70">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              মূল সূচনা
            </button>
            <button
              onClick={() => scrollToSection('songs')}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Music size={13} className="text-orange-400" />
              <span>শারদ সুর ও গান</span>
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar size={13} className="text-orange-400" />
              <span>পূজোর নির্ঘণ্ট</span>
            </button>
            <button
              onClick={() => scrollToSection('nostalgia')}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Heart size={13} className="text-orange-400" />
              <span>আবেগ ও স্মৃতি</span>
            </button>
            <button
              onClick={() => scrollToSection('thoughts')}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Camera size={13} className="text-orange-400" />
              <span>স্মৃতি ও ভাবনা</span>
            </button>
          </nav>

          {/* Right Toolbar: Soundboard + Action Modals */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dhaak Toggle Button */}
            <button
              onClick={toggleDhak}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl border flex items-center gap-2 transition-all active:scale-95 ${
                isDhakActive
                  ? 'bg-orange-500/30 border-orange-400 text-orange-200 shadow-lg shadow-orange-500/30 animate-pulse-ring'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white/80'
              }`}
              title={isDhakActive ? 'Stop Dhak' : 'Play Dhak'}
              aria-label="Toggle Dhak"
            >
              <span className="text-xs font-serif font-bold text-amber-400">ঢাক</span>
              <span className="text-[11px] font-medium hidden sm:inline">
                {isDhakActive ? 'বাজছে' : 'বাজান'}
              </span>
            </button>

            {/* Shankha Button */}
            <button
              onClick={playShankhaSound}
              disabled={isConchPlaying}
              className={`p-2 sm:px-3 sm:py-2 rounded-2xl border flex items-center gap-1.5 transition-all active:scale-95 ${
                isConchPlaying
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white/80'
              }`}
              title="Play Shankha Sound"
              aria-label="Play Shankha"
            >
              <span className="text-sm">🐚</span>
              <span className="text-[11px] font-medium hidden sm:inline">
                {isConchPlaying ? 'ধ্বনি...' : 'শঙ্খ'}
              </span>
            </button>

            {/* Greetings Share Button */}
            <button
              onClick={() => setIsGreetingOpen(true)}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-md shadow-amber-500/10"
              aria-label="Send greetings"
            >
              <Share2 size={13} className="text-amber-400" />
              <span className="hidden sm:inline">শুভেচ্ছা</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-3 pb-2 border-t border-white/10 mt-3 flex flex-col gap-2 text-xs font-semibold text-white/80">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5"
            >
              মূল সূচনা (Home)
            </button>
            <button
              onClick={() => scrollToSection('songs')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2"
            >
              <Music size={14} className="text-orange-400" />
              <span>শারদ সুর ও গান (Songs & Chandi Path)</span>
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2"
            >
              <Calendar size={14} className="text-orange-400" />
              <span>পূজোর নির্ঘণ্ট (Schedule & Rituals)</span>
            </button>
            <button
              onClick={() => scrollToSection('nostalgia')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2"
            >
              <Heart size={14} className="text-orange-400" />
              <span>আবেগ ও স্মৃতি (Memories)</span>
            </button>
            <button
              onClick={() => scrollToSection('thoughts')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2"
            >
              <Camera size={14} className="text-orange-400" />
              <span>স্মৃতি ও ভাবনা (Memories & Thoughts)</span>
            </button>
          </div>
        )}
      </header>

      {/* SECTION 1: HERO VIEWPORT */}
      <section
        id="hero"
        className="relative z-20 w-full min-h-[calc(100vh-65px)] flex flex-col items-center justify-between px-4 sm:px-8 py-8 sm:py-12"
      >
        <div className="flex-1 flex flex-col items-center justify-center w-full text-center max-w-4xl mx-auto my-auto">
          {/* Sacred Eye Motif */}
          <DurgaEyeMotif className="w-32 sm:w-44 md:w-52 mb-2" />

          {/* Interactive Hint */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-orange-300/90 mb-2">
            <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            যেখানে খুশি ক্লিক করে শিউলি ঝরান
          </div>

          {/* Main Hero Bengali Title */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fffaf0] via-[#fcd34d] to-[#d97706] leading-tight drop-shadow-[0_6px_35px_rgba(245,158,11,0.35)]">
            শিউলিঝরা আগমনী
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-sm sm:text-lg md:text-xl italic text-orange-100/85 tracking-wide mt-3 max-w-2xl leading-relaxed">
            Durga Puja — Emotion of every Bengali around the world
          </p>

          {/* Dynamic Real-time Countdown Banner */}
          <div
            onClick={() => scrollToSection('schedule')}
            className="mt-6 px-5 py-3 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 cursor-pointer inline-flex items-center gap-3 sm:gap-4 transition-all shadow-xl group"
            title="Click to explore full schedule"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Clock size={16} />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-base">
              <div className="text-center">
                <span className="font-bold text-orange-300 font-mono text-base sm:text-xl">
                  {toBengaliDigits(countdown.days)}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/50 block">দিন</span>
              </div>
              <span className="text-white/30 font-bold">:</span>
              <div className="text-center">
                <span className="font-bold text-orange-300 font-mono text-base sm:text-xl">
                  {toBengaliDigits(countdown.hours)}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/50 block">ঘণ্টা</span>
              </div>
              <span className="text-white/30 font-bold">:</span>
              <div className="text-center">
                <span className="font-bold text-orange-300 font-mono text-base sm:text-xl">
                  {toBengaliDigits(countdown.minutes)}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/50 block">মিনিট</span>
              </div>
              <span className="text-white/30 font-bold">:</span>
              <div className="text-center">
                <span className="font-bold text-orange-300 font-mono text-base sm:text-xl">
                  {toBengaliDigits(countdown.seconds)}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/50 block">সেকেন্ড</span>
              </div>
            </div>

            <div className="border-l border-white/15 pl-3 text-left">
              <span className="text-xs text-orange-400 font-medium block">
                {countdown.targetEventName}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-white/50 group-hover:text-amber-300 transition-colors">
                নির্ঘণ্ট দেখুন ↓
              </span>
            </div>
          </div>

          {/* Quotes Carousel */}
          <div className="w-full mt-6">
            <Quotes />
          </div>
        </div>

        {/* Scroll down indicator */}
        <button
          onClick={() => scrollToSection('songs')}
          className="mt-6 flex flex-col items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors animate-bounce cursor-pointer"
        >
          <span>নিচে স্ক্রোল করুন ও গান শুনুন</span>
          <ChevronDown size={16} />
        </button>
      </section>

      {/* SECTION 2: SONGS & CHANDI PATH */}
      <SongsSection />

      {/* SECTION 2.5: AUTHENTIC LIVE DHAAK & KASHOR EXPERIENCE */}
      <div className="px-4 sm:px-8">
        <DhakSoundboard />
      </div>

      {/* SECTION 3: PUJOR NIRGHONTO (DETAILED SCHEDULE & RITUALS) */}
      <PujoScheduleSection onOpenCalendarModal={() => setIsCalendarOpen(true)} />

      {/* SECTION 4: NOSTALGIA & TRADITIONS */}
      <NostalgiaSection />

      {/* SECTION 4.5: COMMUNITY DURGA PUJA THOUGHTS & PHOTOS */}
      <CommunityThoughtsSection />

      {/* SECTION 5: FESTIVE GREETINGS BANNER */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-12 relative z-20">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-black/60 border border-orange-500/35 backdrop-blur-2xl text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <span className="text-3xl mb-3 block" role="img" aria-label="pradeep">
              🪔
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100 mb-2">
              প্রিয়জনদের শারদ শুভেচ্ছা প্রেরণ
            </h3>
            <p className="font-serif text-xs sm:text-sm italic text-white/70 mb-6 leading-relaxed">
              আপনার নাম দিয়ে সুন্দর শারদ বার্তা তৈরি করুন এবং হোয়াটসঅ্যাপ বা সোশ্যাল মিডিয়ায় প্রিয়জনদের সাথে শেয়ার করুন।
            </p>
            <button
              onClick={() => setIsGreetingOpen(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-bold text-sm inline-flex items-center gap-2 shadow-xl shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Share2 size={16} />
              <span>শুভেচ্ছা কার্ড তৈরি করুন ও পাঠান</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 pt-10 pb-6 px-4 text-center text-xs text-white/40 relative z-20 bg-black/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center font-serif text-black font-extrabold text-sm shadow-md mb-3">
            পু
          </div>
          <p className="font-serif text-base text-orange-200/90 mb-1 font-semibold">
            শুভ মহালয়া ও শুভ শারদীয়ার আন্তরিক প্রীতি ও শুভেচ্ছা
          </p>
          <p className="text-xs text-white/60 max-w-xl leading-relaxed">
            মা আসছেন... ঢাকের আওয়াজে আর কাশফুলের শুভ্রতায় ভরে উঠুক ধরণী। আসছে বছর আবার হবে!
          </p>
          <div className="mt-5 pt-4 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/50">
            <span className="font-mono text-amber-300/80">
              Pujo Asche — শিউলিঝরা আগমনী
            </span>
            <span className="font-medium text-orange-200/90 tracking-wide">
              Copyright reserved to Priyojit Mitra 2026
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Music Dock Player */}
      <MusicPlayer />

      {/* Modals */}
      <PujoCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      <GreetingModal
        isOpen={isGreetingOpen}
        onClose={() => setIsGreetingOpen(false)}
      />
    </div>
  );
}
