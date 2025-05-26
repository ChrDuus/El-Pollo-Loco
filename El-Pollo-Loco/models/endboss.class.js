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
        "./img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./img/4_enemie_boss_chicken/4_hurt/G23.png",
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
     * Handles the hurt logic for the Endboss.
     * Reduces energy and plays hurt animation.
     */
    endbossHurt() {
        if (this.isDead || this.isDying) return;

        this.energy -= 40;
        this.isHurt = true;
        this.playAnimation(this.IMAGES_HURTING);

        setTimeout(() => {
            this.isHurt = false;
        }, 300);
    }

    /**
     * Displays the end screen when the player loses.
     */
    showEndScreen() {
        setTimeout(() => {
            document.getElementById("canvas").classList.add("d-none");
            document.getElementById("endScreen").classList.remove("d-none");
        }, 1000);
    }

    /**
     * Activates the Endboss so it starts walking.
     */
    letEndbossWalk() {
        this.contactWithCharacter = true;
    }

    /**
     * Handles the death animation and shows win screen after delay.
     */
    endbossDies() {
        if (this.isDead || this.isDying) return;

        this.isDying = true;
        this.playAnimation(this.IMAGES_DEAD);

        setTimeout(() => {
            this.isDead = true;
            this.isDying = false;
            document.getElementById("canvas").classList.add("d-none");
            document.getElementById("startScreen").classList.add("d-none");
            document.getElementById("endScreenWon").classList.remove("d-none");
        }, 1200);
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
        setInterval(() => {
            if (this.isDead || this.isDying || this.isHurt) return;

            if (this.contactWithCharacter) {
                this.playAnimation(this.IMAGES_WALKING);

                if (!this.isWalking) {
                    this.isWalking = true;
                    this.endbossMoveLeft();
                }
            } else {
                this.playAnimation(this.IMAGES_ANGRY);
            }
        }, 360);
    }
}

/**
 * Clears all active intervals from the browser.
 */
function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        clearInterval(i);
    }
}
