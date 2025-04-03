/**
 * Displays and updates the poison status bar.
 */
class PoisonStatusBar extends DrawableObject {
  IMAGES_POISON = [
    'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
    'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
    'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
    'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
    'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
    'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
  ];

  percentage = 0;

  /**
   * Creates the poison status bar and loads images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_POISON);
    this.x = 20;
    this.y = 120;
    this.width = 200;
    this.height = 60;
    this.setPercentage(this.percentage);
  }

  /**
   * Sets the poison level and updates the bar image.
   * @param {number} percentage - Poison fill level (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES_POISON[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves image index based on poison percentage.
   * @returns {number} Index in IMAGES_POISON array.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}