class PurpleJellyfish extends MovableObject {
    height = 100;
    width = 100;
    isDead = false;
  
    IMAGES_SWIMMING = [
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];
  
    constructor(x, y) {
      super().loadImage(this.IMAGES_SWIMMING[0]);
      this.loadImages(this.IMAGES_SWIMMING);
  
      this.x = x;
      this.y = y;
  
      this.speed = 0.3 + Math.random() * 0.2;
      this.collisionOffsetX = 50;
      this.collisionOffsetY = 50;
  
      this.animate();
    }
  
    animate() {
      this.moveLeft();
  
      this.swimInterval = setInterval(() => {
        if (!this.isDead) {
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }, 200);
    }
  }
  