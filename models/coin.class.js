/**
 * Represents a collectible coin with spinning animation.
 */
class Coin extends MovableObject {
    width = 50;
    height = 50;
  
    IMAGES = [
      'img/4. Marcadores/1. Coins/1.png',
      'img/4. Marcadores/1. Coins/2.png',
      'img/4. Marcadores/1. Coins/3.png',
      'img/4. Marcadores/1. Coins/4.png',
    ];
  
    /**
     * Creates a coin at a given position.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    constructor(x, y) {
      super().loadImage(this.IMAGES[0]);
      this.loadImages(this.IMAGES);
      this.x = x;
      this.y = y;
      this.animate();
      this.offset = {
        top: 23,
        right: 24,
        bottom: 23,
        left: 24,
      };      
    }
  
    /**
     * Loops the coin animation.
     */
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES);
      }, 150);
    }
  }  