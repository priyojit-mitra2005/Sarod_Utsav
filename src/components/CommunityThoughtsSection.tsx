import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import {
  Camera,
  Heart,
  Send,
  Sparkles,
  Plus,
  X,
  MapPin,
  Tag,
  Trash2,
  Image as ImageIcon,
  MessageSquare,
  ZoomIn,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface CommunityThought {
  id: string;
  name: string;
  location: string;
  thought: string;
  imageUrl?: string;
  tag: string;
  likes: number;
  dateStr: string;
  isUserAdded?: boolean;
}

// Curated festive preset photos for quick selection
const PRESET_PHOTOS = [
  {
    label: 'কুমোরটুলির মা দুর্গা',
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'সন্ধ্যায় ধুনুচি নাচ',
    url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'শরতের কাশফুল ও আকাশ',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'আলো ঝলমলে মণ্ডপ',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  },
];

const INITIAL_THOUGHTS: CommunityThought[] = [
  {
    id: 'init-1',
    name: 'অনন্যা রায়চৌধুরী',
    location: 'বাগবাজার, কলকাতা',
    thought:
      'মহালয়ার ভোরে শিউলি কুড়োনো আর রেডিওতে বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ শোনার অনুভূতি কোনো কিছুর সাথেই মেলানো যায় না। প্রতি বছরের মতো এবারও মা আসছেন আমাদের ঘরে।',
    imageUrl:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    tag: '#মহালয়ার_স্মৃতি',
    likes: 42,
    dateStr: 'মহালয়া প্রভাত',
    isUserAdded: false,
  },
  {
    id: 'init-2',
    name: 'সৌম্যজিৎ মুখার্জি',
    location: 'লন্ডন, যুক্তরাজ্য',
    thought:
      'প্রবাসের ধূসর আবহাওয়ায় ঢাকের আওয়াজ শুনলে বুকটা খাঁ খাঁ করে ওঠে। যতই দূরে থাকি না কেন, পুজোর এই কটা দিন প্রতিটি বাঙালির মন পড়ে থাকে উত্তর থেকে দক্ষিণ কলকাতার অলিতে-গলিতে।',
    imageUrl:
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    tag: '#প্রবাসী_বাঙালি',
    likes: 58,
    dateStr: 'শরতের দিনগুলি',
    isUserAdded: false,
  },
  {
    id: 'init-3',
    name: 'দেবলীনা সেনগুপ্ত',
    location: 'সল্টলেক, কলকাতা',
    thought:
      'অষ্টমীর সকালে লাল-সাদা শাড়িতে অঞ্জলি দেওয়া আর সন্ধ্যায় বন্ধুদের সাথে ধুনুচি নাচে মেতে ওঠা — এই আনন্দ ভাষায় প্রকাশ করা যায় না। আসছে বছর আবার হবে!',
    imageUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    tag: '#অষ্টমীর_অঞ্জলি',
    likes: 37,
    dateStr: 'শারদ বার্তা',
    isUserAdded: false,
  },
];

const TAG_OPTIONS = [
  '#মহালয়ার_স্মৃতি',
  '#প্যান্ডেল_হপিং',
  '#ধুনুচি_নাচ',
  '#অষ্টমীর_অঞ্জলি',
  '#প্রবাসী_বাঙালি',
  '#মায়ের_মুখ',
  '#কাশফুল_ও_শিউলি',
  '#বিজয়া_দশমী',
];

const STORAGE_KEY = 'pujo_community_memories_v1';
const LIKED_POSTS_KEY = 'pujo_community_liked_posts_v1';

export function CommunityThoughtsSection() {
  const [thoughts, setThoughts] = useState<CommunityThought[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [thought, setThought] = useState('');
  const [tag, setTag] = useState(TAG_OPTIONS[0]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [formError, setFormError] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setThoughts(parsed);
        } else {
          setThoughts(INITIAL_THOUGHTS);
        }
      } else {
        setThoughts(INITIAL_THOUGHTS);
      }

      const savedLikes = localStorage.getItem(LIKED_POSTS_KEY);
      if (savedLikes) {
        setLikedPostIds(JSON.parse(savedLikes));
      }
    } catch {
      setThoughts(INITIAL_THOUGHTS);
    }
  }, []);

  // Save to localStorage whenever thoughts change
  const persistThoughts = (updated: CommunityThought[]) => {
    setThoughts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // quota or storage error
    }
  };

  // Handle local file photo upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFormError('ছবির আকার ৫ মেগাবাইটের কম হতে হবে (Max 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setFormError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('অনুগ্রহ করে আপনার নাম লিখুন (Name is required)');
      return;
    }
    if (!thought.trim()) {
      setFormError('অনুগ্রহ করে আপনার শারদ ভাবনা লিখুন (Thought is required)');
      return;
    }

    const newThought: CommunityThought = {
      id: 'user-' + Date.now(),
      name: name.trim(),
      location: location.trim() || 'কলকাতা',
      thought: thought.trim(),
      imageUrl: selectedImage || PRESET_PHOTOS[0].url,
      tag: tag || '#শারদ_স্মৃতি',
      likes: 1,
      dateStr: 'এখনই প্রকাশিত',
      isUserAdded: true,
    };

    const updated = [newThought, ...thoughts];
    persistThoughts(updated);

    // Reset form
    setName('');
    setLocation('');
    setThought('');
    setSelectedImage('');
    setFormError('');
    setIsFormOpen(false);
  };

  const handleLike = (id: string) => {
    const isLiked = likedPostIds.includes(id);
    const newLiked = isLiked ? likedPostIds.filter((item) => item !== id) : [...likedPostIds, id];
    setLikedPostIds(newLiked);
    try {
      localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(newLiked));
    } catch {
      // ignore
    }

    const updated = thoughts.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          likes: isLiked ? Math.max(0, t.likes - 1) : t.likes + 1,
        };
      }
      return t;
    });
    persistThoughts(updated);
  };

  const handleDelete = (id: string) => {
    const updated = thoughts.filter((t) => t.id !== id);
    persistThoughts(updated);
  };

  return (
    <section id="thoughts" className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 relative z-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Camera size={14} className="text-orange-400" />
          বাঙালির শারদ স্মৃতি ও মনের কথা
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff5ea] via-[#fcd34d] to-[#f59e0b]">
          শারদ ভাবনা ও আলোকচিত্র গ্যালারি
        </h2>
        <p className="font-serif text-sm sm:text-base italic text-orange-100/70 max-w-2xl mx-auto mt-2.5">
          আপনার তোলা দুর্গাপূজার ছবি যুক্ত করুন এবং এই উৎসবের আনন্দ ও অনুভূতি সবার সাথে ভাগ করে নিন
        </p>

        {/* Toggle Form Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-xl shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isFormOpen ? <X size={16} /> : <Plus size={16} />}
            <span>{isFormOpen ? 'ফর্ম বন্ধ করুন' : 'নিজের ছবি ও ভাবনা যুক্ত করুন (Add Photo & Thought)'}</span>
          </button>
        </div>
      </div>

      {/* Submission Form Modal/Panel */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden mb-12"
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#241512] via-[#1a1219] to-[#100d14] border border-orange-500/40 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/35 flex items-center justify-center text-orange-400">
                    <MessageSquare size={18} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                    শারদ অনুভূতি প্রকাশ করুন
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-white/50 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {formError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-orange-300 mb-1.5 uppercase tracking-wider">
                    আপনার নাম (Your Name) *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: প্রিয়াঙ্কা ঘোষ / প্রিয়জিৎ মিত্র"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-400 transition-colors"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-orange-300 mb-1.5 uppercase tracking-wider">
                    শহর / স্থান (City / Location)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="যেমন: কলকাতা / ঢাকা / লন্ডন"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                    <MapPin size={15} className="absolute left-3 top-3 text-orange-400/70" />
                  </div>
                </div>
              </div>

              {/* Tag Selector */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-orange-300 mb-1.5 uppercase tracking-wider">
                  ট্যাগ নির্বাচন করুন (Select Tag)
                </label>
                <div className="flex flex-wrap gap-2">
                  {TAG_OPTIONS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTag(t)}
                      className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
                        tag === t
                          ? 'bg-orange-500/30 border-orange-400 text-orange-200 shadow-md'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thought */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-orange-300 mb-1.5 uppercase tracking-wider">
                  আপনার দুর্গোৎসবের ভাবনা বা স্মৃতি (Your Thought / Story) *
                </label>
                <textarea
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder="পুজোর ঢাকের আওয়াজ, শিউলি ফুল, বন্ধুদের আড্ডা বা পরিবারের সাথে কাটানো সোনালী মুহূর্তের কথা লিখুন..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                  required
                />
              </div>

              {/* Image Upload / Selection */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-orange-300 mb-1.5 uppercase tracking-wider">
                  ছবি নির্বাচন করুন (Upload or Pick Photo)
                </label>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* File Upload Button */}
                  <label className="cursor-pointer px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 border-dashed flex items-center justify-center gap-2 text-xs text-white/80 transition-colors shrink-0 w-full sm:w-auto">
                    <Camera size={16} className="text-orange-400" />
                    <span>ডিভাইস থেকে ছবি আপলোড করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Preset Options */}
                  <div className="flex-1 w-full">
                    <span className="text-[11px] text-white/50 block mb-1.5">
                      অথবা প্রস্তুত উৎসবের ছবি থেকে বেছে নিন:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PRESET_PHOTOS.map((preset, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedImage(preset.url);
                            setFormError('');
                          }}
                          className={`relative rounded-xl overflow-hidden cursor-pointer border transition-all h-16 ${
                            selectedImage === preset.url
                              ? 'border-orange-400 ring-2 ring-orange-500/50 scale-102'
                              : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1">
                            <span className="text-[9px] text-white font-medium truncate">
                              {preset.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Image Preview */}
                {selectedImage && (
                  <div className="mt-3 relative inline-block">
                    <img
                      src={selectedImage}
                      alt="Selected Preview"
                      className="h-28 w-auto rounded-xl object-cover border border-orange-400/40 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage('')}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-500 transition-colors cursor-pointer"
                      title="ছবি বাদ দিন"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  <Send size={14} />
                  <span>স্মৃতি প্রকাশ করুন (Share Now)</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {thoughts.map((item) => {
          const isLiked = likedPostIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-gradient-to-b from-[#1c1214]/90 via-[#130d15]/90 to-[#0b080d]/95 border border-white/10 hover:border-orange-500/40 backdrop-blur-xl overflow-hidden flex flex-col justify-between shadow-xl transition-all group"
            >
              <div>
                {/* Photo with Lightbox Zoom */}
                {item.imageUrl && (
                  <div
                    onClick={() => setLightboxImage(item.imageUrl || null)}
                    className="relative w-full h-48 overflow-hidden cursor-pointer group/img"
                    title="বড় করে দেখতে ক্লিক করুন"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-orange-300">
                        {item.tag}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 opacity-0 group-hover/img:opacity-100 transition-opacity">
                        <ZoomIn size={13} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-orange-400/80">
                        <MapPin size={11} />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <span className="text-[10px] text-white/40 font-mono">
                      {item.dateStr}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed italic font-serif">
                    "{item.thought}"
                  </p>
                </div>
              </div>

              {/* Card Footer: Like Button & Delete */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-90 cursor-pointer ${
                    isLiked
                      ? 'bg-red-500/20 text-red-300 border border-red-500/35'
                      : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10'
                  }`}
                  aria-label="Like thought"
                >
                  <Heart
                    size={14}
                    className={isLiked ? 'text-red-400 fill-red-400' : 'text-white/60'}
                  />
                  <span>{item.likes}</span>
                </button>

                {item.isUserAdded && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="আপনার পোস্টটি মুছুন"
                    aria-label="Delete thought"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-orange-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Enlarged Puja Memory"
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
