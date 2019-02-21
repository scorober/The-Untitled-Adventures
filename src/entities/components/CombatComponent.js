import Component from './Component.js'
import AttributeComponent from './AttributeComponent.js'

export default class CombatComponent extends Component {
    constructor(entity) {
        super(entity)
        this.attributeComponent = this.entity.getComponent(AttributeComponent)
        this.dmgTimer = 0
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
    }

    /**
     * Initiates a melee attack from this Entity to Entity foe
     * 
     * @param {Entity} foe The Entity being attacked
     */
    meleeAttack(foeCombatComponent) {
        const dmg = this.calculatePhysicalDamage()
        foeCombatComponent.applyPhysicalDamage(dmg)
    }

    /**
     * Initiates a magic attack from this Entity to Entity foe
     * 
     * @param {Entity} foe  The Entity being attacked
     */
    magicAttack(foeCombatComponent) {
        const dmg = this.calculateMagicDamage()
        foeCombatComponent.applyMagicDamage(dmg)
    }

    /**
     * Calculates the damage output of this entity so it can be applied onto it's target
     *
     * @returns {number} the damage to apply
     */
    calculatePhysicalDamage(modifiers = {}) {
        const appliedSTR = modifiers.STR + this.attributeComponent.STR || this.attributeComponent.STR
        const appliedATK = modifiers.AttackPower + this.attributeComponent.AttackPower || this.attributeComponent.AttackPower
        const dmg = Math.random(appliedSTR / 3 + appliedATK)
        return (dmg * appliedSTR / 3)
    }

    calculateMagicDamage(modifiers) {
        const appliedINT = modifiers.INT + this.attributeComponent.INT || this.attributeComponent.INT
        const appliedSP = modifiers.SpellPower + this.attributeComponent.SpellPower || this.attributeComponent.SpellPower
        const dmg = Math.random(appliedINT / 3 + appliedSP)
        return (dmg * appliedINT / 3)
    }

    /**
     * Applies INCOMING damage to the entity.
     *
     * @param damage - the damage to be applied, BEFORE it is mitigated by defense
     *
     * @returns {boolean} true if entity is killed, false if still alive
     */
    applyPhysicalDamage(damage) {
        //damage is reduced by defense rate
        damage = Math.floor(damage - this.attributeComponent.Def)
        //if greater than 0, apply it.
        if (damage >= 0) {
            this.displayDamage = true
            this.damageColor = 'red'
            this.lastDamage = damage
            this.attributeComponent.HP -= damage
            this.dmgTimer = 1.5

            //check if dead
            if (this.checkDead()) {
                this.entity.game.removeEntityByRef(this.entity)
                return true
            }
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
        //reduce damage by magic def rate
        damage = Math.floor(damage - this.attributeComponent.Mdef)
        //if greater than 0, apply it.
        if (damage >= 0) {
            this.displayDamage = true
            this.damageColor = 'blue'
            this.lastDamage = damage
            this.attributeComponent.HP = this.attributeComponent.HP - damage
            this.dmgTimer = 1.5
            if (this.checkDead()) {
                this.entity.game.removeEntityByRef(this.entity)
                return true
            }
        }
        return false
    }

    checkDead() {
        return this.attributeComponent.HP <= 0 || this.entity.removeFromWorld
    }

}
