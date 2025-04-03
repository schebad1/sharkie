/**
 * Represents a game level with all objects and enemies.
 */
class Level {
    enemies;
    backgroundObjects;
    coins;
    poisons;
    poisonsGround;
    level_end_x = 4000;
    endboss = null;
  
    /**
     * Initializes the level with given objects and sets endboss.
     * @param {Array} enemies - All enemy objects.
     * @param {Array} backgroundObjects - Visual background elements.
     * @param {Array} coins - Collectible coins.
     * @param {Array} poisons - Collectible poison items.
     * @param {Array} poisonsGround - Ground-based poison items.
     */
    constructor(enemies, backgroundObjects, coins, poisons, poisonsGround) {
      this.enemies = enemies;
      this.backgroundObjects = backgroundObjects;
      this.coins = coins;
      this.poisons = poisons;
      this.poisonsGround = poisonsGround;
      this.endboss = this.enemies.find(e => e instanceof Endboss);
    }
  }  