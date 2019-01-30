import Animation from '../../Animation.js'
import PlayableCharacter from './PlayerCharacter.js'

export default class Marriott extends PlayableCharacter {
    constructor(game, spritesheet) {
        super(game, spritesheet)
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations['st-e']
        this.y = 350
        this.x = 107
        this.speed = 100    
        this.game = game
        this.ctx = game.ctx

    }
    getAnimations(spritesheet) {
        // super.getAnimations(spritesheet)
        const WALKCYCLE_RATE = 0.1
        const SIT_RATE = 0.1
        const STANDCYCLE_RATE = 0.6
        const animations = {
            // Walk cycle
            'wc-n': new Animation(spritesheet, 64, 69, 9, 1, WALKCYCLE_RATE, 9, true, 2),
            'wc-w': new Animation(spritesheet, 64, 69, 9, 2, WALKCYCLE_RATE, 9, true, 2),
            'wc-s': new Animation(spritesheet, 64, 69, 9, 3, WALKCYCLE_RATE, 9, true, 2),
            'wc-e': new Animation(spritesheet, 64, 69, 9, 4, WALKCYCLE_RATE, 9, true, 2),
            // Sitting on desk
            'sit-d': new Animation(spritesheet, 64, 69, 5, 5, SIT_RATE, 5, false, 2),
            'sit-u': new Animation(spritesheet, 64, 69, 5, 5, SIT_RATE, 5, false, 2),
            
            //standing
            'st-n': new Animation(spritesheet, 64, 69, 1, 1, STANDCYCLE_RATE, 1, true, 2),
            'st-w': new Animation(spritesheet, 64, 69, 1, 2, STANDCYCLE_RATE, 1, true, 2),
            'st-s': new Animation(spritesheet, 64, 69, 1, 3, STANDCYCLE_RATE, 1, true, 2),
            'st-e': new Animation(spritesheet, 64, 69, 1, 4, STANDCYCLE_RATE, 1, true, 2),
        }
        return animations
    }
    update() {
        if (this.game.inputManager.downKeys['KeyD']) {
            this.game.playerDirection = 'KeyD'
            this.game.playerMoving = false
            this.animation.elapsedTime = 0
        }

        super.update()
        if (!this.game.playerMoving) {
            if(this.game.playerDirection == 'KeyD') {
                if(this.animation === this.animations['sit-d']){
                    this.animation = this.animations['sit-u']
                } else {
                    this.animation = this.animations['sit-d']
                }
            }
        }
    }

    draw() {
        super.draw()
    }
}