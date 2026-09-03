import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, Languages, Sparkles } from 'lucide-react';

interface QuoteItem {
  bn: string;
  en: string;
  source: string;
}

const QUOTES_DATA: QuoteItem[] = [
  {
    bn: 'ভোরের আকাশ, শিউলির গন্ধ... মা আসছেন।',
    en: 'Autumn dawn skies and the fragrant Shiuli blossoms... Mother is arriving.',
    source: 'শরতের আগমনী',
  },
  {
    bn: 'বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ আর এক কাপ চা... মহালয়া।',
    en: 'Birendra Krishna Bhadra’s Chandi Path at 4 AM and a cup of steaming tea... Pure Mahalaya nostalgia.',
    source: 'মহালয়ার ভোর',
  },
  {
    bn: 'কাশ ফুলেদের দল বেঁধেছে, শরৎ মেঘের ভেলায়।',
    en: 'White Kash flowers sway together under buoyant autumn clouds.',
    source: 'শরৎ প্রকৃতি',
  },
  {
    bn: 'ঢাকের তালে, ধুনুচির ধোঁয়ায়... বাঙালির শ্রেষ্ঠ উৎসব।',
    en: 'To the rhythm of the Dhak and aromatic smoke of Dhunuchi... The grandest festival of all Bengalis.',
    source: 'শারদ উল্লাস',
  },
  {
    bn: 'প্রবাসের বুকে এক চিলতে দেশ, পুজোর কটা দিন।',
    en: 'A tender slice of home in distant lands, across the golden days of Durga Puja.',
    source: 'প্রবাসী বাঙালি',
  },
  {
    bn: 'শিউলি ঝরা ভোরে, আগমনীর সুরে...',
    en: 'In the dew-kissed dawn of fallen Shiuli, resonated by welcoming Agomoni melodies...',
    source: 'দেবীপক্ষ',
  },
  {
    bn: 'মাটি থেকে প্রতিমা, এক টুকরো চিরন্তন আবেগ।',
    en: 'From sacred clay to the divine idol, an eternal timeless emotion.',
    source: 'কুমোরটুলির স্মৃতি',
  },
];

export function Quotes() {
  const [index, setIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + QUOTES_DATA.length) % QUOTES_DATA.length);
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % QUOTES_DATA.length);
  };

  const toggleLanguage = (e: MouseEvent) => {
    e.stopPropagation();
    setShowEnglish((prev) => !prev);
  };

  const current = QUOTES_DATA[index];

  return (
    <div
      className="relative w-full max-w-2xl mx-auto flex items-center justify-center text-center px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/15 p-6 md:p-8 rounded-3xl w-full shadow-2xl relative overflow-hidden group">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Tag & Language Toggle */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 text-xs">
          <span className="inline-flex items-center gap-1.5 text-orange-400 font-medium tracking-wider">
            <Sparkles size={12} />
            {current.source}
          </span>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-colors"
            title="বাংলা / English Toggle"
          >
            <Languages size={12} />
            <span>{showEnglish ? 'বাংলা' : 'English'}</span>
          </button>
        </div>

        {/* Quote Content with Navigation */}
        <div className="relative min-h-[100px] flex items-center justify-between gap-3">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all shrink-0 active:scale-95"
            aria-label="Previous quote"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Text */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index + (showEnglish ? '-en' : '-bn')}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full"
              >
                <p className="font-serif text-lg md:text-2xl leading-relaxed text-orange-100 drop-shadow-md">
                  "{showEnglish ? current.en : current.bn}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all shrink-0 active:scale-95"
            aria-label="Next quote"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dynamic Dot Indicators matching length */}
        <div className="mt-5 flex justify-center items-center gap-1.5">
          {QUOTES_DATA.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === i
                  ? 'w-6 bg-gradient-to-r from-orange-400 to-amber-400 shadow-sm shadow-orange-500/50'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
