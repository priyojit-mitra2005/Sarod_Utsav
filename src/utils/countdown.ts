export interface PujaEvent {
  nameBn: string;
  nameEn: string;
  dateStr: string;
  endDateStr?: string;
  dateDisplayBn: string;
  dateDisplayEn: string;
  tithiBn: string;
  tithiTimingBn: string;
  timeSlotBn: string;
  descriptionBn: string;
  descriptionEn: string;
  significance: string;
  icon: string;
  rituals: string[];
  bhogPrasadBn?: string;
  mythologicalStoryBn?: string;
  mantraBn?: string;
  mantraMeaningBn?: string;
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
    saptami: '2026-10-17T00:00:00', // 17th & 18th October
    ashtami: '2026-10-19T00:00:00', // 19th October
    nabami: '2026-10-20T00:00:00',  // 20th October
    dashami: '2026-10-21T00:00:00', // 21st October
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
      dateDisplayBn: '১০ অক্টোবর (শনিবার)',
      dateDisplayEn: '10th October (Saturday)',
      tithiBn: 'সর্বপিতৃ অমাবস্যা তিথি (দেবীপক্ষ সূচনা)',
      tithiTimingBn: 'কাকভোর থেকে অমাবস্যা তিথি ব্যাপ্ত • পবিত্র তর্পণ কাল সূর্যোদয় থেকে মধ্যাহ্ন',
      timeSlotBn: 'ভোর ৪:০০ টে চণ্ডীপাঠ ও গঙ্গাবক্ষে তর্পণ',
      descriptionBn: 'দেবীপক্ষের শুভ সূচনা ও পিতৃপক্ষের অবসান। কাকভোরে বীরেন্দ্রকৃষ্ণ ভদ্রের জাদুকরী কণ্ঠে মহিষাসুরমর্দিনী চণ্ডীপাঠ ও গঙ্গাবক্ষে পূর্বপুরুষদের তর্পণ নিবেদন। কুমারটুলিতে মৃন্ময়ী মূর্তিতে চক্ষুদান।',
      descriptionEn: 'Dawn of Devipaksha. The iconic 4 AM radio broadcast of Birendra Krishna Bhadra, sacred Tarpan rituals on the Ganges, and Chokkhudan in Kumartuli.',
      significance: 'পিতৃপুরুষের তর্পণ ও দেবী আবাহন',
      icon: '🌅',
      rituals: [
        'ভোর ৪টায় বীরেন্দ্রকৃষ্ণ ভদ্রের আকাশবাণী চণ্ডীপাঠ ও শঙ্খধ্বনি শ্রবণ',
        'গঙ্গাতীরে বা পবিত্র জলাশয়ে তিল-জল সহযোগে পূর্বপুরুষদের তর্পণ',
        'কুমোরটুলিতে দেবীর মৃন্ময়ী মূর্তিতে শিল্পীর চক্ষুদান পর্ব সমাপন',
        'দেবীপক্ষের আগমনীতে ঘরে ঘরে শাঁখ ও উলুধ্বনি',
      ],
      bhogPrasadBn: 'তিল, যব, কুশ, ফলমূল, কাঁচা বাতাসা ও গঙ্গাজল সহযোগে পিতৃপুরুষের উদ্দেশ্যে পবিত্র তর্পণ ভোগ ও নৈবেদ্য।',
      mythologicalStoryBn: 'শ্রী রামচন্দ্র লঙ্কা জয়ের নিমিত্তে শরৎকালে দেবী দুর্গার অকালবোধন করেছিলেন এবং পিতৃপক্ষের অবসানে অমাবস্যা তিথিতে দেবীর আবাহন ও তর্পণ সূচিত হয়েছিল। এই দিনে স্বর্গ ও মর্ত্যের দূরত্ব ঘুচে যায়।',
      mantraBn: 'ওঁ যশোদাগর্ভসম্ভূতে নারায়ণবরপ্রিয়ে। নন্দগোপকুলে জাতে মঙ্গলে কুলবর্ধিনি॥',
      mantraMeaningBn: 'হে দেবী, তুমি যশোদার গর্ভে সম্ভূতা, নারায়ণের পরম প্রেয়সী, নন্দগোপের বংশে অবতীর্ণা এবং ত্রিভুবনের পরম মঙ্গলবিধায়িনী; তোমাকে প্রণাম জানাই।',
    },
    {
      nameBn: 'মহা পঞ্চমী (Maha Panchami)',
      nameEn: 'Maha Panchami',
      dateStr: data.panchami,
      dateDisplayBn: '১৫ অক্টোবর (বৃহস্পতিবার)',
      dateDisplayEn: '15th October (Thursday)',
      tithiBn: 'শুক্লা পঞ্চমী তিথি',
      tithiTimingBn: '১৫ অক্টোবর অপরাহ্ন থেকে পঞ্চমী তিথি আরম্ভ • আলোকোজ্জ্বল সান্ধ্য উৎসব',
      timeSlotBn: 'সন্ধ্যা আরতি ও মণ্ডপ উদ্বোধন',
      descriptionBn: 'শারদোৎসবের আনন্দমুখর সূচনা। দূর-দূরান্ত থেকে দর্শনার্থীদের মণ্ডপ পরিক্রমা শুরু, আলো ঝলমলে কলকাতা ও বিশ্বজুড়ে বাঙালির উৎসবের আমেজ। বোধনের রূপরেখা সম্পন্ন।',
      descriptionEn: 'The festive countdown culminates as pandal hoppers flock to admire divine idols and artistic pandal architecture across Bengal and the world.',
      significance: 'মণ্ডপ উদ্বোধন ও আলোক উৎসব',
      icon: '✨',
      rituals: [
        'ঐতিহ্যবাহী বারোয়ারি ও বনেদি বাড়ির মণ্ডপ উদ্বোধন',
        'বোধন ও ঘট স্থাপনের পূর্বপ্রস্তুতি ও অঙ্গরাগ সম্পন্ন',
        'ঢাকের কাঠি, কাঁসরের ছন্দ ও সান্ধ্য আরতির সূচনা',
        'বন্ধুবান্ধব ও পরিবারের সাথে মণ্ডপ পরিক্রমা আরম্ভ',
      ],
      bhogPrasadBn: 'মিষ্টি, নারকেল নাড়ু, সুজির হালুয়া, ক্ষীর ও পঞ্চফল সমন্বিত দেবীর প্রাথমিক সান্ধ্য নৈবেদ্য।',
      mythologicalStoryBn: 'কৈলাশ পর্বত থেকে চার সন্তান—লক্ষ্মী, সরস্বতী, কার্তিক ও গণেশকে সঙ্গে নিয়ে মা দুর্গা মর্ত্যের বাপের বাড়ির উদ্দেশ্যে রওয়ানা হন। মর্ত্যলোক আনন্দের বন্যায় প্লাবিত হয়।',
      mantraBn: 'ওঁ সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে। শরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥',
      mantraMeaningBn: 'হে সর্বমঙ্গলদায়িনী, পরম কল্যাণময়ী, সকল পুরুষার্থ সাধনকারিণী, শরণাগতের রক্ষয়িত্রী ত্রিনয়নী দেবী গৌরী নারায়ণি, তোমাকে কোটি প্রণাম।',
    },
    {
      nameBn: 'মহা ষষ্ঠী (Maha Sasthi)',
      nameEn: 'Maha Sasthi',
      dateStr: data.sasthi,
      dateDisplayBn: '১৬ অক্টোবর (শুক্রবার)',
      dateDisplayEn: '16th October (Friday)',
      tithiBn: 'শুক্লা ষষ্ঠী তিথি',
      tithiTimingBn: '১৬ অক্টোবর সায়ংকালে শুভ কল্পারম্ভ • বিল্বশাখায় দেবীর আমন্ত্রণ ও অধিবাস',
      timeSlotBn: 'সায়ংকালে দেবীর বোধন ও অধিবাস',
      descriptionBn: 'মায়ের মর্তে পদার্পণ ও বোধন। বেলগাছের (বিল্ববৃক্ষ) নিচে ঘট স্থাপন করে মর্ত্যে দেবীকে সাদর আমন্ত্রণ ও অধিবাস। উলুধ্বনি ও শঙ্খধ্বনিতে মুখরিত চতুর্দিক।',
      descriptionEn: 'Official welcome of Goddess Durga to mortal realm through Kalparambha, Bodhon, and Adhibas under the sacred Bilva tree.',
      significance: 'মায়ের মর্ত্যে বোধন ও অধিবাস',
      icon: '🌺',
      rituals: [
        'বিল্বশাখায় ঘট স্থাপন করে দেবীর আমন্ত্রণ ও বোধন',
        'কল্পারম্ভ ও পূজার প্রধান সংকল্প গ্রহণ',
        'অষ্টাবিংশতি মাঙ্গলিক উপাচারে দেবীর অধিবাস সমাপন',
        'সন্ধ্যায় বোধন আরতি, ঢাকের বোল ও মঙ্গল শঙ্খধ্বনি',
      ],
      bhogPrasadBn: 'কাঁচা ছোলা, আদা কুচি, ফলমূল, বাতাসা, লুচি ও ক্ষীরের মিষ্টির পবিত্র অধিবাস নৈবেদ্য।',
      mythologicalStoryBn: 'রাক্ষসরাজ রাবণ বধের জন্য শ্রী রামচন্দ্র দেবী দুর্গাকে অসময়ে (শরতে) জাগ্রত করেছিলেন। তাই এই পূজাকে বলা হয় ‘অকালবোধন’। ষষ্ঠীর সন্ধ্যায় বেলগাছের ডালে দেবীর নিদ্রাভঙ্গ ঘটে।',
      mantraBn: 'ঐঁ রাবণস্য বধার্থায় রামস্যানুগ্রহায় চ। অকালে বোধিতা দেবী ষষ্ঠ্যাং তত্র প্রপূজয়েৎ॥',
      mantraMeaningBn: 'রাবণ বধ ও রামচন্দ্রের ওপর কৃপা বর্ষণের নিমিত্তে শরৎকালে অকালে যে দেবী জাগ্রত হয়েছিলেন, সেই ষষ্ঠী তিথিতে দেবীকে সশ্রদ্ধ প্রণাম জানাই।',
    },
    {
      nameBn: 'মহা সপ্তমী (Maha Saptami)',
      nameEn: 'Maha Saptami',
      dateStr: data.saptami,
      endDateStr: '2026-10-18T23:59:59',
      dateDisplayBn: '১৭ ও ১৮ অক্টোবর (শনিবার ও রবিবার)',
      dateDisplayEn: '17th & 18th October (Saturday & Sunday)',
      tithiBn: 'শুক্লা সপ্তমী তিথি (দুই দিনব্যাপী বিস্তার)',
      tithiTimingBn: '১৭ অক্টোবর শনিবার সূর্যোদয়ে নবপত্রিকা স্নান ও বিহিত পূজা • ১৮ অক্টোবর রবিবার সপ্তমী তিথির বিশেষ বিস্তার ও অর্চনা সমাপন',
      timeSlotBn: 'ভোরবেলায় নবপত্রিকা স্নান • মধ্যাহ্নে সপ্তমী বিহিত পূজা',
      descriptionBn: 'ভোরের আলো ফুটতেই গঙ্গাতীরে নবপত্রিকা বা "কলাবউ" স্নান। নয়টি পবিত্র উদ্ভিদের সমাহারে প্রকৃতির রূপিনী দেবী দুর্গার প্রাণপ্রতিষ্ঠা ও মূল পূজা আরম্ভ। এ বছর সপ্তমী তিথির মাহাত্ম্য ১৭ ও ১৮ অক্টোবর দুই দিন ধরে উদযাপিত।',
      descriptionEn: 'Dawn bath of Nabapatrika (Kola Bou) symbolizing Mother Nature through nine sacred leaves, followed by Prana Pratishtha. Celebrated across 17th & 18th October this year.',
      significance: 'নবপত্রিকা স্নান, চক্ষুদান ও প্রাণপ্রতিষ্ঠা',
      icon: '🌿',
      rituals: [
        'ভোরের সূর্যোদয়ে ঢাক-কাঁসর সহযোগে নবপত্রিকা (কলাবউ) গঙ্গাস্নান ও লালপেড়ে শাড়িতে বরণ',
        'দেবীর প্রতিমায় চক্ষুদান ও পবিত্র প্রাণপ্রতিষ্ঠা মন্ত্রোচ্চারণ',
        'মহাসপ্তমী বিহিত পূজা ও সর্বসাধারণের পুষ্পাঞ্জলি নিবেদন',
        'গণেশের ডানপাশে নবপত্রিকাকে স্থাপন করে প্রকৃতি মাতার বন্দনা',
      ],
      bhogPrasadBn: 'গোবিন্দভোগ চালের খিচুড়ি, পাঁচমিশেলি লাবড়া তরকারি, পাঁচ রকমের ভাজা, বেগুনী, টমেটো-খেজুরের মিষ্টি চাটনি ও ক্ষীরের পায়েস।',
      mythologicalStoryBn: 'নবপত্রিকার নয়টি উদ্ভিদ নয়জন অধিষ্ঠাত্রী দেবীর প্রতীক: কলাগাছ (ব্রহ্মাণী), কচু (কালিকা), হলুদ (উমা), জয়ন্তী (কার্তিকী), বেল (শিবা), ডালিম (রক্তদন্তিকা), অশোক (শোকরহিতা), মানকচু (চামুণ্ডা) এবং ধানগাছ (লক্ষ্মী)। প্রকৃতিমাতাকে শস্যশ্যামলা ধরিত্রী রূপে আরাধনা করার এই শাশ্বত লোকায়ত ঐতিহ্য।',
      mantraBn: 'রম্ভা কচ্চী হরিদ্রা চ জয়ন্তী বিল্বদাড়িমৌ। অশোক মানকশ্চৈব ধান্যাদি নবপত্রিকা॥',
      mantraMeaningBn: 'কলা, কচু, হলুদ, জয়ন্তী, বেল, ডালিম, অশোক, মানকচু ও ধান—এই নয়টি উদ্ভিদের সমন্বয়ে দেবী মহামায়া স্বয়ং বিরাজমানা; প্রকৃতি রূপিণী দেবীকে বন্দনা করি।',
    },
    {
      nameBn: 'মহা অষ্টমী (Maha Ashtami)',
      nameEn: 'Maha Ashtami',
      dateStr: data.ashtami,
      dateDisplayBn: '১৯ অক্টোবর (সোমবার)',
      dateDisplayEn: '19th October (Monday)',
      tithiBn: 'মহাষ্টমী ও অষ্টমী-নবমী সন্ধিক্ষণ',
      tithiTimingBn: '১৯ অক্টোবর সোমবার সকালজুড়ে মহাষ্টমীর পুষ্পাঞ্জলি ও কুমারী পূজা • অষ্টমী-নবমী সন্ধিক্ষণে ৪৮ মিনিটের মহা সন্ধিপূজা',
      timeSlotBn: 'সকাল ১০টায় অঞ্জলি • রাতে মহা সন্ধিপূজা',
      descriptionBn: 'শারদোৎসবের সবচেয়ে ভক্তিঘন দিন। সকালে নতুন শাড়ি-পাঞ্জাবিতে ভক্তিভরে সমবেত পুষ্পাঞ্জলি। দুপুরে জীবন্ত মহাশক্তিরূপে কুমারী পূজা এবং অষ্টমী ও নবমীর মিলনক্ষণে ১০৮ পদ্ম ও ১০৮ মাটির প্রদীপে অলৌকিক সন্ধিপূজা।',
      descriptionEn: 'The spiritual zenith of Durga Puja on 19th October: grand community Pushpanjali, Kumari Puja, and the sacred Sandhi Puja with 108 lotus flowers & lamps.',
      significance: '১০৮ প্রদীপে সন্ধিপূজা ও পুষ্পাঞ্জলি',
      icon: '🪔',
      rituals: [
        'নির্জলা উপবাসে সমবেত কণ্ঠে মহাষ্টমীর পুষ্পাঞ্জলি অর্পণ',
        'সর্বমঙ্গলা দেবীজ্ঞানে কুমারী বালিকার পাদপদ্ম পূজা',
        'অষ্টমী ও নবমীর সন্ধিক্ষণে ঠিক ৪৮ মিনিটের মহা সন্ধিপূজা সমাপন',
        '১০৮টি নীলপদ্ম অর্পণ ও ১০৮টি প্রজ্বলিত মাটির প্রদীপে আরতি দর্শন',
      ],
      bhogPrasadBn: 'ঘিয়ে ভাজা লুচি, ছোলার ডাল, পোলাও, ছানার ধোকার ডালনা, চালতার চাটনি, কুলের আচার, বোঁদে ও নলেন গুড়ের রাজভোগ।',
      mythologicalStoryBn: 'অষ্টমী ও নবমীর মিলনক্ষণে দেবী দুর্গা আবির্ভূত হয়ে অসুররাজ চণ্ড ও মুণ্ডকে সংহার করেছিলেন এবং ‘চামুণ্ডা’ নামে খ্যাতি লাভ করেন। শ্রী রামচন্দ্র ১০৮টি নীলপদ্ম দিয়ে এই দিনে দেবী চণ্ডীর আরাধনা করেছিলেন।',
      mantraBn: 'ওঁ জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী। দুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥',
      mantraMeaningBn: 'হে জয়ন্তী, মঙ্গলা, কালী, ভদ্রকালী, কপালিনী, দুর্গা, শিবা, ক্ষমা ও ধাত্রী দেবী, হে স্বাহা ও স্বধারূপিণী—তোমাকে আমার সশ্রদ্ধ নমস্কার জানাই।',
    },
    {
      nameBn: 'মহা নবমী (Maha Nabami)',
      nameEn: 'Maha Nabami',
      dateStr: data.nabami,
      dateDisplayBn: '২০ অক্টোবর (মঙ্গলবার)',
      dateDisplayEn: '20th October (Tuesday)',
      tithiBn: 'শুক্লা নবমী তিথি',
      tithiTimingBn: '২০ অক্টোবর মঙ্গলবার পূর্বাহ্নে নবমী বিহিত পূজা • দ্বিপ্রহরে নবমী মহা হোম ও পূর্ণাহুতি • সায়ংকালে ধুনুচি নৃত্য',
      timeSlotBn: 'দুপুরে নবমী হোম • সন্ধ্যায় ধুনুচি নাচ',
      descriptionBn: 'মহিষাসুরমর্দিনীর চূড়ান্ত বিজয়। পুরোহিতের পবিত্র মন্ত্রোচ্চারণে অনুষ্ঠিত হয় নবমী যজ্ঞ ও পূর্ণাহুতি। সন্ধ্যায় ধুনোর সুবাস ও কাঁসর-ঘণ্টার উন্মাতাল ছন্দে ধুনুচি নাচ। উৎসবের আনন্দে বিদায়ের বিষাদ সুর।',
      descriptionEn: 'Celebration of Mother Durga’s final triumph over Mahishasura on 20th October. Sacrificial Maha Homa and electrifying Dhunuchi Naach at evening aarti.',
      significance: 'নবমী যজ্ঞ ও ধুনুচি নাচের উল্লাস',
      icon: '🔥',
      rituals: [
        'নবমী বিহিত পূজা ও নবমী মহা যজ্ঞে ঘৃতাহুতি ও পূর্ণাহুতি নিবেদন',
        'দর্পণ স্নান ও দেবীকে রাজকীয় ভোগ ও মহাধূপ আরতি প্রদান',
        'ঢাকের কাঠি ও কাঁসরের তালে দুই হাতে ঐতিহ্যবাহী ধুনুচি নাচ প্রতিযোগিতা',
        'বিজয়ার আগের রাতে উৎসবের আলোয় আলোকময় শেষ আনন্দ উল্লাস',
      ],
      bhogPrasadBn: 'বাসন্তী পোলাও, ছানার কালিয়া, পটলের দোলমা, কাশ্মীরি আলুর দম, চাটনি, পাঁপড় ও সুস্বাদু জাফরানি ক্ষীর।',
      mythologicalStoryBn: 'দেবী দুর্গা এই পবিত্র নবমী তিথিতে মহিষাসুরকে শূলবিদ্ধ করে বধ করেন এবং দেবগণ ও মানবকুলকে অসুর অত্যাচার থেকে মুক্ত করেন। তাই এই তিথি অসত্যের ওপর পরম সত্যের বিজয়ের প্রতীক।',
      mantraBn: 'মহিষঘ্নি মহামায়ে চামুণ্ডে মুণ্ডমালিনী। আয়ুরারোগ্যবিজয়ং দেহি দেবি নমোঽস্তু তে॥',
      mantraMeaningBn: 'হে মহিষাসুরমর্দিনী মহামায়া চামুণ্ডা মুণ্ডমালিনী দেবী! আমাদের দীর্ঘায়ু, সুস্থ নীরোগ কায়া ও সকল বাধা-বিঘ্নে বিজয় প্রদান করো, তোমায় প্রণাম।',
    },
    {
      nameBn: 'বিজয়া দশমী (Bijoya Dashami)',
      nameEn: 'Bijoya Dashami',
      dateStr: data.dashami,
      dateDisplayBn: '২১ অক্টোবর (বুধবার)',
      dateDisplayEn: '21st October (Wednesday)',
      tithiBn: 'শুক্লা দশমী তিথি',
      tithiTimingBn: '২১ অক্টোবর বুধবার সকালে দর্পণ বিসর্জন ও অপরাজিতা পূজা • মধ্যাহ্নে দেবী বরণ ও সিঁদুর খেলা • অপরাহ্ন থেকে প্রতিমা নিরঞ্জন',
      timeSlotBn: 'সকালে অপরাজিতা পূজা • দুপুরে সিঁদুর খেলা • বিকেলে বিসর্জন',
      descriptionBn: 'মাকে বিদায় জানানোর ক্ষণ। বিবাহিত নারীদের সিঁদুর খেলা, দেবীর বরণ, মিষ্টিমুখ। গঙ্গায় প্রতিমা বিসর্জনের সাথে সাথেই ধ্বনিত হয় "আসছে বছর আবার হবে!"। শুভ বিজয়ার আন্তরিক কোলাকুলি, আশীর্বাদ ও মিষ্টি বিতরণ।',
      descriptionEn: 'Tearful farewell to Mother Durga on 21st October. Sindoor Khela, idol immersion in sacred rivers, and exchanging Shubho Bijoya greetings with sweets.',
      significance: 'সিঁদুর খেলা ও আসছে বছর আবার হবে',
      icon: '🕊️',
      rituals: [
        'জলের পাত্রে দেবীর প্রতিবিম্ব দর্শন করে দর্পণ বিসর্জন ও অপরাজিতা পূজা',
        'পান পাতা ও মিষ্টি সহযোগে সধবা নারীদের দেবীর বরণ ও সিঁদুর খেলা',
        'গঙ্গার ঘাটে দেবীর ভক্তিপূর্ণ নিরঞ্জন এবং "আসছে বছর আবার হবে" ধ্বনি',
        'শুভ বিজয়ার প্রণাম, শুভেচ্ছা আলিঙ্গন ও নিমকি-নাড়ু সহযোগে মিষ্টিমুখ',
      ],
      bhogPrasadBn: 'পান্তাভাত, কচুর শাক, কুচো নিমকি, নারকেল নাড়ু, তিলের খাজা, বোঁদে, ক্ষীরকদম ও ঐতিহ্যবাহী ইলিশ মাছের ভোগ।',
      mythologicalStoryBn: 'মর্ত্যধামে চার দিনের আনন্দযজ্ঞ সমাপন করে মা দুর্গা পুনরায় স্বামী মহাদেবের আলয় কৈলাশে ফিরে যান। রাবণের বিরুদ্ধে চূড়ান্ত বিজয়ের স্মরণে শ্রী রামচন্দ্র এদিন অপরাজিতা লতা বেঁধে যুদ্ধযাত্রা করেছিলেন।',
      mantraBn: 'বিজয়া সর্বসিদ্ধিদা সর্বকামপ্রদা দেবী। প্রসীদ দেবি শরণে সর্বলোকেশ্বরী শিবে॥',
      mantraMeaningBn: 'হে সর্বকামপ্রদায়িনী বিজয়া দেবী, তুমি প্রসন্ন হও; হে সর্বলোকেশ্বরী শিবের অর্ধাঙ্গিনী মহামায়া, আমরা তোমার চরণে শরণাগত।',
    },
  ];

  let activeYear = currentYear;
  let events = buildEventsForYear(activeYear, yearData);

  // Check if all events for this year have already passed
  const nowMs = now.getTime();
  const lastEventEndMs = events[events.length - 1].endDateStr
    ? new Date(events[events.length - 1].endDateStr!).getTime()
    : new Date(events[events.length - 1].dateStr).getTime() + 24 * 60 * 60 * 1000;

  if (nowMs > lastEventEndMs) {
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

  // Find the earliest upcoming event or currently active event
  let targetEvent = events.find((e) => {
    const eventTime = new Date(e.dateStr).getTime();
    return eventTime > nowMs;
  });

  if (!targetEvent) {
    // If within puja or after all, check if currently happening
    const activeEvent = events.find((e) => {
      const startTime = new Date(e.dateStr).getTime();
      const endTime = e.endDateStr
        ? new Date(e.endDateStr).getTime()
        : startTime + 24 * 60 * 60 * 1000;
      return nowMs >= startTime && nowMs <= endTime;
    });

    if (activeEvent) {
      targetEvent = activeEvent;
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPassed: false,
        targetEventName: `${targetEvent.nameBn} (আজ চলছে!)`,
      };
    }

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
