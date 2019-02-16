import Component from './Component.js'
import {STATES} from '../../utils/Const.js'
import CombatComponent from './CombatComponent.js'
import Random from '../../utils/Random.js'

/**
 * NOTES:
 *  1. All entities should have an attribute component. entity super will probably assign this component with base values if not done by us.
 *  2. Pass in true if entity will be in combat as well, and it will add the combat component (need both for combat to work so one defines the other)
 *  3. Adds the entity as collidable if combat, so spells / attacks can be checked
 */
export default class AttributeComponent extends Component {

    constructor(entity, attributes, scene, isCombat = false){
        super(entity)

        if(null != attributes) {
            this.setAttributes(attributes)
        }else{this.setAttributes(defaultAttributes)}

        if(null == scene || undefined == scene || null === scene || undefined === scene){
            console.log('break')
        }


        this.scene = scene
        this.entity.states[STATES.Combat_Entity] = isCombat //assign as a combat entity
        this.random = new Random(Date.now())

        if(isCombat){
            this.entity.addComponent(new CombatComponent(this.entity, this))    //if combat entity, add combat component
            scene.addCollidableEntity(this.entity)                              // and set as collidable (for entity lookup)
            this.displayDamage = false
        }
    }


    update(){
        this.dmgTimer -= this.entity.game.clockTick
        //console.log(this.entity.hitPoints)
        if(this.checkDead()){
            this.scene.removeEntityByRef(this.entity)
            return true
        }
    }

    /**
     * Calculates the damage output of this entity so it can be applied onto it's target
     *
     * @returns {number} the damage to apply
     */
    calculatePhysicalDamage(modifiers = {}){
        let appliedSTR = modifiers.STR + this.STR || this.STR
        let appliedATK = modifiers.ATTACKPOWER + this.ATTACKPOWER || this.ATTACKPOWER
        let coverage = 1
        if(modifiers.distance != null){
            coverage = Math.min(1, this.SIZE / modifiers.distance)
        }
        let dmg = this.random.int(appliedSTR / 3, appliedATK)

        return (dmg*appliedSTR / 3) * coverage
    }

    calculateMagicDamage(modifiers){
        let appliedINT = modifiers.INT + this.INT || this.INT
        let appliedSP = modifiers.SPELLPOWER + this.SPELLPOWER || this.SPELLPOWER
        let coverage = 1
        if(modifiers.distance != null){
            coverage = Math.min(1, this.SIZE / modifiers.distance)
        }
        let dmg = this.random.int(appliedINT / 3, appliedSP)

        return (dmg * appliedINT / 3) * coverage
    }

    /**
     * Applies INCOMING damage to the entity.
     *
     * @param damage - the damage to be applied, BEFORE it is mitigated by defense
     *
     * @returns {boolean} true if entity is killed, false if still alive
     */
    applyPhysicalDamage(damage){
        //damage is reduced by defense rate
        damage = Math.floor(damage - this.entity.defenseRate)
        //if greater than 0, apply it.
        if(damage >= 0) {
            this.displayDamage = true
            this.damageColor = 'red'
            this.lastDamage = damage
            this.entity.hitPoints = this.entity.hitPoints - damage
            this.dmgTimer = 1.5

            //check if dead
            if(this.checkDead()){
                console.log('ENTITY KILLED')
                this.scene.removeEntityByRef(this.entity)
                return true
            }
        }
        return false
    }


    /**
     * Not fully implemented, but logic should be same as physical damage. Spells etc should deal magic damage.
     *
     * @param damage
     */
    applyMagicDamage(damage){
        //reduce damage by magic def rate
        damage = Math.floor(damage - this.MAGICDEFRATE)
        //if greater than 0, apply it.
        if(damage >= 0){
            this.displayDamage = true
            this.damageColor = 'blue'
            this.lastDamage = damage
            this.entity.hitPoints = this.entity.hitPoints - damage
            this.dmgTimer = 1.5

            if(this.checkDead()){
                this.scene.removeEntityByRef(this.entity)
                return true
            }
        }
        return false
    }

    /**
     * Draws the last damage above the entities head.
     * TODO: This currently draws above the player's head. Find better place to display? Above victim's head?
     */
    draw(){
        if(this.displayDamage && this.lastDamage != null && this.dmgTimer > 0 ){
            this.scene.ctx.font = '36px arcade'
            this.scene.ctx.fillStyle = this.damageColor || 'red'
            this.scene.ctx.textAlign = 'center'
            let pos = this.scene.game.worldToScreen(this.entity)
            this.scene.ctx.fillText(this.lastDamage, pos.x, pos.y - 64)
        }
    }

    checkDead(){
        return this.entity.hitPoints <= 0 || this.entity.removeFromWorld
    }

    /**
     * Sets the default attributes. First it checks if the entity is assigned a value already,
     *  if not, it checks the passed in parameters, to assign value,
     *  if still null, assign default value
     *
     * @param attr
     */
    setAttributes(attr){

        this.entity.x = this.entity.x || attr.x || defaultAttributes.x

        this.entity.y = this.entity.y || attr.y || defaultAttributes.y

        this.entity.xpYield = this.entity.xpYield || attr.xpYield || defaultAttributes.xpYield

        this.entity.goldYield = this.entity.goldYield || attr.goldYield || defaultAttributes.goldYield

        this.entity.hitPoints = this.entity.hitPoints || attr.HP || defaultAttributes.hitPoints

        this.entity.mana = this.entity.mana || attr.Mana || defaultAttributes.mana

        this.STR = this.entity.strength = this.entity.strength || attr.strength || defaultAttributes.strength

        this.INT = this.entity.intelligence = this.entity.intelligence || attr.intelligence || defaultAttributes.intelligence

        this.SPELLPOWER = this.entity.spellPower = this.entity.spellPower || attr.spellPower || defaultAttributes.spellPower

        this.ATTACKPOWER = this.entity.attackPower = this.entity.attackPower || attr.Atk || defaultAttributes.attackPower

        this.ATTACKRATE = this.entity.attackRate = this.entity.attackRate || attr.attackRate || defaultAttributes.attackRate

        this.MOVESPEED = this.entity.moveSpeed = this.entity.Speed || attr.moveSpeed || defaultAttributes.moveSpeed

        this.SIZE = this.entity.size = this.entity.size || attr.size || defaultAttributes.size

        this.DEFENSERATE = this.entity.defenseRate = this.entity.defenseRate || attr.Def || defaultAttributes.defenseRate

        this.MAGICDEFRATE = this.entity.magicDefenseRate = this.entity.magicDefenseRate || attr.Mdef || defaultAttributes.mDefenseRate

        this.RANGE = this.entity.range = this.entity.range || attr.range || defaultAttributes.range

    }
}

const defaultAttributes = {

    x: 0,           //x coord
    y: 0,           //y coord
    xpYield : 0,    //xp given on death
    goldYield : 0,  //gold given on death
    hitPoints : 0,  //duh
    mana : 0,
    strength : 0,    //attack power multiplier
    intelligence : 7, //spell power multiplier
    spellPower : 6,  //magic damage
    attackPower : 0,
    attackRate : 0, //speed attacks happen
    moveSpeed : 0, //how fast they move
    size : 0,
    defenseRate : 0,
    range : 0,
    mDefenseRate : 5,

}

