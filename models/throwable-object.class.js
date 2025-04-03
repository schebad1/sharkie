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
    }
  
    /**
     * Starts horizontal movement of the bubble.
     */
    throw() {
      let speed = this.otherDirection ? -10 : 10;
      setInterval(() => {
        this.x += speed;
      }, 30);
    }
  }  