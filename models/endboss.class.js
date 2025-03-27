class Endboss extends MovableObject {
  height = 400;
  width = 400;
  isActive = false;
  hasEntered = false;
  energy = 100;
  hitPointsPerPoisonBubble = 20;
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

  constructor() {
    super().loadImage("img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3700;
    this.y = -150;
    this.speed = 1.5;
  }

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

  animate() {
    this.animationInterval = setInterval(() => {
      if (this.hasDied) return;
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 200);
  }

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

  hit() {
    if (this.isDead()) return;
    this.energy -= this.hitPointsPerPoisonBubble;
    this.lastHit = new Date().getTime();
    if (this.energy <= 0) {
      this.energy = 0;
      this.die();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 500;
  }

  isDead() {
    return this.energy <= 0;
  }

  die() {
    if (this.hasDied) return;
    this.speed = 0;
    this.isDead = true;
    this.hasDied = true;
    if (this.attackInterval) clearInterval(this.attackInterval);
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
    let i = 0;
    let frames = this.IMAGES_DEAD;
    let deathInterval = setInterval(() => {
      this.img = this.imageCache[frames[i]];
      i++;
      if (i >= frames.length) {
        clearInterval(deathInterval);
        this.img = this.imageCache[frames[frames.length - 1]];
      }
    }, 200);
  }
}