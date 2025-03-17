class World {
   character = new Character();
   enemies = [
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
    ];
    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -719),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/2.png', -719),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -719),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -719),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -719),

        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/1.png', 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 719),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/2.png', 719),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 719),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 719),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 719),

        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 719*2),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/1.png', 719*2),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 719*2),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 719*2),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 719*2),
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 719*3),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/2.png', 719*3),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 719*3),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 719*3),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 719*3),
    ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);

        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}