import Component from './Component.js'
import Vector from '../../utils/Vector.js'
import MovementComponent from './MovementComponent.js'
import AnimationComponent from './AnimationComponent.js'
import { ANIMATIONS as ANIMS } from '../../utils/Const.js'
import CombatComponent from './CombatComponent.js'

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
    constructor(entity, target, hasInitialAnimation, caster) {
        super(entity)
        this.caster = caster
        this.v = Vector.vectorFromEntity(entity)
        this.target = new Vector(target.x, target.y)
        const t = new Vector(target.x, target.y)
        this.angle = Vector.getAngle(this.v, this.target) //TODO flip arrow sprite
        this.dir = t.subtract(this.v).normalized()
        this.animComp = this.entity.getComponent(AnimationComponent)
        this.animComp.setAngle(this.angle)
        this.isImpacted = false
        if (hasInitialAnimation) {
            this.animComp.setAnimation(ANIMS.Initial, () => {
                this.animComp.setAnimation(ANIMS.Projectile)
            })
        } else {
            this.animComp.setAnimation(ANIMS.Projectile, this.impact)
        }
        this.isImpact = false


        //TODO: if (this is a fireball) { ... (q key)
        //this.entity.game.soundManager.FIRECAST();
        //elif arrow (e key)
        //this.entity.game.soundManager.ARROWCAST();
        //elif explosion spell thing (w key)
        this.entity.game.soundManager.ENERGYCAST()
    }

    /**
     * Called each update cycle
     * Moves projectile, if target is reached switches to impact anim and does damage.
     */
    update() {
        this.v = Vector.vectorFromEntity(this.entity)
        if (this.v.distance(this.target) < 20) {
            const cb = () => {
                this.entity.removeFromWorld = true
            }
            if(!this.isImpact)
                this.impact() //this needs to be here or else it won't happen until after the animation ends
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
        // console.log('this.v', this.v)
        const e = this.entity.game.getEntityByXYInWorld(this.v)
        this.isImpact = true
        // console.log(e)
        for(let i = 0; i < e.length; i++) { //apply AOE damage to all entities that got hit
            const next = e[i]
            if((next.UUID !== this.caster.UUID && next.UUID !== this.entity.UUID)){
                console.log(next.UUID)
                if (next.getComponent(CombatComponent)) {
                    this.entity.getComponent(CombatComponent).magicAttack(next)
                }
            }
        }
        this.entity.game.soundManager.ENERGYIMPACT()
    }
}