import Entity from './Entity.js'
import Animation from '../Animation.js'
import { SPELLS, ANIMATION_RATES as AR } from '../utils/Const.js'

export default class Effect extends Entity {
    constructor(game, spritesheet, spell, pos) {
        super(game, pos)
        this.spritesheet = spritesheet
        this.game = game
        this.scale = 1.5
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.states = []

        if (spell === SPELLS.Explosion) {
            this.width = 32
            this.height = 32
            this.animation = this.animations[SPELLS.Explosion]
        }
        if (spell === SPELLS.Mage) {
            this.width = 192
            this.height = 192
            this.animation = this.animations[SPELLS.Mage]
        }
    }

    update() {
        super.update()
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
        const mage = 192
        const explosion = 32
        const animations = {
            [SPELLS.Explosion]: new Animation(spritesheet, explosion, explosion, 7, 2, .6, 7, false, this.scale),
            [SPELLS.Mage]: new Animation(spritesheet, mage, mage, 11, 5, this.animationRates[AR.Impact], 11, false, 1)
        }
        return animations
    }
}