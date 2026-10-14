/**
 * Web Audio API Music Box Synthesizer
 * Plays a delicate, soothing music-box chime rendition of Happy Birthday / gentle lullaby.
 * Zero external audio dependencies = 100% reliable on GitHub Pages and offline!
 */

type MusicCallback = (isPlaying: boolean) => void;

class MusicBoxPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private noteIndex: number = 0;
  private listeners: Set<MusicCallback> = new Set();
  private autoStartAttached: boolean = false;

  // Notes in Hz (Cinnamoroll music box scale: sparkling high octaves)
  // Happy Birthday melody in key of C/G
  private melody: { freq: number; duration: number }[] = [
    { freq: 523.25, duration: 0.35 }, // C5
    { freq: 523.25, duration: 0.25 }, // C5
    { freq: 587.33, duration: 0.6 },  // D5
    { freq: 523.25, duration: 0.6 },  // C5
    { freq: 698.46, duration: 0.6 },  // F5
    { freq: 659.25, duration: 1.0 },  // E5
    { freq: 0, duration: 0.3 },       // rest

    { freq: 523.25, duration: 0.35 }, // C5
    { freq: 523.25, duration: 0.25 }, // C5
    { freq: 587.33, duration: 0.6 },  // D5
    { freq: 523.25, duration: 0.6 },  // C5
    { freq: 783.99, duration: 0.6 },  // G5
    { freq: 698.46, duration: 1.0 },  // F5
    { freq: 0, duration: 0.3 },       // rest

    { freq: 523.25, duration: 0.35 }, // C5
    { freq: 523.25, duration: 0.25 }, // C5
    { freq: 1046.50, duration: 0.6 }, // C6
    { freq: 880.00, duration: 0.6 },  // A5
    { freq: 698.46, duration: 0.6 },  // F5
    { freq: 659.25, duration: 0.6 },  // E5
    { freq: 587.33, duration: 0.9 },  // D5
    { freq: 0, duration: 0.3 },       // rest

    { freq: 932.33, duration: 0.35 }, // Bb5
    { freq: 932.33, duration: 0.25 }, // Bb5
    { freq: 880.00, duration: 0.6 },  // A5
    { freq: 698.46, duration: 0.6 },  // F5
    { freq: 783.99, duration: 0.6 },  // G5
    { freq: 698.46, duration: 1.3 },  // F5
    { freq: 0, duration: 0.8 },       // rest
  ];

  public subscribe(cb: MusicCallback): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Will be resumed on user gesture
      });
    }

    return this.ctx;
  }

  /**
   * Plays a music box tone with bell harmonics and soft envelope
   */
  private playBellTone(freq: number, duration: number) {
    if (!this.ctx || freq <= 0) return;

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.76, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(duration * 1.5, 0.8));

    overtoneGain.gain.setValueAtTime(0, now);
    overtoneGain.gain.linearRampToValueAtTime(0.06, now + 0.01);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    overtone.connect(overtoneGain);
    overtoneGain.connect(this.ctx.destination);

    osc.start(now);
    overtone.start(now);

    osc.stop(now + 2.0);
    overtone.stop(now + 0.5);
  }

  public start() {
    this.initCtx();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.noteIndex = 0;
    this.scheduleNextNote();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Automatically starts music on load, and attaches an immediate gesture listener
   * so mobile browsers (iOS/Android Safari/Chrome) that block unprompted audio autoplay
   * will start playing on the very first touch/click anywhere on the screen!
   */
  public autoStart() {
    // Attempt immediate start
    this.start();

    // Check if context is suspended due to browser autoplay restrictions
    if (this.ctx && this.ctx.state === 'running') {
      return;
    }

    if (this.autoStartAttached) return;
    this.autoStartAttached = true;

    const resumeAndPlay = () => {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          if (!this.isPlaying) {
            this.start();
          }
        }).catch(() => {});
      } else if (!this.isPlaying) {
        this.start();
      }

      // Cleanup listeners once user has interacted
      ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'].forEach((evt) => {
        window.removeEventListener(evt, resumeAndPlay, true);
      });
      this.autoStartAttached = false;
    };

    ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'].forEach((evt) => {
      window.addEventListener(evt, resumeAndPlay, { capture: true, once: true });
    });
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying) return;

    const currentNote = this.melody[this.noteIndex];
    if (currentNote.freq > 0) {
      this.playBellTone(currentNote.freq, currentNote.duration);
    }

    const delayMs = currentNote.duration * 1000;
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;

    this.timerId = window.setTimeout(this.scheduleNextNote, delayMs);
  };

  /**
   * Sound effect for blowing out candles
   */
  public playCandleBlowChime() {
    this.initCtx();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, i) => {
      window.setTimeout(() => {
        this.playBellTone(freq, 0.8);
      }, i * 90);
    });
  }

  /**
   * Sound effect for releasing a lantern
   */
  public playLanternSound() {
    this.initCtx();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      window.setTimeout(() => {
        this.playBellTone(freq, 0.7);
      }, i * 110);
    });
  }
}

export const musicBox = new MusicBoxPlayer();
