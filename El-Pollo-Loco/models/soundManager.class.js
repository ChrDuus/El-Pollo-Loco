class SoundManager {
  muted = false;

  constructor() {
    this.strictMode = true;
    this.sounds = {};
    this.globalVolume = 1;
    this.activeSounds = new Set();
    this.activeLoops = new Set();   
    this.soundCooldowns = new Map(); 
    this.cooldownTime = 500; 
  }

  load(name, src) {
    const audio = new Audio(src);
    this.sounds[name] = audio;
  }

  playLoop(name, requestedVolume = 1) {
    if (this.muted && this.strictMode) return;
    const audio = this.sounds[name];
    if (!audio) return;
    audio.volume = requestedVolume * this.globalVolume;
    audio.loop = true;
    audio.play();
    this.activeLoops.add(audio);
  }

  stopLoop(name) {
    const audio = this.sounds[name];
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
    }
  }

  playSoundEffect(name, requestedVolume = 1) {
    const now = Date.now();
    const lastPlayed = this.soundCooldowns.get(name) || 0;
    if (now - lastPlayed < this.cooldownTime) return;
    const sound = new Audio(this.sounds[name].src);
    sound.volume = requestedVolume * this.globalVolume;
    this.activeSounds.add(sound);
    sound.onended = () => this.activeSounds.delete(sound);
    sound.play().catch(e => console.error("Sound play failed:", e));
    this.soundCooldowns.set(name, now); 
  }

  muteAll() {
    this.setGlobalVolume(0);
  }

  unmuteAll() {
    this.setGlobalVolume(1);
  }

  setGlobalVolume(volume) {
    this.globalVolume = volume;
    this.activeSounds.forEach(sound => {
      sound.volume = sound.volume * volume;
    });
  }
}

window.soundManager = new SoundManager()
