class ThrowableObject extends MovableObject {

    constructor(x, y, otherDirection, isPoisonBubble = false) {
        super();
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.otherDirection = otherDirection; 
        this.isPoisonBubble = isPoisonBubble;
        this.offset = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        };

        let imagePath;
        if (isPoisonBubble) {
            imagePath = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'; 
        } else {
            imagePath = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
        }

        this.loadImage(imagePath);
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