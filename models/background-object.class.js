/**
 * Represents a background object in the level.
 * Used for static scenery like water, rocks, etc.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
  
    /**
     * Initializes the background object.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - X position of the object.
     */
    constructor(imagePath, x) {
      super();
      this.loadImage(imagePath);
      this.y = 0; 
      this.x = x;
    }
  }  