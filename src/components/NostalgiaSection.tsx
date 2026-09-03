import { Heart, Sparkles, Flame, Moon, Sun, Flower2 } from 'lucide-react';

const NOSTALGIA_ITEMS = [
  {
    title: 'ভোর ৪টের রেডিও ও চণ্ডীপাঠ',
    subtitle: 'Mahalaya Dawn Nostalgia',
    desc: 'কাকভোরে লেপ-কম্বলের ওম ছেড়ে বাবা-মায়ের সাথে ট্রানজিস্টার অন করা। বীরেন্দ্রকৃষ্ণ ভদ্রের জলদগম্ভীর কণ্ঠে ভেসে আসে "আশ্বিনের শারদপ্রাতে..."।',
    icon: '📻',
    tag: 'মহালয়ার স্মৃতি',
  },
  {
    title: 'শিশিরভেজা শিউলি ও কাশফুল',
    subtitle: 'Fragrance of Autumn',
    desc: 'সকালে ঘাসের ওপর ঝরে পড়া কমলা বোঁটা আর সাদা পাপড়ির শিউলি কুড়োনো। ট্রেনের জানালা দিয়ে শুভ্র কাশফুলের দল জানান দেয় মা আসছেন।',
    icon: '🌸',
    tag: 'শরৎ প্রকৃতি',
  },
  {
    title: 'নতুন জামার গন্ধ ও দিন গোনা',
    subtitle: 'New Clothes & Countdowns',
    desc: 'পুজোর ষষ্ঠী থেকে দশমী — কোন দিন কোন নতুন পোশাক পরা হবে, তার দিনরাত জল্পনা আর আলমারিভর্তি উপহারের সুবাস।',
    icon: '✨',
    tag: 'শৈশবের আনন্দ',
  },
  {
    title: 'অষ্টমীর পুষ্পাঞ্জলি ও সন্ধিপূজা',
    subtitle: 'Sacred Maha Ashtami',
    desc: 'সকাল থেকে উপোস থেকে নতুন লাল পাড় শাড়ি বা ধুতি-পাঞ্জাবিতে অঞ্জলি। সন্ধ্যায় ১০৮ মাটির প্রদীপের মায়াবী আলোয় অলৌকিক সন্ধিপূজা।',
    icon: '🪔',
    tag: 'ভক্তি ও ঐতিহ্য',
  },
  {
    title: 'ধুনুচি নাচ ও কাঁসরের ছন্দ',
    subtitle: 'The Beat of Dhunuchi',
    desc: 'ধুনোর সুগন্ধি ধোঁয়া, ঢাকের মাতাল বোল আর কাঁসরের ঝঙ্কারে দুই হাতে মাটির ধুনুচি নিয়ে উত্তাল নৃত্যের উন্মাদনা।',
    icon: '🔥',
    tag: 'শারদ উল্লাস',
  },
  {
    title: 'সিঁদুর খেলা ও বিজয়ার মিষ্টিমুখ',
    subtitle: 'Sindoor Khela & Shubho Bijoya',
    desc: 'মাকে চোখের জলে বিদায় জানিয়ে সিঁদুরে রাঙা আনন্দ। বড়দের পায়ে হাত দিয়ে প্রণাম আর মিষ্টিমুখ — "আসছে বছর আবার হবে!"',
    icon: '🕊️',
    tag: 'আসছে বছর আবার হবে',
  },
];

export function NostalgiaSection() {
  return (
    <section id="nostalgia" className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 relative z-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Heart size={14} className="text-orange-400" />
          বাঙালির বারো মাসে তেরো পার্বণ
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff5ea] via-[#fcd34d] to-[#f59e0b]">
          পুজোর আবেগ ও সোনালী স্মৃতিচারণ
        </h2>
        <p className="font-serif text-sm sm:text-base italic text-orange-100/70 max-w-2xl mx-auto mt-2.5">
          কলকাতার অলিতে-গলিতে কিংবা দূর প্রবাসের বুকে — যে স্মৃতিগুলো প্রতিটি বাঙালিকে ঘরে ফিরিয়ে আনে
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {NOSTALGIA_ITEMS.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-3xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-orange-500/35 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl" role="img" aria-label="icon">
                  {item.icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-orange-300">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-orange-400/80 font-medium mb-2.5">{item.subtitle}</p>
              <p className="text-xs sm:text-sm leading-relaxed text-white/70">{item.desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
              <span>শারদ স্মৃতি</span>
              <Sparkles size={12} className="text-amber-400/60" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
