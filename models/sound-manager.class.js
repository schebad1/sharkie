class SoundManager {
    constructor() {
        this.backgroundMusic = new Audio('audio/ocean_sound.mp3');
        this.backgroundMusic.loop = true;  
        this.backgroundMusic.volume = 1; 
        this.backgroundMusic.pause(); 
        this.backgroundMusic.currentTime = 0; 
    }

    playBackgroundMusic() {
        this.backgroundMusic.play();
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }
}