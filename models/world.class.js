class World {
  character = new Character();
  level = createLevel1();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinStatusBar = new CoinStatusBar();
  poisonStatusBar = new PoisonStatusBar();
  throwableObject = [];
  poisonShotsUsed = 0;
  gameInterval;      
  animationFrameId;  
  paused = false;

  constructor(canvas, keyboard, soundManager) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundManager = soundManager; 
    this.paused = false;
    this.draw();
    this.setWorld();
    this.run();
    this.soundManager.playBackgroundMusic(); 
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    this.gameInterval = setInterval(() => {
      if (this.paused) return;
      this.checkFinSlap();
      this.checkCollisions();
      this.checkCoinCollection();
      this.checkPoisonCollection();
      this.checkPoisonGroundCollection();
      this.checkThrowObjects();
      this.checkBubbleHits();
      this.checkEndbossIntro();
      this.checkBubbleTimeout();
      this.checkGameOver(); 
      this.checkGameWin(); 
    }, 200);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.camera_x = -this.character.x;
    let maxCameraX = -(this.level.level_end_x - this.canvas.width + 150);
    if (this.camera_x < maxCameraX) {
      this.camera_x = maxCameraX;
    }
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.poisonStatusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.poisons);
    this.addObjectsToMap(this.level.poisonsGround);
    this.addObjectsToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);
    this.animationFrameId = requestAnimationFrame(() => {
      this.draw();
    });
  }

  stopGame() {
    clearInterval(this.gameInterval);
    cancelAnimationFrame(this.animationFrameId);
    if (this.character && this.character.stopIntervals) {
      this.character.stopIntervals();
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.img && mo.img.complete) {
      if (mo.otherDirection) {
        this.flipImage(mo);
      }
      mo.draw(this.ctx);
      if (mo.otherDirection) {
        this.flipImageBack(mo);
      }
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  checkGameOver() {
    if (this.character.isDead() && !this.gameOverTriggered) {
      this.gameOverTriggered = true;
      this.soundManager.playGameOverSound(); 
      setTimeout(() => {
        document.getElementById('gameScreen').classList.add('d-none');
        document.getElementById('gameOverScreen').classList.remove('d-none');
      }, 3000); 
    }
  }  

  checkGameWin() {
    if (this.level.endboss && this.level.endboss.isDead() && !this.winTriggered) {
      this.winTriggered = true;
      this.soundManager.stopEndbossMusic();     
      this.soundManager.playWinSound();         
      this.soundManager.playBackgroundMusic(); 
      setTimeout(() => {
        document.getElementById('gameScreen').classList.add('d-none');
        document.getElementById('winScreen').classList.remove('d-none');
      }, 3000);
    }
  }

  checkThrowObjects() {
    if (
      !this.character.isDead() &&
      this.keyboard.D &&
      !this.character.isThrowing &&
      !this.character.isHurt() &&
      !this.character.otherDirection
    ) {
      this.character.throwAnimation();
      setTimeout(() => {
        let bubble = new ThrowableObject(
          this.character.x + 200,
          this.character.y + 150,
          false,
          false
        );
        this.throwableObject.push(bubble);
        this.soundManager.playBubbleShootSound(); 
      }, 400);
    }

    if (
      !this.character.isDead() &&
      this.keyboard.F &&
      !this.character.isThrowingSpecial &&
      !this.character.isHurt() &&
      !this.character.otherDirection &&
      this.poisonStatusBar.percentage >= 20
    ) {
      this.character.throwPoisonBubbleAnimation();
      setTimeout(() => {
        let poisonBubble = new ThrowableObject(
          this.character.x + 200,
          this.character.y + 150,
          false,
          true
        );
        this.throwableObject.push(poisonBubble);
        this.soundManager.playBubbleShootSound(); 

        this.poisonShotsUsed++;
        if (this.poisonShotsUsed >= 2) {
          this.poisonShotsUsed = 0;
          this.poisonStatusBar.percentage -= 20;
          if (this.poisonStatusBar.percentage < 0) {
            this.poisonStatusBar.percentage = 0;
          }
          this.poisonStatusBar.setPercentage(this.poisonStatusBar.percentage);
        }
      }, 400);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!this.character.isDead() && !this.character.isSlapping && !enemy.isDead) {
        if (this.character.isColliding(enemy)) {
          this.character.hit(enemy);
          this.statusBar.setPercentage(this.character.energy);
          this.soundManager.playDamageSound(); 
        }
      }
    }); 
    if (!this.character.isDead() && this.level.endboss && !this.level.endboss.isDead()) {
      if (this.character.isColliding(this.level.endboss)) {
        this.character.hit(this.level.endboss);
        this.statusBar.setPercentage(this.character.energy);
        this.soundManager.playDamageSound(); 
      }
    }
  }

  checkCoinCollection() {
    this.level.coins.forEach((coin, index) => {
      if (!this.character.isDead() && this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.coinStatusBar.percentage += 20;
        if (this.coinStatusBar.percentage > 100) {
          this.coinStatusBar.percentage = 100;
        }
        this.coinStatusBar.setPercentage(this.coinStatusBar.percentage);
        this.soundManager.playCoinSound();
      }
    });
  }

  checkPoisonCollection() {
    this.level.poisons.forEach((poison, index) => {
      if (!this.character.isDead() && this.character.isColliding(poison)) {
        this.level.poisons.splice(index, 1);
        this.poisonStatusBar.percentage += 20;
        if (this.poisonStatusBar.percentage > 100) {
          this.poisonStatusBar.percentage = 100;
        }
        this.poisonStatusBar.setPercentage(this.poisonStatusBar.percentage);
        this.soundManager.playPoisonCollectSound();
      }
    });
  }

  checkPoisonGroundCollection() {
    this.level.poisonsGround.forEach((poisonGround, index) => {
      if (!this.character.isDead() && this.character.isColliding(poisonGround)) {
        this.level.poisonsGround.splice(index, 1);
        this.poisonStatusBar.percentage += 20;
        if (this.poisonStatusBar.percentage > 100) {
          this.poisonStatusBar.percentage = 100;
        }
        this.poisonStatusBar.setPercentage(this.poisonStatusBar.percentage);
        this.soundManager.playPoisonCollectSound();
      }
    });
  }

  checkFinSlap() {
    if (
      !this.character.isDead() &&
      this.keyboard.SPACE &&
      !this.character.isSlapping &&
      !this.character.isThrowing &&
      !this.character.isHurt()
    ) {
      this.character.finSlapAnimation();
      this.soundManager.playFinSlapSound(); 
      this.level.enemies.forEach((enemy) => {
        if (
          enemy instanceof Pufferfish &&
          !enemy.isDead &&
          this.character.isColliding(enemy)
        ) {
          enemy.die();
        }
      });
    }
  }

  checkBubbleHits() {
    for (let i = this.throwableObject.length - 1; i >= 0; i--) {
      let bubble = this.throwableObject[i];
      if (!this.character.isDead()) {
        for (let enemy of this.level.enemies) {
          let isStandardBubble = !bubble.isPoisonBubble;
          if (
            isStandardBubble &&
            (enemy instanceof PurpleJellyfish ||
             enemy instanceof YellowJellyfish ||
             enemy instanceof PinkJellyfish ||
             enemy instanceof GreenJellyfish) &&
            !enemy.isDead &&
            bubble.isColliding(enemy)
          ) {
            this.throwableObject.splice(i, 1);
            enemy.die();
            break;
          }
          if (
            bubble.isPoisonBubble &&
            this.level.endboss &&
            !this.level.endboss.isDead() &&
            bubble.isColliding(this.level.endboss)
          ) {
            this.level.endboss.hit();
            this.throwableObject.splice(i, 1);
            this.soundManager.playEndbossHurtSound();
            break;
          }
        }
      }
    }
  }

  checkEndbossIntro() {
    if (
      !this.character.isDead() &&
      this.character.x >= 3300 &&
      this.level.endboss &&
      !this.level.endboss.hasEntered
    ) {
      this.level.endboss.hasEntered = true;
      this.level.endboss.startIntro();
      this.soundManager.playEndbossMusic(); 
    }
  }

  checkBubbleTimeout() {
    this.throwableObject.forEach((bubble, i) => {
      if (Date.now() - bubble.birthTime > bubble.lifetime) {
        this.throwableObject.splice(i, 1);
      }
    });
  }
}