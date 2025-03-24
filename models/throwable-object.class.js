class ThrowableObject extends MovableObject {

    constructor(x, y, otherDirection) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.otherDirection = otherDirection; 
        this.throw();
    }
    

    throw() {
        let speed = 10;
        if (this.otherDirection) {
            speed = -10; 
        }
        setInterval(() => {
            this.x += speed;
        }, 30);
    }
}