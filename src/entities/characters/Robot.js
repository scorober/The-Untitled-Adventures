
import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR } from '../../utils/Const.js'
import Enemy from '../Enemy.js'
import AnimationFactory from '../../AnimationFactory.js'

export default class Robot extends Enemy {
    constructor(game, spritesheet, pos) {
        super(game, pos)
        this.scale = 0.92
        this.width = 192
        this.height = 192
        this.attackHeight = 192
        this.attackWidth = 384
        this.impactSize = 240
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
            [AR.Slash]: 0.15,
            [AR.Impact]: 0.1,
            [AR.Stand]: 0.6,
            [AR.Walk]: 0.1
        }
    }

    getAnimations(spritesheet) {
        //The robots impact sprite was too large to be in this uniform spritesheet.
        const animations = []
        const animationFactory = new AnimationFactory(spritesheet, this.scale)
        //Spellcasting
        animations[ANIMS.SlashWest] = animationFactory.getNextRow(this.attackWidth, this.attackHeight, this.animationRates[AR.Slash])
        animations[ANIMS.SlashEast] = animationFactory.getNextRow(this.attackWidth, this.attackHeight, this.animationRates[AR.Slash])
        animationFactory.rewindFactory(2, 2 * this.attackHeight)
        //copy of SlashWest
        animations[ANIMS.SlashNorth] = animationFactory.getNextRow(this.attackWidth, this.attackHeight, this.animationRates[AR.Slash])
        //copy of SpellcastEast
        animations[ANIMS.SlashSouth] = animationFactory.getNextRow(this.attackWidth, this.attackHeight, this.animationRates[AR.Slash])

        //Standing
        animations[ANIMS.StandWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand])
        animations[ANIMS.StandEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand])
        animationFactory.rewindFactory(2, 2 * this.height)
        // copy of stand west
        animations[ANIMS.StandNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand])
        // copy of stand east
        animations[ANIMS.StandSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand])

        //Walk
        animations[ANIMS.WalkWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animationFactory.rewindFactory(2, 2 * this.height)
        // Copy of WalkWest
        animations[ANIMS.WalkSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        // Copy of WalkEast
        animations[ANIMS.WalkNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])

        //Impact, Robot has a larger impact sprite 240x240
        animations[ANIMS.Impact] = animationFactory.getNextRow(this.impactSize, this.impactSize, this.animationRates[AR.Impact], { loop: false })
        return animations
    }
}