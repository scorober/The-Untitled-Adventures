import Timer from './utils/Timer.js'
import InputManager from './InputManager.js'
import SceneManager from './SceneManager.js'
import Camera from './entities/Camera.js'
import Vector from './utils/Vector.js'

export default class GameEngine {
    constructor() {
        this.sceneManager = null
        this.inputManager = null
        this.assetManager = null
        this.camera = null //TODO: define this by scene? Not all scenes will need this and it will probably change between scenes. Otherwise leave it.
        this.timer = null
        this.ctx = null
        this.surfaceWidth = null
        this.surfaceHeight = null
        this.requestAnimFrame = this.getPlatformRAF().bind(window)
        this.scores = []
    }

    /**
     * Returns the Request Animation Frame method for the current browser/platform
     * @returns {Function}
     */
    getPlatformRAF() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            // eslint-disable-next-line no-unused-vars
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60)
            }
    }

    init(ctx) {
        this.inputManager = new InputManager()
        this.ctx = ctx
        this.surfaceWidth = this.ctx.canvas.width
        this.surfaceHeight = this.ctx.canvas.height
        this.timer = new Timer()
        this.sceneManager = new SceneManager()
        this.camera = new Camera(this)
        this.sceneManager.init(this)
        this.startInput()
    }

    resizeCanvas(width, height) {
        this.ctx.canvas.width = width
        this.ctx.canvas.height = height
        this.surfaceWidth = width
        this.surfaceHeight = height
    }

    start() {
        this.gameLoop()
    }

    gameLoop() {
        this.loop()
        this.requestAnimFrame(this.gameLoop.bind(this), this.ctx.canvas)
    }

    startInput() {
        this.inputManager.registerEventListeners(this.ctx)
    }

    addEntity(entity) {
        this.entities.push(entity)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight)
        this.ctx.save()
        this.sceneManager.draw()
        this.ctx.restore()
    }

    update() {
        this.sceneManager.update()
    }

    loop() {
        this.clockTick = this.timer.tick()
        this.update()
        this.draw()
        this.inputManager.clear()
    }

    getAsset(path) {
        return this.assetManager.getAsset(path)
    }

    /**
     * Gets an array with the current map.
     * This needs to be replaced with a similar array which also contains character, NPC, and other entities.
     * @returns {Array} An array representation of the current map
     */
    getWorld() {
        return this.sceneManager.currentScene.map.getPathfindingArray()
    }

    getTileSize() {
        return 64
    }

    setCamera(camera) {
        this.camera = camera
    }

    screenToWorld(pos) {
        return new Vector(pos.x + this.camera.xView, pos.y + this.camera.yView)
    }
    worldToScreen(pos) {
        return new Vector(pos.x - this.camera.xView, pos.y - this.camera.yView)
    }
    getCurrentScene() {
        if (this.sceneManager) {
            return this.sceneManager.currentScene
        } else {
            return false
        }
    }

    removeEntityByRef(entity) {
        const scene = this.sceneManager.currentScene
        scene.removeEntity(scene.entities.indexOf(entity))
    }

    getHighlightedEntity() {
        return this.sceneManager.currentScene.highlightedEntity
    }
    setHighlightedEntity(entity) {
        this.sceneManager.currentScene.highlightedEntity = entity
    }
    removeHighlightedEntity() {
        this.sceneManager.currentScene.highlightedEntity = null
    }
    getEntityByXYOnScreen(pos) {
        return this.sceneManager.getCollidablesXYScreen(new Vector(pos.x, pos.y))
    }

    getEntityByXYInWorld(pos) {
        return this.sceneManager.getCollidablesXYWorld(new Vector(pos.x, pos.y))
    }

    
    /**
     * Generates score object from entity and ads it to the score board.
     * 
     * @param  entity 
     */
    addScore(name, kill) {
        // Score = null;
        const scene = this.sceneManager.getScene('scoredisplay')
        if(kill) {
            scene.killCount++
            if (name === 'ARCHER') {
                const Score = {
                    Name: 'Archer_Kill',
                    Time: Math.floor(this.timer.gameTime),
                    Duration: null,
                    // lvl: this.sceneManager.getCurrentScene().level,
                    lvl: 1,
                    Score: Math.floor(400 * Math.sqrt(2))
                }
                scene.scores.push(Score)
            } else if (name === 'MAGE') {
                const Score = {
                    Name: 'Mage_Kill',
                    Time: Math.floor(this.timer.gameTime),
                    Duration: null,
                    // lvl: this.sceneManager.getCurrentScene().level,
                    lvl: 1,
                    Score: Math.floor(700 * Math.sqrt(2))
                }
                scene.scores.push(Score)
            } else if (name == 'ROBOT') {
                const Score = {
                    Name: 'Robot_Kill',
                    Time: Math.floor(this.timer.gameTime),
                    Duration: null,
                    // lvl: this.sceneManager.getCurrentScene().level,
                    lvl: 1,
                    Score: Math.floor(550 * Math.sqrt(2))
                }
                scene.scores.push(Score)
            }
        } else {
            scene.state++
            
            if(name == 'END') {
                const Score = {
                    Name: 'LEVEL_END',
                    Time: Math.floor(this.timer.gameTime),
                    Duration: this.timer.gameTime,// this.timer.,
                    // lvl: this.sceneManager.getCurrentScene().level,
                    lvl: 1,
                    Score: Math.floor(1000 * Math.sqrt(2) / Math.sqrt(this.timer.gameTime))
                }
                scene.scores.push(Score)
            }
        }
    }
}
