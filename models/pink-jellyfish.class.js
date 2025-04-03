/**
 * Represents a dangerous pink jellyfish enemy.
 */
class PinkJellyfish extends MovableObject {
    height = 150;
    width = 150;
    isDead = false;
  
    IMAGES_SWIMMING = [
      'img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 1.png',
      'img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 2.png',
      'img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 3.png',
      'img/2.Enemy/2 Jelly fish/S｣per dangerous/Pink 4.png',
    ];
  
    IMAGES_DIE = [
      'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
      'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
      'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
      'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png',
    ];
  
    /**
     * Creates a pink jellyfish at given coordinates.
     * @param {number} x - The x position.
     * @param {number} y - The y position.
     */
    constructor(x, y) {
      super().loadImage(this.IMAGES_SWIMMING[0]);
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DIE);
  
      this.x = x;
      this.y = y;
      this.speed = 0.2 + Math.random() * 0.2;
  
      this.setOffset();
      this.animate();
    }
  
    /**
     * Sets hitbox offset.
     */
    setOffset() {
      this.offset = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20,
      };
    }
  
    /**
     * Moves left and starts swim animation loop.
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
     * Triggers death animation and removal.
     */
    die() {
      this.isDead = true;
      clearInterval(this.swimInterval);
      this.speed = 0;
      this.playDeathAnimation();
      this.scheduleRemoval();
    }
  
    /**
     * Plays the death animation in a loop.
     */
    playDeathAnimation() {
      let i = 0;
      this.deathInterval = setInterval(() => {
        this.img = this.imageCache[this.IMAGES_DIE[i]];
        i = (i + 1) % this.IMAGES_DIE.length;
      }, 120);
    }
  
    /**
     * Removes jellyfish from world after a short delay.
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