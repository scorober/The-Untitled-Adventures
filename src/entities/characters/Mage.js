import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR} from '../../utils/Const.js'
import Animation from '../../Animation.js'
import Enemy from './Enemy.js'

export default class Mage extends Enemy {
    constructor(game, spritesheet, pos) {
        super(game, pos)
        this.scale = 0.92
        this.width = 192
        this.height = 192
        this.attackHeight = 192
        this.attackWidth = 384
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
            [ANIMS.StandWest]: new Animation(spritesheet, this.width, this.height, 10, 3, this.animationRates[AR.Stand], 10, true, this.scale),
            [ANIMS.StandEast]: new Animation(spritesheet, this.width, this.height, 10, 4, this.animationRates[AR.Stand], 10, true, this.scale),
            // copy of stand west
            [ANIMS.StandNorth]: new Animation(spritesheet, this.width, this.height, 10, 3, this.animationRates[AR.Stand], 10, true, this.scale),
            // copy of stand east
            [ANIMS.StandSouth]: new Animation(spritesheet, this.width, this.height, 10, 4, this.animationRates[AR.Stand], 10, true, this.scale),

            //Impact
            [ANIMS.Impact]: new Animation(spritesheet, this.width, this.height, 11, 5, this.animationRates[AR.Impact], 11, false, 0.3),
            
            //Power-up
            [ANIMS.PowerupWest]: new Animation(spritesheet, this.width, this.height, 17, 6, this.animationRates[AR.Powerup], 17, false, this.scale),
            [ANIMS.PowerupEast]: new Animation(spritesheet, this.width, this.height, 17, 7, this.animationRates[AR.Powerup], 17, false, this.scale),
            
            //Walk
            [ANIMS.WalkWest]: new Animation(spritesheet, this.width, this.height, 8, 8, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkEast]: new Animation(spritesheet, this.width, this.height, 8, 9, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 8, 8, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 8, 9, this.animationRates[AR.Walk], 9, true, this.scale),
        }
        return animations
    }
}