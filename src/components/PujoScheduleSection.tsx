import { useState } from 'react';
import { Calendar, Sparkles, Clock, Copy, Check, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { getUpcomingSchedule, toBengaliDigits } from '../utils/countdown';

export function PujoScheduleSection() {
  const { year, events } = getUpcomingSchedule();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copiedMantraIdx, setCopiedMantraIdx] = useState<number | null>(null);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('bn-IN', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const handleCopyMantra = async (text?: string, idx?: number) => {
    if (!text || idx === undefined) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMantraIdx(idx);
      setTimeout(() => setCopiedMantraIdx(null), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="schedule" className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 relative z-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Calendar size={14} className="text-orange-400" />
          শারদোৎসব নির্ঘণ্ট {toBengaliDigits(year)}
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff5ea] via-[#fcd34d] to-[#f59e0b]">
          পূজোর দিনপঞ্জী ও তিথি মাহাত্ম্য
        </h2>
        <p className="font-serif text-sm sm:text-base italic text-orange-100/70 max-w-2xl mx-auto mt-2.5">
          মহালয়া থেকে বিজয়া দশমী — প্রতিটি পূজার শুভ মুহূর্ত, প্রাচীন রীতিনীতি ও পবিত্র স্তোত্র
        </p>
      </div>

      {/* Grid of Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((ev, idx) => {
          const isExpanded = expandedIndex === idx;
          const isUpcoming = new Date(ev.dateStr).getTime() > Date.now();

          return (
            <div
              key={idx}
              className={`rounded-3xl border transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group ${
                isExpanded
                  ? 'bg-gradient-to-b from-orange-950/40 via-black/70 to-black/80 border-orange-400/50 shadow-2xl shadow-orange-950/50'
                  : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-orange-500/30'
              }`}
            >
              {/* Background ambient glow on active */}
              {isExpanded && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
              )}

              <div>
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-orange-500/30 flex items-center justify-center text-2xl shadow-md">
                    {ev.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    {ev.significance}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                  {ev.nameBn}
                </h3>

                {/* Date & Tithi */}
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs font-semibold text-orange-400">
                    {formatDate(ev.dateStr)}
                  </p>
                  <p className="text-[11px] text-white/50 font-medium">
                    {ev.tithiBn}
                  </p>
                </div>

                {/* Timing */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                  <Clock size={12} className="text-amber-400" />
                  <span>{ev.timeSlotBn}</span>
                </div>

                {/* Description */}
                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/75">
                  {ev.descriptionBn}
                </p>

                {/* Collapsible Details: Rituals & Mantra */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3.5">
                    {ev.rituals && ev.rituals.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-orange-300 flex items-center gap-1.5 mb-2">
                          <BookOpen size={12} />
                          প্রধান রীতিনীতি (Rituals):
                        </h4>
                        <ul className="space-y-1 text-xs text-white/70">
                          {ev.rituals.map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-1.5">
                              <span className="text-orange-400 font-bold">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {ev.mantraBn && (
                      <div className="p-3.5 rounded-xl bg-orange-950/30 border border-orange-400/20">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                            পবিত্র প্রণাম মন্ত্র:
                          </span>
                          <button
                            onClick={() => handleCopyMantra(ev.mantraBn, idx)}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80 flex items-center gap-1 transition-colors"
                          >
                            {copiedMantraIdx === idx ? (
                              <>
                                <Check size={11} className="text-emerald-400" />
                                <span>কপি হয়েছে</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>কপি করুন</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="font-serif text-xs leading-relaxed text-amber-100/90 italic">
                          "{ev.mantraBn}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Toggle Button */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-between text-xs font-semibold text-orange-300 hover:text-orange-200 transition-colors"
              >
                <span>{isExpanded ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত রীতিনীতি ও মন্ত্র দেখুন'}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
