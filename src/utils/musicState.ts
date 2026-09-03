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
    id: '2',
    titleBn: 'বাজলো তোমার আলোর বেণু',
    titleEn: 'Bajlo Tomar Alor Benu',
    artist: 'সুপ্রীতি ঘোষ (Supriti Ghosh)',
    durationEst: '3:30',
    youtubeId: MASTER_BROADCAST_YT_ID,
    startSeconds: 742, // 12:22 in master recording
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
    youtubeId: MASTER_BROADCAST_YT_ID,
    startSeconds: 3500, // 58:20 in master recording
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
    youtubeId: MASTER_BROADCAST_YT_ID,
    startSeconds: 255, // 4:15 in master recording
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
    youtubeId: MASTER_BROADCAST_YT_ID,
    startSeconds: 1275, // 21:15 in master recording
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
    youtubeId: MASTER_BROADCAST_YT_ID,
    startSeconds: 2095, // 34:55 in master recording
    descriptionBn: 'আকাশবাণীর সুরারোপিত দেবীর অলৌকিক মহিমার গান।',
    shlokaBn: 'তব অচিন্ত্য রূপচরিত মহিমা, নব আলোকে উদ্ভাসিত ধরণী...',
    tag: 'মহিমা গীতি',
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
   * Seeks right to the track's start position in the verified master broadcast.
   */
  public selectTrack(index: number) {
    const isSameTrack = index === this.currentTrackIndex;
    this.currentTrackIndex = (index + PLAYLIST_TRACKS.length) % PLAYLIST_TRACKS.length;
    const track = PLAYLIST_TRACKS[this.currentTrackIndex];

    this.progress = track.startSeconds;
    this.isPlaying = true;
    this.notify();

    if (this.ytPlayer) {
      try {
        if (typeof this.ytPlayer.seekTo === 'function') {
          this.ytPlayer.seekTo(track.startSeconds, true);
        }
        if (typeof this.ytPlayer.playVideo === 'function') {
          this.ytPlayer.playVideo();
        }
      } catch (err) {
        console.warn('Playback error', err);
      }
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
