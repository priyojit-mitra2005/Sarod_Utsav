import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Sparkles, Clock, Check, Copy, BookOpen } from 'lucide-react';
import { getUpcomingSchedule, toBengaliDigits, PujaEvent } from '../utils/countdown';

interface PujoCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PujoCalendarModal({ isOpen, onClose }: PujoCalendarModalProps) {
  const { year, events } = getUpcomingSchedule();
  const [selectedEvent, setSelectedEvent] = useState<PujaEvent>(events[0]);
  const [copiedMantra, setCopiedMantra] = useState(false);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('bn-IN', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const handleCopyMantra = async (mantra?: string) => {
    if (!mantra) return;
    try {
      await navigator.clipboard.writeText(mantra);
      setCopiedMantra(true);
      setTimeout(() => setCopiedMantra(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-3xl bg-gradient-to-b from-[#1e1514] via-[#141014] to-[#0a080c] border border-orange-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 text-[#fdf6e3] max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-md shadow-orange-950/40">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500">
                    শারদোৎসব নির্ঘণ্ট ও তিথি মাহাত্ম্য {toBengaliDigits(year)}
                  </h3>
                  <p className="text-xs text-white/60 tracking-wider">
                    Complete Durga Puja Schedule, Auspicious Rituals & Mantras
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Day Selector Tabs */}
            <div className="flex gap-2 overflow-x-auto py-3 custom-scrollbar">
              {events.map((ev, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEvent(ev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    selectedEvent.nameBn === ev.nameBn
                      ? 'bg-orange-500/30 border-orange-400 text-orange-200 shadow-md'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <span>{ev.icon}</span>
                  <span>{ev.nameBn.split(' ')[0]} {ev.nameBn.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Selected Event Details Card */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-950/30 via-black/40 to-black/60 border border-orange-500/30">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-2">
                      <Sparkles size={11} />
                      {selectedEvent.significance}
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-amber-200">
                      {selectedEvent.nameBn}
                    </h4>
                    <p className="text-xs text-orange-400/90 font-medium mt-0.5">
                      {formatDate(selectedEvent.dateStr)} • {selectedEvent.tithiBn}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white/80">
                    <Clock size={14} className="text-amber-400" />
                    <span>{selectedEvent.timeSlotBn}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  {selectedEvent.descriptionBn}
                </p>

                {/* Rituals list */}
                {selectedEvent.rituals && selectedEvent.rituals.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-orange-300 flex items-center gap-1.5 mb-2.5">
                      <BookOpen size={13} />
                      প্রধান রীতিনীতি ও পূজাবিধি (Key Rituals):
                    </h5>
                    <ul className="space-y-1.5 text-xs text-white/75">
                      {selectedEvent.rituals.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mantra Box */}
                {selectedEvent.mantraBn && (
                  <div className="mt-4 p-4 rounded-xl bg-orange-950/40 border border-orange-400/25 relative group">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        পবিত্র স্তোত্র ও প্রণাম মন্ত্র:
                      </span>
                      <button
                        onClick={() => handleCopyMantra(selectedEvent.mantraBn)}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white/80 flex items-center gap-1 transition-colors"
                      >
                        {copiedMantra ? (
                          <>
                            <Check size={11} className="text-emerald-400" />
                            <span>কপি হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>মন্ত্র কপি করুন</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="font-serif text-sm leading-relaxed text-amber-100/90 italic">
                      "{selectedEvent.mantraBn}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span>মা আসছেন... কাশফুলের স্নিগ্ধ ছোঁয়ায় শারদ শুভেচ্ছা।</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-200 font-medium transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
