/**
 * Represents the energy status bar of the character.
 * @extends DrawableObject
 */
class StatusbarEnergy extends DrawableObject {

  /** @type {string[]} Paths to energy status images */
  IMAGES = [
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
  ];

  /** @type {number} Current energy percentage */
  percentage = 100;

  /**
   * Creates a StatusbarEnergy instance, loads images, and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 50;
    this.y = 20;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the energy percentage and updates the displayed image accordingly.
   * @param {number} percentage - The current energy percentage.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Returns the index of the image corresponding to the current energy percentage.
   * @returns {number} Index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
