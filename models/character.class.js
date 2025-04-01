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
      "img/1.Sharkie/3.Swim/6.png"
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
      "img/1.Sharkie/1.IDLE/18.png"
    ];
  
    IMAGES_SLEEPING = [
      "img/1.Sharkie/2.Long_IDLE/i1.png",
      "img/1.Sharkie/2.Long_IDLE/i2.png",
      "img/1.Sharkie/2.Long_IDLE/i3.png",
      "img/1.Sharkie/2.Long_IDLE/i4.png",
      "img/1.Sharkie/2.Long_IDLE/i5.png",
      "img/1.Sharkie/2.Long_IDLE/i6.png",
      "img/1.Sharkie/2.Long_IDLE/i7.png",
      "img/1.Sharkie/2.Long_IDLE/i8.png",
      "img/1.Sharkie/2.Long_IDLE/i9.png",
      "img/1.Sharkie/2.Long_IDLE/i10.png",
      "img/1.Sharkie/2.Long_IDLE/i11.png",
      "img/1.Sharkie/2.Long_IDLE/i12.png",
      "img/1.Sharkie/2.Long_IDLE/i13.png",
      "img/1.Sharkie/2.Long_IDLE/i14.png"
    ];
  
    IMAGES_FINSLAP = [
      "img/1.Sharkie/4.Attack/Fin slap/1.png",
      "img/1.Sharkie/4.Attack/Fin slap/2.png",
      "img/1.Sharkie/4.Attack/Fin slap/3.png",
      "img/1.Sharkie/4.Attack/Fin slap/4.png",
      "img/1.Sharkie/4.Attack/Fin slap/5.png",
      "img/1.Sharkie/4.Attack/Fin slap/6.png",
      "img/1.Sharkie/4.Attack/Fin slap/7.png",
      "img/1.Sharkie/4.Attack/Fin slap/8.png"
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
      "img/1.Sharkie/6.dead/1.Poisoned/12.png"
    ];
  
    IMAGES_HURT = [
      "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
      "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
      "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
      "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
      "img/1.Sharkie/5.Hurt/1.Poisoned/5.png"
    ];
  
    IMAGES_THROW_BUBBLE = [
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
      "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png"
    ];
  
    IMAGES_THROW_BUBBLE_POISON = [
      "img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
      "img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
      "img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
      "img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
      "img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
      "img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
      "img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
      "img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png"
    ];
  
    offset = { top: 130, right: 50, bottom: 60, left: 50 };
  
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
      this.startMovementInterval();
      this.startAnimationInterval();
    }
    
    hit(fromEnemy) {
      super.hit(fromEnemy);
      if (this.isSleeping) {
        if (this.sleepInterval) {
          clearInterval(this.sleepInterval);
        }
        this.isSleeping = false;
        this.idleTime = 0;
        this.startAnimationInterval();
      }
    }
    
    startMovementInterval() {
      const bossBlockX = 3375;
      this.movementInterval = setInterval(() => {
        if (this.isDead()) {
          return;
        }
        if (this.isSleeping && this.world) {
          if (
            this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN ||
            this.world.keyboard.SPACE ||
            this.world.keyboard.D ||
            this.world.keyboard.F
          ) {
            this.unfreezeCharacter();
          }
          return;
        }
        if (this.world && this.world.keyboard.RIGHT && this.x < bossBlockX) {
          this.x += this.speed;
          this.otherDirection = false;
          this.idleTime = 0;
        } else if (this.world && this.world.keyboard.LEFT && this.x > 0) {
          this.x -= this.speed;
          this.otherDirection = true;
          this.idleTime = 0;
        }
        if (this.world && this.world.keyboard.UP && this.y > -100) {
          this.y -= this.speed;
          this.idleTime = 0;
        } else if (this.world && this.world.keyboard.DOWN && this.y < 220) {
          this.y += this.speed;
          this.idleTime = 0;
        }
        if (this.world) {
          this.world.camera_x = -this.x;
        }
        if (
          this.world &&
          !this.world.keyboard.RIGHT &&
          !this.world.keyboard.LEFT &&
          !this.world.keyboard.UP &&
          !this.world.keyboard.DOWN &&
          !this.isThrowing &&
          !this.isThrowingSpecial
        ) {
          this.idleTime++;
        } else {
          this.idleTime = 0;
        }
      }, 1000 / 60);
    }
    
    startAnimationInterval() {
      this.animationInterval = setInterval(() => {
        if (this.isDead() && !this.alreadyDead) {
          this.playDeadOnce();
          this.alreadyDead = true;
          return;
        }
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.isThrowing) {
          this.playAnimation(this.IMAGES_THROW_BUBBLE);
        } else if (this.isSlapping) {
          this.playAnimation(this.IMAGES_FINSLAP);
        } else if (this.isThrowingSpecial) {
          this.playAnimation(this.IMAGES_THROW_BUBBLE_POISON);
        } else if (
          this.world &&
          (this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN)
        ) {
          this.playAnimation(this.IMAGES_SWIMMING);
        } else if (this.idleTime > 200) {
          this.sleepOnce();
        } else {
          this.playAnimation(this.IMAGES_STANDING);
        }
      }, 120);
    }
    
    playDeadOnce() {
      clearInterval(this.animationInterval);
      let frames = this.IMAGES_DEAD;
      let i = 0;
      let deathInterval = setInterval(() => {
        this.img = this.imageCache[frames[i]];
        i++;
        if (i >= frames.length) {
          clearInterval(deathInterval);
          this.img = this.imageCache[frames[frames.length - 1]];
        }
      }, 150);
    }
    
    sleepOnce() {
      clearInterval(this.animationInterval);
      let frames = this.IMAGES_SLEEPING;
      let i = 0;
      this.sleepInterval = setInterval(() => {
        if (this.isDead()) {
          clearInterval(this.sleepInterval);
          return;
        }
        if (
          this.world &&
          (this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN ||
            this.world.keyboard.SPACE ||
            this.world.keyboard.D ||
            this.world.keyboard.F)
        ) {
          clearInterval(this.sleepInterval);
          this.unfreezeCharacter();
          return;
        }
        this.img = this.imageCache[frames[i]];
        if (i < frames.length - 2) {
          i++;
        } else {
          clearInterval(this.sleepInterval);
          this.img = this.imageCache[frames[frames.length - 2]];
          this.isSleeping = true;
        }
      }, 200);
    }
    
    unfreezeCharacter() {
      this.isSleeping = false;
      this.idleTime = 0;
      this.startAnimationInterval();
    }
    
    throwAnimation() {
      if (this.isDead()) return;
      this.isThrowing = true;
      this.playAnimation(this.IMAGES_THROW_BUBBLE);
      setTimeout(() => {
        this.isThrowing = false;
        this.idleTime = 0;
      }, 500);
    }
    
    finSlapAnimation() {
      if (this.isDead()) return;
      this.isSlapping = true;
      this.playAnimation(this.IMAGES_FINSLAP);
      setTimeout(() => {
        this.isSlapping = false;
      }, 500);
    }
    
    throwPoisonBubbleAnimation() {
      if (this.isDead()) return;
      this.isThrowingSpecial = true;
      this.playAnimation(this.IMAGES_THROW_BUBBLE_POISON);
      setTimeout(() => {
        this.isThrowingSpecial = false;
        this.idleTime = 0;
      }, 500);
    }
    
    stopIntervals() {
      if (this.movementInterval) {
        clearInterval(this.movementInterval);
      }
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
      }
      if (this.sleepInterval) {
        clearInterval(this.sleepInterval);
      }
    }
  }
  