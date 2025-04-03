/**
 * Base class for all movable game objects.
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;
  lastHit = 0;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  /**
   * Checks if this object is colliding with another.
   * @param {MovableObject} other - The object to check against.
   * @returns {boolean}
   */
  isColliding(other) {
    const a = this.getHitbox(this);
    const b = this.getHitbox(other);

    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * Calculates the hitbox for an object considering offsets.
   * @param {MovableObject} obj
   * @returns {{x: number, y: number, width: number, height: number}}
   */
  getHitbox(obj) {
    return {
      x: obj.x + (obj.offset?.left || 0),
      y: obj.y + (obj.offset?.top || 0),
      width: obj.width - (obj.offset?.left || 0) - (obj.offset?.right || 0),
      height: obj.height - (obj.offset?.top || 0) - (obj.offset?.bottom || 0),
    };
  }

  /**
   * Applies damage based on enemy type.
   * @param {MovableObject} fromEnemy - The attacker.
   */
  hit(fromEnemy) {
    let damage = 2.5;
    if (fromEnemy instanceof GreenJellyfish || fromEnemy instanceof PinkJellyfish) {
      damage = 10;
    }
    if (fromEnemy instanceof Endboss) {
      damage = 20;
    }
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if object is recently hurt.
   * @returns {boolean}
   */
  isHurt() {
    const timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 1;
  }

  /**
   * Returns true if energy is 0.
   * @returns {boolean}
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Cycles through a given image set.
   * @param {Array} images - Array of image paths.
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Logs right movement — to be implemented later.
   */
  moveRight() {
    console.log("Moving right");
  }

  /**
   * Moves object left with a fixed interval.
   */
  moveLeft() {
    setInterval(() => {
      if (this.world && this.world.paused) return;
      this.x -= this.speed;
    }, 1000 / 60);
  }
}