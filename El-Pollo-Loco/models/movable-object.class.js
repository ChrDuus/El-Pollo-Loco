/**
 * Represents a drawable object that can move, be affected by gravity, and interact with other objects.
 * Extends {@link DrawableObject}.
 */
class MovableObject extends DrawableObject {
    /** @type {number} Horizontal movement speed */
    speed = 0.15;

    /** @type {number} Character-specific movement speed */
    speedCharacter = 0.3;

    /** @type {boolean} Whether the object is facing left */
    otherDirection = false;

    /** @type {number} Vertical movement speed */
    speedY = 0;

    /** @type {number} Gravity acceleration value */
    acceleration = 3.5;

    /** @type {number} Energy/health of the object */
    energy = 100;

    /** @type {number} Timestamp of the last hit */
    lastHit = 0;

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Checks whether this object is colliding with another.
     * @param {MovableObject} mo - The other object
     * @returns {boolean}
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offsetRight >= mo.x + mo.offsetLeft &&
            this.x - this.offsetLeft <= mo.x + mo.width - mo.offsetRight &&
            this.y + this.height - this.offsetBottom >= mo.y + mo.offsetTop &&
            this.y + this.offsetTop <= mo.y + mo.height - mo.offsetBottom
        );
    }

    /**
     * Reduces the object's energy by 1 and updates hit timestamp.
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Sets the object's energy to zero.
     */
    kill() {
        this.energy = 0;
    }

    /**
     * Checks whether the object has been hurt recently.
     * @returns {boolean}
     */
    isHurt() {
        return (new Date().getTime() - this.lastHit) / 1000 < 1;
    }

    /**
     * Checks whether the character has been idle for more than 2 seconds.
     * @returns {boolean}
     */
    isIdle() {
        return new Date().getTime() - this.world.keyboard.lastMove > 2000;
    }

    /**
     * Checks whether the character has been idle for more than 7 seconds.
     * @returns {boolean}
     */
    isLongIdle() {
        return new Date().getTime() - this.world.keyboard.lastMove > 7000;
    }

    /**
     * Checks whether the object is considered dead (energy = 0).
     * @returns {boolean}
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Applies gravity to the object by updating its Y position at intervals. Making sure Character is not going above 180
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }if (this instanceof Character) {
                if(this.y >= 180){
                    this.y = 180                    
                }
            };
            
        }, 1000 / 25);
    }

    /**
     * Determines whether the object is above the ground.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof Character) {
            return this.y < 170 && this.speedY <= 0;
        } else if (this instanceof ThrowableObject) {
            return this.y < 375;
        }
        return false;
    }

    /**
     * Loads a single image for the object.
     * @param {string} path - Path to the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Plays a looping animation from the given image array.
     * @param {string[]} images - Array of image paths
     */
    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }
}
