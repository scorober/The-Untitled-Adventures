import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR, STATES } from '../../utils/Const.js'
import Animation from '../../Animation.js'
import Npc from './Npc.js'

export default class Marriott extends Npc {
    constructor(game, spritesheet, pos) {
        super(game, pos)
        this.scale = 2
        this.width = 64
        this.height = 69
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations[ANIMS.StandEast]
        this.speed = 200
    }

    update() {
        super.update()
        if (this.states[STATES.Moving] == false) {
            this.handleStanding()
        }
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
        super.draw()
    }

    handleStanding() {
        this.animation = this.animations[ANIMS.SitDown]
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
            [ANIMS.SitDown]: new Animation(spritesheet, this.width, this.height, 5, 5, this.animationRates[AR.Sit], 5, false, this.scale),
            [ANIMS.StandUp]: new Animation(spritesheet, this.width, this.height, 5, 5, this.animationRates[AR.Sit], 5, false, this.scale),

            //standing
            [ANIMS.StandNorth]: new Animation(spritesheet, this.width, this.height, 1, 1, this.animationRates[AR.Stand], 1, true, this.scale),
            [ANIMS.StandWest]: new Animation(spritesheet, this.width, this.height, 1, 2, this.animationRates[AR.Stand], 1, true, this.scale),
            [ANIMS.StandSouth]: new Animation(spritesheet, this.width, this.height, 1, 3, this.animationRates[AR.Stand], 1, true, this.scale),
            [ANIMS.StandEast]: new Animation(spritesheet, this.width, this.height, 1, 4, this.animationRates[AR.Stand], 1, true, this.scale),
        }
    }

}