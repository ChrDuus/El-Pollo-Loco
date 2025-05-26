/**
 * Represents the status bar showing the amount of coins.
 * @extends DrawableObject
 */
class StatusbarCoins extends DrawableObject {

  /** @type {string[]} Paths to coin status images */
  IMAGES = [
    './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
  ];

  /** @type {number} Current amount of coins */
  amount = 0;

  /**
   * Creates a StatusbarCoins instance, loads images, and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setAmount(0);
    this.x = 50;
    this.y = 120;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the amount and updates the displayed image accordingly.
   * @param {number} percentage - The current coin amount or percentage.
   */
  setAmount(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Returns the index of the image corresponding to the current amount.
   * @returns {number} Index of the image to display.
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
