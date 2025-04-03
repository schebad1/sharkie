/**
 * Represents a pufferfish enemy that swims and floats up when dead.
 */
class Pufferfish extends MovableObject {
  height = 80;
  width = 80;
  isDead = false;

  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
  ];

  /**
   * Creates a new pufferfish enemy at a random position.
   */
  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.setOffsets();
    this.setRandomPosition();
    this.setSpeed();
    this.animate();
  }

  /**
   * Defines hitbox offset.
   */
  setOffsets() {
    this.offset = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 10,
    };
  }

  /**
   * Sets a random x/y position within allowed range.
   */
  setRandomPosition() {
    this.x = 550 + Math.random() * 1000;
    this.y = Math.random() * 380;
  }

  /**
   * Randomizes swim speed.
   */
  setSpeed() {
    this.speed = 0.4 + Math.random() * 0.3;
    this.speedY = 0.5 + Math.random() * 0.3;
  }

  /**
   * Starts movement and swim animation.
   */
  animate() {
    this.moveLeft();
    this.swimInterval = setInterval(() => this.updateSwim(), 200);
  }

  /**
   * Updates vertical swimming and plays animation.
   */
  updateSwim() {
    if (this.isDead) return;
    this.playAnimation(this.IMAGES_SWIMMING);
    this.y += this.speedY;
    this.bounceAtEdges();
  }

  /**
   * Reverses direction at top/bottom edges.
   */
  bounceAtEdges() {
    if (this.y <= 0 || this.y >= 380) {
      this.y = Math.max(0, Math.min(this.y, 380));
      this.speedY *= -1;
    }
  }

  /**
   * Triggers death sequence: floats up and disappears.
   */
  die() {
    this.isDead = true;
    this.speed = 0;
    this.speedY = 0;
    this.loadImage(this.IMAGES_DEAD);
    clearInterval(this.swimInterval);
    this.floatUp();
  }

  /**
   * Slowly floats the fish upward and removes it.
   */
  floatUp() {
    let interval = setInterval(() => {
      this.y -= 7;
      if (this.y <= -this.height) {
        clearInterval(interval);
        this.removeFromWorld();
      }
    }, 50);
  }

  /**
   * Removes this object from the game world.
   */
  removeFromWorld() {
    if (!this.world) return;
    const index = this.world.level.enemies.indexOf(this);
    if (index > -1) {
      this.world.level.enemies.splice(index, 1);
    }
  }
}