/**
 * Represents a ground-level poison item with flickering animation.
 */
class PoisonGround extends MovableObject {
    width = 50;
    height = 50;
  
    IMAGES_POISON_RIGHT_LEFT = [
      'img/4. Marcadores/Poison/Dark - Left.png',
      'img/4. Marcadores/Poison/Dark - Right.png',
    ];
  
    /**
     * Creates the poison ground object at given position.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    constructor(x, y) {
      super().loadImage('img/4. Marcadores/Poison/Animada/1.png');
      this.loadImages(this.IMAGES_POISON_RIGHT_LEFT);
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
     * Switches between left/right poison sprites.
     */
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_POISON_RIGHT_LEFT);
      }, 800);
    }
  }  