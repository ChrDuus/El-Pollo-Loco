class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_X = 0;

    statusbarEnergy = new StatusbarEnergy();
    statusbarBottles = new StatusbarBottles();
    statusbarCoins = new StatusbarCoins();
    throwableObjects = [];
    bottle = new Bottle();

    bottleSound = window.soundManager.load('bottle', './audio/bottle.mp3');
    hitChickenSound = window.soundManager.load('chickenHit', './audio/chicken.mp3');
    hitEndbossSound = window.soundManager.load('endbossHit', './audio/endboss_hit.mp3');
    coinSound = window.soundManager.load('coin', './audio/coin.mp3');
    currentlyIngame;
    statusbarBoss = new StatusbarBoss();
    

    /**
     * Creates an instance of the World.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();        
    }

    /**
     * Assigns this world instance to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts interval checks for collisions and game events.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkCollisionBottleAndEnemy();
        }, 50);
        setInterval(() => {
            this.checkCollisionsWithEndboss();
            this.checkCollisionWithBottle();
            this.checkCollisionWithCoin();
            this.checkCollisionBottleAndEndboss();
            this.checkTrowableObjects();
            this.checkIfGameIsOver();
        }, 150);
        setInterval(() => {
            this.checkCollisionBottleAndEndboss();
            this.checkCharacterIsNearToEndboss();
        }, 280);
    }

    /**
     * Checks if any throwable bottle hits the endboss.
     */
    checkCollisionBottleAndEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (endboss.isColliding(bottle) && !endboss.isDead && !endboss.isDying) {
                    endboss.endbossHurt();
                    this.statusbarBoss.setHealth(endboss.energy);
                    window.soundManager.playSoundEffect('chickenHit', 0.75);
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                } if (endboss.energy <= 0) {
                    setTimeout(() => {
                        this.level.endboss.splice(this.level.endboss.indexOf(endboss), 1);
                    }, 1500);
                }
            });
        });
    }

    /**
     * Plays a sound effect if not muted.
     * @param {string} name - The name of the sound effect.
     * @param {number} vol - Volume (0.0 to 1.0).
     */
    playSound(name, vol) {
        if (soundManager.muted === false) {
            window.soundManager.playSoundEffect(name, vol);
        }
    }

    /**
     * Checks if any throwable bottle hits an enemy.
     */
    checkCollisionBottleAndEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    enemy.kill();
                    window.soundManager.playSoundEffect('chickenHit', 0.75);
                }
            });
        });
    }

    /**
     * Throws a bottle if the player presses the throw key and has bottles.
     */
    checkTrowableObjects() {
        if (this.keyboard.E && this.statusbarBottles.amount > 0) {
            this.statusbarBottles.amount--;

            if (this.character.otherDirection === true) {
                let bottle = new ThrowableObjectLeft(this.character.x, this.character.y + this.character.height / 2);
                this.throwableObjects.push(bottle);
                this.checkCollisionBottleAndEnemy();
            }
            if (this.character.otherDirection === false) {
                let bottle = new ThrowableObject(this.character.x + this.character.width, this.character.y + this.character.height / 2);
                this.throwableObjects.push(bottle);
            }
            this.statusbarBottles.setAmount();
            this.checkCollisionBottleAndEnemy();
        }
    }

    /**
     * Checks if the character collides with a bottle and collects it.
     */
    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.statusbarBottles.amount++;
                this.statusbarBottles.setAmount();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);

                this.playSound('bottle', 0.75);
            }
        });
    }

    /**
     * Checks if the character collides with a coin and collects it.
     */
    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.statusbarCoins.amount++;
                this.statusbarCoins.setAmount();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);

                this.playSound('coin', 0.75);
            }
        });
    }

    /**
     * Checks if the character collides with enemies and reacts accordingly.
     * Kills enemy if character is above ground, otherwise damages character.
     */
    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.kill();
                this.playSound('chickenHit', 0.75);
            }

            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusbarEnergy.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks collision of character with endboss and applies damage.
     */
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusbarEnergy.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Triggers endboss walking when character is near and kills character if endboss passes boundary.
     */
    checkCharacterIsNearToEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.x > 1700) {
                endboss.letEndbossWalk();
            }

            if (endboss.x < 0) {
                this.character.characterDies();
            }
        });
    }

    /**
     * Checks if the game is over based on character or endboss health.
     */
    checkIfGameIsOver() {
        if (this.character.energy === 0) {
            this.character.characterDies();
            window.soundManager.muteAll();
            currentlyIngame = false

        } else {
            this.level.endboss.forEach((endboss) => {
                if (endboss.energy <= 0) {
                    
                    endboss.endbossDies();
                    setTimeout(() => {
                        window.soundManager.muteAll();
                    }, 1200);
                    
                }currentlyIngame = false
            });
        }
    }

    /**
     * Main draw loop that clears canvas and draws all game objects.
     */
    draw() {
        // this.ctx.imageSmoothingEnabled = false;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.camera_X = Math.round(this.camera_X);
        this.ctx.translate(this.camera_X, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_X, 0);

        this.addToMap(this.statusbarEnergy);
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBoss);

        this.ctx.translate(this.camera_X, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_X, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the canvas.
     * @param {Array<DrawableObject>} objects - List of drawable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the canvas, applying flipping if needed.
     * @param {DrawableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally for drawing when object faces left.
     * @param {DrawableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context after flipping the image and resets position.
     * @param {DrawableObject} mo - The flipped object.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
