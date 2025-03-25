class YellowJellyfish extends MovableObject {
    height = 75;
    width = 75;
    isDead = false;
  
    IMAGES_SWIMMING = [
      'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];
  
    IMAGES_DIE = [
      'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
      'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
      'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
      'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
    ];
  
    constructor(x, y) {
      super().loadImage(this.IMAGES_SWIMMING[0]);
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DIE);
  
      this.x = x;
      this.y = y;
  
      this.speed = 0.3 + Math.random() * 0.2;
      this.offset = {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25
      };       
  
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
  
    die() {
      this.isDead = true;
      clearInterval(this.swimInterval);
      this.speed = 0;
  
      let i = 0;
      setInterval(() => {
        this.img = this.imageCache[this.IMAGES_DIE[i]];
        i = (i + 1) % this.IMAGES_DIE.length;
      }, 120);
  
      setTimeout(() => {
        if (this.world) {
          const index = this.world.level.enemies.indexOf(this);
          if (index > -1) {
            this.world.level.enemies.splice(index, 1);
          }
        }
      }, 1000);
    }
  }
  