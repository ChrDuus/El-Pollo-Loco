class SoundManager {
  constructor() {
    this.sounds = {}; 
  }

 
  load(name, src) {
    const audio = new Audio(src);
    this.sounds[name] = audio;
  }

  
  play(name) {
    const audio = this.sounds[name];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

 
  muteAll() {
    for (let name in this.sounds) {
      const audio = this.sounds[name];
      audio.pause();
      audio.currentTime = 0;
    }
  }
}
