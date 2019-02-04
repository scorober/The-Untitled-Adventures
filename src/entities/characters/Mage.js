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
        //TODO FIX EFFECT ANIMATIONS...
        // this.attack(50, 400)
        //TODO get player location
    }

    draw() {
        super.draw()
    }

    getAnimations(spritesheet) {
        this.height = 192
        this.width = 192
        this.attackHight = 192
        this.attackWidth = 384
        this.scale = 1
        const animations = {
            //AttackLeft
            [ANIMATIONS.AttackWest]: new Animation(spritesheet, this.attackWidth, this.attackHight, 17, 1, this.attackRate, 17, false, this.scale),
            [ANIMATIONS.AttackEast]: new Animation(spritesheet, this.attackWidth, this.attackHight, 17, 2, this.attackRate, 17, false, this.scale),
            //Idle
            [ANIMATIONS.StandWest]: new Animation(spritesheet, this.width, this.height, 10, 3, this.standCycleRate, 10, true, 0.8),
            [ANIMATIONS.StandEast]: new Animation(spritesheet, this.width, this.height, 10, 4, this.standCycleRate, 10, true, 0.8),
            //Impact
            [ANIMATIONS.Impact]: new Animation(spritesheet, this.width, this.height, 10, 5, this.impactRate, 10, false, 0.3),
            //Power-up
            [ANIMATIONS.PowerupWest]: new Animation(spritesheet, this.width, this.height, 17, 7, this.Powerup, 17, false, this.scale),
            [ANIMATIONS.PowerupEast]: new Animation(spritesheet, this.width, this.height, 17, 8, this.Powerup, 17, false, this.scale),
            //Walk
            [ANIMATIONS.WalkWest]: new Animation(spritesheet, this.width, this.height, 8, 9, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkEast]: new Animation(spritesheet, this.width, this.height, 8, 10, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 8, 9, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 8, 10, this.walkCycleRate, 9, true, this.scale),
        }
        return animations
    }
}