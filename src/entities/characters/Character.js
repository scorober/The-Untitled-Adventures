import { ANIMATIONS, STATES, DIRECTIONS } from '../../utils/Const.js'
import Entity from '../Entity.js'

export default class Character extends Entity {
    constructor(game, x, y) {
        if (new.target == Character) {
            throw new TypeError('Should not construct Character directly')
        }
        super(game, x, y)
        this.states[STATES.Moving] = false
        this.states[STATES.Following] = false
        this.followTarget = false
        // We can check what class this Character is an isntance of
        this.childType = new.target
    }

    setFollowTarget(followTarget) {
        this.states[STATES.Following] = true
        this.followTarget = followTarget
    }

    update() {
        this.handleMovement()
        super.update()
    }

    draw() {
        super.draw()
    }

    handleMovement() {
        if (this.states[STATES.Following]) {
            this.handleFollow()
        }
        if (this.states[STATES.Moving]) {
            this.moveCharacter()
        } else {
            this.handleStanding()
        }
    }

    handleStanding() {
        if (this.direction === DIRECTIONS.West) {
            this.animation = this.animations[ANIMATIONS.StandWest]
        } else if (this.direction === DIRECTIONS.East) {
            this.animation = this.animations[ANIMATIONS.StandEast]
        } else if (this.direction === DIRECTIONS.North) {
            this.animation = this.animations[ANIMATIONS.StandNorth]
        } else {
            this.animation = this.animations[ANIMATIONS.StandSouth]
        }
    }

    moveCharacter() {
        if (this.direction === DIRECTIONS.West) {
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
    }

    handleFollow() {
        const errY = this.height * this.scale
        const errX = this.width * this.scale
        if (this.y < this.followTarget.y - errY) {
            this.direction = DIRECTIONS.South
            this.states[STATES.Moving] = true
        } else if (this.y > this.followTarget.y + errY / 2) {
            this.direction = DIRECTIONS.North
            this.states[STATES.Moving] = true
        } else if (this.x < this.followTarget.x - errX) {
            this.direction = DIRECTIONS.East
            this.states[STATES.Moving] = true
        } else if (this.x > this.followTarget.x + errX / 2) {
            this.direction = DIRECTIONS.West
            this.states[STATES.Moving] = true
        } else {
            this.states[STATES.Moving] = false
        }
    }
}