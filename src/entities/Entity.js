import { STATES } from '../utils/Const.js'
import {create_UUID} from '../utils/Random.js'
import {HitCircle} from '../utils/Collision.js'
import Vector from '../utils/Vector.js'

export default class Entity {
    constructor(game, pos) {
        this.game = game
        this.x = pos.x
        this.y = pos.y
        this.removeFromWorld = false
        this.states = this.getDefaultStates()
        this.UUID = 'ENTITY::'+ create_UUID() //UUID for identifying this entity instance.
        this.size = 32
        this.radius = 16 //Default values TODO add in constructor
        this.hitOffsetX = 0
        this.hitOffsetY = 0
    }

    update() { 
        //Update hitbox location of collidable entities
        if(this.states[STATES.Collidable]){
            this.hitbox.update(this.x + this.hitOffsetX, this.y + this.hitOffsetY)
        }
    }

    draw() {
        this.game.ctx.fillRect(this.x - this.game.camera.xView, this.y - this.game.camera.yView, 5, 5)
        if (this.game.showOutlines && this.radius) {
            this.game.ctx.beginPath()
            this.game.ctx.strokeStyle = 'green'
            this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            this.game.ctx.stroke()
            this.game.ctx.closePath()
        }
    }

    getDefaultStates() {
        const states = []
        for (const state of Object.entries(STATES)) {
            /** `state` comes out as an array, first element being
             * a string that represents the Symbol, second element 
             * being the Symbol itself.
             */
            const stateSymbol = state[1]
            states[stateSymbol] = false
        }
        return states
    }

    /**
     * Sets an entities state to be collidable and creates a hitbox from it's dimensions.
     */
    setCollidable(options = {}){
        const defaults = {
            offset: false,
            xOffset: 0,
            yOffset: 0,
            radius: 32
        }
        options = Object.assign({}, defaults, options)
        this.states[STATES.Collidable] = true
        if (options.offset === true) {
            this.hitOffsetX = options.xOffset
            this.hitOffsetY = options.yOffset
            this.hitbox = new HitCircle(options.radius, this.x + this.hitOffsetX, this.y + this.hitOffsetY)
        } else {
            this.hitbox = new HitCircle(this.radius, this.x, this.y)
        }
        
       
    }

    /**
     * Helper method for moving to check if the x/y coordinate is good.
     * If there is a collision, x/y is not updated.
     *
     * @param x
     * @param y
     */
    tryMove(x,y){
        if(this.states[STATES.Collidable]){

            const isCollided = this.game.sceneManager.collisionLayer.collides(this, new Vector(x,y))

            if(!isCollided){
                this.x = x
                this.y = y
            }//else, collision happened, don't update x/y

        } else { //not collidable
            this.x = x
            this.y = y
        }
    }


    goTo(x, y) {

        if(this.states[STATES.Collidable]){

            const isCollided = this.game.sceneManager.collisionLayer.collides(this, new Vector(x,y))

            if(!isCollided){
                this.goToX = x
                this.goToY = y
            }//else, collision happened, don't update x/y

        } else { //not collidable
            this.goToX = x
            this.goToY = y
        }

        this.following = true


    }

    rotateAndCache(image, angle) {
        const offscreenCanvas = document.createElement('canvas')
        const size = Math.max(image.width, image.height)
        offscreenCanvas.width = size
        offscreenCanvas.height = size
        const offscreenCtx = offscreenCanvas.getContext('2d')
        offscreenCtx.save()
        offscreenCtx.translate(size / 2, size / 2)
        offscreenCtx.rotate(angle)
        offscreenCtx.translate(0, 0)
        offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2))
        offscreenCtx.restore()
        return offscreenCanvas
    }
}