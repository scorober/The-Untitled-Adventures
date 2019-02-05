import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR } from '../../utils/Const.js'
import Animation from '../../Animation.js'
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

    getAnimations(spritesheet) {

        const animations = {
            //Spellcasting
            [ANIMS.SpellcastWest]: new Animation(spritesheet, this.attackWidth, this.attackHeight, 17, 1, this.animationRates[AR.Spellcast], 17, false, this.scale),
            [ANIMS.SpellcastEast]: new Animation(spritesheet, this.attackWidth, this.attackHeight, 17, 2, this.animationRates[AR.Spellcast], 17, false, this.scale),
            //copy of SpellcastWest
            [ANIMS.SpellcastNorth]: new Animation(spritesheet, this.attackWidth, this.attackHeight, 17, 1, this.animationRates[AR.Spellcast], 17, false, this.scale),
            //copy of SpellcastEast
            [ANIMS.SpellcastSouth]: new Animation(spritesheet, this.attackWidth, this.attackHeight, 17, 2, this.animationRates[AR.Spellcast], 17, false, this.scale),

            //Standing
            [ANIMS.StandWest]: new Animation(spritesheet, this.width, this.height, 8, 3, this.animationRates[AR.Stand], 8, true, this.scale),
            [ANIMS.StandEast]: new Animation(spritesheet, this.width, this.height, 8, 4, this.animationRates[AR.Stand], 8, true, this.scale),
            // copy of stand west
            [ANIMS.StandNorth]: new Animation(spritesheet, this.width, this.height, 8, 3, this.animationRates[AR.Stand], 8, true, this.scale),
            // copy of stand east
            [ANIMS.StandSouth]: new Animation(spritesheet, this.width, this.height, 8, 4, this.animationRates[AR.Stand], 8, true, this.scale),

            //Impact
            [ANIMS.Impact]: new Animation(spritesheet, this.width, this.height, 10, 5, this.animationRates[AR.Impact], 10, false, 0.3),
            
            //Walk
            [ANIMS.WalkWest]: new Animation(spritesheet, this.width, this.height, 8, 6, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkEast]: new Animation(spritesheet, this.width, this.height, 8, 7, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 8, 6, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 8, 7, this.animationRates[AR.Walk], 9, true, this.scale),
        }
        return animations
    }
}