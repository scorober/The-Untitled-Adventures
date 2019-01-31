import { ANIMATIONS, STATES, DIRECTIONS, KEYS } from '../../utils/Const.js'
import Entity from '../Entity.js'
import Effect from '../Effect.js'
import Animation from '../../Animation.js'

export default class Character extends Entity {
    constructor(game, spritesheet,x ,y) {
        super(game, x, y)
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations['st-e']
        this.speed = 250
        this.game = game
        this.width = 64 //TODO is 64 a constant?
        this.height = 64
        this.scale = 2
        this.speed = 100
        this.game = game
        this.spellcastingRate = 0.15
        this.thrustingRate = 0.15
        this.walkCycleRate = 0.1
        this.slashingRate = 0.08
        this.standCycleRate = 0.6
        this.shootingRate = 0.15
        this.deathCycleRate = 0.15
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations[ANIMATIONS.StandEast]
        this.following = false
        this.followThis
        this.goToX
        this.goToY
        this. err = 64
        this.states = []
    }

    update() {
        this.handleMovement()
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
    }

    handleMovement() {
        if (this.following) {
            this.follow(this.followThis)
            if(this.x <= this.goToX + this.err && this.x >= this.goToX - this.err) {
                if(this.y <= this.goToY + this.err && this.y >= this.goToY - this.err) {
                    this.states[STATES.Moving] = false
                } else if (this.y < this.goToY) {
                    this.direction = DIRECTIONS.South
                    this.states[STATES.Moving] = true
                } else if (this.y > this.goToY) {
                    this.direction = DIRECTIONS.North
                    this.states[STATES.Moving] = true
                }
            } else if(this.x < this.goToX) {
                this.direction = DIRECTIONS.East
                this.states[STATES.Moving] = true
            } else if(this.x > this.goToX){
                this.direction = DIRECTIONS.West 
                this.states[STATES.Moving] = true
            } 
        }
        if (this.states[STATES.Moving] === true) {
            if( this.direction === DIRECTIONS.West) {
                this.animation = this.animations[ANIMATIONS.WalkWest]
                this.x -= this.game.clockTick * this.speed
            } else if (this.direction === DIRECTIONS.East) {
                this.animation = this.animations[ANIMATIONS.WalkEast]
                this.x += this.game.clockTick * this.speed
            } else if (this.direction === DIRECTIONS.North) {
                this.animation = this.animations[ANIMATIONS.WalkNorth]
                this.y -= this.game.clockTick * this.speed
            } else {
                this.animation = this.animations[ANIMATIONS.WalkSouth]
                this.y += this.game.clockTick * this.speed
            }
        } else {
            // this.animation = this.animations[ANIMATIONS.Stan]
        }
    }

    follow(followThis){
        this.followThis = followThis
        this.goTo(this.followThis.x, this.followThis.y)
    }

    goTo(x, y) {
        this.goToX = x
        this.goToY = y
        this.following = true

    }

    getAnimations(spritesheet) {
        const animations = {}
        return animations
    }


}