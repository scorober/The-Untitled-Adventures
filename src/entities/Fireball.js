import Entity from './Entity.js'
import Animation from '../Animation.js'
import { ANIMATION_RATES as AR, ANIMATIONS as ANIMS, STATES } from '../utils/Const.js'
import AnimationFactory from '../AnimationFactory.js'
import Vector from '../utils/Vector.js'



export default class Fireball extends Entity {
    constructor(game, spritesheet, pos, target) {
        super(game, pos)
        this.pos = new Vector(pos.x, pos.y)
        this.target = new Vector(target.x, target.y)
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.scale = 1
        this.animation = this.animations[ANIMS.Start]
        this.speed = 3
        this.dir = new Vector(target.x - pos.x, target.y - pos.y)
        this.dir.normalize()
        this.states[STATES.Stage1] = true
        this.angle = Vector.getAngle(pos, target)
        this.states[STATES.Moving] = true
    }

    update() {
        if (this.animation === this.animations[ANIMS.Start] && this.animation.isDone()) {
            this.animation = this.animations[ANIMS.Projectile]
            this.states[STATES.Stage2] = true
            this.states[STATES.Stage1] = false
        }

        if (this.states[STATES.Moving] === true) {
            this.x = this.x + this.dir.x * this.speed
            this.y = this.y + this.dir.y * this.speed
        }

        //TODO remove stage states...
        if (this.states[STATES.Stage2] === true) {
            const vec = new Vector(this.x, this.y)
            if (vec.distance(this.target) < 100) {
                this.states[STATES.Moving] = false
                this.animation = this.animations[ANIMS.Boost]
            }
            if (this.animation.isDone()) {
                this.removeFromWorld = true
            }
        }


    }
    
    draw() {
        this.animation.drawFrame(this.game, this.x, this.y, this.angle)
        super.draw()
    }

    getDefaultAnimationRates() {
        return {
            [AR.Impact]: 0.12,
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

        animationFactory.scale = 1.4
        animations[ANIMS.Boost] = animationFactory.getNextRow(boostSize, boostSize, this.animationRates[AR.Impact], { maxFrames: 15, loop: false})
        animationFactory.scale = 1
        animations[ANIMS.Fire] = animationFactory.getNextRow(fireW, fireH, this.animationRates[AR.Impact])
        animations[ANIMS.Start] = animationFactory.getNextRow(blastW, blastH, this.animationRates[AR.Fireball], { maxFrames: 4, loop: false })
        animations[ANIMS.Projectile] = animationFactory.getNextRow(blastW, blastH, this.animationRates[AR.Fireball], { maxFrames: 7 })
        
        return animations
    }
}