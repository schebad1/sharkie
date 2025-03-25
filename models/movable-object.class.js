class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  isColliding(other) {
    let leftA   = this.x + this.offset.left;
    let rightA  = this.x + this.width - this.offset.right;
    let topA    = this.y + this.offset.top;
    let bottomA = this.y + this.height - this.offset.bottom;

    let leftB   = other.x + other.offset.left;
    let rightB  = other.x + other.width - other.offset.right;
    let topB    = other.y + other.offset.top;
    let bottomB = other.y + other.height - other.offset.bottom;

    return (
      rightA >= leftB &&
      leftA <= rightB &&
      bottomA >= topB &&
      topA <= bottomB
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}