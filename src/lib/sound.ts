// Web Audio API synthesizer for MicioCode sounds
class SoundEngine {
  private ctx: AudioContext | null = null;
  private volume: number = 0.8;
  private defaultHz: number = 1000;
  private audioBuffers: Map<string, AudioBuffer> = new Map();

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol / 100));
  }

  public changeVolumeBy(delta: number) {
    this.setVolume((this.volume * 100) + delta);
  }

  public setHz(hz: number) {
    this.defaultHz = Math.max(20, Math.min(20000, hz));
  }

  public stopAllSounds() {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  private async loadAudioBuffer(soundName: string): Promise<AudioBuffer | null> {
    if (this.audioBuffers.has(soundName)) {
      return this.audioBuffers.get(soundName) || null;
    }
    
    try {
      const response = await fetch(`/sounds/${soundName}`);
      const arrayBuffer = await response.arrayBuffer();
      const ctx = this.initCtx();
      if (!ctx) return null;
      
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      this.audioBuffers.set(soundName, audioBuffer);
      return audioBuffer;
    } catch (e) {
      console.error(`Error loading sound ${soundName}:`, e);
      return null;
    }
  }

  public async playSound(soundName: string, startOffsetSec: number = 0, customHz?: number) {
    const ctx = this.initCtx();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Try to load as a file first if not a known synth sound
    const synthSounds = ['miao', 'pop', 'laser', 'salto', 'vittoria', 'esplosione', 'angry bird', 'maiale oink'];
    if (!synthSounds.includes(soundName.toLowerCase())) {
        const buffer = await this.loadAudioBuffer(soundName);
        if (buffer) {
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(masterGain);
            source.start(ctx.currentTime, startOffsetSec);
            return;
        }
    }

    const hz = customHz || this.defaultHz;
    const now = ctx.currentTime;

    switch (soundName.toLowerCase()) {
      case 'miao': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.5);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(this.volume, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.6);
        break;
      }

      case 'pop': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);

        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'laser': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);

        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.26);
        break;
      }

      case 'salto': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.18);

        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.22);
        break;
      }

      case 'vittoria': {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.12);
          gain.gain.setValueAtTime(this.volume, now + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + i * 0.12);
          osc.stop(now + i * 0.12 + 0.35);
        });
        break;
      }

      case 'esplosione': {
        // White noise for explosion
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(60, now + 0.5);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        noise.start(now);
        noise.stop(now + 0.55);
        break;
      }

      case 'angry bird': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.linearRampToValueAtTime(1100, now + 0.15);
        osc.frequency.linearRampToValueAtTime(400, now + 0.3);

        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.36);
        break;
      }

      case 'maiale oink': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.08);
        osc.frequency.linearRampToValueAtTime(140, now + 0.22);

        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.26);
        break;
      }

      default: {
        // Play frequency directly
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(hz, now);

        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }
    }
  }
}

export const soundEngine = new SoundEngine();
