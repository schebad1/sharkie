/**
 * Displays and updates the main health status bar.
 */
class StatusBar extends DrawableObject {
  IMAGES = [
    'img/4. Marcadores/green/Life/0_  copia 3.png',
    'img/4. Marcadores/green/Life/20_ copia 4.png',
    'img/4. Marcadores/green/Life/40_  copia 3.png',
    'img/4. Marcadores/green/Life/60_  copia 3.png',
    'img/4. Marcadores/green/Life/80_  copia 3.png',
    'img/4. Marcadores/green/Life/100_  copia 2.png',
  ];

  percentage = 100;

  /**
   * Initializes the status bar and sets full health.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets current health and updates image.
   * @param {number} percentage - Health value (0–100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines image index based on current percentage.
   * @returns {number} Index for image
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage > 80) return 4;
    if (this.percentage > 60) return 3;
    if (this.percentage > 40) return 2;
    if (this.percentage > 0) return 1;
    return 0;
  }
}