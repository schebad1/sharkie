class PoisonStatusBar extends DrawableObject {
  IMAGES_POISON = [
    "img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];
  percentage = 0;


  constructor() {
    super();
    this.loadImages(this.IMAGES_POISON);
    this.x = 20;
    this.y = 120;
    this.width = 200;
    this.height = 60;
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_POISON[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
