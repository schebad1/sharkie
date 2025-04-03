/**
 * Represents a purple jellyfish enemy that swims and dies.
 */
class PurpleJellyfish extends MovableObject {
  height = 100;
  width = 100;
  isDead = false;

  IMAGES_SWIMMING = [
    'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
  ];

  IMAGES_DIE = [
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
  ];

  /**
   * Initializes the jellyfish at a given position.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DIE);
    this.x = x;
    this.y = y;
    this.speed = 0.3 + Math.random() * 0.2;
    this.setCollisionOffset();
    this.setOffset();
    this.animate();
  }

  /**
   * Sets custom collision offset.
   */
  setCollisionOffset() {
    this.collisionOffsetX = 50;
    this.collisionOffsetY = 50;
  }

  /**
   * Sets the visual hitbox offset.
   */
  setOffset() {
    this.offset = {
      top: 25,
      right: 25,
      bottom: 25,
      left: 25,
    };
  }

  /**
   * Starts moving and plays swim animation.
   */
  animate() {
    this.moveLeft();
    this.swimInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 200);
  }

  /**
   * Initiates death sequence.
   */
  die() {
    this.isDead = true;
    clearInterval(this.swimInterval);
    this.speed = 0;
    this.playDeathAnimation();
    this.scheduleRemoval();
  }

  /**
   * Plays the dying animation loop.
   */
  playDeathAnimation() {
    let i = 0;
    setInterval(() => {
      this.img = this.imageCache[this.IMAGES_DIE[i]];
      i = (i + 1) % this.IMAGES_DIE.length;
    }, 120);
  }

  /**
   * Removes the jellyfish from the world after delay.
   */
  scheduleRemoval() {
    setTimeout(() => {
      if (!this.world) return;
      const index = this.world.level.enemies.indexOf(this);
      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
      }
    }, 1000);
  }
}