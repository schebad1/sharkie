class Endboss extends MovableObject {
    height = 400;
    width = 400;
    isActive = false;
    hasEntered = false;

    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
    ];

    IMAGES_INTRO = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    constructor() {
        super().loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 3700;
        this.y = -150;
    }

    startIntro() {
        this.hasEntered = true;
        let i = 0;
        let steps = this.IMAGES_INTRO.length; 
        let distance = 200;                    
        let stepSize = distance / steps;       
      
        let introInterval = setInterval(() => {
          this.img = this.imageCache[this.IMAGES_INTRO[i]];
          this.y += stepSize;
          i++;
      
          if (i >= steps) {
            clearInterval(introInterval);
            this.y = 0;         
            this.startFloating();
            this.isActive = true;
          }
        }, 150);
      }
      
      

    startFloating() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 200);
    }
}
