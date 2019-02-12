import Entity from '../Entity.js'
import Component from './Component.js'
import Vector from '../../utils/Vector.js';
import MovementComponent from './MovementComponent.js';
import AnimationComponent from './AnimationComponent.js';
import { ANIMATIONS as ANIMS} from '../../utils/Const.js'

export default class ProjectileBehavior extends Component {
    /**
     * This component moves a projectile and switches animations.
     * Projectiles can have 3 stages. (Initial, Projectile, and Impact)
     * Projectiles must have projectile and impact animations, initial is optional.
     * 
     * @param {Entity} entity A reference to the Entity this Component is attached to.
     * @param {Vector} target  Target of the projectile
     * @param {boolean} initial  True if this projectile has an initial animation
     */
    constructor(entity, target, initial) {
        super(entity)
        this.v = new Vector(entity.x, entity.y)
        this.target = new Vector(target.x, target.y)
        this.dir = this.target.subtract(this.v)
        this.dir.normalize()
        this.angle = Vector.getAngle(this.v, this.target)

        
        this.animComp = this.entity.getComponent(AnimationComponent)
        this.animComp.setAngle(this.angle)
        this.initial = false
        if (initial === true) {
            this.animComp.setAnimation(ANIMS.Initial)
            this.initial = true
        } else {
            this.animComp.setAnimation(ANIMS.Projectile)
            console.log(this.animComp.getCurrentAnimation())
        }
    }

    /**
     * Called each update cycle
     * Switches animations of projectile and determines if target was reached.
     */
    update() {
        if (this.initial) {
            if (this.animComp.getCurrentAnimation().isDone()) {
                this.setAnimation(ANIMS.Projectile)
                this.initial = false
            }
        }
        if (this.v.distance(this.target) < 50) {
            this.setAnimation(ANIMS.Impact)
        } else {
            this.entity.getComponent(MovementComponent).move(this.dir)
        }
    }

    draw() { }
}