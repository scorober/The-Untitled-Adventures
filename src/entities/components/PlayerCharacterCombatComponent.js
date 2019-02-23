
import AnimationComponent from './AnimationComponent.js'
import { ANIMATIONS as ANIMS } from '../../utils/Const.js'
import CombatComponent from './CombatComponent.js'
import MovementComponent from './MovementComponent.js'

export default class PlayerCharacterCombatComponent extends CombatComponent {
    constructor(entity) {
        super(entity)
    }

    /**
     * Sets the cooresponding attack animation for PlayerCharacter
     */
    setAttackAnimation() {
        const movementComponent = this.entity.getComponent(MovementComponent)
        this.entity.getComponent(AnimationComponent).setDirectionalAnimation(movementComponent.direction, {
            north: ANIMS.OversizeNorth,
            east: ANIMS.OversizeEast,
            south: ANIMS.OversizeSouth,
            west: ANIMS.OversizeWests
        })
    }
}
