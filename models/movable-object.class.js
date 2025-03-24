class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;

    isColliding(object) {
        return (
          this.x + 40 + (this.width - 80) >= object.x &&
          this.x + 40 < object.x + object.width - 10 &&
          this.y + 160 + (this.height - 240) > object.y &&
          this.y + 160 < object.y + object.height - 20
        );
      } 

      isCollidingWithOffset(object, offsetX = 0, offsetY = 0) {
        return (
            this.x + offsetX < object.x + object.width - offsetX &&
            this.x + this.width - offsetX > object.x + offsetX &&
            this.y + offsetY < object.y + object.height - offsetY &&
            this.y + this.height - offsetY > object.y + offsetY
        );
    }    

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
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
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed
        }, 1000 / 60);
    }
}