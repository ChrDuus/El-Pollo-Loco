/**
 * Represents the status bar of the boss showing health with different images.
 * @extends DrawableObject
 */
class StatusbarBoss extends DrawableObject {
  /** @type {string[]} Paths to health status images */
  IMAGES = [
    './img/7_statusbars/2_statusbar_endboss/blue.png',
    './img/7_statusbars/2_statusbar_endboss/green.png',
    './img/7_statusbars/2_statusbar_endboss/orange.png'
  ]

  /** @type {number} Current health of the boss */
  health = 110;

  /**
   * Creates a StatusbarBoss instance, loads images, and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setAmount();
    this.x = 280;
    this.y = 20;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the current image based on the health value.
   */
  setAmount() {
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on current health.
   * @returns {number} Index of the image to display
   */
  resolveImageIndex() {
    if (this.health >= 70) {
      return 0;
    } else if (this.health >= 30) {
      return 1;
    } else {
      return 2;
    }
  }

  /**
   * Updates the health value and refreshes the displayed image.
   * @param {number} health - New health value
   */
  setHealth(health) {
    this.health = health;
    this.setAmount();
  }
}
