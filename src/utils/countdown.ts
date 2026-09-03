export interface PujaEvent {
  nameBn: string;
  nameEn: string;
  dateStr: string;
  tithiBn: string;
  timeSlotBn: string;
  descriptionBn: string;
  descriptionEn: string;
  significance: string;
  icon: string;
  rituals: string[];
  mantraBn?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
  targetEventName: string;
}

// Convert English numerals to Bengali digits (e.g. 10 -> ১০)
export function toBengaliDigits(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (digit) => bnDigits[Number(digit)]);
}

/**
 * Known dates for Durga Puja & Mahalaya across recent/upcoming years
 */
export const PUJA_SCHEDULE_MAP: Record<
  number,
  {
    mahalaya: string;
    panchami: string;
    sasthi: string;
    saptami: string;
    ashtami: string;
    nabami: string;
    dashami: string;
  }
> = {
  2024: {
    mahalaya: '2024-10-02T05:00:00',
    panchami: '2024-10-08T00:00:00',
    sasthi: '2024-10-09T00:00:00',
    saptami: '2024-10-10T00:00:00',
    ashtami: '2024-10-11T00:00:00',
    nabami: '2024-10-12T00:00:00',
    dashami: '2024-10-13T00:00:00',
  },
  2025: {
    mahalaya: '2025-09-21T05:00:00',
    panchami: '2025-09-27T00:00:00',
    sasthi: '2025-09-28T00:00:00',
    saptami: '2025-09-29T00:00:00',
    ashtami: '2025-09-30T00:00:00',
    nabami: '2025-10-01T00:00:00',
    dashami: '2025-10-02T00:00:00',
  },
  2026: {
    mahalaya: '2026-10-10T05:00:00',
    panchami: '2026-10-15T00:00:00',
    sasthi: '2026-10-16T00:00:00',
    saptami: '2026-10-17T00:00:00',
    ashtami: '2026-10-18T00:00:00',
    nabami: '2026-10-19T00:00:00',
    dashami: '2026-10-20T00:00:00',
  },
  2027: {
    mahalaya: '2027-09-29T05:00:00',
    panchami: '2027-10-04T00:00:00',
    sasthi: '2027-10-05T00:00:00',
    saptami: '2027-10-06T00:00:00',
    ashtami: '2027-10-07T00:00:00',
    nabami: '2027-10-08T00:00:00',
    dashami: '2027-10-09T00:00:00',
  },
};

export function getUpcomingSchedule(now = new Date()): { year: number; events: PujaEvent[] } {
  const currentYear = now.getFullYear();
  let yearData = PUJA_SCHEDULE_MAP[currentYear];

  // If no data for current year, fallback to 2026 or latest available
  if (!yearData) {
    yearData = PUJA_SCHEDULE_MAP[2026];
  }

  const buildEventsForYear = (y: number, data: typeof PUJA_SCHEDULE_MAP[number]): PujaEvent[] => [
    {
      nameBn: 'মহালয়া (Mahalaya)',
      nameEn: 'Mahalaya',
      dateStr: data.mahalaya,
      tithiBn: 'সর্বপিতৃ অমাবস্যা তিথি',
      timeSlotBn: 'ভোর ৪:০০ টে থেকে সারা দিনব্যাপী',
      descriptionBn: 'দেবীপক্ষের শুভ সূচনা ও পিতৃপক্ষের অবসান। কাকভোরে বীরেন্দ্রকৃষ্ণ ভদ্রের জাদুকরী কণ্ঠে মহিষাসুরমর্দিনী চণ্ডীপাঠ ও গঙ্গাবক্ষে পূর্বপুরুষদের তর্পণ নিবেদন।',
      descriptionEn: 'Dawn of Devipaksha. The iconic 4 AM radio broadcast of Birendra Krishna Bhadra and holy Tarpan rituals on the Ganges.',
      significance: 'আগমনের বার্তা ও পিতৃপুরুষের তর্পণ',
      icon: '🌅',
      rituals: [
        'ভোর ৪টায় বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ শ্রবণ',
        'গঙ্গাতীরে পূর্বপুরুষদের উদ্দেশ্যে তর্পণ',
        'চক্ষুদান ও প্রতিমায় দেবীর আবাহন',
      ],
      mantraBn: 'ওঁ যশোদাগর্ভসম্ভূতে নারায়ণবরপ্রিয়ে। নন্দগোপকুলে জাতে মঙ্গলে কুলবর্ধিনি॥',
    },
    {
      nameBn: 'মহা পঞ্চমী (Maha Panchami)',
      nameEn: 'Maha Panchami',
      dateStr: data.panchami,
      tithiBn: 'শুক্লা পঞ্চমী তিথি',
      timeSlotBn: 'সন্ধ্যা আরতি ও বোধন প্রস্তুতি',
      descriptionBn: 'শারদোৎসবের আনন্দ মুখর সূচনা। দূর-দূরান্ত থেকে দর্শনার্থীদের মণ্ডপ পরিক্রমা শুরু, আলো ঝলমলে কলকাতা ও বিশ্বজুড়ে বাঙালির উৎসবের আমেজ।',
      descriptionEn: 'The festive countdown culminates as pandal hoppers flock to admire divine idols and artistic pandal architecture.',
      significance: 'মণ্ডপ উদ্বোধন ও উৎসবের উল্লাস',
      icon: '✨',
      rituals: [
        'দেবীর রূপ দর্শন ও আলোকসজ্জা উন্মোচন',
        'বোধন ও ঘট স্থাপনের পূর্বপ্রস্তুতি',
        'ঢাকের কাঠি ও উৎসবের সূচনা',
      ],
    },
    {
      nameBn: 'মহা ষষ্ঠী (Maha Sasthi)',
      nameEn: 'Maha Sasthi',
      dateStr: data.sasthi,
      tithiBn: 'শুক্লা ষষ্ঠী তিথি',
      timeSlotBn: 'সায়ংকালে দেবীর আমন্ত্রণ ও অধিবাস',
      descriptionBn: 'বোধন, আমন্ত্রণ ও অধিবাস। বেলগাছের (বিল্ববৃক্ষ) নিচে ঘট স্থাপন করে মর্ত্যে দেবীকে সাদর আমন্ত্রণ। উলুধ্বনি ও শঙ্খধ্বনিতে মুখরিত চতুর্দিক।',
      descriptionEn: 'Official welcome of Goddess Durga to mortal realm through Kalparambha, Bodhon, and Adhibas under the sacred Bilva tree.',
      significance: 'মায়ের মর্ত্যে বোধন ও অধিবাস',
      icon: '🌺',
      rituals: [
        'বিল্বশাখায় দেবীর আমন্ত্রণ ও অধিবাস',
        'কল্পারম্ভ ও সংকল্প গ্রহণ',
        'সন্ধ্যায় বোধন আরতি ও মঙ্গল শঙ্খধ্বনি',
      ],
      mantraBn: 'ঐঁ রাবণস্য বধার্থায় রামস্যানুগ্রহায় চ। অকালে বোধিতা দেবী ষষ্ঠ্যাং তত্র প্রপূজয়েৎ॥',
    },
    {
      nameBn: 'মহা সপ্তমী (Maha Saptami)',
      nameEn: 'Maha Saptami',
      dateStr: data.saptami,
      tithiBn: 'শুক্লা সপ্তমী তিথি',
      timeSlotBn: 'ভোরবেলায় নবপত্রিকা প্রবেশ ও স্নান',
      descriptionBn: 'ভোরের আলো ফুটতেই গঙ্গাতীরে নবপত্রিকা বা "কলাবউ" স্নান। নয়টি পবিত্র উদ্ভিদের সমাহারে প্রকৃতির রূপিনী দেবী দুর্গার প্রাণপ্রতিষ্ঠা ও মূল পূজা আরম্ভ।',
      descriptionEn: 'Dawn bath of Nabapatrika (Kola Bou) symbolizing Mother Nature through nine sacred leaves, followed by Prana Pratishtha.',
      significance: 'নবপত্রিকা স্নান ও বিহিত পূজা',
      icon: '🌿',
      rituals: [
        'গঙ্গাতীরে ঢাক-কাঁসর সহযোগে নবপত্রিকা স্নান',
        'দেবীর চক্ষুদান ও প্রাণপ্রতিষ্ঠা পূজা',
        'মহাসপ্তমী বিহিত পূজা ও পুষ্পাঞ্জলি নিবেদন',
      ],
      mantraBn: 'রম্ভা কচ্চী হরিদ্রা চ জয়ন্তী বিল্বদাড়িমৌ। অশোক মানকশ্চৈব ধান্যাদি নবপত্রিকা॥',
    },
    {
      nameBn: 'মহা অষ্টমী (Maha Ashtami)',
      nameEn: 'Maha Ashtami',
      dateStr: data.ashtami,
      tithiBn: 'মহাষ্টমী ও অষ্টমী-নবমী সন্ধিক্ষণ',
      timeSlotBn: 'সকাল ১০টায় অঞ্জলি • রাতে মহা সন্ধিপূজা',
      descriptionBn: 'শারদোৎসবের সবচেয়ে ভক্তিঘন দিন। সকালে নতুন শাড়ি-পাঞ্জাবিতে ভক্তিভরে পুষ্পাঞ্জলি। দুপুরে কুমারী পূজা এবং অষ্টমী ও নবমীর মিলনক্ষণে ১০৮ পদ্ম ও ১০৮ মাটির প্রদীপে অলৌকিক সন্ধিপূজা।',
      descriptionEn: 'The spiritual zenith of Durga Puja: grand community Pushpanjali, Kumari Puja, and the sacred Sandhi Puja with 108 lotus flowers & lamps.',
      significance: '১০৮ প্রদীপে সন্ধিপূজা ও পুষ্পাঞ্জলি',
      icon: '🪔',
      rituals: [
        'সকালে শুদ্ধচিত্তে মহাষ্টমীর পুষ্পাঞ্জলি অর্পণ',
        'জীবন্ত ঈশ্বরীরূপে বালিকার কুমারী পূজা',
        'অষ্টমী-নবমী সন্ধিক্ষণে ৪৮ মিনিটের সন্ধিপূজা ও ১০৮ পদ্ম অর্পণ',
      ],
      mantraBn: 'ওঁ জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী। দুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥',
    },
    {
      nameBn: 'মহা নবমী (Maha Nabami)',
      nameEn: 'Maha Nabami',
      dateStr: data.nabami,
      tithiBn: 'শুক্লা নবমী তিথি',
      timeSlotBn: 'দুপুরে নবমী হোম • সন্ধ্যায় ধুনুচি নাচ',
      descriptionBn: 'মহিষাসুরমর্দিনীর চূড়ান্ত বিজয়। পবিত্র নবমী যজ্ঞের আগুন আর সন্ধ্যায় কাঁসর-ঘণ্টার উন্মাতাল ছন্দে ধুনুচি নাচ। উৎসবের আনন্দে বিষাদের মৃদু সুর।',
      descriptionEn: 'Celebration of Mother Durga’s victory over Mahishasura. Sacrificial Maha Homa and electrifying Dhunuchi Naach at evening aarti.',
      significance: 'নবমী যজ্ঞ ও ধুনুচি নাচের উল্লাস',
      icon: '🔥',
      rituals: [
        'নবমী হোম ও পূর্ণাহুতি নিবেদন',
        'ভোগ নিবেদন (খিচুড়ি, লাবড়া, চাটনি ও পায়েস)',
        'সন্ধ্যায় ঢাকের বাদ্যে জমজমাট ধুনুচি নাচ প্রতিযোগিতা',
      ],
      mantraBn: 'মহিষঘ্নি মহামায়ে চামুণ্ডে মুণ্ডমালিনী। আয়ুরারোগ্যবিজয়ং দেহি দেবি নমোঽস্তু তে॥',
    },
    {
      nameBn: 'বিজয়া দশমী (Bijoya Dashami)',
      nameEn: 'Bijoya Dashami',
      dateStr: data.dashami,
      tithiBn: 'শুক্লা দশমী তিথি',
      timeSlotBn: 'সকালে অপরাজিতা পূজা • বিকেলে বিসর্জন',
      descriptionBn: 'মাকে বিদায় জানানোর ক্ষণ। বিবাহিত নারীদের সিঁদুর খেলা, দেবীর বরণ, মিষ্টিমুখ। গঙ্গায় প্রতিমা বিসর্জনের সাথে সাথেই ধ্বনিত হয় "আসছে বছর আবার হবে!"। শুভ বিজয়ার আন্তরিক কোলাকুলি ও আশীর্বাদ।',
      descriptionEn: 'Tearful farewell to Mother Durga. Sindoor Khela, idol immersion in sacred rivers, and exchanging Shubho Bijoya greetings with sweet treats.',
      significance: 'সিঁদুর খেলা ও আসছে বছর আবার হবে',
      icon: '🕊️',
      rituals: [
        'দর্পণ বিসর্জন ও অপরাজিতা পূজা',
        'পান পাতা ও মিষ্টি দিয়ে দেবীর বরণ ও সিঁদুর খেলা',
        'গঙ্গায় দেবীর নিরঞ্জন ও শুভ বিজয়ার কোলাকুলি',
      ],
      mantraBn: 'বিজয়া সর্বসিদ্ধিদা সর্বকামপ্রদা দেবী। প্রসীদ দেবি শরণে সর্বলোকেশ্বরী শিবে॥',
    },
  ];

  let activeYear = currentYear;
  let events = buildEventsForYear(activeYear, yearData);

  // Check if all events for this year have already passed
  const nowMs = now.getTime();
  const lastEventMs = new Date(events[events.length - 1].dateStr).getTime();
  if (nowMs > lastEventMs) {
    const nextYear = currentYear + 1;
    const nextYearData = PUJA_SCHEDULE_MAP[nextYear] || PUJA_SCHEDULE_MAP[2027] || yearData;
    activeYear = nextYear;
    events = buildEventsForYear(activeYear, nextYearData);
  }

  return { year: activeYear, events };
}

export function calculateCountdown(now = new Date()): CountdownTime {
  const { events } = getUpcomingSchedule(now);
  const nowMs = now.getTime();

  // Find the earliest upcoming event
  let targetEvent = events.find((e) => new Date(e.dateStr).getTime() > nowMs);
  if (!targetEvent) {
    targetEvent = events[0];
  }

  const targetMs = new Date(targetEvent.dateStr).getTime();
  const diff = Math.max(0, targetMs - nowMs);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPassed: diff <= 0,
    targetEventName: targetEvent.nameBn,
  };
}
