import Animation from '../../Animation.js'
import Effect from '../Effect.js'
import Enemy from './Enemy.js'

export default class Mage extends Enemy {
    constructor(game, spritesheet) {
        super(game, 20, 100)

        //Very temporary...
        this.spritesheet = spritesheet
        this.impRate =0.25

        const atkRate = 0.15
        const idRate = 0.15
        const wcRate = 0.1
        const pwRate = 0.08
      

        this.animations = {
          
            //AttackLeft
            'at-l': new Animation(spritesheet, 384, 192, 17, 1, atkRate, 17, false, 1),
            'at-r': new Animation(spritesheet, 384, 192, 17, 2, atkRate, 17, false, 1),
            //Idle
            'id-l': new Animation(spritesheet, 192, 192, 10, 3, idRate, 10, true, .8),
            'id-r': new Animation(spritesheet, 192, 192, 10, 4, idRate, 10, true, 0.8),
            //Impact
            'imp-s': new Animation(spritesheet, 192, 192, 10, 5, this.impRate, 10, false, 0.3),
            'imp-m': new Animation(spritesheet, 192, 192, 10, 5, this.impRate, 10, false, 0.3),
            'imp-l': new Animation(spritesheet, 192, 192, 10, 5, this.impRate, 10, false, 0.3),
            //Power-up
            'pr-l': new Animation(spritesheet, 192, 192, 17, 7, pwRate, 17, false, 1),
            'pr-r': new Animation(spritesheet, 192, 192, 17, 8, pwRate, 17, false, 1),
            //Walk
            'wl-l': new Animation(spritesheet, 192, 192, 9, 9, wcRate, 9, true, 1),
            'wl-r': new Animation(spritesheet, 192, 192, 9, 10, wcRate, 9, true, 1),
        }
        this.animation = this.animations['id-l']
        this.speed = 100
        this.game = game
        this.ctx = game.ctx

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

            // let anim = new Animation(this.spritesheet, 192, 192, 10, 5, this.impRate, 10, false, i / 5)

            const r = Math.random() * 300
            const angle = Math.random()*Math.PI*2
            this.game.addEntity(new Effect(this.game, this.animations[anim], x + Math.cos(angle)*r, y + Math.sin(angle)*r))
        }

       
    }


    update() {

        //TODO FIX EFFECT ANIMATIONS...
        // this.attack(50, 400)
        //TODO get player location
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
    }
}