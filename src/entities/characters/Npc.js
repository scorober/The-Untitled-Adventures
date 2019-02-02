import Character from './Character.js'

export default class Npc extends Character {
    constructor(game, spritesheet, x, y) {
        if (new.target == Npc) {
            throw new TypeError('Should not construct Npc directly')
        }
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