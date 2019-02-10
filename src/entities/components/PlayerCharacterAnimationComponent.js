import AnimationComponent from './AnimationComponent.js'
import { DIRECTIONS, ANIMATIONS as ANIMS } from '../../utils/Const.js'

export default class PlayerCharacterAnimationComponent extends AnimationComponent {
    /**
     * @param {Entity} entity A reference to the Entity this Component is attached to
     * @param {Object} animationConfig Animation configuration object for this character.
     */
    constructor(entity, animationConfig) {
        super(entity, animationConfig)
    }

    /**
     * Called each update cycle
     */
    update() {
        super.update()
    }

    /**
     * Called each draw cycle
     */
    draw() {
        super.draw()
    }

    /**
     * Sets the active standing animation according to direction
     * @param {Symbol} direction The direction to stand in
     */
    setOversizedAnimation(direction) {
        switch (direction) {
            case DIRECTIONS.North:
                this.setAnimation(ANIMS.OversizeNorth)
                break
            case DIRECTIONS.East:
                this.setAnimation(ANIMS.OversizeEast)
                break
            case DIRECTIONS.West:
                this.setAnimation(ANIMS.OversizeWest)
                break
            case DIRECTIONS.South:
            default:
                this.setAnimation(ANIMS.OversizeSouth)
                break
        }
    }
}