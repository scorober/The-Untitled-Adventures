import Entity from './Entity.js'

export default class Effect extends Entity{
    constructor(game, animation, x, y) {
        super(game, x, y)
        this.game = game
        this.ctx = game.ctx
        this.x = x
        this.y = y
        this.animation = animation
    }

    update() {
        super.update()
    }

    draw() {
        this.animation.drawFrame(this.game.clockTick, this.game, this.x, this.y)
        super.draw()
    }
}