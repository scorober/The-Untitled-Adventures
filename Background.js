export default class Background {
    constructor(game, spritesheet) {
        this.x = 0
        this.y = 0
        this.spritesheet = spritesheet
        this.game = game
        this.ctx = game.ctx
    }

    draw() {
        this.ctx.drawImage(this.spritesheet, this.x, this.y)
    }

    update() { }
}