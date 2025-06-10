/**
 * Represents a background object in the game.
 * Extends the MovableObject class to inherit basic movement properties.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new background object.
     * @param {string} imagePath - Path to the image file for this background object.
     * @param {number} x - The x-coordinate position of the object.
     * @param {number} y - The y-coordinate position of the object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x ;
        this.y = y;
    }

}