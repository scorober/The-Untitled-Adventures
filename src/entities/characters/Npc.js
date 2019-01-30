import Character from './Character.js'

export default class Npc extends Character {
    constructor(game, x, y) {
        super(game, x, y)
        this.game = game
    }


    update() {}

    draw() {}
}