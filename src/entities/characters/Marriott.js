import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR, STATES, DIRECTIONS } from '../../utils/Const.js'
import Character from '../Character.js'
import AnimationFactory from '../../AnimationFactory.js'

export default class Marriott extends Character {
    constructor(game, spritesheet, pos) {
        super(game, pos)
        this.scale = 1.3
        this.width = 64
        this.height = 64
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations[ANIMS.StandEast]
        this.standingTime = 0
        this.movingTime = 0
        this.standingDelay = 60
        this.sittingDelay = 25
        this.speed = 70
    }

    update() {
        super.update()
        if (this.states[STATES.Moving] === false) {
            this.standingTime++
            this.movingTime = 0
            this.animations[ANIMS.StandUpEast].elapsedTime = 0
            this.animations[ANIMS.StandUpWest].elapsedTime = 0
        } else {
            // this.standingTime = 0
            // this.animations[ANIMS.SitDownEast].elapsedTime = 0
            // this.animations[ANIMS.SitDownWest].elapsedTime = 0
        }
        if (this.states[STATES.Following] === true) {
            this.movingTime++
        }

    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y, 0)
        super.draw()
    }

    handleStanding() {
        if (this.standingTime > this.standingDelay) {
            if (this.animation !== this.animations[ANIMS.SitDownEast] || this.animation !== this.animations[ANIMS.SitDownWest]) {
                if (this.direction === DIRECTIONS.East || this.direction === DIRECTIONS.South) {
                    this.animation = this.animations[ANIMS.SitDownEast]
                } else {
                    this.animation = this.animations[ANIMS.SitDownWest]
                }
            }

        } else {
            super.handleStanding()
        }
    }

    moveCharacter() {
        if (this.movingTime < this.sittingDelay) {
            if (this.animation === this.animations[ANIMS.SitDownEast] || this.animation === this.animations[ANIMS.StandUpEast]) {
                this.animation = this.animations[ANIMS.StandUpEast]
            } else {
                this.animation = this.animations[ANIMS.StandUpWest]
            }
        } else {
            super.moveCharacter()
        }
    }

    getDefaultAnimationRates() {
        return {
            [AR.Walk]: 0.1,
            [AR.Sit]: 0.1,
            [AR.Stand]: 0.6
        }
    }

    getAnimations(spritesheet) {
        const animations = []
        const animationFactory = new AnimationFactory(spritesheet, this.scale)

        // Walk cycle
        animations[ANIMS.WalkNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animationFactory.rewindFactory(4, 4 * this.height)
        //standing
        animations[ANIMS.StandNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        // Sitting on desk
        animations[ANIMS.SitDownEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Sit], { loop: false })
        animations[ANIMS.StandUpEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Sit], { loop: false })
        animations[ANIMS.SitDownWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Sit], { loop: false })
        animations[ANIMS.StandUpWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Sit], { loop: false })

        return animations
    }

}