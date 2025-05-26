/**
 * Represents the status bar showing the amount of bottles.
 * @extends DrawableObject
 */
class StatusbarBottles extends DrawableObject {

  /** @type {string[]} Paths to bottle status images */
  IMAGES = [
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
  ];

  /** @type {number} Current amount of bottles */
  amount = 0;

  /**
   * Creates a StatusbarBottles instance, loads images, and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setAmount(0);
    this.x = 50;
    this.y = 70;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the image based on the current amount.
   */
  setAmount() {
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Returns the index of the image corresponding to the current amount.
   * @returns {number} Index of the image to display
   */
  resolveImageIndex() {
    if (this.amount == 0) {
      return 0;
    } else if (this.amount == 1) {
      return 1;
    } else if (this.amount == 2) {
      return 2;
    } else if (this.amount == 3) {
      return 3;
    } else if (this.amount == 4) {
      return 4;
    } else {
      return 5;
    }
  }
}
