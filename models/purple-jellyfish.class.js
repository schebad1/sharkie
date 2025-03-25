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

    IMAGES_DIE = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
      ];
  
    constructor(x, y) {
      super().loadImage(this.IMAGES_SWIMMING[0]);
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DIE);
  
      this.x = x;
      this.y = y;
  
      this.speed = 0.3 + Math.random() * 0.2;
      this.collisionOffsetX = 50;
      this.collisionOffsetY = 50;
  
      this.animate();
      this.offset = {
        top: 70,
        right: 50,
        bottom: 70,
        left: 50
      };  
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
  