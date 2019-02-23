import Component from './Component.js'
import AttributeComponent from './AttributeComponent.js'
import Vector from '../../utils/Vector.js'
import AnimationComponent from './AnimationComponent.js'
import { ANIMATIONS as ANIMS } from '../../utils/Const.js'
import MovementComponent from './MovementComponent.js';

export default class CombatComponent extends Component {
    constructor(entity) {
        super(entity)
        this.attributeComponent = this.entity.getComponent(AttributeComponent)
        this.dmgTimer = 0
        this.combatTarget = false
    }

    /**
     * Update's the entity's attack timer to mitigate time between attacks.
     * Checks if the entity is dead.
     */
    update() {
        this.dmgTimer -= this.entity.game.clockTick
        if (this.checkDead()) {
            this.entity.game.removeEntityByRef(this.entity)
        }
        if (this.canMeleeAttack()) {
            this.meleeAttack()
            this.dmgTimer = 3
        }
    }

    /**
     * Checks if it is possible to execute a melee attack
     */
    canMeleeAttack() {
        const hasCombatTarget = this.combatTarget !== false && this.combatTarget !== null
        const timerCooled = this.dmgTimer <= 0
        const distance = Vector.vectorFromEntity(this.combatTarget).distance(Vector.vectorFromEntity(this.entity))
        const isClose = distance < 128
        return hasCombatTarget && timerCooled && isClose
    }

    /**
     * Sets the current combat target to attack
     * 
     * @param {Entity} foe The Entity to begin attacking
     */
    setCombatTarget(foe) {
        this.combatTarget = foe
    }

    /**
     * Unsets the current combat target
     */
    unsetCombatTarget() {
        this.combatTarget = false
    }

    /**
     * Initiates a melee attack from this Entity to Entity foe
     */
    meleeAttack() {
        const dmg = this.calculatePhysicalDamage()
        const killed = this.combatTarget.getComponent(CombatComponent).applyPhysicalDamage(dmg)
        if (killed) {
            this.unsetCombatTarget()
        }
        this.setAttackAnimation()
    }

    /**
     * Initiates a magic attack from this Entity to Entity foe
     * 
     * @param {Entity} foe  The Entity being attacked
     */
    magicAttack() {
        const dmg = this.calculateMagicDamage()
        const killed = this.combatTarget.getComponent(CombatComponent).applyMagicDamage(dmg)
        if (killed) {
            this.unsetCombatTarget()
        }
    }

    /**
     * Sets the cooresponding attack animation for Entities
     */
    setAttackAnimation() {
        const movementComponent = this.entity.getComponent(MovementComponent)
        this.entity.getComponent(AnimationComponent).setDirectionalAnimation(movementComponent.direction, {
            north: ANIMS.AttackNorth,
            east: ANIMS.AttackEast,
            south: ANIMS.AttackSouth,
            west: ANIMS.AttackWest
        })
    }

    /**
     * Calculates the damage output of this entity so it can be applied onto it's target
     *
     * @returns {number} the damage to apply
     */
    calculatePhysicalDamage(modifiers = {}) {
        const appliedStr = modifiers.Str + this.attributeComponent.Str || this.attributeComponent.Str
        const appliedAtk = modifiers.Atk + this.attributeComponent.Atk || this.attributeComponent.Atk
        return Math.random() * appliedStr + appliedAtk
    }

    /**
     * Calculates the damage output of this entity so it can be applied onto it's target
     *
     * @returns {number} the damage to apply
     */
    calculateMagicDamage(modifiers) {
        const appliedInt = modifiers.Int + this.attributeComponent.Int || this.attributeComponent.Int
        const appliedMatk = modifiers.Matk + this.attributeComponent.Matk || this.attributeComponent.Matk
        return Math.random() * appliedInt + appliedMatk
    }

    /**
     * Applies INCOMING damage to the entity.
     *
     * @param damage - the damage to be applied, BEFORE it is mitigated by defense
     *
     * @returns {boolean} true if entity is killed, false if still alive
     */
    applyPhysicalDamage(damage) {
        damage = Math.max(0, damage)
        damage = damage * damage / (damage + this.attributeComponent.Def)
        this.displayDamage = true
        this.damageColor = 'red'
        this.lastDamage = damage
        this.attributeComponent.HP -= damage
        //check if dead
        if (this.checkDead()) {
            this.entity.game.addScore(this.attributeComponent.Name)
            // console.log(this.entity.game.sceneManager.getScene('scoredisplay').scores[0].Name)
            this.entity.game.removeEntityByRef(this.entity)
            if(this.attributeComponent.Name === 'PLAYER') {
                this.entity.game.sceneManager.change('scoredisplay' )
                this.entity.game.sceneManager.currentScene.updateText()
                // console.log(this.entity.game.sceneManager.currentScene.scores[0].Name)
            }
            return true
        }
        return false
    }

    /**
     * Applies INCOMING magic dmg to the entity.
     *
     * @param damage - the damage to be applied, BEFORE it is mitigated by defense
     *
     * @returns {boolean} true if entity is killed, false if still alive
     */
    applyMagicDamage(damage) {
        damage = Math.max(0, damage)
        damage = damage * damage / (damage + this.attributeComponent.Mdef)
        this.displayDamage = true
        this.damageColor = 'blue'
        this.lastDamage = damage
        this.attributeComponent.HP = this.attributeComponent.HP - damage
        if (this.checkDead()) {
            this.entity.game.removeEntityByRef(this.entity)
            return true
        }

        return false
    }

    /**
     * Performs a check to see if this Entity is dead
     */
    checkDead() {
        return this.attributeComponent.HP <= 0 || this.entity.removeFromWorld
    }

}
