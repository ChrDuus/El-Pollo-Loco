/**
 * Represents a bottle object that can be collected in the game.
 * Extends DrawableObject for basic rendering capabilities.
 */
class Bottle extends DrawableObject {
    y = 360;
    width = 40;
    height = 60;

    /**
     * Creates a new bottle instance with random horizontal positioning.
     * The bottle image is loaded automatically upon creation.
     */
    constructor() {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 350 + Math.random() * 1200;
    }

}