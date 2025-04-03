/**
 * Represents a dangerous green jellyfish enemy.
 */
class GreenJellyfish extends MovableObject {
    height = 150;
    width = 150;
    isDead = false;
  
    IMAGES_SWIMMING = [
      'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 1.png',
      'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 2.png',
      'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 3.png',
      'img/2.Enemy/2 Jelly fish/S｣per dangerous/Green 4.png',
    ];
  
    IMAGES_DIE = [
      'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
      'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
      'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
      'img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
    ];
  
    /**
     * Initializes the green jellyfish at a given position.
     * @param {number} x - X position.
     * @param {number} y - Y position.
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
     * Starts movement and animation loop.
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
     * Triggers death animation and removal from world.
     */
    die() {
      this.isDead = true;
      clearInterval(this.swimInterval);
      this.speed = 0;
      this.playDeathAnimation();
      this.scheduleRemoval();
    }
  
    /**
     * Animates death sequence.
     */
    playDeathAnimation() {
      let i = 0;
      this.deathInterval = setInterval(() => {
        this.img = this.imageCache[this.IMAGES_DIE[i]];
        i = (i + 1) % this.IMAGES_DIE.length;
      }, 120);
    }
  
    /**
     * Removes jellyfish from world after short delay.
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