class PoisonGround extends MovableObject {

    width = 50;
    height = 50;

    IMAGES_POISON_RIGHT_LEFT = [
        'img/4. Marcadores/Poison/Dark - Left.png',
        'img/4. Marcadores/Poison/Dark - Right.png',
    ];

    
    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Poison/Animada/1.png');
        this.loadImages(this.IMAGES_POISON_RIGHT_LEFT);
        this.x = x;
        this.y = y;
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON_RIGHT_LEFT);
        }, 800);
    }
}
