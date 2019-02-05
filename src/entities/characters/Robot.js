
import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR } from '../../utils/Const.js'
import Animation from '../../Animation.js'
import Effect from '../Effect.js'
import Enemy from './Enemy.js'

export default class Robot extends Enemy {
    constructor(game, spritesheet, pos) {
        super(game, pos[0], pos[1])
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

    getAnimations(spritesheet) {
        //The robots impact sprite was too large to be in this uniform spritesheet.
        const animations = {
                        //Spellcasting
                        [ANIMS.SpellcastWest]: new Animation(spritesheet, this.attackWidth, this.attackHeight, 17, 1, this.animationRates[AR.Spellcast], 17, false, this.scale),
                        [ANIMS.SpellcastEast]: new Animation(spritesheet, this.attackWidth, this.attackHeight, 17, 2, this.animationRates[AR.Spellcast], 17, false, this.scale),
                        //copy of SpellcastWest
                        [ANIMS.SpellcastNorth]: new Animation(spritesheet, this.attackWidth, this.attackHeight, 17, 1, this.animationRates[AR.Spellcast], 17, false, this.scale),
                        //copy of SpellcastEast
                        [ANIMS.SpellcastSouth]: new Animation(spritesheet, this.attackWidth, this.attackHeight, 17, 2, this.animationRates[AR.Spellcast], 17, false, this.scale),
            
                        //Standing
                        [ANIMS.StandWest]: new Animation(spritesheet, this.width, this.height, 10, 3, this.animationRates[AR.Stand], 10, true, this.scale),
                        [ANIMS.StandEast]: new Animation(spritesheet, this.width, this.height, 10, 4, this.animationRates[AR.Stand], 10, true, this.scale),
                        // copy of stand west
                        [ANIMS.StandNorth]: new Animation(spritesheet, this.width, this.height, 10, 3, this.animationRates[AR.Stand], 10, true, this.scale),
                        // copy of stand east
                        [ANIMS.StandSouth]: new Animation(spritesheet, this.width, this.height, 10, 4, this.animationRates[AR.Stand], 10, true, this.scale),
            
                        //Walk
                        [ANIMS.WalkWest]: new Animation(spritesheet, this.width, this.height, 9, 5, this.animationRates[AR.Walk], 9, true, this.scale),
                        [ANIMS.WalkEast]: new Animation(spritesheet, this.width, this.height, 9, 6, this.animationRates[AR.Walk], 9, true, this.scale),
                        [ANIMS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 9, 5, this.animationRates[AR.Walk], 9, true, this.scale),
                        [ANIMS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 9, 6, this.animationRates[AR.Walk], 9, true, this.scale),

                        //Impact, Robot has a larger impact sprite 240x240
                        [ANIMS.Impact]: new Animation(spritesheet, this.impactSize, this.impactSize, 8, 7, this.animationRates[AR.Impact], 8, false, this.scale),
        }
        return animations
    }
}