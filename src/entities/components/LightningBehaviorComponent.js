import Entity from '../Entity.js'
import Component from './Component.js'
import Vector from '../../utils/Vector.js'
import MovementComponent from './MovementComponent.js'
import AnimationComponent from './AnimationComponent.js'
import Random from '../../utils/Random.js'
import LightningData from '../effects/LightningEffectDefaultData.js'
import {
    ANIMATIONS as ANIMS
} from '../../utils/Const.js'

export default class LightningBehaviorComponent extends Component {
    /**
     * A chain lightning spell
     * @param {Entity} entity 
     * @param {Object} target 
     */
    constructor(entity, target) {
        super(entity)
        this.v = new Vector(entity.x, entity.y)
        this.target = new Vector(target.x, target.y)
        const t = new Vector(target.x, target.y)
        this.angle = Vector.getAngle(this.v, this.target) //TODO flip arrow sprite
        this.dir = t.subtract(this.v)
        this.dir.normalize()
        this.count = 0
        this.delay = 200
        this.rng = new Random()
        this.animComp = this.entity.getComponent(AnimationComponent)
    }

    update() {
        this.v = new Vector(this.entity.x, this.entity.y)
        if (this.v.distance(this.target) < 50) {
            const cb = () => {
                this.impact()
                this.entity.removeFromWorld = true
            }
            this.animComp.setAnimation(ANIMS.Impact, cb)
        } else {
            this.entity.getComponent(MovementComponent).move(this.dir)
            if (this.count >= this.delay) {
                this.dropCharge()
                this.count = 0
            }
            this.count += this.entity.game.clockTick * 1000
        }
    }

    draw() {

    }

    dropCharge() {
        //TODO fix random ranges based on direction
        const dx = this.rng.int(-50, 50)
        const dy = this.rng.int(-50, 50)
        const charge = new Entity(this.entity.game, {x: this.v.x + dx, y: this.v.y + dy})
        charge.addComponent(new AnimationComponent(charge, LightningData.AnimationConfig))
        const cb = () => {
            charge.removeFromWorld = true
        }
        charge.getComponent(AnimationComponent).setAnimation(ANIMS.Projectile, cb)
        this.entity.game.sceneManager.currentScene.addEntity(charge)
    }

    //TODO do damage, attach to attack component.
    impact() {
        
    }

}