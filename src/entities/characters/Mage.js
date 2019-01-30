import { ANIMATIONS, STATES, DIRECTIONS, KEYS } from '../../utils/Const.js'
import Animation from '../../Animation.js'
import Effect from '../Effect.js'
import Enemy from './Enemy.js'

export default class Mage extends Enemy {
    constructor(game, spritesheet) {
        super(game, spritesheet, 20, 100)

        //Very temporary...
        this.spritesheet = spritesheet
        this.speed = 100

        // this.impactRate =0.25
        // this.attackRate = 0.15
    }

    attack(x, y) {
        this.animation = this.animations['at-l']

        //TODO scale when adding entity or as parameter in Effect class.
        for(let i = 0; i < 5; i++) {
            let anim = 'imp-s'
            if (i % 3 === 0) {
                anim = 'imp-m'
            } else if (i % 3 === 1) {
                anim = 'imp-l'
            }

            const r = Math.random() * 300
            const angle = Math.random()*Math.PI*2
            this.game.addEntity(new Effect(this.game, this.animations[anim], x + Math.cos(angle)*r, y + Math.sin(angle)*r))
        }

       
    }


    update() {
        super.update
        //TODO FIX EFFECT ANIMATIONS...
        // this.attack(50, 400)
        //TODO get player location
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
    }

    getAnimations(spritesheet) {
        const animations = {
          
            
            //AttackLeft
            [ANIMATIONS.AttackWest]: new Animation(spritesheet, 384, 192, 17, 1, this.attackRate, 17, false, 1),
            [ANIMATIONS.AttackEast]: new Animation(spritesheet, 384, 192, 17, 2, this.attackRate, 17, false, 1),
            //Idle
            [ANIMATIONS.StandWest]: new Animation(spritesheet, 192, 192, 10, 3, this.standCycleRate, 10, true, .8),
            [ANIMATIONS.StandEast]: new Animation(spritesheet, 192, 192, 10, 4, this.standCycleRate, 10, true, 0.8),
            //Impact
            [ANIMATIONS.Impact]: new Animation(spritesheet, 192, 192, 10, 5, this.impactRate, 10, false, 0.3),
            //Power-up
            [ANIMATIONS.PowerupWest]: new Animation(spritesheet, 192, 192, 17, 7, this.Powerup, 17, false, 1),
            [ANIMATIONS.PowerupEast]: new Animation(spritesheet, 192, 192, 17, 8, this.Powerup, 17, false, 1),
            //Walk
            [ANIMATIONS.WalkWest]: new Animation(spritesheet, 192, 192, 9, 9, this.walkCycleRate, 9, true, 1),
            [ANIMATIONS.WalkEast]: new Animation(spritesheet, 192, 192, 9, 10, this.walkCycleRate, 9, true, 1),
            [ANIMATIONS.WalkSouth]: new Animation(spritesheet, 192, 192, 9, 9, this.walkCycleRate, 9, true, 1),
            [ANIMATIONS.WalkNorth]: new Animation(spritesheet, 192, 192, 9, 10, this.walkCycleRate, 9, true, 1),
        }
        return animations
    }
}