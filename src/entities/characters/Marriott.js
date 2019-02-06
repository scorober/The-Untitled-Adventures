import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR, STATES, DIRECTIONS } from '../../utils/Const.js'
import Animation from '../../Animation.js'
import Npc from './Npc.js'

export default class Marriott extends Npc {
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
        this.SittingDelay = 25
        this.speed = 70
    }

    update() {
        super.update()
        if (this.states[STATES.Moving] === false) {
            this.standingTime ++
            this.movingTime = 0
            this.animations[ANIMS.StandUpEast].elapsedTime = 0
            this.animations[ANIMS.StandUpWest].elapsedTime = 0
        } else {
            this.standingTime = 0
            this.animations[ANIMS.SitDownEast].elapsedTime = 0
            this.animations[ANIMS.SitDownWest].elapsedTime = 0
        }
        if (this.states[STATES.Following] === true ){
            this.movingTime ++
        }
        
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
        super.draw()
    }

    handleStanding() {
        if (this.standingTime > this.standingDelay ) {
            if (this.direction === DIRECTIONS.East || this.direction === DIRECTIONS.South) {
                this.animation = this.animations[ANIMS.SitDownEast]
            } else {
                this.animation = this.animations[ANIMS.SitDownWest]
            }
        } else {
            super.handleStanding()
        }
    }

    moveCharacter() {
        if (this.movingTime < this.SittingDelay ) {
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
        return {
            // Walk cycle
            [ANIMS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 9, 1, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkWest]: new Animation(spritesheet, this.width, this.height, 9, 2, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 9, 3, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkEast]: new Animation(spritesheet, this.width, this.height, 9, 4, this.animationRates[AR.Walk], 9, true, this.scale),
            // Sitting on desk
            [ANIMS.SitDownEast]: new Animation(spritesheet, this.width, this.height, 5, 5, this.animationRates[AR.Sit], 5, false, this.scale),
            [ANIMS.SitDownWest]: new Animation(spritesheet, this.width, this.height, 5, 7, this.animationRates[AR.Sit], 5, false, this.scale),
            [ANIMS.StandUpEast]: new Animation(spritesheet, this.width, this.height, 5, 6, this.animationRates[AR.Sit], 5, false, this.scale),
            [ANIMS.StandUpWest]: new Animation(spritesheet, this.width, this.height, 5, 8, this.animationRates[AR.Sit], 5, false, this.scale),

            //standing
            [ANIMS.StandNorth]: new Animation(spritesheet, this.width, this.height, 1, 1, this.animationRates[AR.Stand], 1, true, this.scale),
            [ANIMS.StandWest]: new Animation(spritesheet, this.width, this.height, 1, 2, this.animationRates[AR.Stand], 1, true, this.scale),
            [ANIMS.StandSouth]: new Animation(spritesheet, this.width, this.height, 1, 3, this.animationRates[AR.Stand], 1, true, this.scale),
            [ANIMS.StandEast]: new Animation(spritesheet, this.width, this.height, 1, 4, this.animationRates[AR.Stand], 1, true, this.scale),
        }
    }

}