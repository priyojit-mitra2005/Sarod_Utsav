import { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Clock,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Utensils,
  ScrollText,
} from 'lucide-react';
import { getUpcomingSchedule, toBengaliDigits } from '../utils/countdown';

interface PujoScheduleSectionProps {
  onOpenCalendarModal?: () => void;
}

export function PujoScheduleSection({ onOpenCalendarModal }: PujoScheduleSectionProps) {
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
          পূজোর দিনপঞ্জী ও পূর্ণাঙ্গ তিথি মাহাত্ম্য
        </h2>
        <p className="font-serif text-sm sm:text-base italic text-orange-100/70 max-w-2xl mx-auto mt-2.5">
          মহালয়া থেকে বিজয়া দশমী — প্রতিটি তিথির শুভ মুহূর্ত, বিহিত পূজাবিধি, মহাপ্রসাদ ও পবিত্র স্তোত্র
        </p>

        {onOpenCalendarModal && (
          <div className="mt-5 flex justify-center">
            <button
              onClick={onOpenCalendarModal}
              className="px-5 py-2.5 rounded-2xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-200 text-xs font-semibold inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-orange-950/40"
            >
              <Calendar size={14} className="text-orange-400" />
              <span>পূর্ণাঙ্গ তিথি পঞ্জিকা মোডাল খুলুন (View Full Calendar Modal)</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((ev, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-3xl border transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group ${
                isExpanded
                  ? 'bg-gradient-to-b from-orange-950/50 via-black/75 to-black/85 border-orange-400/60 shadow-2xl shadow-orange-950/60'
                  : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-orange-500/30'
              }`}
            >
              {/* Background ambient glow on active */}
              {isExpanded && (
                <div className="absolute top-0 right-0 w-44 h-44 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
              )}

              <div>
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/25 to-orange-600/35 border border-orange-500/35 flex items-center justify-center text-2xl shadow-md">
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
                  <p className="text-xs font-bold text-orange-400">
                    {ev.dateDisplayBn || formatDate(ev.dateStr)}
                  </p>
                  <p className="text-[11px] text-white/60 font-medium">
                    {ev.tithiBn}
                  </p>
                </div>

                {/* Tithi Timing window */}
                {ev.tithiTimingBn && (
                  <div className="mt-2.5 p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-200/90 flex items-start gap-1.5 leading-snug">
                    <Sparkles size={12} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{ev.tithiTimingBn}</span>
                  </div>
                )}

                {/* Timing */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                  <Clock size={12} className="text-amber-400" />
                  <span>{ev.timeSlotBn}</span>
                </div>

                {/* Description */}
                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/80">
                  {ev.descriptionBn}
                </p>

                {/* Collapsible Details: Rituals, Bhog, Lore & Mantra */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-4">
                    {/* Key Rituals */}
                    {ev.rituals && ev.rituals.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-orange-300 flex items-center gap-1.5 mb-2">
                          <BookOpen size={12} />
                          প্রধান রীতিনীতি ও পূজাবিধি:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-white/75">
                          {ev.rituals.map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold mt-0.5">•</span>
                              <span className="leading-snug">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bhog & Prasad */}
                    {ev.bhogPrasadBn && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-amber-300 mb-1">
                          <Utensils size={12} />
                          <span>মহাপ্রসাদ ও দেবীর ভোগ:</span>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                          {ev.bhogPrasadBn}
                        </p>
                      </div>
                    )}

                    {/* Mythological Story */}
                    {ev.mythologicalStoryBn && (
                      <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-400/20 text-xs">
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-purple-300 mb-1">
                          <ScrollText size={12} />
                          <span>পৌরাণিক মাহাত্ম্য ও তাৎপর্য:</span>
                        </div>
                        <p className="text-white/80 leading-relaxed">
                          {ev.mythologicalStoryBn}
                        </p>
                      </div>
                    )}

                    {/* Sacred Mantra */}
                    {ev.mantraBn && (
                      <div className="p-3.5 rounded-xl bg-orange-950/40 border border-orange-400/30">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                            <Sparkles size={11} />
                            পবিত্র স্তোত্র ও প্রণাম মন্ত্র:
                          </span>
                          <button
                            onClick={() => handleCopyMantra(ev.mantraBn, idx)}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/90 flex items-center gap-1 transition-colors cursor-pointer"
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
                        <p className="font-serif text-xs leading-relaxed text-amber-100 font-medium italic">
                          "{ev.mantraBn}"
                        </p>
                        {ev.mantraMeaningBn && (
                          <p className="text-[11px] mt-2 pt-2 border-t border-orange-400/20 text-orange-200/80 leading-snug">
                            <strong className="text-amber-300 font-semibold">ভাবার্থ:</strong> {ev.mantraMeaningBn}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Toggle Button */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-between text-xs font-semibold text-orange-300 hover:text-orange-200 transition-colors cursor-pointer"
              >
                <span>{isExpanded ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত তিথি মাহাত্ম্য ও ভোগ দেখুন'}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
