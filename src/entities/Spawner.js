import Entity from './Entity.js'
import Vector from '../utils/Vector.js';
import { ASSET_PATHS } from '../utils/Const.js'
import Mage from './characters/Mage.js';
import Random from '../utils/Random.js';
import Archer from './characters/Archer.js';
import Robot from './characters/Robot.js';


export default class Spawner extends Entity {
    /**
     * 
     * @param {*} game 
     * @param {*} pos Global position of spawner.
     * @param {*} type  Holds proportions of mob type
     * @param {*} difficulty Scalar difficulty value (amount of total mobs now).
     * @param {*} radius Radius to enclose area where mobs can spawn.
     */
    constructor(game, pos, type, difficulty, radius) {
        super(game, pos)
        this.v = new Vector(pos.x, pos.y)
        this.mages = Math.ceil(type.mage * difficulty)
        this.archers = Math.ceil(type.archer * difficulty)
        this.robots = Math.ceil(type.robot * difficulty)
        this.mobs = []
        this.delay = 400
        this.spawnTimer = 0
        this.rng = new Random()
        this.radius = radius
        this.generateMobs()
    }

    /**
     * Spawns mobs at a steady pace. In random order from mobs array.
     */
    update() {
        this.spawnTimer++
        if (this.spawnTimer >= 400) {
            if(this.mobs.length > 0) {
                const index = this.rng.int(0, this.mobs.length)
                const entity = this.mobs[index]
                this.game.sceneManager.currentScene.addEntity(entity)
                this.mobs.splice(index, 1)
            }
            this.spawnTimer = 0
        }
    }

    draw() {

    }

    /**
     * Pushes the count of each mob type into mobs array.
     */
    generateMobs() {
        for (let i = 0; i < this.mages; i++) {
            const angle = this.rng.float() * Math.PI * 2
            const r= this.rng.int(10, this.radius)
            this.mobs.push(new Mage(this.game, this.game.getAsset(ASSET_PATHS.Mage), 
                {
                    x: this.x + Math.cos(angle) * r,
                    y: this.y + Math.sin(angle) * r
                }))
        }
        for (let i = 0; i < this.archers; i++) {
            const angle = this.rng.float() * Math.PI * 2
            const r= this.rng.int(10, this.radius)
            this.mobs.push(new Archer(this.game, this.game.getAsset(ASSET_PATHS.Archer), 
                {
                    x: this.x + Math.cos(angle) * r,
                    y: this.y + Math.sin(angle) * r
                }))
        }
        for (let i = 0; i < this.robots; i++) {
            const angle = this.rng.float() * Math.PI * 2
            const r= this.rng.int(10, this.radius)
            this.mobs.push(new Robot(this.game, this.game.getAsset(ASSET_PATHS.Robot), 
                {
                    x: this.x + Math.cos(angle) * r,
                    y: this.y + Math.sin(angle) * r
                }))
        }
    }
}