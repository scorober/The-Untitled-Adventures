import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR } from '../../utils/Const.js'
import AnimationFactory from '../../AnimationFactory.js'
import Enemy from './Enemy.js'

export default class Archer extends Enemy {
    constructor(game, spritesheet, pos) {
        super(game, pos)
        this.scale = 0.92
        this.width = 192
        this.height = 192
        this.attackHeight = 192
        this.attackWidth = 288 //Different than Robot/Mage
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations[ANIMS.StandEast]
        this.speed = 100
    }

    update() {
        super.update()
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
        super.draw()
    }

    getDefaultAnimationRates() {
        return {
            [AR.Shoot]: 0.15,
            [AR.Impact]: 0.1,
            [AR.Stand]: 0.6,
            [AR.Walk]: 0.1
        }
    }

    getAnimations(spritesheet) {
        const animations = []
        const animationFactory = new AnimationFactory(spritesheet, this.scale)
        // Shooting
        animations[ANIMS.ShootWest] = animationFactory.getNextRow(this.attackWidth, this.attackHeight, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootEast] = animationFactory.getNextRow(this.attackWidth, this.attackHeight, this.animationRates[AR.Shoot])
        animationFactory.rewindFactory(2, 2 * this.attackHeight)
        // Copy of ShootWest
        animations[ANIMS.ShootNorth] = animationFactory.getNextRow(this.attackWidth, this.attackHeight, this.animationRates[AR.Shoot])
        // Copy of ShootEast
        animations[ANIMS.ShootSouth] = animationFactory.getNextRow(this.attackWidth, this.attackHeight, this.animationRates[AR.Shoot])

        // Standing
        animations[ANIMS.StandWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand])
        animations[ANIMS.StandEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand])
        animationFactory.rewindFactory(2, 2 * this.height)
        // Copy of StandWest
        animations[ANIMS.StandNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand])
        // Copy of StandEast
        animations[ANIMS.StandSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand])

        // Impact
        animations[ANIMS.Impact] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Impact], false)

        // Walking
        animations[ANIMS.WalkWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animationFactory.rewindFactory(2, 2 * this.height)
        // Copy of WalkWest
        animations[ANIMS.WalkSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        // Copy of WalkEast
        animations[ANIMS.WalkNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        return animations
    }
}