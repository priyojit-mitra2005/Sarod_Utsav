export interface Track {
  id: string;
  titleBn: string;
  titleEn: string;
  artist: string;
  durationEst: string;
  youtubeId: string;
  startSeconds: number;
  endSeconds?: number;
  descriptionBn: string;
  shlokaBn?: string;
  tag: string;
}

// Master broadcast video ID that is 100% verified and embeddable without restrictions
export const MASTER_BROADCAST_YT_ID = 'YQyo8QeoYhc';

// Authentic Dhak Sound Collection (Durgapuja Arti Dhaker Bajna)
export const DHAK_SPECIAL_YT_ID = 'DZ21CSg22nc';

export const PLAYLIST_TRACKS: Track[] = [
  {
    id: '1',
    titleBn: 'মহিষাসুরমর্দিনী (সম্পূর্ণ সম্প্রচার)',
    titleEn: 'Mahishasuramardini (Complete Broadcast)',
    artist: 'বীরেন্দ্রকৃষ্ণ ভদ্র (Birendra Krishna Bhadra)',
    durationEst: '1:28:40',
    youtubeId: MASTER_BROADCAST_YT_ID,
    startSeconds: 0,
    descriptionBn: '১৯৩১ সালের আকাশবাণীর কালজয়ী চণ্ডীপাঠ ও গীতিআলেখ্য। বাঙালির মহালয়ার ভোরের চিরন্তন আবেগ।',
    shlokaBn: 'আশ্বিনের শারদপ্রাতে বেজে উঠেছে আলোক-মঞ্জীর... যা দেবী সর্বভূতেষু মাতৃরূপেণ সংস্থিতা।',
    tag: 'মহালয়া পূর্ণাঙ্গ',
  },
  {
    id: 'dhak-authentic',
    titleBn: 'বাংলার দূর্গা পূজোর ঢাক আরতি (Dhak Music)',
    titleEn: 'Durgapuja Arti Dhaker Bajna',
    artist: 'ঐতিহ্যবাহী ঢাক ও কাঁসর আরতি বাদন (BDS)',
    durationEst: '4:15',
    youtubeId: DHAK_SPECIAL_YT_ID,
    startSeconds: 0,
    descriptionBn: 'শারদোৎসবের খাঁটি ধুনুচি আরতির ঢাক ও কাঁসর বাদন। বাংলার দুর্গাপূজার ঐতিহ্যবাহী ঢাকের গমক ও বোল।',
    shlokaBn: 'বলো দুর্গা মাই কি... জয়! ঢাকের কাঠির মিষ্টি আওয়াজে দেবীর বরণ।',
    tag: 'খাঁটি ঢাকের বোল',
  },
  {
    id: '2',
    titleBn: 'বাজলো তোমার আলোর বেণু',
    titleEn: 'Bajlo Tomar Alor Benu',
    artist: 'সুপ্রীতি ঘোষ (Supriti Ghosh)',
    durationEst: '3:30',
    youtubeId: 'IISWE2RiDBU',
    startSeconds: 0,
    descriptionBn: 'ভোরের শিউলি ঝরা শিশিরভেজা বাতাসে দেবীপক্ষের প্রথম প্রভাতী সঙ্গীত।',
    shlokaBn: 'বাজলো তোমার আলোর বেণু, মাতলো রে ভুবন। প্রভাতী মেঘে রঙের মেলা, শারদ সমীরণ॥',
    tag: 'আগমনী গান',
  },
  {
    id: '3',
    titleBn: 'জাগো দুর্গা দশপ্রহরণধারিণী',
    titleEn: 'Jago Durga',
    artist: 'দ্বিজেন মুখোপাধ্যায় (Dwijen Mukhopadhyay)',
    durationEst: '4:20',
    youtubeId: 'IfSJy3_Lkuo',
    startSeconds: 0,
    descriptionBn: 'মহাশক্তি দেবী দুর্গার সর্বশ্রেষ্ঠ আহ্বান ও উদ্বোধন সঙ্গীত।',
    shlokaBn: 'জাগো দুর্গা, জাগো দশপ্রহরণধারিণী! অভয়দায়িনী মা গো, জাগো...',
    tag: 'দেবী আবাহন',
  },
  {
    id: '4',
    titleBn: 'যা দেবী সর্বভূতেষু (স্তোত্রপাঠ)',
    titleEn: 'Ya Devi Sarvabhuteshu',
    artist: 'বীরেন্দ্রকৃষ্ণ ভদ্র (Birendra Krishna Bhadra)',
    durationEst: '8:05',
    youtubeId: 'RuJ_BPKdJpo',
    startSeconds: 0,
    descriptionBn: 'দেবীসূক্ত ও সর্বভূতে মাতৃরূপে দেবীর মহাশক্তি বন্দনা।',
    shlokaBn: 'যা দেবী সর্বভূতেষু মাতৃরূপেণ সংস্থিতা। নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ॥',
    tag: 'পবিত্র চণ্ডীপাঠ',
  },
  {
    id: '5',
    titleBn: 'রূপং দেহি জয়ং দেহি (অর্গলাস্তোত্র)',
    titleEn: 'Rupam Dehi Jayam Dehi',
    artist: 'বীরেন্দ্রকৃষ্ণ ভদ্র ও সমবেত কণ্ঠ',
    durationEst: '4:45',
    youtubeId: 'tXXwsHeS_T0',
    startSeconds: 0,
    descriptionBn: 'শ্রীশ্রীচণ্ডীর অর্গলাস্তোত্র। দেবীর কাছে রূপ, বিজয় ও কল্যাণ প্রার্থনার পুণ্য শ্লোক।',
    shlokaBn: 'রূপং দেহি জয়ং দেহি যশো দেহি দ্বিষো জহি। মহিষাসুরনির্ণাশি ভক্তানাং সুখদে নমঃ॥',
    tag: 'অর্গলাস্তোত্র',
  },
  {
    id: '6',
    titleBn: 'তব অচিন্ত্য রূপচরিত মহিমা',
    titleEn: 'Taba Achintya',
    artist: 'দ্বিজেন মুখোপাধ্যায় ও পঙ্কজ মল্লিক',
    durationEst: '4:10',
    youtubeId: '6rwF1iQPVzc',
    startSeconds: 29,
    descriptionBn: 'আকাশবাণীর সুরারোপিত দেবীর অলৌকিক মহিমার গান।',
    shlokaBn: 'তব অচিন্ত্য রূপচরিত মহিমা, নব আলোকে উদ্ভাসিত ধরণী...',
    tag: 'মহিমা গীতি',
  },
  {
    id: 'z-ahang-rudre',
    titleBn: 'অহং রুদ্রেভিঃ (Ahang Rudre)',
    titleEn: 'Ahang Rudre - Devi Suktam',
    artist: 'সৌম্যজিত ও সৌরেন্দ্র (Sourendro-Soumyojit Academy)',
    durationEst: '6:20',
    youtubeId: 'zZ4dYYcPxUY',
    startSeconds: 0,
    descriptionBn: 'পঙ্কজ কুমার মল্লিকের সুরারোপিত ঋগ্বৈদিক দেবীসূক্ত বন্দনা। সৌরেন্দ্র ও সৌম্যজিতের একাডেমির কণ্ঠে অপূর্ব পরিবেশনা।',
    shlokaBn: 'অহং রুদ্রেভির্বসুভিশ্চরামি অহমাদিত্যৈরুত বিশ্বদেবৈঃ... অহং রাষ্ট্রী সংগমনী বসূনাং।',
    tag: 'বৈদিক দেবীসূক্ত',
  },
  {
    id: 'saregama-1',
    titleBn: 'যা চণ্ডী মধুকৈটভাদিদৈত্যদলনী',
    titleEn: 'Ya Chandi',
    artist: 'সমবেত কণ্ঠ (Chorus) • সুর: পঙ্কজ মল্লিক',
    durationEst: '1:39',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 4,
    descriptionBn: 'আকাশবাণীর মহিষাসুরমর্দ্দিনী সূচনা স্তোত্র। মধুকৈটভ বিনাশিনী দেবী মহামায়ার পবিত্র আবাহন।',
    shlokaBn: 'যা চণ্ডী মধুকৈটভাদিদৈত্যদলনী যা মাহিষোন্মূলিনী...',
    tag: 'মহিষাসুরমর্দিনী',
  },
  {
    id: 'saregama-2',
    titleBn: 'সিংহস্থা শশিশিখরা',
    titleEn: 'Simhastha Sashisekhara',
    artist: 'সমবেত কণ্ঠ (Chorus) • বাণী কুমার',
    durationEst: '0:56',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 103,
    descriptionBn: 'সিংহবাহিনী চন্দ্রশেখরা মহাশক্তি দেবীর রূপবর্ণনা ও স্তোত্র।',
    shlokaBn: 'সিংহস্থা শশিশিখরা মরকতপ্রখ্যা চতুর্ভির্ভুজৈঃ...',
    tag: 'মহিষাসুরমর্দিনী',
  },
  {
    id: 'saregama-3',
    titleBn: 'বাজলো তোমার আলোর বেণু (সম্পূর্ণ স্তোত্রপাঠসহ)',
    titleEn: 'Bajlo Tomar Aalor Benu With Narration',
    artist: 'সুপ্রীতি ঘোষ ও বীরেন্দ্রকৃষ্ণ ভদ্র',
    durationEst: '4:22',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 159,
    descriptionBn: 'বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ ও সুপ্রীতি ঘোষের কণ্ঠে কালজয়ী প্রভাতী আগমনী।',
    shlokaBn: 'বাজলো তোমার আলোর বেণু, মাতলো রে ভুবন... প্রভাতী মেঘে রঙের মেলা।',
    tag: 'আগমনী গান',
  },
  {
    id: 'saregama-4',
    titleBn: 'জাগো দুর্গা দশপ্রহরণধারিণী (অরিজিনাল)',
    titleEn: 'Jago Durga Dashapraharanadharinee',
    artist: 'দ্বিজেন মুখোপাধ্যায় (Dwijen Mukherjee)',
    durationEst: '1:47',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 421,
    descriptionBn: 'দশভুজা মা দুর্গার মহাশক্তি আবাহন গীতি। দ্বিজেন মুখোপাধ্যায়ের অনবদ্য কণ্ঠ।',
    shlokaBn: 'জাগো দুর্গা, জাগো দশপ্রহরণধারিণী! অভয়দায়িনী মা গো, জাগো...',
    tag: 'দেবী আবাহন',
  },
  {
    id: 'saregama-5',
    titleBn: 'ওগো আমার আগমনী-আলো',
    titleEn: 'Ogo Amar Agamani-alo',
    artist: 'শিপ্রা বসু (Sipra Bose)',
    durationEst: '3:19',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 528,
    descriptionBn: 'শারদ প্রকৃতির শিউলি ঝরা বাতাসে দেবীপক্ষের আগমনী বার্তা। শিপ্রা বসুর সুমধুর সুর।',
    shlokaBn: 'ওগো আমার আগমনী-আলো, জ্বেলে দিলে প্রভাতী মেঘে...',
    tag: 'আগমনী গান',
  },
  {
    id: 'saregama-6',
    titleBn: 'তব অচিন্ত্য রূপ-চরিত-মহিমা (মানবেন্দ্র)',
    titleEn: 'Tabo Achintya Rupa-charita-mahima',
    artist: 'মানবেন্দ্র মুখোপাধ্যায় (Manabendra Mukherjee)',
    durationEst: '3:59',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 727,
    descriptionBn: 'মানবেন্দ্র মুখোপাধ্যায়ের সুরেলা ও গম্ভীর কণ্ঠে দেবীর অচিন্ত্য রূপের মহিমা।',
    shlokaBn: 'তব অচিন্ত্য রূপ-চরিত-মহিমা, নব আলোকে উদ্ভাসিত ধরণী...',
    tag: 'মহিমা গীতি',
  },
  {
    id: 'saregama-7',
    titleBn: 'অহং রুদ্রেভির্বসুভিশ্চরামি (দেবীসূক্ত)',
    titleEn: 'Aham Rudrebhirvasubhischara',
    artist: 'সমবেত কণ্ঠ (Chorus) • সুর: পঙ্কজ মল্লিক',
    durationEst: '4:01',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 966,
    descriptionBn: 'ঋগ্বেদের দশম মণ্ডলের পরম পবিত্র দেবীসূক্ত। সমস্ত বিশ্বে ব্রহ্মময়ীর স্বরূপ দর্শন।',
    shlokaBn: 'অহং রুদ্রেভির্বসুভিশ্চরাম্যহমাদিত্যৈরুত বিশ্বদেবৈঃ...',
    tag: 'দেবীসূক্ত',
  },
  {
    id: 'saregama-8',
    titleBn: 'অখিল-বিমানে তব জয়-গানে',
    titleEn: 'Akhila-bimane Taba Jaya-gane',
    artist: 'কৃষ্ণা দাশগুপ্ত (Krishna Dasgupta)',
    durationEst: '4:04',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 1207,
    descriptionBn: 'মহাকাশজুড়ে দেবীর বিজয়োল্লাসের মধুময় স্তুতি ও সঙ্গীত।',
    shlokaBn: 'অখিল-বিমানে তব জয়-গানে ধ্বনিল পুণ্যমন্ত্র...',
    tag: 'শারদ গীতি',
  },
  {
    id: 'saregama-9',
    titleBn: 'জয়ন্তী মঙ্গলা কালী (স্তোত্রপাঠ)',
    titleEn: 'Jayanti Mangala Kali (Chant)',
    artist: 'সমবেত স্তোত্রপাঠ (Chorus)',
    durationEst: '0:32',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 1451,
    descriptionBn: 'দেবী চণ্ডীর অর্গলাস্তোত্র জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী মন্ত্র।',
    shlokaBn: 'জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী। দুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥',
    tag: 'স্তোত্রপাঠ',
  },
  {
    id: 'saregama-10',
    titleBn: 'শুভ্র শঙ্খ-রবে',
    titleEn: 'Subhra Sankha-rabe',
    artist: 'শ্যামল মিত্র, অসীমা ভট্টাচার্য, আরতি মুখোপাধ্যায়',
    durationEst: '2:50',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 1483,
    descriptionBn: 'শঙ্খের পবিত্র নিনাদে শারদোৎসবের আনন্দময় আহ্বান। কিংবদন্তি শিল্পীদের সমবেত কণ্ঠ।',
    shlokaBn: 'শুভ্র শঙ্খ-রবে জাগিল প্রভাতী রবি... নীল অম্বর মাঝে।',
    tag: 'শারদ গীতি',
  },
  {
    id: 'saregama-11',
    titleBn: 'জটাজূটসমাযুক্তমর্ধেন্দুকৃতশেখরম্ (দেবী ধ্যান)',
    titleEn: 'Jatajutasamayuktamardhendukrita-sekharam',
    artist: 'সমবেত স্তোত্রপাঠ ও চণ্ডীপাঠ',
    durationEst: '4:27',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 1653,
    descriptionBn: 'দেবী দুর্গার ত্রিনয়নী দশভূজা মূর্তির শাশ্বত ধ্যানমন্ত্র ও অঙ্গ্যাস।',
    shlokaBn: 'জটাজূটসমাযুক্তমর্ধেন্দুকৃতশেখরম্। লোচনত্রয়সংযুক্তাং পূর্ণেন্দুসদৃশাননাম্॥',
    tag: 'ধ্যানমন্ত্র',
  },
  {
    id: 'saregama-12',
    titleBn: 'নমো চণ্ডী, নমো চণ্ডী',
    titleEn: 'Namo Chandi, Namo Chandi',
    artist: 'বিমল ভূষণ (Bimal Bhushan)',
    durationEst: '3:05',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 1920,
    descriptionBn: 'বিমল ভূষণের উদাত্ত কণ্ঠে দেবীর জয়জয়কার ও পরম ভক্তি নিবেদন।',
    shlokaBn: 'নমো চণ্ডী, নমো চণ্ডী... জয় চণ্ডী জয় হে!',
    tag: 'চণ্ডী বন্দনা',
  },
  {
    id: 'saregama-13',
    titleBn: 'মা গো তব বীণে সঙ্গীত',
    titleEn: 'Ma Go Tabu Beene Sangeeta',
    artist: 'সুমিত্রা সেন (Sumitra Sen)',
    durationEst: '3:33',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 2105,
    descriptionBn: 'সুমিত্রা সেনের অমর দরদি কণ্ঠে মায়ের চরণে সুরসাধনার নিবেদন।',
    shlokaBn: 'মা গো তব বীণে সঙ্গীত ঝরে, নবীন সুরের মায়ায়...',
    tag: 'মাতৃ বন্দনা',
  },
  {
    id: 'saregama-14',
    titleBn: 'বিমানে বিমানে আলোকের গানে',
    titleEn: 'Bimane Bimane',
    artist: 'সন্ধ্যা মুখোপাধ্যায় (Sandhya Mukherjee)',
    durationEst: '3:01',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 2318,
    descriptionBn: 'গীতশ্রী সন্ধ্যা মুখোপাধ্যায়ের কালজয়ী অমর সুরে দেবীর আলোকময় আবাহন।',
    shlokaBn: 'বিমানে বিমানে আলোকের গানে, বাজে আনন্দের বাঁশি...',
    tag: 'শারদ গীতি',
  },
  {
    id: 'saregama-15',
    titleBn: 'জয় জয় জপ্যজয়ে',
    titleEn: 'Jaya Jaya Japyajaye',
    artist: 'সমবেত কণ্ঠ (Chorus) • সুর: পঙ্কজ মল্লিক',
    durationEst: '2:32',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 2499,
    descriptionBn: 'মহাসুরদলনী জগজ্জননী দুর্গার স্তুতিগান। দ্রুত ছন্দের আনন্দোল্লাস।',
    shlokaBn: 'জয় জয় জপ্যজয়ে জয় পরম কৃপাময়ী দেবী দুর্গা...',
    tag: 'স্তোত্র গীতি',
  },
  {
    id: 'saregama-16',
    titleBn: 'হে চিন্ময়ী',
    titleEn: 'He Chinmoyi',
    artist: 'তরুণ বন্দ্যোপাধ্যায় (Tarun Banerjee)',
    durationEst: '2:56',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 2651,
    descriptionBn: 'তরুণ বন্দ্যোপাধ্যায়ের উদাত্ত কণ্ঠে চিন্ময়ী আনন্দময়ী জননীর আহ্বান।',
    shlokaBn: 'হে চিন্ময়ী আনন্দময়ী মা... ধরাতলে এসো নেমে।',
    tag: 'ভক্তিগীতি',
  },
  {
    id: 'saregama-17',
    titleBn: 'অমল-কিরণে ত্রিভুবন-মনোহারিণী',
    titleEn: 'Amala-kirane Tribhubana-manoharini',
    artist: 'প্রতিমা বন্দ্যোপাধ্যায় (Pratima Banerjee)',
    durationEst: '4:05',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 2827,
    descriptionBn: 'প্রতিমা বন্দ্যোপাধ্যায়ের মধুর কণ্ঠে নিখিল ভুবন আলো করা দেবীর বন্দনা।',
    shlokaBn: 'অমল-কিরণে ত্রিভুবন-মনোহারিণী, কনককান্তি অনুপমা...',
    tag: 'দেবী বন্দনা',
  },
  {
    id: 'saregama-18',
    titleBn: 'জয়ন্তী মঙ্গলা কালী (পূর্ণাঙ্গ অর্গলাস্তোত্র সঙ্গীত)',
    titleEn: 'Jayanti Mangala Kali - Full Song',
    artist: 'পঙ্কজ কুমার মল্লিক ও সমবেত কণ্ঠ',
    durationEst: '6:59',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 3072,
    descriptionBn: 'সঙ্গীতগুরু পঙ্কজ কুমার মল্লিকের নিজের কণ্ঠে অর্গলাস্তোত্রের কালজয়ী পূর্ণাঙ্গ রূপান্তর।',
    shlokaBn: 'জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী... রূপং দেহি জয়ং দেহি যশো দেহি দ্বিষো জহি।',
    tag: 'অর্গলাস্তোত্র',
  },
  {
    id: 'saregama-19',
    titleBn: 'শান্তি দিলে ভরি',
    titleEn: 'Santi Dile Bhari',
    artist: 'উৎপলা সেন (Utpala Sen)',
    durationEst: '3:49',
    youtubeId: 'LOlyrK53QM4',
    startSeconds: 3491,
    descriptionBn: 'মহিষাসুরমর্দ্দিনীর অন্তিম সমাপ্তি ও শান্তি গীতি। উৎপলা সেনের আশীর্বাদী শান্তিসুর।',
    shlokaBn: 'শান্তি দিলে ভরি নিখিল ভুবনে... মা গো তব চরণতলে।',
    tag: 'শান্তি গীতি',
  },
];

type Listener = () => void;

class MusicStateManager {
  private currentTrackIndex = 0;
  private isPlaying = false;
  private isMuted = false;
  private progress = 0;
  private duration = 0;
  private volume = 85;
  private ytPlayer: any = null;
  private listeners: Set<Listener> = new Set();

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public setPlayer(player: any) {
    this.ytPlayer = player;
  }

  public getPlayer() {
    return this.ytPlayer;
  }

  public getState() {
    return {
      currentTrackIndex: this.currentTrackIndex,
      currentTrack: PLAYLIST_TRACKS[this.currentTrackIndex],
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      progress: this.progress,
      duration: this.duration,
      volume: this.volume,
    };
  }

  public setIsPlaying(val: boolean) {
    this.isPlaying = val;
    this.notify();
  }

  public setProgress(val: number) {
    this.progress = val;
    this.notify();
  }

  public setDuration(val: number) {
    this.duration = val;
    this.notify();
  }

  public setIsMuted(val: boolean) {
    this.isMuted = val;
    this.notify();
  }

  /**
   * Select a song and play immediately:
   * Handles video ID changes via loadVideoById or seekTo & play.
   */
  public selectTrack(index: number) {
    const prevTrack = PLAYLIST_TRACKS[this.currentTrackIndex];
    this.currentTrackIndex = (index + PLAYLIST_TRACKS.length) % PLAYLIST_TRACKS.length;
    const track = PLAYLIST_TRACKS[this.currentTrackIndex];

    this.progress = track.startSeconds;
    this.isPlaying = true;
    this.notify();

    if (this.ytPlayer) {
      try {
        const currentUrl = typeof this.ytPlayer.getVideoUrl === 'function' ? this.ytPlayer.getVideoUrl() : '';
        const isDifferentVideo = !currentUrl.includes(track.youtubeId);
        if (isDifferentVideo && typeof this.ytPlayer.loadVideoById === 'function') {
          this.ytPlayer.loadVideoById({
            videoId: track.youtubeId,
            startSeconds: track.startSeconds,
          });
        } else {
          if (typeof this.ytPlayer.seekTo === 'function') {
            this.ytPlayer.seekTo(track.startSeconds, true);
          }
          if (typeof this.ytPlayer.playVideo === 'function') {
            this.ytPlayer.playVideo();
          }
        }
      } catch (err) {
        console.warn('Playback error', err);
      }
    }
  }

  public playDhakTrack() {
    const dhakIndex = PLAYLIST_TRACKS.findIndex((t) => t.youtubeId === DHAK_SPECIAL_YT_ID);
    if (dhakIndex !== -1) {
      this.selectTrack(dhakIndex);
    }
  }

  public togglePlay() {
    if (this.ytPlayer) {
      try {
        if (this.isPlaying) {
          this.ytPlayer.pauseVideo();
        } else {
          // If at beginning of song or zero, ensure we are at currentTrack.startSeconds
          const track = PLAYLIST_TRACKS[this.currentTrackIndex];
          if (this.progress === 0 && track.startSeconds > 0) {
            this.ytPlayer.seekTo(track.startSeconds, true);
          }
          this.ytPlayer.playVideo();
        }
      } catch {
        // Fallback
      }
    } else {
      this.isPlaying = !this.isPlaying;
      this.notify();
    }
  }

  public nextTrack() {
    this.selectTrack(this.currentTrackIndex + 1);
  }

  public prevTrack() {
    this.selectTrack(this.currentTrackIndex - 1);
  }

  public seekTo(seconds: number) {
    this.progress = seconds;
    if (this.ytPlayer && typeof this.ytPlayer.seekTo === 'function') {
      this.ytPlayer.seekTo(seconds, true);
    }
    this.notify();
  }

  public toggleMute() {
    if (this.ytPlayer) {
      if (this.isMuted) {
        this.ytPlayer.unMute();
        this.isMuted = false;
      } else {
        this.ytPlayer.mute();
        this.isMuted = true;
      }
      this.notify();
    } else {
      this.isMuted = !this.isMuted;
      this.notify();
    }
  }
}

export const musicState = new MusicStateManager();
