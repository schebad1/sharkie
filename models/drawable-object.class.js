class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 100;
    width = 150;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this.offset) {
            ctx.beginPath();
            ctx.lineWidth = '2';
    
            ctx.strokeStyle =
                this instanceof Character ? 'blue' :
                this instanceof Pufferfish ? 'orange' :
                this instanceof PurpleJellyfish ? 'purple' :
                this instanceof YellowJellyfish ? 'gold' :
                'red';
    
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
    
    

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}