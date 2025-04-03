/**
 * World class manages the overall game logic, rendering and updates.
 * It connects the character, enemies, UI and input.
 */
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

  /**
   * Initializes the game world and starts the main loop.
   * 
   * @param {HTMLCanvasElement} canvas - The game's rendering canvas.
   * @param {Object} keyboard - Keyboard input manager.
   * @param {Object} soundManager - Handles game sound effects.
   */
  constructor(canvas, keyboard, soundManager) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundManager = soundManager;

    this.draw();
    this.setWorld();
    this.run();
    this.soundManager.playBackgroundMusic();
  }

  /**
   * Assigns the world reference to the character and all enemies.
   */
  setWorld() {
    this.character.world = this;

    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Starts the main game loop, performing regular checks.
   */
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

  /**
   * Draws all visible objects on the canvas.
   * Handles camera movement and UI overlays.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateCameraPosition();

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);

    this.drawStatusBars();

    this.ctx.translate(this.camera_x, 0);
    this.drawWorldObjects();
    this.ctx.translate(-this.camera_x, 0);

    this.animationFrameId = requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Updates the camera position based on the character's location.
   */
  updateCameraPosition() {
    this.camera_x = -this.character.x;
    const maxCameraX = -(this.level.level_end_x - this.canvas.width + 150);

    if (this.camera_x < maxCameraX) {
      this.camera_x = maxCameraX;
    }
  }

  /**
   * Draws status bars like health, coins and poison.
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.poisonStatusBar);
  }

  /**
   * Draws character, enemies, items and thrown objects.
   */
  drawWorldObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.poisons);
    this.addObjectsToMap(this.level.poisonsGround);
    this.addObjectsToMap(this.throwableObject);
  }


 /**
 * Stops the game loop and all ongoing animations/intervals.
 */
stopGame() {
  clearInterval(this.gameInterval);
  cancelAnimationFrame(this.animationFrameId);

  if (this.character?.stopIntervals) {
    this.character.stopIntervals();
  }
}

/**
 * Adds a list of drawable objects to the canvas map.
 * 
 * @param {Array} objects - Objects to be drawn.
 */
addObjectsToMap(objects) {
  objects.forEach((obj) => {
    this.addToMap(obj);
  });
}

/**
 * Adds a single object to the canvas, flipping it if needed.
 * 
 * @param {Object} mo - Movable object with image and draw method.
 */
addToMap(mo) {
  if (mo.img?.complete) {
    if (mo.otherDirection) this.flipImage(mo);

    mo.draw(this.ctx);

    if (mo.otherDirection) this.flipImageBack(mo);
  }
}

/**
 * Flips an image horizontally by manipulating the canvas context.
 * 
 * @param {Object} mo - Object to flip.
 */
flipImage(mo) {
  this.ctx.save();
  this.ctx.translate(mo.width, 0);
  this.ctx.scale(-1, 1);
  mo.x *= -1;
}

/**
 * Restores original object position and canvas context after flip.
 * 
 * @param {Object} mo - Object to flip back.
 */
flipImageBack(mo) {
  mo.x *= -1;
  this.ctx.restore();
}

/**
 * Checks if the player is dead and triggers the Game Over screen.
 */
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

/**
 * Checks if the endboss is defeated and triggers the win screen.
 */
checkGameWin() {
  const boss = this.level.endboss;

  if (boss && boss.isDead() && !this.winTriggered) {
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

/**
 * Handles input for throwing regular or poison bubbles.
 */
checkThrowObjects() {
  if (this.canThrowBubble()) {
    this.throwBubble();
  }

  if (this.canThrowPoisonBubble()) {
    this.throwPoisonBubble();
  }
}

/**
 * Checks if the character can throw a normal bubble.
 * @returns {boolean}
 */
canThrowBubble() {
  return (
    !this.character.isDead() &&
    this.keyboard.D &&
    !this.character.isThrowing &&
    !this.character.isHurt() &&
    !this.character.otherDirection
  );
}

/**
 * Checks if the character can throw a poison bubble.
 * @returns {boolean}
 */
canThrowPoisonBubble() {
  return (
    !this.character.isDead() &&
    this.keyboard.F &&
    !this.character.isThrowingSpecial &&
    !this.character.isHurt() &&
    !this.character.otherDirection &&
    this.poisonStatusBar.percentage >= 20
  );
}

/**
 * Throws a regular bubble and plays sound.
 */
throwBubble() {
  this.character.throwAnimation();

  setTimeout(() => {
    const bubble = new ThrowableObject(
      this.character.x + 200,
      this.character.y + 150,
      false,
      false
    );

    this.throwableObject.push(bubble);
    this.soundManager.playBubbleShootSound();
  }, 400);
}

/**
 * Throws a poison bubble, updates poison bar and plays sound.
 */
throwPoisonBubble() {
  this.character.throwPoisonBubbleAnimation();

  setTimeout(() => {
    const poisonBubble = new ThrowableObject(
      this.character.x + 200,
      this.character.y + 150,
      false,
      true
    );

    this.throwableObject.push(poisonBubble);
    this.soundManager.playBubbleShootSound();

    this.updatePoisonStatusAfterShot();
  }, 400);
}

/**
 * Updates poison shot counter and status bar after using a poison bubble.
 */
updatePoisonStatusAfterShot() {
  this.poisonShotsUsed++;

  if (this.poisonShotsUsed >= 2) {
    this.poisonShotsUsed = 0;
    this.poisonStatusBar.percentage -= 20;

    if (this.poisonStatusBar.percentage < 0) {
      this.poisonStatusBar.percentage = 0;
    }

    this.poisonStatusBar.setPercentage(this.poisonStatusBar.percentage);
  }
}

/**
 * Checks collision between character and all enemies (including boss).
 */
checkCollisions() {
  this.checkEnemyCollisions();
  this.checkEndbossCollision();
}

/**
 * Checks collision between character and regular enemies.
 */
checkEnemyCollisions() {
  this.level.enemies.forEach((enemy) => {
    if (
      !this.character.isDead() &&
      !this.character.isSlapping &&
      !enemy.isDead &&
      this.character.isColliding(enemy)
    ) {
      this.character.hit(enemy);
      this.statusBar.setPercentage(this.character.energy);
      this.soundManager.playDamageSound();
    }
  });
}

/**
 * Checks collision between character and the endboss.
 */
checkEndbossCollision() {
  const boss = this.level.endboss;

  if (
    !this.character.isDead() &&
    boss &&
    !boss.isDead() &&
    this.character.isColliding(boss)
  ) {
    this.character.hit(boss);
    this.statusBar.setPercentage(this.character.energy);
    this.soundManager.playDamageSound();
  }
}

/**
 * Checks and handles coin collection by the character.
 */
checkCoinCollection() {
  this.level.coins.forEach((coin, index) => {
    if (!this.character.isDead() && this.character.isColliding(coin)) {
      this.level.coins.splice(index, 1);
      this.increaseBar(this.coinStatusBar, 20);
      this.soundManager.playCoinSound();
    }
  });
}

/**
 * Checks and handles poison pickup from floating poisons.
 */
checkPoisonCollection() {
  this.level.poisons.forEach((poison, index) => {
    if (!this.character.isDead() && this.character.isColliding(poison)) {
      this.level.poisons.splice(index, 1);
      this.increaseBar(this.poisonStatusBar, 20);
      this.soundManager.playPoisonCollectSound();
    }
  });
}

/**
 * Checks and handles poison pickup from ground poisons.
 */
checkPoisonGroundCollection() {
  this.level.poisonsGround.forEach((poison, index) => {
    if (!this.character.isDead() && this.character.isColliding(poison)) {
      this.level.poisonsGround.splice(index, 1);
      this.increaseBar(this.poisonStatusBar, 20);
      this.soundManager.playPoisonCollectSound();
    }
  });
}

/**
 * Increases a status bar by a certain amount (max 100).
 * 
 * @param {Object} bar - Status bar object with `percentage`.
 * @param {number} value - Amount to increase.
 */
increaseBar(bar, value) {
  bar.percentage += value;
  if (bar.percentage > 100) bar.percentage = 100;
  bar.setPercentage(bar.percentage);
}

/**
 * Checks if slap attack is triggered and affects enemies.
 */
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

/**
 * Checks for hits between bubbles and enemies or boss.
 */
checkBubbleHits() {
  for (let i = this.throwableObject.length - 1; i >= 0; i--) {
    let bubble = this.throwableObject[i];
    if (this.character.isDead()) continue;

    if (this.checkBubbleEnemyHit(bubble, i)) continue;
    this.checkBubbleBossHit(bubble, i);
  }
}

/**
 * Handles standard bubble hit on jellyfish enemies.
 */
checkBubbleEnemyHit(bubble, index) {
  for (let enemy of this.level.enemies) {
    const isTarget =
      enemy instanceof PurpleJellyfish ||
      enemy instanceof YellowJellyfish ||
      enemy instanceof PinkJellyfish ||
      enemy instanceof GreenJellyfish;

    if (
      !bubble.isPoisonBubble &&
      isTarget &&
      !enemy.isDead &&
      bubble.isColliding(enemy)
    ) {
      this.throwableObject.splice(index, 1);
      enemy.die();
      return true;
    }
  }
  return false;
}

/**
 * Handles poison bubble hit on the endboss.
 */
checkBubbleBossHit(bubble, index) {
  const boss = this.level.endboss;

  if (
    bubble.isPoisonBubble &&
    boss &&
    !boss.isDead() &&
    bubble.isColliding(boss)
  ) {
    boss.hit();
    this.throwableObject.splice(index, 1);
    this.soundManager.playEndbossHurtSound();
  }
}

/**
 * Triggers endboss intro when the character enters the zone.
 */
checkEndbossIntro() {
  const boss = this.level.endboss;

  if (
    !this.character.isDead() &&
    this.character.x >= 3300 &&
    boss &&
    !boss.hasEntered
  ) {
    boss.hasEntered = true;
    boss.startIntro();
    this.soundManager.playEndbossMusic();
  }
}

/**
 * Removes bubbles that have exceeded their lifetime.
 */
checkBubbleTimeout() {
  this.throwableObject = this.throwableObject.filter((bubble) => {
    return Date.now() - bubble.birthTime <= bubble.lifetime;
  });
}
}