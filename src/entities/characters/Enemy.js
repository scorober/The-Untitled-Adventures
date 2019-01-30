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


    update() {}

    draw() {}
}