import { ANIMATIONS, STATES, DIRECTIONS, KEYS } from '../../utils/Const.js'
import Effect from '../Effect.js'
import Character from './Character.js'
import Animation from '../../Animation.js'

export default class Enemy extends Character {
    constructor(game, spritesheet, x, y) {
        super(game, spritesheet, x, y)
        // this.game = game
        this.attackRate = 0.15
        this.impactRate =0.25

    }


    update() {
        super.update()
    }

    draw() {
        super.draw()
    }
}

export class Skeleton extends Enemy{

    constructor(game, spritesheet, x=50, y=150){
        super(game, spritesheet, x, y)

        this.radius = 8
        this.spritesheet = spritesheet
        this.speed = 100


        this.movecycletime = 0
        this.changeInterval = Math.random(5)+1

        this.states[STATES.Moving] = false

        this.direction = DIRECTIONS.South




        this.animation = this.animations[ANIMATIONS.WalkSouth]
    }

    draw(){
        super.draw()
        this.animation.drawFrame(this.game, this.x, this.y)
    }

    update(){
        super.update()
        this.movecycletime += this.game.clockTick

        if(this.movecycletime > this.changeInterval){
            this.movecycletime = 0
            this.switchDirections()

        }
        this.tryMove(this.x, this.y)
    }

    switchDirections(){
        switch(this.direction){

        case DIRECTIONS.South:
            this.direction = DIRECTIONS.East
            this.animation = this.animations[ANIMATIONS.WalkEast]
            break

        case DIRECTIONS.East:
            this.direction = DIRECTIONS.North
            this.animation = this.animations[ANIMATIONS.WalkNorth]
            break

        case DIRECTIONS.North:
            this.direction = DIRECTIONS.West
            this.animation = this.animations[ANIMATIONS.WalkWest]
            break

        case DIRECTIONS.West:
            this.direction = DIRECTIONS.South
            this.animation = this.animations[ANIMATIONS.WalkSouth]
            break

        case DIRECTIONS.South:
            this.direction = DIRECTIONS.East
            this.animation = this.animations[ANIMATIONS.WalkSouth]


        default:
            this.direction = DIRECTIONS.East
            this.animation = this.animations[ANIMATIONS.WalkEast]
        }
    }

    getAnimations(spritesheet) {
        this.height = 64
        this.width = 64
        this.scale = 1
        const wcRate = 0.1
        const animations = {


            [ANIMATIONS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 9, 1, wcRate, 9, false, this.scale),
            [ANIMATIONS.WalkWest]: new Animation(spritesheet, this.width, this.height, 9, 2, wcRate, 9, false, this.scale),
            [ANIMATIONS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 9, 3, wcRate, 9, true, this.scale),
            [ANIMATIONS.WalkEast]: new Animation(spritesheet, this.width, this.height, 9, 4, wcRate, 9, true, this.scale),
        }
        return animations
    }
}