class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(imagePath, x) {
        super(); 
        this.loadImage(imagePath);
        this.y = 0; // Damit alle Objekte oben starten – und du kannst sie dann im Level positionieren.
        this.x = x;
    }
}
