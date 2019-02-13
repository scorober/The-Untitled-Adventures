import Component from './Component.js'
import Vector from '../../utils/Vector.js'
import {STATES, ANIMATIONS} from '../../utils/Const.js'
import AttributeComponent from './AttributeComponent.js'
import AnimationComponent from './AnimationComponent.js'


export default class CombatComponent extends Component {
    constructor(entity, attr) {
        super(entity)
        this.hasTarget = false
        this.attackTarget = undefined
        if(null != attr){ this.attributeComponent = attr }
        this.attackTimer = attr.ATTACKRATE
    }

    /**
     * If the entitiy has been assigned a target, update its attack clock and see if it can attack
     */
    update(){
        if(this.hasTarget) {
            this.attackTimer -= this.entity.game.clockTick

            if (this.attackTimer < 0) {


                const v1 = Vector.vectorFromEntity(this.entity)
                const v2 = Vector.vectorFromEntity(this.attackTarget)
                const dist = v1.distance(v2)

                if (dist < this.attributeComponent.RANGE) {

                    this.setAttacking()

                    const turnDamage = this.attributeComponent.calculatePhysicalDamage()
                    const isDead = this.attackTarget.getComponent(AttributeComponent).applyPhysicalDamage(turnDamage)

                    if(isDead){
                        this.removeTarget()
                    }

                } else {
                    this.unsetAttacking()
                }
                this.attackTimer = this.attributeComponent.ATTACKRATE
            }
        }
    }

    setAttacking(){
        this.entity.states[STATES.Attacking] = true

        //SET THE ANIMATION HERE
    }

    unsetAttacking(){
        this.entity.states[STATES.Attacking] = false

        //SET REGULAR ANIMATION HERE
    }


    /**
     * Sets a new attack target
     * @param entity the new target
     */
    setAttackTarget(entity){
        //TODO: Check if user is player and entity is mariott to prevent friendly fire. Maybe filter in previous step?
        this.attackTarget = entity
        this.hasTarget = true
    }

    /**
     * Removes the current attack target
     */
    removeTarget(){
        this.attackTarget = undefined
        this.hasTarget = false
        this.entity.states[STATES.Attacking] = false
    }
}
