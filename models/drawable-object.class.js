/**
 * Base class for all drawable objects in the game.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 100;
    width = 150;
  
    /**
     * Loads a single image from the given path.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
    }
  
    /**
     * Draws the current image on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  
    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
      arr.forEach((path) => {
        const img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }
  }  