class SoundManager {
    constructor() {
        this.backgroundMusic = new Audio('audio/ocean_sound.mp3');
        this.collectCoinSound = new Audio('audio/collect_coin.mp3');

        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 1;
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;

        this.isMuted = false; 
    }

    playBackgroundMusic() {
        if (!this.isMuted) { 
            this.backgroundMusic.play();
        }
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }

    playCoinSound() {
        if (!this.isMuted) { 
            this.collectCoinSound.currentTime = 0;
            this.collectCoinSound.play();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopBackgroundMusic();
        } else {
            this.playBackgroundMusic();
        }
    }
    
}