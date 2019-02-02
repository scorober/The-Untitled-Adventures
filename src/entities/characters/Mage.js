import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR } from '../../utils/Const.js'
import Animation from '../../Animation.js'
import Effect from '../Effect.js'
import Enemy from './Enemy.js'

export default class Mage extends Enemy {
    constructor(game, spritesheet, x, y) {
        super(game, x, y)
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

    attack(x, y) {
        this.animation = this.animations['at-l']

        //TODO scale when adding entity or as parameter in Effect class.
        for (let i = 0; i < 5; i++) {
            let anim = 'imp-s'
            if (i % 3 === 0) {
                anim = 'imp-m'
            } else if (i % 3 === 1) {
                anim = 'imp-l'
            }
            const r = Math.random() * 300
            const angle = Math.random() * Math.PI * 2
            this.game.addEntity(new Effect(this.game, this.animations[anim], x + Math.cos(angle) * r, y + Math.sin(angle) * r))
        }
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
            [AR.Spellcast]: 0.15,
            [AR.Sit]: 0.1,
            [AR.Stand]: 0.6,
            [AR.Walk]: 0.1
        }
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
            [ANIMS.Impact]: new Animation(spritesheet, this.width, this.height, 10, 5, this.animationRates[AR.Impact], 10, false, 0.3),
            
            //Power-up
            [ANIMS.PowerupWest]: new Animation(spritesheet, this.width, this.height, 17, 7, this.animationRates[AR.Powerup], 17, false, this.scale),
            [ANIMS.PowerupEast]: new Animation(spritesheet, this.width, this.height, 17, 8, this.animationRates[AR.Powerup], 17, false, this.scale),
            
            //Walk
            [ANIMS.WalkWest]: new Animation(spritesheet, this.width, this.height, 8, 9, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkEast]: new Animation(spritesheet, this.width, this.height, 8, 10, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 8, 9, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 8, 10, this.animationRates[AR.Walk], 9, true, this.scale),
        }
        return animations
    }
}