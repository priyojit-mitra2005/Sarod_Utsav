import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Copy, Check, Heart } from 'lucide-react';

interface GreetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GREETING_PRESETS = [
  {
    title: 'শুভ মহালয়া বার্তা',
    text: 'ভোরের শিউলি, কাশফুল আর ঢাকের আওয়াজ জানান দিচ্ছে মা আসছেন। আপনাকে ও আপনার পরিবারের সকলকে জানাই শুভ মহালয়ার আন্তরিক প্রীতি ও শুভেচ্ছা! 🌸🪔',
  },
  {
    title: 'শুভ শারদীয়া বার্তা',
    text: 'শরতের মেঘের ভেলায় মা দুর্গার আগমনী ধ্বনি। এই পূজোয় আপনার জীবন আনন্দে ও সাফল্যে ভরে উঠুক। শুভ শারদীয়া! 🌺✨',
  },
  {
    title: 'প্রবাসী আগমনী বার্তা',
    text: 'দেশ ছেড়ে বহুদূরে থাকলেও মন পড়ে থাকে পুজোর কলকাতায়, বীরেন্দ্রকৃষ্ণের চণ্ডীপাঠে। সকলকে শারদোৎসবের অনেক অনেক ভালোবাসা ও শুভেচ্ছা! 💫🕊️',
  },
];

export function GreetingModal({ isOpen, onClose }: GreetingModalProps) {
  const [senderName, setSenderName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const getFullMessage = () => {
    const base = GREETING_PRESETS[selectedIndex].text;
    const from = senderName.trim() ? `\n\n— শুভেচ্ছান্তে: ${senderName.trim()}` : '';
    const link = '\n\n✨ উৎসবের আনন্দ উপভোগ করতে দেখুন: ' + window.location.origin;
    return base + from + link;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(getFullMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(
      `${GREETING_PRESETS[selectedIndex].text} #DurgaPuja #Mahalaya #SubhoSarodiya`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-gradient-to-b from-[#221614] via-[#161214] to-[#0c090c] border border-orange-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-[#fdf6e3]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Heart size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-amber-300 to-orange-400">
                    শারদীয়া শুভেচ্ছা কার্ড
                  </h3>
                  <p className="text-xs text-white/50">Send Festive Greetings to Loved Ones</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sender Name */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-orange-300/80 mb-1.5 uppercase tracking-wider">
                আপনার নাম (Your Name)
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="যেমন: অনির্বাণ / Anirban"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>

            {/* Presets */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-orange-300/80 mb-1.5 uppercase tracking-wider">
                বার্তা নির্বাচন করুন (Select Message)
              </label>
              <div className="flex gap-2">
                {GREETING_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                      selectedIndex === idx
                        ? 'bg-orange-500/30 border-orange-400 text-orange-200 shadow-md'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {p.title.replace(' বার্তা', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Box */}
            <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-orange-500/20 relative">
              <p className="font-serif text-sm sm:text-base leading-relaxed text-orange-100/90 italic">
                {GREETING_PRESETS[selectedIndex].text}
              </p>
              {senderName.trim() && (
                <p className="mt-3 text-right text-xs font-medium text-orange-400">
                  — শুভেচ্ছান্তে: {senderName.trim()}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span>কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>কপি করুন (Copy)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-600/20 transition-all"
              >
                <Share2 size={16} />
                <span>WhatsApp এ পাঠান</span>
              </button>

              <button
                onClick={handleTwitter}
                className="py-2.5 px-4 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                title="Share on X"
              >
                <span>X / Twitter</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
