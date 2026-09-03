/**
 * Authentic Web Audio API percussion synthesizer for Bengali Durga Puja & Mahalaya:
 * - Traditional Dhaak (ঢাক): Deep barrel bass ('Dhum'), high-tension stick strike ('Taak'), and stick roll ('Keta')
 * - Kashor Ghonta (কাঁসর ঘণ্টা): Shimmering bronze gong with natural metallic overtones
 * - Shankha Dhwani (শঙ্খধ্বনি): Sacred conch shell blow with breath swell and overtone harmonics
 * 
 * Works 100% offline with zero external network dependency.
 */

export type DhaakPatternType = 'aarti' | 'agomoni' | 'bisarjan';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isDhakPlaying = false;
  private dhakInterval: number | null = null;
  private currentPattern: DhaakPatternType = 'aarti';
  private listeners: Set<(isPlaying: boolean) => void> = new Set();
  private patternListeners: Set<(pattern: DhaakPatternType) => void> = new Set();

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public subscribeDhakState(callback: (isPlaying: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(this.isDhakPlaying);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public subscribePattern(callback: (pattern: DhaakPatternType) => void): () => void {
    this.patternListeners.add(callback);
    callback(this.currentPattern);
    return () => {
      this.patternListeners.delete(callback);
    };
  }

  private notifyDhakState() {
    this.listeners.forEach((cb) => cb(this.isDhakPlaying));
  }

  private notifyPattern() {
    this.patternListeners.forEach((cb) => cb(this.currentPattern));
  }

  public setPattern(pattern: DhaakPatternType) {
    this.currentPattern = pattern;
    this.notifyPattern();
    if (this.isDhakPlaying) {
      this.stopDhaakRhythm();
      this.startDhaakRhythm();
    }
  }

  public getPattern(): DhaakPatternType {
    return this.currentPattern;
  }

  /**
   * Authentic "Dum / Dha" (ঢাকের গুরুগম্ভীর খাদ বা চামড়ার চাপ):
   * Features:
   * 1. Stick impact transient slap (~180Hz down to ~65Hz in 35ms)
   * 2. Deep wooden barrel cavity resonance (~58Hz fundamental + 116Hz body tone)
   * 3. Warm saturation / exponential envelope decay
   */
  public playDhaakDum(timeOffset = 0, volume = 0.9) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime + timeOffset;

      // 1. Deep drum body fundamental
      const oscLow = ctx.createOscillator();
      const gainLow = ctx.createGain();
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(160, now);
      oscLow.frequency.exponentialRampToValueAtTime(58, now + 0.08);
      oscLow.frequency.exponentialRampToValueAtTime(50, now + 0.45);

      gainLow.gain.setValueAtTime(volume, now);
      gainLow.gain.exponentialRampToValueAtTime(volume * 0.7, now + 0.1);
      gainLow.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      // Lowpass filter for deep, punchy thump
      const filterLow = ctx.createBiquadFilter();
      filterLow.type = 'lowpass';
      filterLow.frequency.setValueAtTime(320, now);
      filterLow.frequency.exponentialRampToValueAtTime(140, now + 0.3);

      oscLow.connect(filterLow);
      filterLow.connect(gainLow);
      gainLow.connect(ctx.destination);

      oscLow.start(now);
      oscLow.stop(now + 0.55);

      // 2. Leather skin slap impact (transient snap)
      const slapOsc = ctx.createOscillator();
      const slapGain = ctx.createGain();
      slapOsc.type = 'triangle';
      slapOsc.frequency.setValueAtTime(280, now);
      slapOsc.frequency.exponentialRampToValueAtTime(90, now + 0.05);

      slapGain.gain.setValueAtTime(volume * 0.6, now);
      slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      slapOsc.connect(slapGain);
      slapGain.connect(ctx.destination);

      slapOsc.start(now);
      slapOsc.stop(now + 0.1);
    } catch {
      // AudioContext blocked
    }
  }

  /**
   * Authentic "Taak" (ঢাকের কাঠির তীক্ষ্ণ বোল):
   * Hard cane stick striking the taut rim head.
   * Sharp attack transient at 1600Hz-2400Hz + resonant membrane ping.
   */
  public playDhaakTaak(timeOffset = 0, volume = 0.7, pitchFactor = 1.0) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime + timeOffset;

      // 1. Resonant stick membrane slap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880 * pitchFactor, now);
      osc.frequency.exponentialRampToValueAtTime(360 * pitchFactor, now + 0.04);

      gain.gain.setValueAtTime(volume * 0.75, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      // 2. Crisp wooden crack (filtered noise transient)
      const bufferSize = ctx.sampleRate * 0.04;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandFilter = ctx.createBiquadFilter();
      bandFilter.type = 'bandpass';
      bandFilter.frequency.setValueAtTime(1750 * pitchFactor, now);
      bandFilter.Q.setValueAtTime(4.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(volume * 0.85, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      noise.connect(bandFilter);
      bandFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
      noise.start(now);
      noise.stop(now + 0.07);
    } catch {
      // AudioContext blocked
    }
  }

  /**
   * Fast ghost stick tap / roll ("Keta" / "কড়তা")
   */
  public playDhaakKeta(timeOffset = 0, volume = 0.45) {
    this.playDhaakTaak(timeOffset, volume, 1.15);
  }

  /**
   * Authentic Kashor (কাঁসর ঘণ্টা):
   * Pure brass bronze gong with clear ringing overtones:
   * Fundamental ~1120Hz, 1720Hz, 2450Hz, 3360Hz with shimmering decay.
   */
  public playKashor(timeOffset = 0, volume = 0.4) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime + timeOffset;

      const harmonics = [
        { freq: 1120, g: volume },
        { freq: 1720, g: volume * 0.6 },
        { freq: 2450, g: volume * 0.35 },
        { freq: 3360, g: volume * 0.18 },
      ];

      harmonics.forEach(({ freq, g }, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(g, now);
        // Realistic bronze ring decay
        const decay = 0.75 + idx * 0.1;
        gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decay + 0.05);
      });
    } catch {
      // AudioContext blocked
    }
  }

  /**
   * Sacred Shankha Dhwani (শঙ্খধ্বনি) - authentic conch shell blow
   */
  public playShankha(durationSeconds = 3.5, volume = 0.7) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Conch fundamental ~380Hz, overtones at 760Hz, 1140Hz, 1520Hz
      const harmonics = [
        { freq: 380, gainVal: volume },
        { freq: 760, gainVal: volume * 0.65 },
        { freq: 1140, gainVal: volume * 0.35 },
        { freq: 1520, gainVal: volume * 0.18 },
      ];

      harmonics.forEach(({ freq, gainVal }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq * 0.94, now);
        osc.frequency.linearRampToValueAtTime(freq, now + 0.45);
        osc.frequency.setValueAtTime(freq, now + durationSeconds - 0.5);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.96, now + durationSeconds);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(gainVal, now + 0.5);
        gain.gain.setValueAtTime(gainVal, now + durationSeconds - 0.7);
        gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

        // Breath flutter LFO
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(4.8, now);
        lfoGain.gain.setValueAtTime(3.8, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + durationSeconds);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + durationSeconds + 0.1);
      });
    } catch {
      // AudioContext blocked
    }
  }

  public toggleDhaakRhythm() {
    if (this.isDhakPlaying) {
      this.stopDhaakRhythm();
    } else {
      this.startDhaakRhythm();
    }
  }

  /**
   * Start authentic live Dhaak groove based on selected pattern:
   * 1. 'aarti': Iconic fast Dhunuchi dance beat (তা ধিং তা ধিং, তাক দুম দুম!)
   * 2. 'agomoni': Majestic slow morning Bodhon entrance beat
   * 3. 'bisarjan': Fast celebratory procession groove
   */
  public startDhaakRhythm() {
    if (this.isDhakPlaying) return;
    this.getContext();
    this.isDhakPlaying = true;
    this.notifyDhakState();

    let step = 0;

    // Tempo configuration:
    // Aarti: ~170 BPM (175ms per 16th tick)
    // Agomoni: ~135 BPM (220ms per tick)
    // Bisarjan: ~190 BPM (155ms per tick)
    let stepDuration = 175;
    if (this.currentPattern === 'agomoni') stepDuration = 225;
    if (this.currentPattern === 'bisarjan') stepDuration = 155;

    const tick = () => {
      if (!this.isDhakPlaying) return;
      const beat = step % 16;

      if (this.currentPattern === 'aarti') {
        // Authentic Dhunuchi Aarti Bol:
        // 0: Taak + Kashor
        // 2: Taak
        // 4: Dum + Kashor
        // 6: Dum
        // 8: Taak + Kashor
        // 9: Keta (stick double bounce)
        // 10: Dum
        // 12: Dum + Kashor
        // 14: Taak
        // 15: Keta
        if (beat === 0) {
          this.playDhaakTaak(0, 0.75);
          this.playKashor(0, 0.35);
        } else if (beat === 2) {
          this.playDhaakTaak(0, 0.6);
        } else if (beat === 4) {
          this.playDhaakDum(0, 0.95);
          this.playKashor(0, 0.3);
        } else if (beat === 6) {
          this.playDhaakDum(0, 0.85);
        } else if (beat === 8) {
          this.playDhaakTaak(0, 0.8);
          this.playKashor(0, 0.35);
        } else if (beat === 9) {
          this.playDhaakKeta(0, 0.4);
        } else if (beat === 10) {
          this.playDhaakDum(0, 0.9);
        } else if (beat === 12) {
          this.playDhaakDum(0, 1.0);
          this.playKashor(0, 0.35);
        } else if (beat === 14) {
          this.playDhaakTaak(0, 0.65);
        } else if (beat === 15) {
          this.playDhaakKeta(0, 0.45);
        }
      } else if (this.currentPattern === 'agomoni') {
        // Slow majestic Bodhon entrance:
        if (beat === 0) {
          this.playDhaakDum(0, 1.0);
          this.playKashor(0, 0.4);
        } else if (beat === 4) {
          this.playDhaakTaak(0, 0.7);
        } else if (beat === 8) {
          this.playDhaakDum(0, 0.9);
          this.playKashor(0, 0.35);
        } else if (beat === 12) {
          this.playDhaakTaak(0, 0.8);
          this.playKashor(0, 0.3);
        } else if (beat === 14) {
          this.playDhaakKeta(0, 0.45);
        }
      } else {
        // Bisarjan high speed procession:
        if (beat % 4 === 0) {
          this.playDhaakDum(0, 0.95);
          this.playKashor(0, 0.3);
        } else if (beat % 2 === 0) {
          this.playDhaakTaak(0, 0.7);
        } else if (beat === 3 || beat === 7 || beat === 11 || beat === 15) {
          this.playDhaakKeta(0, 0.4);
        }
      }

      step++;
    };

    tick();
    this.dhakInterval = window.setInterval(tick, stepDuration);
  }

  public stopDhaakRhythm() {
    if (this.dhakInterval) {
      clearInterval(this.dhakInterval);
      this.dhakInterval = null;
    }
    this.isDhakPlaying = false;
    this.notifyDhakState();
  }

  public getIsDhakPlaying(): boolean {
    return this.isDhakPlaying;
  }
}

export const soundEngine = new AudioEngine();
