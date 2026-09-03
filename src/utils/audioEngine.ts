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
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
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

  public async resume(): Promise<void> {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }

  private getMasterNode(): AudioNode {
    const ctx = this.getContext();
    if (!this.masterGain || !this.compressor) {
      // Dynamic compressor for punchy, distortion-free drum transients
      this.compressor = ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, ctx.currentTime);
      this.compressor.knee.setValueAtTime(8, ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4.5, ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, ctx.currentTime);
      this.compressor.release.setValueAtTime(0.12, ctx.currentTime);

      // Boosted master gain for high audibility across all mobile & laptop speakers
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.7, ctx.currentTime);

      this.compressor.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);
    }
    return this.compressor;
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
   * 1. Stick impact transient slap (~220Hz down to ~120Hz)
   * 2. Deep wooden barrel cavity resonance (~140Hz fundamental + 220Hz body tone)
   * 3. Warm saturation & punch optimized for both laptop and mobile speakers
   */
  public playDhaakDum(timeOffset = 0, volume = 1.0) {
    try {
      const ctx = this.getContext();
      const master = this.getMasterNode();
      const now = ctx.currentTime + timeOffset;

      // 1. Drum body fundamental (160Hz -> 105Hz, perfectly audible on small speakers)
      const oscLow = ctx.createOscillator();
      const gainLow = ctx.createGain();
      oscLow.type = 'triangle';
      oscLow.frequency.setValueAtTime(180, now);
      oscLow.frequency.exponentialRampToValueAtTime(115, now + 0.08);
      oscLow.frequency.exponentialRampToValueAtTime(88, now + 0.42);

      gainLow.gain.setValueAtTime(volume * 1.1, now);
      gainLow.gain.exponentialRampToValueAtTime(volume * 0.75, now + 0.12);
      gainLow.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      // Lowpass filter for deep wooden thump
      const filterLow = ctx.createBiquadFilter();
      filterLow.type = 'lowpass';
      filterLow.frequency.setValueAtTime(480, now);
      filterLow.frequency.exponentialRampToValueAtTime(220, now + 0.25);

      oscLow.connect(filterLow);
      filterLow.connect(gainLow);
      gainLow.connect(master);

      oscLow.start(now);
      oscLow.stop(now + 0.48);

      // 2. Leather skin slap impact (transient snap)
      const slapOsc = ctx.createOscillator();
      const slapGain = ctx.createGain();
      slapOsc.type = 'sawtooth';
      slapOsc.frequency.setValueAtTime(360, now);
      slapOsc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

      slapGain.gain.setValueAtTime(volume * 0.8, now);
      slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      slapOsc.connect(slapGain);
      slapGain.connect(master);

      slapOsc.start(now);
      slapOsc.stop(now + 0.08);
    } catch {
      // AudioContext blocked
    }
  }

  /**
   * Authentic "Taak" (ঢাকের কাঠির তীক্ষ্ণ বোল):
   * Hard cane stick striking the taut rim head.
   * Sharp attack transient at 1800Hz + crisp resonant ping.
   */
  public playDhaakTaak(timeOffset = 0, volume = 0.9, pitchFactor = 1.0) {
    try {
      const ctx = this.getContext();
      const master = this.getMasterNode();
      const now = ctx.currentTime + timeOffset;

      // 1. Resonant stick membrane slap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(940 * pitchFactor, now);
      osc.frequency.exponentialRampToValueAtTime(420 * pitchFactor, now + 0.04);

      gain.gain.setValueAtTime(volume * 0.85, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      // 2. Crisp wooden crack (filtered noise transient)
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.007));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandFilter = ctx.createBiquadFilter();
      bandFilter.type = 'bandpass';
      bandFilter.frequency.setValueAtTime(1950 * pitchFactor, now);
      bandFilter.Q.setValueAtTime(4.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(volume * 0.95, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

      noise.connect(bandFilter);
      bandFilter.connect(noiseGain);
      noiseGain.connect(master);

      osc.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 0.1);
      noise.start(now);
      noise.stop(now + 0.06);
    } catch {
      // AudioContext blocked
    }
  }

  /**
   * Fast ghost stick tap / roll ("Keta" / "কড়তা")
   */
  public playDhaakKeta(timeOffset = 0, volume = 0.55) {
    this.playDhaakTaak(timeOffset, volume, 1.15);
  }

  /**
   * Authentic Kashor (কাঁসর ঘণ্টা):
   * Pure brass bronze gong with clear ringing overtones:
   * Fundamental ~1120Hz, 1720Hz, 2450Hz, 3360Hz with shimmering decay.
   */
  public playKashor(timeOffset = 0, volume = 0.5) {
    try {
      const ctx = this.getContext();
      const master = this.getMasterNode();
      const now = ctx.currentTime + timeOffset;

      const harmonics = [
        { freq: 1120, g: volume * 1.1 },
        { freq: 1720, g: volume * 0.7 },
        { freq: 2450, g: volume * 0.4 },
        { freq: 3360, g: volume * 0.22 },
      ];

      harmonics.forEach(({ freq, g }, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(g, now);
        // Realistic bronze ring decay
        const decay = 0.85 + idx * 0.1;
        gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        osc.connect(gain);
        gain.connect(master);

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
  public playShankha(durationSeconds = 3.5, volume = 0.85) {
    try {
      const ctx = this.getContext();
      const master = this.getMasterNode();
      const now = ctx.currentTime;

      // Conch fundamental ~380Hz, overtones at 760Hz, 1140Hz, 1520Hz
      const harmonics = [
        { freq: 380, gainVal: volume },
        { freq: 760, gainVal: volume * 0.7 },
        { freq: 1140, gainVal: volume * 0.4 },
        { freq: 1520, gainVal: volume * 0.2 },
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
        gain.connect(master);

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
    this.resume();
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
          this.playDhaakTaak(0, 0.95);
          this.playKashor(0, 0.45);
        } else if (beat === 2) {
          this.playDhaakTaak(0, 0.8);
        } else if (beat === 4) {
          this.playDhaakDum(0, 1.1);
          this.playKashor(0, 0.4);
        } else if (beat === 6) {
          this.playDhaakDum(0, 1.0);
        } else if (beat === 8) {
          this.playDhaakTaak(0, 1.0);
          this.playKashor(0, 0.45);
        } else if (beat === 9) {
          this.playDhaakKeta(0, 0.6);
        } else if (beat === 10) {
          this.playDhaakDum(0, 1.05);
        } else if (beat === 12) {
          this.playDhaakDum(0, 1.15);
          this.playKashor(0, 0.45);
        } else if (beat === 14) {
          this.playDhaakTaak(0, 0.85);
        } else if (beat === 15) {
          this.playDhaakKeta(0, 0.6);
        }
      } else if (this.currentPattern === 'agomoni') {
        // Slow majestic Bodhon entrance:
        if (beat === 0) {
          this.playDhaakDum(0, 1.15);
          this.playKashor(0, 0.45);
        } else if (beat === 4) {
          this.playDhaakTaak(0, 0.85);
        } else if (beat === 8) {
          this.playDhaakDum(0, 1.05);
          this.playKashor(0, 0.4);
        } else if (beat === 12) {
          this.playDhaakTaak(0, 0.95);
          this.playKashor(0, 0.4);
        } else if (beat === 14) {
          this.playDhaakKeta(0, 0.6);
        }
      } else {
        // Bisarjan high speed procession:
        if (beat % 4 === 0) {
          this.playDhaakDum(0, 1.1);
          this.playKashor(0, 0.4);
        } else if (beat % 2 === 0) {
          this.playDhaakTaak(0, 0.85);
        } else if (beat === 3 || beat === 7 || beat === 11 || beat === 15) {
          this.playDhaakKeta(0, 0.55);
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
