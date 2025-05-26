/**
 * Represents a throwable bottle object moving to the left.
 * @extends MovableObject
 */
class ThrowableObjectLeft extends MovableObject {

  /**
   * Creates a ThrowableObjectLeft instance at the given position and initializes its properties.
   * @param {number} x - The initial x position.
   * @param {number} y - The initial y position.
   */
  constructor(x, y) {
    super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;
    this.throw();
  }

  /**
   * Initiates the throwing animation by applying gravity and moving the object leftwards over time.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      this.x -= 15;
    }, 25);
  }
}
