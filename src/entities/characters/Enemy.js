import Character from './Character.js'

export default class Enemy extends Character {
    constructor(game, x, y) {
        if (new.target == Enemy) {
            throw new TypeError('Should not construct Enemy directly')
        }
        super(game, x, y)
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