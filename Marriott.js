import Entity from './Entity.js'
import Animation from './Animation.js'
import PlayableCharacter from './PlayerCharacter.js'

export default class Marriott extends PlayableCharacter {
    constructor(game, spritesheet) {
        super(game, spritesheet)
        //super(game, 0, 450)
        this.y += 12
        let wcRate = 0.1
        let sitRate = 0.1
        this.animations = {
            // Walk cycle
            'wc-n': new Animation(spritesheet, 64, 69, 9, 1, wcRate, 9, true, 2),
            'wc-w': new Animation(spritesheet, 64, 69, 9, 2, wcRate, 9, true, 2),
            'wc-s': new Animation(spritesheet, 64, 69, 9, 3, wcRate, 9, true, 2),
            'wc-e': new Animation(spritesheet, 64, 69, 9, 4, wcRate, 9, true, 2),
            // Sitting on desk
            'sit-d': new Animation(spritesheet, 64, 69, 5, 5, sitRate, 5, false, 2),
            'sit-u': new Animation(spritesheet, 64, 69, 5, 5, sitRate, 5, false, 2),
            
            //standing
            'st-n': new Animation(spritesheet, 64, 69, 1, 1, wcRate, 1, true, 2),
            'st-w': new Animation(spritesheet, 64, 69, 1, 2, wcRate, 1, true, 2),
            'st-s': new Animation(spritesheet, 64, 69, 1, 3, wcRate, 1, true, 2),
            'st-e': new Animation(spritesheet, 64, 69, 1, 4, wcRate, 1, true, 2),
        }
        this.animation = this.animations['st-e']
        this.speed = 10
        this.game = game
        this.ctx = game.ctx

    }
    update() {
        // console.log(this.game.input.downKeys);
        
        if (this.game.input.downKeys['KeyD']) {
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
                    // this.animation.elapsedTime = 0
                    console.log(this.animation.elapsedTime);
                    
        
                }
            }
        }
    }

    draw() {
        super.draw()
        // console.log(this.game.clockTick);
        
    }
}