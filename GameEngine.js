import Timer from './Timer.js'
import InputManager from './InputManager.js'

export default class GameEngine {
    constructor() {
        this.entities = []
        this.ctx = null
        this.surfaceWidth = null
        this.surfaceHeight = null
        this.requestAnimFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            // eslint-disable-next-line no-unused-vars
            function(/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60)
            }
        this.input = new InputManager()
    }

    init(ctx) {
        this.ctx = ctx
        this.surfaceWidth = this.ctx.canvas.width
        this.surfaceHeight = this.ctx.canvas.height
        this.timer = new Timer()
        this.startInput()
        console.log('game initialized')
    }

    start() {
        console.log('starting game')
        this.gameLoop()
    }

    gameLoop() {
        this.loop()
        window.requestAnimationFrame(this.gameLoop.bind(this), this.ctx.canvas)
    }

    startInput() {
        console.log('Starting input')
        this.input.registerEventListeners(this.ctx)
    }

    addEntity(entity) {
        console.log('added entity')
        this.entities.push(entity)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight)
        this.ctx.save()
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx)
        }
        this.ctx.restore()
    }

    update() {
        var entitiesCount = this.entities.length

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i]

            entity.update()
        }
    }

    loop() {
        this.clockTick = this.timer.tick()
        this.update()
        this.draw()
    }
}
