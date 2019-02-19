import Component from './Component.js'



export default class AttributeComponent extends Component {
    constructor(entity, attributes){
        super(entity)
        this.setAttributes(attributes)
        this.displayDamage = false
        this.isCombat = attributes.isCombat || false
        this.dmgTimer = 0
    }

    /**
     * Update's the entity's attack timer to mitigate time between attacks.
     * Checks if the entity is dead.
     *
     * @returns {boolean}
     */
    update(){
        this.dmgTimer -= this.entity.game.clockTick
        //console.log(this.entity.hitPoints)
        if(this.checkDead()){
            if(!this.scene){this.getScene()}
            this.entity.game.removeEntityByRef(this.entity)
        }
    }

    /**
     * Calculates the damage output of this entity so it can be applied onto it's target
     *
     * @returns {number} the damage to apply
     */
    calculatePhysicalDamage(modifiers = {}){
        const appliedSTR = modifiers.STR + this.STR || this.STR
        const appliedATK = modifiers.AttackPower + this.AttackPower || this.AttackPower
        let coverage = 1
        if(modifiers.distance != null){
            coverage = Math.min(1, this.Size / modifiers.distance)
        }
        const dmg = this.random.int(appliedSTR / 3, appliedATK)

        return (dmg*appliedSTR / 3) * coverage
    }

    calculateMagicDamage(modifiers){
        const appliedINT = modifiers.INT + this.INT || this.INT
        const appliedSP = modifiers.SpellPower + this.SpellPower || this.SpellPower
        let coverage = 1
        if(modifiers.distance != null){
            coverage = Math.min(1, this.Size / modifiers.distance)
        }
        const dmg = this.random.int(appliedINT / 3, appliedSP)

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
        damage = Math.floor(damage - this.Def)
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
                this.game.removeEntityByRef(this.entity)
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
    applyMagicDamage(damage){
        if(!this.isCombat){ return false }
        //reduce damage by magic def rate
        damage = Math.floor(damage - this.Mdef)
        //if greater than 0, apply it.
        if(damage >= 0){
            this.displayDamage = true
            this.damageColor = 'blue'
            this.lastDamage = damage
            this.entity.hitPoints = this.entity.hitPoints - damage
            this.dmgTimer = 1.5

            if(this.checkDead()){
                this.game.removeEntityByRef(this.entity)
                return true
            }
        }
        return false
    }


    checkDead(){
        return this.entity.hitPoints <= 0 || this.entity.removeFromWorld
    }


    /**
     * Draws the last damage above the entities head.
     * TODO: This currently draws above the player's head. Find better place to display? Above victim's head?
     */
    draw(){
        let ctx = this.entity.game.ctx
        if(this.isCombat && this.displayDamage && this.lastDamage != null && this.dmgTimer > 0 ){
            const pos = this.entity.game.worldToScreen(this.entity)
            ctx.font = '36px arcade'
            ctx.fillStyle = this.damageColor || 'red'
            ctx.textAlign = 'center'
            ctx.fillText(this.lastDamage, pos.x, pos.y - 64)
        }
    }
    /**
     * Sets the default attributes. First it checks if the entity is assigned a value already,
     *  if not, it checks the passed in parameters, to assign value,
     *  if still null, assign default value
     *
     * @param attr
     */
    setAttributes(attr){
        this.x = this.entity.x || attr.x || defaultAttributes.x
        this.y = this.entity.y || attr.y || defaultAttributes.y
        this.Height = this.entity.Height || attr.Height || defaultAttributes.Height
        this.Width = this.entity.Width || attr.Width || defaultAttributes.Width
        this.Size = this.entity.size || attr.Size || this.Height / 2
        this.XpYield = this.entity.XpYield || attr.XpYield || defaultAttributes.XpYield
        this.GoldYield = this.entity.GoldYield || attr.GoldYield || defaultAttributes.GoldYield
        this.HP = this.entity.HP || attr.HP || defaultAttributes.HP
        this.Mana = this.entity.Mana || attr.Mana || defaultAttributes.Mana
        this.STR = this.entity.STR || attr.STR || defaultAttributes.STR
        this.INT = this.entity.INT || attr.INT || defaultAttributes.INT
        this.SpellPower = this.entity.SpellPower || attr.SpellPower || defaultAttributes.SpellPower
        this.AttackPower = this.entity.AttackPower || attr.AttackPower || defaultAttributes.AttackPower
        this.AttackSpeed = this.entity.AttackSpeed || attr.AttackSpeed || defaultAttributes.AttackSpeed
        this.MoveSpeed = this.entity.MoveSpeed || attr.MoveSpeed || defaultAttributes.MoveSpeed
        this.Range = this.entity.Range || attr.Range || defaultAttributes.Range
        this.Def = this.entity.Def || attr.Def || defaultAttributes.Def
        this.Mdef = this.entity.Mdef || attr.Mdef || defaultAttributes.Mdef
        this.Name = this.entity.Name || attr.Name || defaultAttributes.Name
        this.entity.UUID = this.Name + this.entity.UUID
    }
}
const defaultAttributes = {

    x : 0,
    y : 0,
    Height : 32,
    Width : 32,
    Size : 0,
    XpYield : 0,
    GoldYield : 0,
    HP : 9999999999, //default = basically immortal (all defined entities should have their HP defined). This is just for camera etc
    Mana : 0,
    STR : 0,
    INT : 0,
    SpellPower : 0,
    AttackPower : 0,
    AttackSpeed : 0,
    MoveSpeed : 0,
    Range : 0 ,
    Def : 0,
    Mdef : 0,
    Name : 'ENTITY'

}