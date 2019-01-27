import Timer from './utils/Timer.js'
import InputManager from './utils/InputManager.js'
import SceneManager from './scenemanager.js'
import Camera from './world/Camera.js'

export default class GameEngine {
    constructor() {

        this.SCENE_MANAGER = null
        this.INPUT_MANAGER = null
        this.ASSET_MANAGER = null

        this.CAMERA = null //TODO: define this by scene? Not all scenes will need this and it will probably change between scenes. Otherwise leave it.
        this.timer = null
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

    }

    init(ctx) {

        this.INPUT_MANAGER = new InputManager()



        this.ctx = ctx
        this.surfaceWidth = this.ctx.canvas.width
        this.surfaceHeight = this.ctx.canvas.height
        this.timer = new Timer()

        this.CAMERA = new Camera(this)
        this.SCENE_MANAGER = new SceneManager(this)

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
        this.INPUT_MANAGER.registerEventListeners(this.ctx)
    }

    addEntity(entity) {
        console.log('added entity')
        this.entities.push(entity)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight)
        this.ctx.save()
        //NOTE: The code below is moved to the scene class, so the scene can render all entities within that scene
        this.SCENE_MANAGER.draw(this.ctx)

        this.ctx.restore()
    }

    update() {
        //NOTE: The code below is moved to the scene class, so the scene can render all entities within that scene
        this.SCENE_MANAGER.update(this.clockTick)
    }

    loop() {
        this.clockTick = this.timer.tick()
        this.update()
        this.draw()
    }

    getAsset(path){
        return this.ASSET_MANAGER.getAsset(path)
    }

    setCamera(camera) {
        this.camera = camera
    }


}
