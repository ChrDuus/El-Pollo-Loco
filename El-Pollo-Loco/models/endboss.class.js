/**
 * Represents the final boss enemy in the game.
 * Handles different animations and states like walking, hurting, and dying.
 */
class Endboss extends MovableObject {
    height = 450;
    width = 400;
    y = 10;
    energy = 110;
    contactWithCharacter = false;
    isWalking = false;
    isDying = false;
    isDead = false;
    isHurt = false;
    


    IMAGES_ANGRY = [
        "./img/4_enemie_boss_chicken/2_alert/G5.png",
        "./img/4_enemie_boss_chicken/2_alert/G6.png",
        "./img/4_enemie_boss_chicken/2_alert/G7.png",
        "./img/4_enemie_boss_chicken/2_alert/G8.png",
        "./img/4_enemie_boss_chicken/2_alert/G9.png",
        "./img/4_enemie_boss_chicken/2_alert/G10.png",
        "./img/4_enemie_boss_chicken/2_alert/G11.png",
        "./img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_WALKING = [
        "./img/4_enemie_boss_chicken/1_walk/G1.png",
        "./img/4_enemie_boss_chicken/1_walk/G2.png",
        "./img/4_enemie_boss_chicken/1_walk/G3.png",
        "./img/4_enemie_boss_chicken/1_walk/G4.png",
        "./img/4_enemie_boss_chicken/3_attack/G13.png",
        "./img/4_enemie_boss_chicken/3_attack/G14.png",
        "./img/4_enemie_boss_chicken/3_attack/G15.png",
        "./img/4_enemie_boss_chicken/3_attack/G16.png",
        "./img/4_enemie_boss_chicken/3_attack/G17.png",
        "./img/4_enemie_boss_chicken/3_attack/G18.png",
        "./img/4_enemie_boss_chicken/3_attack/G19.png",
        "./img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_HURTING = [
        "./img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [        
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Creates a new Endboss instance and loads all required images.
     */
    constructor() {
        super().loadImage("./img/4_enemie_boss_chicken/2_alert/G5.png");
        this.x = 2100;
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.125;
        this.animate();
        
    }

     /**
     * Handles animation for the Endboss, depending on status
     * Reduces energy and plays hurt animation.
     */
    setAnimation(images, fps = 12) {
    if (this.currentAnimation === images) return; 

    this.currentAnimation = images;
    this.currentImage = 0;

    clearInterval(this.animationInterval); 

    this.animationInterval = setInterval(() => {
        this.img = this.imageCache[this.currentAnimation[this.currentImage]];
        this.currentImage = (this.currentImage + 1) % this.currentAnimation.length;
    }, 1000 / fps);
    }

    /**
     * Handles the hurt logic for the Endboss.
     * Reduces energy and plays hurt animation.
     */
    endbossHurt() {
    if (this.isDead || this.isDying || this.isHurt) return;

    this.energy -= 40;
    this.isHurt = true;

    setTimeout(() => {
        this.isHurt = false;
    }, 600);

    if (this.energy <= 0) {
        this.endbossDies();
    }
}


    /**
     * Displays the end screen when the player loses.
     */
    showEndScreen() {
        setTimeout(() => {
            document.getElementById("canvas").classList.add("d-none");
            document.getElementById("endScreen").classList.remove("d-none");
            document.getElementById("inGameSounds").classList.add("d-none");
            document.getElementById("fullscreenBtn").classList.add("d-none");
        }, 1000);
    }

    /**
     * Activates the Endboss so it starts walking.
     */
    letEndbossWalk() {
        this.contactWithCharacter = true;
        this.endbossMoveLeft();
    }

    /**
     * Handles the death animation and shows win screen after delay.
     */
    endbossDies() {
        
    if (this.isDead || this.isDying) return;
    window.soundManager.playSoundEffectNoCooldown('endbossHit', 0.75)
    this.isDying = true; 
    
      
      
    setTimeout(() => {
        this.isDying = false;
        this.isDead = true;
        clearInterval(this.animationInterval);
        document.getElementById("canvas").classList.add("d-none");
        document.getElementById("startScreen").classList.add("d-none");
        document.getElementById("endScreenWon").classList.remove("d-none");
        document.getElementById("inGameSounds").classList.add("d-none");        
        document.getElementById("fullscreenBtn").classList.add("d-none");
    }, 1500);
}



    /**
     * Continuously moves the Endboss to the left.
     */
    endbossMoveLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Animates the Endboss depending on its state.
     */
 animate() {
    const animationLoop = () => {
        if (this.isDead) return;

        if (this.isDying) {
            this.setAnimation(this.IMAGES_DEAD, 10);
        } else if (this.isHurt) {
            this.setAnimation(this.IMAGES_HURTING, 10);
        } else if (this.contactWithCharacter) {
            this.setAnimation(this.IMAGES_WALKING, 8);
        } else {
            this.setAnimation(this.IMAGES_ANGRY, 6);
        }

        requestAnimationFrame(animationLoop);
    };

    animationLoop(); // Start once
}






/**
 * Clears all active intervals from the browser.
 */
clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        clearInterval(i);
    }
}

}