import Component from './Component.js'
import Random from '../../utils/Random.js'
import Entity from '../Entity.js'
import Vector from '../../utils/Vector.js'
import MovementComponent from './MovementComponent.js'
import AnimationComponent from './AnimationComponent.js'
import ArcherData from '../../entities/characters/ArcherDefaultData.js'
import RobotData from '../../entities/characters/RobotDefaultData.js'
import MageData from '../../entities/characters/MageDefaultData.js'
import AttributeComponent from './AttributeComponent.js'

export default class SpawnComponentBehavior extends Component {
    /**
     * @param {Entity} entity A reference to the Entity this Component is attached to.
     * @param {Scene} scene The scene this spawn component will add mobs to.
     * @param {Object} spawnConfig Spawn configuration for this spawner.
     */
    constructor(entity, scene, spawnConfig, radius, difficulty) {
        super(entity)
        this.v = new Vector(this.entity.x, this.entity.y)
        this.scene = scene
        this.cfg = spawnConfig
        this.mobs = []
        this.rng = new Random()
        this.spawnTimer = 0
        this.delay = 400
        this.radius = radius
        this.difficulty = difficulty
        this.active = false
        this.mages = 0
        this.archers = 0
        this.robots = 0
        this.getMobs()
        this.generateMobs()
    }


    /**
     * Called ach update cycle.
     * Spawns mobs at a steady pace. In random order from mobs array.
     */
    update() {
        if (this.active === false) {
            const player = this.scene.getPlayer()
            const v = new Vector(player.x, player.y)
            if (v.distance(this.v) < 500) {
                this.active = true
            }
        }
        if (this.active) {
            this.spawnTimer++
            if (this.spawnTimer >= 400) {
                this.addMob()
            }
        }
    }

    draw() { }

    addMob() {
        if (this.mobs.length > 0) {
            const index = this.rng.int(0, this.mobs.length)
            const entity = this.mobs[index]
            this.scene.addEntity(entity)
            this.mobs.splice(index, 1)
        }
        this.spawnTimer = 0
    }

    /**
     * Gets mobs from spawnConfig
     */
    getMobs() {
        this.mages = Math.ceil(this.cfg.mage * this.difficulty)
        this.archers = Math.ceil(this.cfg.archer * this.difficulty)
        this.robots = Math.ceil(this.cfg.robot * this.difficulty)
    }

    /**
     * Pushes the count of each mob type into mobs array.
     */
    generateMobs() {
        for (let i = 0; i < this.mages; i++) {
            const angle = this.rng.float() * Math.PI * 2
            const r = this.rng.int(10, this.radius)
            const mage = new Entity(this.entity.game, {
                x: this.entity.x + Math.cos(angle) * r,
                y: this.entity.y + Math.sin(angle) * r,
                name : 'MAGE'
            })
            mage.addComponent(new MovementComponent(mage, MageData.Attributes))
            mage.addComponent(new AnimationComponent(mage, MageData.AnimationConfig))
            mage.addComponent(new AttributeComponent(mage, MageData.Attributes, this.scene, true))
            this.mobs.push(mage)
        }
        for (let i = 0; i < this.archers; i++) {
            const angle = this.rng.float() * Math.PI * 2
            const r = this.rng.int(10, this.radius)
            const archer = new Entity(this.entity.game, {
                x: this.entity.x + Math.cos(angle) * r,
                y: this.entity.y + Math.sin(angle) * r,
                name : 'ARCHER'
            })
            archer.addComponent(new MovementComponent(archer, ArcherData.Attributes))
            archer.addComponent(new AnimationComponent(archer, ArcherData.AnimationConfig))
            archer.addComponent(new AttributeComponent(archer, MageData.Attributes, this.scene, true))
            this.mobs.push(archer)
        }
        for (let i = 0; i < this.robots; i++) {
            const angle = this.rng.float() * Math.PI * 2
            const r = this.rng.int(10, this.radius)
            const robot = new Entity(this.entity.game, {
                x: this.entity.x + Math.cos(angle) * r,
                y: this.entity.y + Math.sin(angle) * r,
                name : 'ROBOT'
            })
            robot.addComponent(new MovementComponent(robot, RobotData.Attributes))
            robot.addComponent(new AnimationComponent(robot, RobotData.AnimationConfig))
            robot.addComponent(new AttributeComponent(robot, MageData.Attributes, this.scene, true))
            this.mobs.push(robot)
        }
    }
}