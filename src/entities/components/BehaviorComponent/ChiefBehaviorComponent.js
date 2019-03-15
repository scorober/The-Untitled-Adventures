import Component from '../Component.js'
import Vector from '../../utils/Vector.js'
import AttributeComponent from '../AttributeComponent.js'
import Random from '../../../utils/Random.js'
import WolfData from '../../characters/WolfDefaultData.js'
import MovementComponent from '../MovementComponent.js'
import AnimationComponent from '../AnimationComponent.js'
import Entity from '../../Entity.js'
import CollisionComponent from '../CollisionComponent.js'
import EnemyInteractionComponent from '../InteractionComponent/EnemyInteractionComponent.js'
import CombatComponent from '../CombatComponent.js'

export default class ChiefBehaviorComponent extends Component {
    constructor(entity) {
        super(entity)
        this.attributeComponent = this.entity.getComponent(AttributeComponent)
        this.teleports = 0
        this.HPFull = this.attributeComponent.HP
        this.fled = false
        this.coolDown = 0
        this.coolEnd = 1000
        this.rng = new Random()
    }


    update() {
        if (this.checkHP()) {
            this.teleports++
            this.fled = 
            this.teleportOut()
            this.summonWolves()
        }
        if (this.fled) {
            this.coolDown + this.entity.game.clockTick * 200
        }
        if (this.coolDown > this.coolEnd) {
            this.teleportIn()
            this.coolDown = 0
        }
    }

    summonWolves() {
        const wolf = new Entity(this.entity.game, new Vector(
            this.entity.x + Math.cos(angle) * r,
            this.entity.y + Math.sin(angle) * r
        ))
        wolf.addComponent(new AnimationComponent(wolf, WolfData.AnimationConfig))
        wolf.addComponent(new MovementComponent(wolf, WolfData.Attributes))
        wolf.addComponent(new AttributeComponent(wolf, WolfData.Attributes))
        wolf.addComponent(new CollisionComponent(wolf))
        wolf.addComponent(new EnemyInteractionComponent(wolf))
        wolf.addComponent(new CombatComponent(wolf))
    }

    teleportOut() {

    }
    
    teleportIn() {

    }
    // eslint-disable-next-line complexity
    checkHP() {
        return (this.attributeComponent.hp < this.HPFull * .8 && this.teleports === 0) ||
            (this.attributeComponent.hp < this.HPFull * .6 && this.teleports === 1) ||
            (this.attributeComponent.hp < this.HPFull * .4 && this.teleports === 2) ||
            (this.attributeComponent.hp < this.HPFull * .2 && this.teleports === 3)


    }
}
