/**
 * Manages game audio including sound effects and loops with global mute, volume, and cooldown controls.
 */
class SoundManager {
    /** @type {boolean} Whether all sounds are muted */
    muted = false;

    allowAudio = false

    /**
     * Creates a new SoundManager instance.
     */
    constructor() {
        /** @type {boolean} Enforces muting strictly */
        this.strictMode = true;

        /** @type {Object.<string, HTMLAudioElement>} Stores loaded sounds by name */
        this.sounds = {};

        /** @type {number} Global volume multiplier (0.0 to 1.0) */
        this.globalVolume = 1;

        /** @type {Set<HTMLAudioElement>} Currently playing one-shot sounds */
        this.activeSounds = new Set();

        /** @type {Set<HTMLAudioElement>} Currently playing looped sounds */
        this.activeLoops = new Set();

        /** @type {Map<string, number>} Cooldown map for sound effects */
        this.soundCooldowns = new Map();

        /** @type {number} Cooldown time in milliseconds between repeated sound effects */
        this.cooldownTime = 500;
    }

    /**
     * Loads a sound and stores it under a given name.
     * @param {string} name - Name to reference the sound
     * @param {string} src - Path to the sound file
     */
     load(name, src) {
        const audio = new Audio(src);
        this.sounds[name] = audio;
    }

    /**
     * Plays a looping sound if not muted.
     * @param {string} name - Name of the sound
     * @param {number} [requestedVolume=1] - Volume multiplier (0.0 to 1.0)
     */
    playLoop(name, requestedVolume = 1) {
        if (this.muted && this.strictMode) return;
        const audio = this.sounds[name];
        if (!audio) return;
        audio.volume = requestedVolume * this.globalVolume;
        audio.loop = true;
        audio.play()
        .then(() => {
  })
  .catch((error) => {
    console.warn('Sound play failed:', error);
    this.activeSounds.delete(sound); 
  });
        this.activeLoops.add(audio);
    }

    /**
     * Stops a looping sound.
     * @param {string} name - Name of the sound
     */
    stopLoop(name) {
        const audio = this.sounds[name];
        if (audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            audio.loop = false;
        }
    }

    /**
     * Plays a sound effect once with optional cooldown.
     * @param {string} name - Name of the sound
     * @param {number} [requestedVolume=1] - Volume multiplier (0.0 to 1.0)
     */
    playSoundEffect(name, requestedVolume = 1) {
        const now = Date.now();
        const lastPlayed = this.soundCooldowns.get(name) || 0;
        if (now - lastPlayed < this.cooldownTime) return;

        const original = this.sounds[name];
        if (!original) return;

        const sound = new Audio(original.src);
        sound.volume = requestedVolume * this.globalVolume;
        this.activeSounds.add(sound);
        sound.onended = () => this.activeSounds.delete(sound);
        sound.play()
        .then(() => {
  })
  .catch((error) => {
    console.warn('Sound play failed:', error);
    this.activeSounds.delete(sound); 
  });

        this.soundCooldowns.set(name, now);
    }

    playSoundEffectNoCooldown(name, requestedVolume = 1) {
    const original = this.sounds[name];
    if (!original) return;

    const sound = new Audio(original.src);
    sound.volume = requestedVolume * this.globalVolume;
    this.activeSounds.add(sound);
    sound.onended = () => this.activeSounds.delete(sound);
    sound.play()
    .then(() => {
  })
  .catch((error) => {
    console.warn('Sound play failed:', error);
    this.activeSounds.delete(sound); 
  });
}

    /**
     * Mutes all sounds by setting global volume to 0.
     */
    muteAll() {
        let volume = localStorage.getItem('volume')
        if(volume == 0){
            this.setGlobalVolume(volume)
        }
    }

    /**
     * Unmutes all sounds by restoring global volume to 1.
     */
    unmuteAll() {
       let volume = localStorage.getItem('volume')
       if(volume == 1){
        this.setGlobalVolume(volume);
       }
    }

    /**
     * Sets the global volume for all currently playing sounds.
     * @param {number} volume - Volume multiplier (0.0 to 1.0)
     */
    setGlobalVolume(volume) {
        this.globalVolume = volume;
        this.activeSounds.forEach(sound => {
            sound.volume = sound.volume * volume;
        });
    }
}

// Globally available sound manager instance
window.soundManager = new SoundManager();
