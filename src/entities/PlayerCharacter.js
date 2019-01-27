import Entity from './Entity.js'
import Animation from '../utils/Animation.js'

export default class PlayableCharacter extends Entity {
    constructor(game, spritesheet) {
        super(game, 0, 450)
        let scRate = 0.15
        let thRate = 0.15
        let wcRate = 0.1
        let slRate = 0.08
        let stRate = 0.6
        let shRate = 0.15
        let huRate = 0.15
        this.animations = {
            // Spellcasting
            'sc-n': new Animation(spritesheet, 64, 64, 7, 1, scRate, 7, true, 2),
            'sc-w': new Animation(spritesheet, 64, 64, 7, 2, scRate, 7, true, 2),
            'sc-s': new Animation(spritesheet, 64, 64, 7, 3, scRate, 7, true, 2),
            'sc-e': new Animation(spritesheet, 64, 64, 7, 4, scRate, 7, true, 2),
            // Thrusting
            'th-n': new Animation(spritesheet, 64, 64, 8, 5, thRate, 8, true, 2),
            'th-w': new Animation(spritesheet, 64, 64, 8, 6, thRate, 8, true, 2),
            'th-s': new Animation(spritesheet, 64, 64, 8, 7, thRate, 8, true, 2),
            'th-e': new Animation(spritesheet, 64, 64, 8, 8, thRate, 8, true, 2),
            // Walk cycle
            'wc-n': new Animation(spritesheet, 64, 64, 9, 9, wcRate, 9, true, 2),
            'wc-w': new Animation(spritesheet, 64, 64, 9, 10, wcRate, 9, true, 2),
            'wc-s': new Animation(spritesheet, 64, 64, 9, 11, wcRate, 9, true, 2),
            'wc-e': new Animation(spritesheet, 64, 64, 9, 12, wcRate, 9, true, 2),
            // Slashing
            'sl-n': new Animation(spritesheet, 64, 64, 6, 13, slRate, 6, true, 2),
            'sl-w': new Animation(spritesheet, 64, 64, 6, 14, slRate, 6, true, 2),
            'sl-s': new Animation(spritesheet, 64, 64, 6, 15, slRate, 6, true, 2),
            'sl-e': new Animation(spritesheet, 64, 64, 6, 16, slRate, 6, true, 2),
            // Standing (modified slashing)
            'st-n': new Animation(spritesheet, 64, 64, 2, 13, stRate, 2, true, 2),
            'st-w': new Animation(spritesheet, 64, 64, 2, 14, stRate, 2, true, 2),
            'st-s': new Animation(spritesheet, 64, 64, 2, 15, stRate, 2, true, 2),
            'st-e': new Animation(spritesheet, 64, 64, 2, 16, stRate, 2, true, 2),
            // Shooting
            'sh-n': new Animation(spritesheet, 64, 64, 13, 17, shRate, 13, true, 2),
            'sh-w': new Animation(spritesheet, 64, 64, 13, 18, shRate, 13, true, 2),
            'sh-s': new Animation(spritesheet, 64, 64, 13, 19, shRate, 13, true, 2),
            'sh-e': new Animation(spritesheet, 64, 64, 13, 20, shRate, 13, true, 2),
            // Hurt
            'hu-s': new Animation(spritesheet, 64, 64, 6, 21, huRate, 6, true, 2),
        }
        this.animation = this.animations['st-e']
        this.speed = 100
        this.game = game
        this.ctx = game.ctx
        this.TICK = 0

    }

    update(tick) {
        super.update(tick)
        this.TICK = tick

        /** Handle movement */
        if (this.game.INPUT_MANAGER.downKeys['ArrowLeft']) {

            this.playerDirection = 'ArrowLeft' //Why not save the state in the character or the scene instead of the engine?
            this.playerMoving = true
            this.animation = this.animations['wc-w']
            this.x -= this.TICK * this.speed

        } else if (this.game.INPUT_MANAGER.downKeys['ArrowRight']) {

            this.playerDirection = 'ArrowRight'
            this.playerMoving = true
            this.animation = this.animations['wc-e']
            this.x += this.TICK * this.speed

        } else if (this.game.INPUT_MANAGER.downKeys['ArrowUp']) {

            this.playerDirection = 'ArrowUp'
            this.playerMoving = true
            this.animation = this.animations['wc-n']
            this.y -= this.TICK * this.speed

        } else if (this.game.INPUT_MANAGER.downKeys['ArrowDown']) {

            this.playerDirection = 'ArrowDown'
            this.playerMoving = true
            this.animation = this.animations['wc-s']
            this.y += this.TICK * this.speed

        } else {
            this.playerMoving = false
        }




    }

    draw(ctx) {
        super.draw(ctx)

        //ALL OF THE STUFF THAT WAS DONE HERE IS DONE INSIDE UPDATE ALREADY


        this.animation.drawFrame(this.TICK, this.game, this.x, this.y)
    }
}