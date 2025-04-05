/**
 * Represents the final boss enemy with intro, attack, hurt, and death animations.
 */
class Endboss extends MovableObject {
  height = 400;
  width = 400;
  isActive = false;
  hasEntered = false;
  energy = 100;
  hitPointsPerPoisonBubble = 15;
  hasDied = false;
  offset = { top: 150, right: 40, bottom: 60, left: 40 };

  IMAGES_SWIMMING = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png"
  ];

  IMAGES_INTRO = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png"
  ];

  IMAGES_ATTACK = [
    "img/2.Enemy/3 Final Enemy/Attack/1.png",
    "img/2.Enemy/3 Final Enemy/Attack/2.png",
    "img/2.Enemy/3 Final Enemy/Attack/3.png",
    "img/2.Enemy/3 Final Enemy/Attack/4.png",
    "img/2.Enemy/3 Final Enemy/Attack/5.png",
    "img/2.Enemy/3 Final Enemy/Attack/6.png"
  ];

  IMAGES_HURT = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png"
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png "
  ];

  /**
   * Initializes the endboss and loads all animation assets.
   */
  constructor() {
    super().loadImage(this.IMAGES_INTRO[0]);
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3700;
    this.y = -150;
    this.speed = 5;
  }

  /**
   * Starts the entrance intro and transitions into battle.
   */
  startIntro() {
    this.hasEntered = true;
    let i = 0;
    let steps = this.IMAGES_INTRO.length;
    let distance = 200;
    let stepSize = distance / steps;

    let introInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_INTRO[i]];
      this.y += stepSize;
      i++;

      if (i >= steps) {
        clearInterval(introInterval);
        this.y = 0;
        this.startFloating();
        this.isActive = true;
        this.startAttackCycle();
      }
    }, 150);
  }

  /**
   * Handles animation depending on the current state.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      if (this.hasDied) return;
      if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
      else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else if (this.isAttacking) this.playAnimation(this.IMAGES_ATTACK);
      else this.playAnimation(this.IMAGES_SWIMMING);
    }, 200);
  }

  /**
   * Moves the boss left while alive.
   */
  startFloating() {
    this.animate();
    this.movementInterval = setInterval(() => {
      if (this.isDead()) {
        clearInterval(this.movementInterval);
        this.speed = 0;
      } else {
        this.x -= this.speed;
      }
    }, 1000 / 30);
  }

  /**
   * Repeats attack animation cycle every 3 seconds.
   */
  startAttackCycle() {
    this.attackInterval = setInterval(() => {
      if (this.isActive && !this.isDead()) {
        this.isAttacking = true;
        let originalSpeed = this.speed;
        this.speed = 0;
        this.playAnimation(this.IMAGES_ATTACK);

        setTimeout(() => {
          this.isAttacking = false;
          this.speed = originalSpeed;
        }, this.IMAGES_ATTACK.length * 120);
      }
    }, 3000);
  }

  /**
   * Reduces energy and triggers death if energy is 0.
   */
  hit() {
    if (this.isDead()) return;
    this.energy -= this.hitPointsPerPoisonBubble;
    this.lastHit = new Date().getTime();
    if (this.energy <= 0) {
      this.energy = 0;
      this.die();
    }
  }

  /**
   * Checks if boss was recently hit.
   * @returns {boolean} True if hurt.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 500;
  }

  /**
   * Returns true if energy has dropped to 0 or below.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Ends boss activity and triggers death animation.
   */
  die() {
    if (this.hasDied) return;
    this.speed = 0;
    this.hasDied = true;

    clearInterval(this.attackInterval);
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);

    this.playDeadOnce();
  }

  /**
   * Plays dead animation sequence once, then freezes.
   */
  playDeadOnce() {
    clearInterval(this.animationInterval);
    let frames = this.IMAGES_DEAD;
    let i = 0;
    let deathInterval = setInterval(() => {
      this.img = this.imageCache[frames[i]];
      i++;
      if (i >= frames.length) {
        clearInterval(deathInterval);
        this.img = this.imageCache[frames[frames.length - 2]];
      }
    }, 150);
  }
}