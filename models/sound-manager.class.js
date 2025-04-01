class SoundManager {
    constructor() {
        this.backgroundMusic = new Audio('audio/ocean_sound.mp3');
        this.collectCoinSound = new Audio('audio/collect_coin.mp3');
        this.bubbleShootSound = new Audio('audio/bubble_sound.mp3');
        this.collectPoisonSound = new Audio('audio/collect_poison.mp3');
        this.finSlapSound = new Audio('audio/finslap_sound.mp3');
        this.damageSound = new Audio('audio/damage_sound.mp3');
        this.gameOverSound = new Audio('audio/gameover_sound.mp3');
        this.winSound = new Audio('audio/win_game_sound.mp3');
        this.endbossHurtSound = new Audio('audio/hurt_endboss.mp3');
        this.endbossIntroMusic = new Audio('audio/endboss_entrance.mp3');

        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 1;
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
        this.endbossIntroMusic.loop = true;
        this.isMuted = true;
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

    playBubbleShootSound() {
        if (!this.isMuted) {
            this.bubbleShootSound.currentTime = 0;
            this.bubbleShootSound.play();
        }
    }

    playPoisonCollectSound() {
        if (!this.isMuted) {
            this.collectPoisonSound.currentTime = 0;
            this.collectPoisonSound.play();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopBackgroundMusic();
            this.stopEndbossMusic();
        } else {
            this.playBackgroundMusic();
        }
    }    

    playFinSlapSound() {
        if (!this.isMuted) {
            this.finSlapSound.currentTime = 0;
            this.finSlapSound.play();
        }
    }    

    playDamageSound() {
        if (!this.isMuted) {
            this.damageSound.currentTime = 0;
            this.damageSound.play();
        }
    }    

    playGameOverSound() {
        if (!this.isMuted) {
            this.gameOverSound.currentTime = 0;
            this.gameOverSound.play();
        }
    }   
    
    playWinSound() {
        if (!this.isMuted) {
            this.winSound.currentTime = 0;
            this.winSound.play();
        }
    }    

    playEndbossHurtSound() {
        if (!this.isMuted) {
            this.endbossHurtSound.currentTime = 0;
            this.endbossHurtSound.play();
        }
    }    

    playEndbossMusic() {
        if (!this.isMuted) {
            this.stopBackgroundMusic(); 
            this.endbossIntroMusic.currentTime = 0;
            this.endbossIntroMusic.play();
        }
    }
    
    stopEndbossMusic() {
        this.endbossIntroMusic.pause();
        this.endbossIntroMusic.currentTime = 0;
    }
}
