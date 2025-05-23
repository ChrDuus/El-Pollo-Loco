  // import soundManager from './soundManager.class.js'

class Character extends MovableObject {
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURTING = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  speed = 4.5;
  // soundManager = new SoundManager()
  walkingSound = window.soundManager.load('walking', 'audio/pepe_runing.mp3')
  hitSound = window.soundManager.load('hit','audio/hit.mp3')
  jumpSound = window.soundManager.load('jump','audio/jump.mp3')
  

  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURTING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);   
    this.applyGravity();
    this.animate();
  }

  /**
    animate the images and movement of the character.
   */
  animate() {
    setInterval(() => {
      this.animateMovement();
    }, 1000 / 60);

    setInterval(() => {
      this.animateImages();
    }, 120);
  }

  /**
    animate the images of the character.
   */
  animateImages() {    
    if (this.isDead()) {
      this.characterDies();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURTING);
      window.soundManager.playSoundEffect('hit', 0.65)
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
     window.soundManager.playSoundEffect('jump', 0.65)
    } else if (this.world.keyboard.D || this.world.keyboard.A) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_IDLE);
    }else{
      this.playAnimation(this.IMAGES_IDLE)
    }
  }

  animateMovement() {
  const movingRight = this.world.keyboard.D && this.x < this.world.level.level_end_x;
  const movingLeft = this.world.keyboard.A && this.x > 0;

  if (movingRight) {
    this.characterWalkesRight();
  }

  if (movingLeft) {
    this.characterWalkesLeft();
  }

  if (!movingLeft && !movingRight) {
    this.stopWalkingSound(); 
  }

  if (this.world.keyboard.SPACE && !this.isAboveGround()) {
    this.jump();
  }

  this.world.camera_X = -this.x + 100;
}


  /**
   let the character walk right.
   */
  characterWalkesRight() {
  this.moveRight();
  this.otherDirection = false;
  window.soundManager.playLoop('walking', 0.65);
}

characterWalkesLeft() {
  this.moveLeft();
  this.otherDirection = true;
  window.soundManager.playLoop('walking', 0.65);
}
/**
   let the character die and end the game.
   */
  characterDies() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      document.getElementById("canvas").classList.add("d-none");
      document.getElementById("startScreen").classList.add("d-none");
      document.getElementById("youLostScreen").classList.remove("d-none");
    }, 800);
  }

  jump() {
    this.speedY = 30;
  }

  stopWalkingSound() {
  window.soundManager.stopLoop('walking')

}
}
