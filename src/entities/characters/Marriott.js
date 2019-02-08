import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR, STATES } from '../../utils/Const.js'
import Animation from '../../Animation.js'
import Npc from './Npc.js'
import AnimationFactory from '../../AnimationFactory.js'

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
        const animations = []
        const animationFactory = new AnimationFactory(spritesheet, this.scale)

        // Walk cycle
        animations[ANIMS.WalkNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animationFactory.rewindFactory(4, 4 * this.height)
        //standing
        animations[ANIMS.StandNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], true, 2)
        animations[ANIMS.StandWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], true, 2)
        animations[ANIMS.StandSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], true, 2)
        animations[ANIMS.StandEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], true, 2)
        // Sitting on desk
        animations[ANIMS.SitDown] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Sit], false)
        animationFactory.rewindFactory(1, 1 * this.height)
        animations[ANIMS.StandUp] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Sit], false).reverse()


        return animations
    }

}