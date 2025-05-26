/**
 * Represents a cloud in the background that moves slowly to the left.
 * Extends the MovableObject class.
 */
class Cloud extends MovableObject {

    y = 30;
    width = 500;
    height = 250;

    /**
     * Creates a new Cloud instance with a random X position.
     */
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Starts the cloud movement to the left.
     */
    animate() {
        this.moveLeft();
    }
}
