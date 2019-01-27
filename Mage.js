import Character from './Character.js'
import Animation from './Animation.js'

export default class Mage extends Character {
    constructor(game, spritesheet) {
        super(game, 0, 400)
        let atkRate = 0.15
        let idRate = 0.15
        let wcRate = 0.1
        let pwRate = 0.08
        let impRate = 0.1

        this.animations = {
            //TODO fix mage sprite sheet
            
            //AttackLeft
            'at-l': new Animation(spritesheet, 384, 192, 17, 1, atkRate, 17, false, 1),
            'at-r': new Animation(spritesheet, 384, 192, 17, 2, atkRate, 17, false, 1),
            //Idle
            'id-l': new Animation(spritesheet, 192, 192, 10, 3, idRate, 10, true, .8),
            'id-r': new Animation(spritesheet, 192, 192, 10, 4, idRate, 10, true, 0.8),
            //Impact
            'imp': new Animation(spritesheet, 191, 191, 11, 5, impRate, 11, false, 0.2),
            //Power-up
            'pr-l': new Animation(spritesheet, 192, 192, 17, 7, pwRate, 17, false, 1),
            'pr-r': new Animation(spritesheet, 192, 192, 17, 8, pwRate, 17, false, 1),
            //Walk
            'wl-l': new Animation(spritesheet, 192, 192, 9, 9, wcRate, 9, true, 1),
            'wl-r': new Animation(spritesheet, 192, 192, 9, 10, wcRate, 9, true, 1),
        }
        this.animation = this.animations['at-l']
        this.speed = 100
        this.game = game
        this.ctx = game.ctx
    }

    update() {

    }

    draw() {
        super.draw()
        this.animation.drawFrame(this.game.clockTick, this.game, this.x, this.y)
    }
}