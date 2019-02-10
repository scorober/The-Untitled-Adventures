import Entity from './Entity.js'
import { EFFECTS, ANIMATION_RATES as AR, ANIMATIONS as ANIMS } from '../utils/Const.js'
import AnimationFactory from '../AnimationFactory.js'

export default class Effect extends Entity {
    constructor(game, spritesheet, effect, pos) {
        super(game, pos)
        this.game = game
        this.scale = 1.5
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.states = []

        if (effect === EFFECTS.Fireball) {
            this.width = 22
            this.height = 28
            this.animation = this.animations[ANIMS.Fire]
        }
    }

    update() {
        if (this.animation.isDone()) {
            this.removeFromWorld = true
        }

    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y, 0)
        super.draw()
    }

    getDefaultAnimationRates() {
        return {
            [AR.Impact]: 0.15,
        }
    }

    getAnimations(spritesheet) {
        const animations = {
            getAnimations(spritesheet) {

                //TODO Replace with "effects" sprite sheet, this is just fireball stuff
                const animations = []
                const animationFactory = new AnimationFactory(spritesheet, this.scale)
                const boostSize = 96
                const fireW = 22
                const fireH = 28
                const blastW = 21
                const blastH = 57
        
                animations[ANIMS.Boost] = animationFactory.getNextRow(boostSize, boostSize, this.animationRates[AR.Impact], { maxFrames: 15 })
                animations[ANIMS.Fire] = animationFactory.getNextRow(fireW, fireH, this.animationRates[AR.Impact])
                animations[ANIMS.Start] = animationFactory.getNextRow(blastW, blastH, this.animationRates[AR.Fireball], { maxFrames: 4, loop: false })
                animations[ANIMS.Projectile] = animationFactory.getNextRow(blastW, blastH, this.animationRates[AR.Fireball], { maxFrames: 7 })
                
                return animations
            }
        }
        return animations
    }
}