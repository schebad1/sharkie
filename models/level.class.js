class Level {
    enemies;
    backgroundObjects;
    coins;
    poisons;
    poisonsGround;
    level_end_x = 4000;
    endboss = null;

    constructor(enemies, backgroundObjects, coins, poisons, poisonsGround) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poisons = poisons;
        this.poisonsGround = poisonsGround;
        this.endboss = this.enemies.find(e => e instanceof Endboss);
    }
}