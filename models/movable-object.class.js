class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 100;
    width = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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