import Entity from './Entity.js'
import Animation from '../Animation.js'
import { ANIMATION_RATES as AR, ANIMATIONS as ANIMS, ASSET_PATHS as AP, STATES } from '../utils/Const.js'
import AnimationFactory from '../AnimationFactory.js';
import Vector from '../utils/Vector.js'



export default class Fireball extends Entity {
    constructor(game, spritesheet, pos, target) {
        super(game, pos)
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.scale = 1
        this.animation = this.animations[ANIMS.Start]
        this.speed = 250

        const dir = new Vector(target.x - pos.x, target.y - pos.y)
        dir.divideScalar(dir.magnitude) //Why do I need this twice? Normalization is wrong...
        this.vector = dir.divideScalar(dir.magnitude)
        this.states[STATES.Stage1] = true
        this.angle = Vector.getAngle(pos, target)
    }

    update() {
        if (this.states[STATES.Stage1] === true) {
            if (this.animation.isDone()) {
                this.animation = this.animations[ANIMS.Projectile]
                this.states[STATES.Stage2] = true
            }
        }
        this.x = this.x + this.vector.x * this.speed
        this.y = this.y + this.vector.y * this.speed
    }

    draw() {
        
        this.animation.drawFrame(this.game, this.x, this.y, this.angle)
        super.draw()
    }

    getDefaultAnimationRates() {
        return {
            [AR.Impact]: 0.15,
            [AR.Fireball]: 0.15
        }
    }

    getAnimations(spritesheet) {
        const animations = []
        const animationFactory = new AnimationFactory(spritesheet, this.scale)
        const boostSize = 96
        const fireW = 22
        const fireH = 28
        const blastW = 21
        const blastH = 57

        animations[ANIMS.Boost] = animationFactory.getNextRow(boostSize, boostSize, this.animationRates[AR.Impact], { maxFrames: 15 })
        animations[ANIMS.Fire] = animationFactory.getNextRow(fireW, fireH, this.animationRates[AR.Impact])
        animations[ANIMS.Start] = animationFactory.getNextRow(blastW, blastH, this.animationRates[AR.Fireball], { maxFrames: 4, loop: false })
        animations[ANIMS.Projectile] = animationFactory.getNextRow(blastW, blastH, this.animationRates[AR.Fireball], { maxFrames: 7 })
        
        return animations
    }
}