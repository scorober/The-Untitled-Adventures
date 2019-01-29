import Entity from '../Entity.js'
import Animation from '../../Animation.js'

export default class PlayableCharacter extends Entity {
    constructor(game, spritesheet) {
        super(game, 0, 450)
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations['st-e']
        this.speed = 100
        this.game = game
    }

    update() {
        /** Handle movement */
        if (this.game.inputManager.downKeys['ArrowLeft']) {
            this.playerDirection = 'ArrowLeft' // Why not save the state in the character or the scene instead of the engine?
            this.playerMoving = true
            this.animation = this.animations['wc-w']
            this.x -= this.game.clockTick * this.speed
        } else if (this.game.inputManager.downKeys['ArrowRight']) {
            this.playerDirection = 'ArrowRight'
            this.playerMoving = true
            this.animation = this.animations['wc-e']
            this.x += this.game.clockTick * this.speed
        } else if (this.game.inputManager.downKeys['ArrowUp']) {
            this.playerDirection = 'ArrowUp'
            this.playerMoving = true
            this.animation = this.animations['wc-n']
            this.y -= this.game.clockTick * this.speed
        } else if (this.game.inputManager.downKeys['ArrowDown']) {
            this.playerDirection = 'ArrowDown'
            this.playerMoving = true
            this.animation = this.animations['wc-s']
            this.y += this.game.clockTick * this.speed
        } else {
            this.playerMoving = false
        }
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
    }

    getAnimations(spritesheet) {
        const SPELLCASTING_RATE = 0.15
        const THRUSTING_RATE = 0.15
        const WALKCYCLE_RATE = 0.1
        const SLASHING_RATE = 0.08
        const STANDCYCLE_RATE = 0.6
        const SHOOTING_RATE = 0.15
        const DEATHCYCLE_RATE = 0.15
        const animations = {
            // Spellcasting
            'sc-n': new Animation(spritesheet, 64, 64, 7, 1, SPELLCASTING_RATE, 7, true, 2),
            'sc-w': new Animation(spritesheet, 64, 64, 7, 2, SPELLCASTING_RATE, 7, true, 2),
            'sc-s': new Animation(spritesheet, 64, 64, 7, 3, SPELLCASTING_RATE, 7, true, 2),
            'sc-e': new Animation(spritesheet, 64, 64, 7, 4, SPELLCASTING_RATE, 7, true, 2),
            // Thrusting
            'th-n': new Animation(spritesheet, 64, 64, 8, 5, THRUSTING_RATE, 8, true, 2),
            'th-w': new Animation(spritesheet, 64, 64, 8, 6, THRUSTING_RATE, 8, true, 2),
            'th-s': new Animation(spritesheet, 64, 64, 8, 7, THRUSTING_RATE, 8, true, 2),
            'th-e': new Animation(spritesheet, 64, 64, 8, 8, THRUSTING_RATE, 8, true, 2),
            // Walk cycle
            'wc-n': new Animation(spritesheet, 64, 64, 9, 9, WALKCYCLE_RATE, 9, true, 2),
            'wc-w': new Animation(spritesheet, 64, 64, 9, 10, WALKCYCLE_RATE, 9, true, 2),
            'wc-s': new Animation(spritesheet, 64, 64, 9, 11, WALKCYCLE_RATE, 9, true, 2),
            'wc-e': new Animation(spritesheet, 64, 64, 9, 12, WALKCYCLE_RATE, 9, true, 2),
            // Slashing
            'sl-n': new Animation(spritesheet, 64, 64, 6, 13, SLASHING_RATE, 6, true, 2),
            'sl-w': new Animation(spritesheet, 64, 64, 6, 14, SLASHING_RATE, 6, true, 2),
            'sl-s': new Animation(spritesheet, 64, 64, 6, 15, SLASHING_RATE, 6, true, 2),
            'sl-e': new Animation(spritesheet, 64, 64, 6, 16, SLASHING_RATE, 6, true, 2),
            // Standing (modified slashing)
            'st-n': new Animation(spritesheet, 64, 64, 2, 13, STANDCYCLE_RATE, 2, true, 2),
            'st-w': new Animation(spritesheet, 64, 64, 2, 14, STANDCYCLE_RATE, 2, true, 2),
            'st-s': new Animation(spritesheet, 64, 64, 2, 15, STANDCYCLE_RATE, 2, true, 2),
            'st-e': new Animation(spritesheet, 64, 64, 2, 16, STANDCYCLE_RATE, 2, true, 2),
            // Shooting
            'sh-n': new Animation(spritesheet, 64, 64, 13, 17, SHOOTING_RATE, 13, true, 2),
            'sh-w': new Animation(spritesheet, 64, 64, 13, 18, SHOOTING_RATE, 13, true, 2),
            'sh-s': new Animation(spritesheet, 64, 64, 13, 19, SHOOTING_RATE, 13, true, 2),
            'sh-e': new Animation(spritesheet, 64, 64, 13, 20, SHOOTING_RATE, 13, true, 2),
            // Hurt
            'hu-s': new Animation(spritesheet, 64, 64, 6, 21, DEATHCYCLE_RATE, 6, true, 2),
        }
        return animations
    }
}