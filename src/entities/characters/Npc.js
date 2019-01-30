import { ANIMATIONS, STATES, DIRECTIONS, KEYS } from '../../utils/Const.js'
import Character from './Character.js'
import Effect from '../Effect.js'
import Animation from '../../Animation.js'

export default class Npc extends Character {
    constructor(game, spritesheet, x, y) {
        super(game, spritesheet, x, y)
        this.game = game
    }


    update() {
        super.update()
    }

    draw() {
        super.draw()
    }
}