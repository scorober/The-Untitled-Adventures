import Component from './Component.js'
import Vector from '../../utils/Vector.js'
import MovementComponent from './MovementComponent.js'
import AnimationComponent from './AnimationComponent.js'
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
        const t = new Vector(target.x, target.y)
        this.angle = Vector.getAngle(this.v, this.target) //TODO flip arrow sprite
        this.dir = t.subtract(this.v)
        this.dir.normalize()
        this.animComp = this.entity.getComponent(AnimationComponent)
        this.animComp.setAngle(this.angle)
        this.initial = false

        this.checkInitialState(initial)
    }

    /**
     * Called each update cycle
     * Moves projectile, if target is reached switches to impact anim and does damage.
     */
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
        }
    }

    draw() { }

    /**
     * Call on an attack or Attribute component from the caster to do damage.
     */
    impact() {

    }

    checkInitialState(initial) {
        if (initial === true) {
            this.initial = true
            const cb = () => {
                this.initial = false
                this.animComp.setAnimation(ANIMS.Projectile, null)
            }
            this.animComp.setAnimation(ANIMS.Initial, cb)
        } else {
            this.animComp.setAnimation(ANIMS.Projectile, null)
        }
    }
}