class World {
   character = new Character();
   level = level1;
   canvas;
   ctx;
   keyboard;
   camera_x = 0;
   statusBar = new StatusBar();
   coinStatusBar = new CoinStatusBar();
   poisonStatusBar = new PoisonStatusBar();
   throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
           this.checkCollisions();
           this.checkCoinCollection();
           this.checkPoisonCollection();
           this.checkPoisonGroundCollection(); 
           this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.character.isThrowing && !this.character.isHurt()) { 
            this.character.throwAnimation();
    
            setTimeout(() => {
                let bubble = new ThrowableObject(
                    this.character.x + (this.character.otherDirection ? -100 : 200), 
                    this.character.y + 150,
                    this.character.otherDirection 
                );
                this.throwableObject.push(bubble);
            }, 400); 
        }
    }
    

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCoinCollection() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
    
                this.coinStatusBar.percentage += 25; 
                if (this.coinStatusBar.percentage > 100) {
                    this.coinStatusBar.percentage = 100; 
                }
                this.coinStatusBar.setPercentage(this.coinStatusBar.percentage);
            }
        });
    }

    checkPoisonCollection() {
        this.level.poisons.forEach((poison, index) => {
            if (this.character.isColliding(poison)) {
                this.level.poisons.splice(index, 1); 
    
                this.poisonStatusBar.percentage += 25; 
                if (this.poisonStatusBar.percentage > 100) {
                    this.poisonStatusBar.percentage = 100;
                }
                this.poisonStatusBar.setPercentage(this.poisonStatusBar.percentage);
            }
        });
    }
    
    checkPoisonGroundCollection() {
        this.level.poisonsGround.forEach((poisonGround, index) => {
            if (this.character.isColliding(poisonGround)) {
                this.level.poisonsGround.splice(index, 1); 
        
                this.poisonStatusBar.percentage += 25; 
                if (this.poisonStatusBar.percentage > 100) {
                    this.poisonStatusBar.percentage = 100;
                }
                this.poisonStatusBar.setPercentage(this.poisonStatusBar.percentage);
            }
        });
    }
    
    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.poisonStatusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons); 
        this.addObjectsToMap(this.level.poisonsGround); 
        this.addObjectsToMap(this.throwableObject);
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
        if (mo.img && mo.img.complete) { 
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);

           
            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
    }
    
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}