import Entity from './Entity.js'


export default class Character extends Entity {
    constructor(game, spritesheet) {
        super(game, 0, 0)
        this.animations = null
        this.game = game
    }

    update() {
        super.update()
    }

    draw() {
        super.draw()
    }
}