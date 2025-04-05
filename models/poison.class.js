/**
 * Represents a collectible poison object with idle animation.
 */
class Poison extends MovableObject {
    width = 50;
    height = 50;
  
    IMAGES_POISON = [
      'img/4. Marcadores/Poison/Animada/1.png',
      'img/4. Marcadores/Poison/Animada/2.png',
      'img/4. Marcadores/Poison/Animada/3.png',
      'img/4. Marcadores/Poison/Animada/4.png',
      'img/4. Marcadores/Poison/Animada/5.png',
      'img/4. Marcadores/Poison/Animada/6.png',
      'img/4. Marcadores/Poison/Animada/7.png',
      'img/4. Marcadores/Poison/Animada/8.png',
    ];
  
    /**
     * Initializes the poison item at a given position.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    constructor(x, y) {
      super().loadImage(this.IMAGES_POISON[0]);
      this.loadImages(this.IMAGES_POISON);
      this.x = x;
      this.y = y;
      this.animate();
      this.offset = {
        top: 35,
        right: 20,
        bottom: 15,
        left: 20,
      };
    }
  
    /**
     * Plays idle animation in a loop.
     */
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_POISON);
      }, 150);
    }
  }  