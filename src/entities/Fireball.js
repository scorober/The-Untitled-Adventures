import Entity from './Entity.js'
import Animation from '../Animation.js'
import { ANIMATION_RATES as AR, ANIMATIONS as ANIMS, ASSET_PATHS as AP, STATES } from '../utils/Const.js'
import AnimationFactory from '../AnimationFactory.js';
import Vector from '../utils/Vector.js'



export default class Fireball extends Entity {
    constructor(game, spritesheet, pos, target) {
        super(game, pos)
        console.log(pos)
        console.log(target)
        this.posX = pos.x
        this.posY = pos.y
        this.targetX = target.x
        this.targetY = target.y
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.scale = 1
        this.animation = this.animations[ANIMS.Start]
        this.speed = 250
        this.dx = this.targetX - this.posX
        this.dy = this.targetY - this.posY
        // if (this.targetY < this.posY) {
        //     this.dy = this.targetY - this.posY
        // } else {
        //     this.dy = this.posY - this.targetY
        // }
        console.log(this.dy)
        console.log(this.dx)
        console.log(Math.atan(this.dy / this.dx))

        const dir = new Vector(target.x - pos.x, target.y - pos.y)
        console.log(dir)
        dir.divideScalar(dir.magnitude)
        this.vector = dir.divideScalar(dir.magnitude)
        console.log(this.vector)
        this.states[STATES.Stage1] = true
        this.angle = dir.getAngle()
    }

    update() {
        if (this.states[STATES.Stage1] === true) {
            if (this.animation.isDone()) {
                this.animation = this.animations[ANIMS.Projectile]
            }
        }
        this.x = this.x + this.vector.x * this.speed
        this.y = this.y + this.vector.y * this.speed
    }

    draw() {
        
        this.animation.drawFrame(this.game, this.x, this.y, Math.atan(this.dy / this.dx))
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