/**
 * Central entry point for all collision-related checks in the game.
 * @param {World} world - The current game world instance.
 */
function checkCollisions(world) {
    checkEnemyCollisions(world);
    checkEndbossCollision(world);
  }
  
  /**
   * Checks collision between the character and all regular enemies.
   * @param {World} world
   */
  function checkEnemyCollisions(world) {
    world.level.enemies.forEach((enemy) => {
      if (
        !world.character.isDead() &&
        !world.character.isSlapping &&
        !enemy.isDead &&
        world.character.isColliding(enemy)
      ) {
        world.character.hit(enemy);
        world.statusBar.setPercentage(world.character.energy);
        world.soundManager.playDamageSound();
      }
    });
  }
  
  /**
   * Checks collision between the character and the endboss.
   * @param {World} world
   */
  function checkEndbossCollision(world) {
    const boss = world.level.endboss;
  
    if (
      !world.character.isDead() &&
      boss &&
      !boss.isDead() &&
      world.character.isColliding(boss)
    ) {
      world.character.hit(boss);
      world.statusBar.setPercentage(world.character.energy);
      world.soundManager.playDamageSound();
    }
  }
  
  /**
   * Handles the fin slap attack and stores the hit enemy after animation ends.
   * @param {World} world
   */
  function checkFinSlap(world) {
    if (
      !world.character.isDead() &&
      world.keyboard.SPACE &&
      !world.character.isSlapping &&
      !world.character.isThrowing &&
      !world.character.isHurt()
    ) {
      world.character.finSlapAnimation();
      world.soundManager.playFinSlapSound();
      world.level.enemies.forEach((enemy) => {
        if (
          enemy instanceof Pufferfish &&
          !enemy.isDead &&
          world.character.isColliding(enemy)
        ) {
          world.character.pendingSlapHit = enemy;
        }
      });
    }
  }
  
  /**
   * Checks all active bubbles for collisions with enemies or boss.
   * @param {World} world
   */
  function checkBubbleHits(world) {
    for (let i = world.throwableObject.length - 1; i >= 0; i--) {
      const bubble = world.throwableObject[i];
      if (world.character.isDead()) continue;
  
      if (checkBubbleEnemyHit(world, bubble, i)) continue;
      checkBubbleBossHit(world, bubble, i);
    }
  }
  
  /**
   * Checks if a standard bubble hits any jellyfish-type enemy.
   * @param {World} world
   * @param {ThrowableObject} bubble
   * @param {number} index
   * @returns {boolean}
   */
  function checkBubbleEnemyHit(world, bubble, index) {
    for (const enemy of world.level.enemies) {
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
        if (bubble.bubbleInterval) clearInterval(bubble.bubbleInterval);
        world.throwableObject.splice(index, 1);
        enemy.die();
        return true;
      }
    }
    return false;
  }
  
  /**
   * Checks if a poison bubble hits the endboss.
   * @param {World} world
   * @param {ThrowableObject} bubble
   * @param {number} index
   */
  function checkBubbleBossHit(world, bubble, index) {
    const boss = world.level.endboss;
  
    if (
      bubble.isPoisonBubble &&
      boss &&
      !boss.isDead() &&
      bubble.isColliding(boss)
    ) {
      boss.hit();
      world.throwableObject.splice(index, 1);
      world.soundManager.playEndbossHurtSound();
    }
  }  