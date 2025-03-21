class Pufferfish extends MovableObject {
    height = 80;
    width = 80;
  
    IMAGES_SWIMMING = [
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
    ];
  
    constructor() {
      super().loadImage(
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
      );
      this.loadImages(this.IMAGES_SWIMMING);
  
      this.x = 400 + Math.random() * 2200;
      this.y = 0 + Math.random() * 220;
  
      this.speed = 0.4 + Math.random() * 0.3;
  
      this.speedY = 0.5 + Math.random() * 0.3;
  
      this.animate();
    }
  
    animate() {
      this.moveLeft();
  
      setInterval(() => {
        this.playAnimation(this.IMAGES_SWIMMING);
  
        this.y += this.speedY;
  
        if (this.y <= -100) {
          this.y = -100;
          this.speedY *= -1; 
        }
        if (this.y >= 220) {
          this.y = 220;
          this.speedY *= -1;
        }
      }, 200);
    }
  }
  