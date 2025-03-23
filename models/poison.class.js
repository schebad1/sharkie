class Poison extends MovableObject {

    width = 50;
    height = 50;
    
    IMAGES_POISON = [
        'img/4. Marcadores/Poison/Animada/1.png',
        'img/4. Marcadores/Poison/Animada/2.png',
        'img/4. Marcadores/Poison/Animada/3.png',
        'img/4. Marcadores/Poison/Animada/4.png',
        'img/4. Marcadores/Poison/Animada/5.png',
        'img/4. Marcadores/Poison/Animada/6.png',
        'img/4. Marcadores/Poison/Animada/7.png',
        'img/4. Marcadores/Poison/Animada/8.png',
    ];
    
    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Poison/Animada/1.png');
        this.loadImages(this.IMAGES_POISON);
        this.x = x;
        this.y = y;
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_POISON);
        }, 150);
    }
}
