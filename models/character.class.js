/**
 * Character class representing the player Sharkie in the 2D game.
 * Handles movement, animation states, and player interactions.
 */
class Character extends MovableObject {
  height = 280;
  width = 250;
  y = 80;
  x = 0;
  speed = 6;
  idleTime = 0;
  isThrowing = false;
  isSlapping = false;
  isThrowingSpecial = false;
  movementInterval;
  animationInterval;
  alreadyDead = false;
  isSleeping = false;

  IMAGES_SWIMMING = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_STANDING = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
  ];

  IMAGES_SLEEPING = [
    "img/1.Sharkie/2.Long_IDLE/i1.png",
    "img/1.Sharkie/2.Long_IDLE/I2.png",
    "img/1.Sharkie/2.Long_IDLE/I3.png",
    "img/1.Sharkie/2.Long_IDLE/I4.png",
    "img/1.Sharkie/2.Long_IDLE/I5.png",
    "img/1.Sharkie/2.Long_IDLE/I6.png",
    "img/1.Sharkie/2.Long_IDLE/I7.png",
    "img/1.Sharkie/2.Long_IDLE/I8.png",
    "img/1.Sharkie/2.Long_IDLE/I9.png",
    "img/1.Sharkie/2.Long_IDLE/I10.png",
    "img/1.Sharkie/2.Long_IDLE/I11.png",
    "img/1.Sharkie/2.Long_IDLE/I12.png",
    "img/1.Sharkie/2.Long_IDLE/I13.png",
    "img/1.Sharkie/2.Long_IDLE/I14.png",
  ];

  IMAGES_FINSLAP = [
    "img/1.Sharkie/4.Attack/Fin slap/1.png",
    "img/1.Sharkie/4.Attack/Fin slap/2.png",
    "img/1.Sharkie/4.Attack/Fin slap/3.png",
    "img/1.Sharkie/4.Attack/Fin slap/4.png",
    "img/1.Sharkie/4.Attack/Fin slap/5.png",
    "img/1.Sharkie/4.Attack/Fin slap/6.png",
    "img/1.Sharkie/4.Attack/Fin slap/7.png",
    "img/1.Sharkie/4.Attack/Fin slap/8.png",
  ];

  IMAGES_DEAD = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_HURT = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
  ];

  IMAGES_THROW_BUBBLE = [
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  IMAGES_THROW_BUBBLE_POISON = [
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
  ];

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_FINSLAP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_THROW_BUBBLE);
    this.loadImages(this.IMAGES_THROW_BUBBLE_POISON);
    this.isAnimating = false;
    this.pendingSlapHit = null;
    this.startMovementInterval();
    this.startAnimationInterval();
    this.defaultOffset = { top: 140, right: 45, bottom: 70, left: 50 };
    this.attackOffset = { right: 27.5 };
    this.offset = {
      top: this.defaultOffset.top,
      right: this.defaultOffset.right,
      bottom: this.defaultOffset.bottom,
      left: this.defaultOffset.left,
    };
  }

  /**
   * Handles what happens when the character gets hit.
   * Wakes the character if sleeping and triggers death animation if dead.
   *
   * @param {boolean} fromEnemy - Whether the hit was caused by an enemy.
   */
  hit(fromEnemy) {
    super.hit(fromEnemy);
    this.handleWakeUpOnHit();
    if (this.energy < 0) {
      this.energy = 0;
    }
    if (this.isDead() && !this.alreadyDead) {
      this.playDeadOnce();
      this.alreadyDead = true;
    }
  }

  /**
   * Wakes the character up from sleep and restarts the animation.
   */
  handleWakeUpOnHit() {
    if (!this.isSleeping) return;
    if (this.sleepInterval) {
      clearInterval(this.sleepInterval);
    }
    this.isSleeping = false;
    this.idleTime = 0;
    this.startAnimationInterval();
  }

  /**
   * Starts the character movement interval based on keyboard input.
   */
  startMovementInterval() {
    const bossBlockX = 3375;
    this.movementInterval = setInterval(() => {
      if (this.isDead()) return;
      if (this.isSleeping && this.world) {
        if (this.isAnyKeyPressed()) this.unfreezeCharacter();
        return;
      }
      this.handleHorizontalMovement(bossBlockX);
      this.handleVerticalMovement();
      this.updateCamera();
      this.trackIdleState();
    }, 1000 / 60);
  }

  /**
   * Checks if any key relevant to movement or actions is currently pressed.
   * @returns {boolean}
   */
  isAnyKeyPressed() {
    const k = this.world.keyboard;
    return k.RIGHT || k.LEFT || k.UP || k.DOWN || k.SPACE || k.D || k.F;
  }

  /**
   * Moves the character left or right based on input.
   * @param {number} bossBlockX - Limit for how far right the character can go.
   */
  handleHorizontalMovement(bossBlockX) {
    if (this.world?.keyboard.RIGHT && this.x < bossBlockX) {
      this.x += this.speed;
      this.otherDirection = false;
      this.idleTime = 0;
    } else if (this.world?.keyboard.LEFT && this.x > 0) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.idleTime = 0;
    }
  }

  /**
   * Moves the character up or down based on input.
   */
  handleVerticalMovement() {
    if (this.world?.keyboard.UP && this.y > -100) {
      this.y -= this.speed;
      this.idleTime = 0;
    } else if (this.world?.keyboard.DOWN && this.y < 220) {
      this.y += this.speed;
      this.idleTime = 0;
    }
  }

  /**
   * Updates the camera position to follow the character.
   */
  updateCamera() {
    if (this.world) {
      this.world.camera_x = -this.x;
    }
  }

  /**
   * Increments idle time if no movement or action is happening.
   */
  trackIdleState() {
    const k = this.world?.keyboard;
    const noMovement =
      k &&
      !k.RIGHT &&
      !k.LEFT &&
      !k.UP &&
      !k.DOWN &&
      !this.isThrowing &&
      !this.isThrowingSpecial;
    if (!this.isAnimating && noMovement) {
      this.idleTime++;
    } else {
      this.idleTime = 0;
    }
  }

  /**
   * Starts the animation interval and controls character animation state.
   */
  startAnimationInterval() {
    this.animationInterval = setInterval(() => {
      if (this.isAnimating) return;
      if (this.shouldPlayDeath()) return;
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isThrowing) {
        this.playAnimation(this.IMAGES_THROW_BUBBLE);
      } else if (this.isSlapping) {
        this.playAnimation(this.IMAGES_FINSLAP);
      } else if (this.isThrowingSpecial) {
        this.playAnimation(this.IMAGES_THROW_BUBBLE_POISON);
      } else if (this.isMoving()) {
        this.playAnimation(this.IMAGES_SWIMMING);
      } else if (this.idleTime > 200) {
        this.sleepOnce();
      } else {
        this.playAnimation(this.IMAGES_STANDING);
      }
    }, 120);
  }

  /**
   * Checks and plays the death animation once, if needed.
   * @returns {boolean} - True if death animation was triggered.
   */
  shouldPlayDeath() {
    if (this.isDead() && !this.alreadyDead) {
      this.playDeadOnce();
      this.alreadyDead = true;
      return true;
    }
    return false;
  }

  /**
   * Determines whether the character is currently moving.
   * @returns {boolean}
   */
  isMoving() {
    const k = this.world?.keyboard;
    return k?.RIGHT || k?.LEFT || k?.UP || k?.DOWN;
  }

  /**
   * Plays the death animation once and stops the current animation interval.
   */
  playDeadOnce() {
    clearInterval(this.animationInterval);
    const frames = this.IMAGES_DEAD;
    let i = 0;
    const deathInterval = setInterval(() => {
      this.img = this.imageCache[frames[i]];
      i++;
      if (i >= frames.length) {
        clearInterval(deathInterval);
        this.setFinalDeathFrame(frames);
      }
    }, 150);
  }

  /**
   * Sets the last image frame of the death animation.
   * @param {string[]} frames - Array of death image paths.
   */
  setFinalDeathFrame(frames) {
    this.img = this.imageCache[frames[frames.length - 1]];
  }

  /**
   * Plays the sleep animation once, unless interrupted.
   */
  sleepOnce() {
    clearInterval(this.animationInterval);
    const frames = this.IMAGES_SLEEPING;
    let i = 0;
    const introSleep = setInterval(() => {
      this.img = this.imageCache[frames[i]];
      i++;
      if (i === 10) {
        clearInterval(introSleep);
        this.startSleepLoop();
      }
    }, 200);
  }

  /**
   * Starts a looping animation between three sleep frames.
   */
  startSleepLoop() {
    const frames = [
      this.imageCache["img/1.Sharkie/2.Long_IDLE/I11.png"],
      this.imageCache["img/1.Sharkie/2.Long_IDLE/I12.png"],
      this.imageCache["img/1.Sharkie/2.Long_IDLE/I13.png"],
    ];
    let i = 0;
    this.sleepInterval = setInterval(() => {
      if (this.isAnyKeyPressed()) {
        clearInterval(this.sleepInterval);
        this.sleepInterval = null;
        this.unfreezeCharacter();
        return;
      }
      this.img = frames[i];
      i = (i + 1) % frames.length;
    }, 300);
    this.isSleeping = true;
  }

  /**
   * Stops the sleep loop if the character moves or dies.
   */
  shouldInterruptSleep() {
    if (this.isDead() || this.isAnyKeyPressed() || this.idleTime < 50) {
      clearInterval(this.sleepInterval);
      this.unfreezeCharacter();
      return true;
    }
    return false;
  }

  /**
   * Wakes the character and restarts normal animations.
   */
  unfreezeCharacter() {
    if (this.sleepInterval) {
      clearInterval(this.sleepInterval);
      this.sleepInterval = null;
    }
    this.isSleeping = false;
    this.idleTime = 0;
    this.startAnimationInterval();
  }

  /**
   * Triggers throw bubble animation for a short duration.
   */
  throwAnimation() {
    if (this.isDead()) return;

    this.isThrowing = true;
    this.playAnimation(this.IMAGES_THROW_BUBBLE);

    setTimeout(() => {
      this.isThrowing = false;
      this.idleTime = 0;
    }, 500);
  }

  /**
   * Triggers slap animation for a short duration and kills the enemy after animation ends.
   */
  finSlapAnimation() {
    if (this.isDead()) return;
    if (this.sleepInterval) {
      clearInterval(this.sleepInterval);
      this.sleepInterval = null;
      this.isSleeping = false;
    }
    this.idleTime = 0;
    this.isSlapping = true;
    this.offset.right = this.attackOffset.right;
    this.playOneTimeAnimation(this.IMAGES_FINSLAP, 500, () => {
      this.isSlapping = false;
      this.idleTime = 0;
      this.offset.right = this.defaultOffset.right;
      if (this.pendingSlapHit && !this.pendingSlapHit.isDead) {
        this.pendingSlapHit.die();
        this.pendingSlapHit = null;
      }
    });
  }

  /**
   * Triggers poison bubble throw animation for a short duration.
   */
  throwPoisonBubbleAnimation() {
    if (this.isDead()) return;
    this.isThrowingSpecial = true;
    this.playAnimation(this.IMAGES_THROW_BUBBLE_POISON);
    setTimeout(() => {
      this.isThrowingSpecial = false;
      this.idleTime = 0;
    }, 500);
  }

  /**
   * Stops all running intervals of the character.
   */
  stopIntervals() {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.sleepInterval) clearInterval(this.sleepInterval);
  }

  /**
   * Plays a one-time animation sequence.
   * Temporarily stops the standard animation loop, displays the provided frames
   * over the given duration, and then restarts the standard animation loop.
   *
   * @param {string[]} frames - Array of image paths to display.
   * @param {number} [duration=500] - Total duration of the animation in milliseconds.
   * @param {Function|null} [callback=null] - Optional callback to run after the animation finishes.
   */
  playOneTimeAnimation(frames, duration = 500, callback = null) {
    this.isAnimating = true;
    clearInterval(this.animationInterval);
    let i = 0;
    const frameDuration = duration / frames.length;
    const interval = setInterval(() => {
      this.img = this.imageCache[frames[i]];
      i++;
      if (i >= frames.length) {
        clearInterval(interval);
        this.isAnimating = false;
        if (callback) callback();
        this.startAnimationInterval();
      }
    }, frameDuration);
  }
}
