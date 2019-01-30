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
        // This should be defined in Character.js
        this.states = []
    }

    update() {
        this.handleMovement()
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
    }

    handleMovement() {
        
    }

    getAnimations(spritesheet) {
        const animations = {}
        return animations
    }
}