/**
 * Represents a throwable bubble or poison bubble.
 */
class ThrowableObject extends MovableObject {
    /**
     * Creates a new throwable bubble.
     * @param {number} x - X position of the bubble.
     * @param {number} y - Y position of the bubble.
     * @param {boolean} otherDirection - True if bubble goes left.
     * @param {boolean} isPoisonBubble - True for poison bubbles.
     */
    constructor(x, y, otherDirection, isPoisonBubble = false) {
      super();
      this.x = x;
      this.y = y;
      this.height = 50;
      this.width = 50;
      this.otherDirection = otherDirection;
      this.isPoisonBubble = isPoisonBubble;
      this.offset = { top: 5, right: 5, bottom: 5, left: 5 };
  
      const imagePath = isPoisonBubble
        ? 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'
        : 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
  
      this.loadImage(imagePath);
      this.birthTime = Date.now();
      this.lifetime = 1500;
      this.throw();
      this.offset = {
        top: 5,
        right: 24,
        bottom: 5,
        left: 24,
      };    
    }
  
/**
 * Starts horizontal movement and checks for collision while flying.
 */
throw() {
  let speed = this.otherDirection ? -10 : 10;

  this.bubbleInterval = setInterval(() => {
    this.x += speed;
    this.checkCollisionWithEnemies();
  }, 30);
}

/**
 * Checks collision between the bubble and valid enemies.
 * If a hit is detected, the bubble is removed and the enemy dies.
 */
checkCollisionWithEnemies() {
  if (!this.world) return;

  this.world.level.enemies.forEach(enemy => {
    if (this.isValidBubbleHit(enemy)) {
      this.handleBubbleEnemyHit(enemy);
    }
  });
}

/**
 * Returns true if the bubble can hit this enemy.
 * @param {MovableObject} enemy
 */
isValidBubbleHit(enemy) {
  const isTarget =
    enemy instanceof PurpleJellyfish ||
    enemy instanceof YellowJellyfish ||
    enemy instanceof PinkJellyfish ||
    enemy instanceof GreenJellyfish;

  return (
    !this.isPoisonBubble &&
    isTarget &&
    !enemy.isDead &&
    this.isColliding(enemy)
  );
}

/**
 * Handles what happens when a bubble hits an enemy.
 * Stops movement, removes the bubble, and triggers enemy death.
 * @param {MovableObject} enemy
 */
handleBubbleEnemyHit(enemy) {
  clearInterval(this.bubbleInterval);
  this.world.throwableObject = this.world.throwableObject.filter(obj => obj !== this);
  enemy.die();
}
}  