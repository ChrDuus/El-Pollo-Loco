/**
 * Represents a drawable object with an image, position, and size.
 * Provides methods for loading and drawing images.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    height = 250;
    width = 120;
    offsetTop = 40;
    offsetBottom = -20;
    offsetRight = 40;
    offsetLeft = 15;

    /**
     * Loads a single image and assigns it to the object.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }

    /**
     * Preloads multiple images and stores them in the image cache.
     * @param {string[]} arr - Array of image paths to preload.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object's image onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            // Image couldn't be drawn, likely not loaded yet.
        }
    }
}
