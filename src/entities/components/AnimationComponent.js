import Component from './Component.js'
import AnimationFactory from '../../AnimationFactory.js'
import { DIRECTIONS, ANIMATIONS as ANIMS } from '../../utils/Const.js'

export default class AnimationComponent extends Component {
    /**
     * @param {Entity} entity A reference to the Entity this Component is attached to
     * @param {Object} animationConfig Animation configuration object for this character.
     */
    constructor(entity, animationConfig) {
        super(entity)
        this.animationConfig = animationConfig
        this.animations = this.getAnimations(this.animationConfig)
        this.setAnimation(animationConfig.InitialAnimation)
    }

    /**
     * Called each update cycle
     */
    update() { }

    /**
     * Called each draw cycle
     */
    draw() {
        this.animations[this.animation].drawFrame(this.entity.game, this.entity.x, this.entity.y)
    }

    /**
     * Parses the animation data and returns a collection of Animations
     * @param {Object} config The animation configuration object for this character
     */
    // eslint-disable-next-line complexity
    getAnimations(config) {
        const animations = []
        const spritesheet = this.entity.game.getAsset(config.Spritesheet)
        const animationFactory = new AnimationFactory(spritesheet, config.Width, config.Height, config.Scale)
        // Create an animation for each property in AnimationData
        for (const symbolKey of Object.getOwnPropertySymbols(config.AnimationData)) {
            const anim = config.AnimationData[symbolKey]
            // If this animation datum has these properties then it's a derivative animation
            // from the frames of a different animation and we need to move back to that row.
            if (anim.hasOwnProperty('goBackRows') && anim.hasOwnProperty('goBackHeight')) {
                animationFactory.rewindFactory(anim.goBackRows, anim.goBackHeight)
            }
            // If this animation is optional for the spritesheet then the spritesheet may
            // not contain these sprites
            if (anim.hasOwnProperty('optional')) {
                const height = anim.options.hasOwnProperty('height') ? anim.options.height : config.Height
                if (animationFactory.hasNextRow(height) == false) {
                    return animations
                }
            }
            animations[symbolKey] = animationFactory.getNextRow(config.AnimationRates[anim.rate], anim.options)
        }
        return animations
    }

    /**
     * Sets animation rate during run-time. Used for increasing rate of the run speed animation, e.t.c
     * @param {Symbol} animation The Symbol representing the animation found in Constants file
     * @param {Number} rate The new rate of the specified animation
     */
    setAnimationRate(animation, rate) {
        this.animations[animation].frameDuration = rate
    }

    /**
     * Sets the currently active Animation
     * @param {Symbol} animation The Symbol representing the Animation to set
     */
    setAnimation(animation, cb = null) {
        this.animation = animation
        if (this.animations[animation].loop === false) this.animations[animation].elapsedTime = 0
        this.animations[animation].setCallback(cb)
    }

    /**
     * Sets the active moving animation according to direction
     * @param {Symbol} direction The direction to walk in
     */
    setMovingAnimation(direction, cb = null) {
        switch (direction) {
            case DIRECTIONS.North:
                this.setAnimation(ANIMS.WalkNorth, cb)
                break
            case DIRECTIONS.East:
                this.setAnimation(ANIMS.WalkEast, cb)
                break
            case DIRECTIONS.West:
                this.setAnimation(ANIMS.WalkWest, cb)
                break
            case DIRECTIONS.South:
            default:
                this.setAnimation(ANIMS.WalkSouth, cb)
                break
        }
    }

    /**
     * Sets the active standing animation according to direction
     * @param {Symbol} direction The direction to stand in
     */
    setStandingAnimation(direction, cb = null) {
        switch (direction) {
            case DIRECTIONS.North:
                this.setAnimation(ANIMS.StandNorth, cb)
                break
            case DIRECTIONS.East:
                this.setAnimation(ANIMS.StandEast, cb)
                break
            case DIRECTIONS.West:
                this.setAnimation(ANIMS.StandWest, cb)
                break
            case DIRECTIONS.South:
            default:
                this.setAnimation(ANIMS.StandSouth, cb)
                break
        }
    }
}