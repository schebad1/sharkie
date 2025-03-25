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
    const a = {
        x: this.x + (this.offset?.left || 0),
        y: this.y + (this.offset?.top || 0),
        width: this.width - (this.offset?.left || 0) - (this.offset?.right || 0),
        height: this.height - (this.offset?.top || 0) - (this.offset?.bottom || 0),
    };

    const b = {
        x: other.x + (other.offset?.left || 0),
        y: other.y + (other.offset?.top || 0),
        width: other.width - (other.offset?.left || 0) - (other.offset?.right || 0),
        height: other.height - (other.offset?.top || 0) - (other.offset?.bottom || 0),
    };

    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
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