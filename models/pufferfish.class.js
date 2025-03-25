class Pufferfish extends MovableObject {
  height = 80;
  width = 80;
  isDead = false;

  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
  ];

  constructor() {
    super().loadImage(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);

    this.offset = {
      top: 70,
      right: 50,
      bottom: 70,
      left: 50
    };

    this.x = 600 + Math.random() * 1800;

    let minY = 0;
    let maxY = 380;
    this.y = minY + Math.random() * (maxY - minY);

    this.speed = 0.4 + Math.random() * 0.3;
    this.speedY = 0.5 + Math.random() * 0.3;

    this.animate();
  }

  animate() {
    this.moveLeft();

    this.swimInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_SWIMMING);

        this.y += this.speedY;

        if (this.y <= 0) {
          this.y = 0;
          this.speedY *= -1;
        }

        if (this.y >= 380) {
          this.y = 380;
          this.speedY *= -1;
        }
      }
    }, 200);
  }

  die() {
    this.isDead = true;
    this.speed = 0;
    this.speedY = 0;

    this.loadImage(this.IMAGES_DEAD);
    this.floatUp();
    clearInterval(this.swimInterval);
  }

  floatUp() {
    let interval = setInterval(() => {
      this.y -= 7;

      if (this.y <= -this.height) {
        clearInterval(interval);

        if (this.world) {
          let index = this.world.level.enemies.indexOf(this);
          if (index > -1) {
            this.world.level.enemies.splice(index, 1);
          }
        }
      }
    }, 50);
  }
}
