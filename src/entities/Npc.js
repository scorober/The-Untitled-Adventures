import Character from './Character.js'

export default class Npc extends Character {
    constructor(game, spritesheet, pos) {
        if (new.target == Npc) {
            throw new TypeError('Should not construct Npc directly')
        }
        super(game, spritesheet, pos)
        this.game = game
    }


    update() {
        super.update()
    }

    draw() {
        super.draw()
    }
}