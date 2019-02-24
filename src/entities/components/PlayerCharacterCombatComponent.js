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
    doAttackAnimation() {
        const movementComponent = this.entity.getComponent(MovementComponent)
        this.entity.getComponent(AnimationComponent).setDirectionalAnimation(movementComponent.direction, {
            north: ANIMS.OversizeNorth,
            east: ANIMS.OversizeEast,
            south: ANIMS.OversizeSouth,
            west: ANIMS.OversizeWest
        }, () => {
            console.log('callback called')
            this.entity.getComponent(AnimationComponent).setDirectionalAnimation(movementComponent.direction, {
                north: ANIMS.StandNorth,
                east: ANIMS.StandEast,
                south: ANIMS.StandSouth,
                west: ANIMS.StandWest
            })
        }
        )
    }
}
