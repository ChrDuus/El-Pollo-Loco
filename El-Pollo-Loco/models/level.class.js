/**
 * Represents a game level containing all objects and entities required for gameplay.
 */
class Level {
    /** @type {MovableObject[]} All enemy instances in the level */
    enemies;

    /** @type {Cloud[]} All cloud objects in the level background */
    clouds;

    /** @type {BackgroundObject[]} All background layers and decorations */
    backgroundObjects;

    /** @type {ThrowableObject[]} All collectible bottles in the level */
    bottles;

    /** @type {Coin[]} All collectible coins in the level */
    coins;

    /** @type {Endboss} The endboss instance of the level */
    endboss;

    /** @type {number} The x-coordinate at which the level ends */
    level_end_x = 719 * 3.1;

    /** @type {World} Reference to the world object this level belongs to */
    world;

    /**
     * Creates a new level with all its objects.
     * @param {MovableObject[]} enemies - Array of enemy objects
     * @param {Cloud[]} clouds - Array of cloud objects
     * @param {BackgroundObject[]} backgroundObjects - Array of background layers
     * @param {ThrowableObject[]} bottles - Array of bottle objects
     * @param {Coin[]} coins - Array of coin objects
     * @param {Endboss} endboss - The endboss for the level
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    }
}
