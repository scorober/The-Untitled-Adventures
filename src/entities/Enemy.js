import Character from './Character.js'

export default class Enemy extends Character {
    constructor(game, pos) {
        if (new.target === Enemy) {
            throw new TypeError('Should not construct Enemy directly')
        }
        super(game, pos)
    }

    update() {
        super.update()
    }

    draw() {
        super.draw()
    }
}