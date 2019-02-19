import { STATES } from '../utils/Const.js'
import { create_UUID } from '../utils/Random.js'
import { HitCircle } from '../utils/Collision.js'
import Vector from '../utils/Vector.js'

export default class Entity {
    constructor(game, pos) {
        this.game = game
        this.x = pos.x
        this.y = pos.y
        this.removeFromWorld = false
        this.states = this.getDefaultStates()
        this.components = []
        this.UUID = 'ENTITY::' + create_UUID() //UUID for identifying this entity instance.
        this.size = 32
        this.radius = 16 //Default values TODO add in constructor
        this.hitOffsetX = 0
        this.hitOffsetY = 0
        //TODO: values below will be added from data in next push. Hardcoded for now to make a different component work.
        this.height = 32
        this.width = 32
        this.hitPoints = 100
        this.name = 'HARDCODED NAME'
    }

    /**
     * First determines if entity is hovered based on the mouse's location.
     *
     * Calls update on each of the Entity's components.
     */
    update() {
        if(this.game.inputManager.mousePosition  && !(this.UUID.includes('PLAYER') || this.UUID.includes('CAMERA') )){ //don't highlight player
            const mp = this.game.inputManager.mousePosition
            if(mp) {
                this.states[STATES.IsHovered] = !!this.checkCollisionScreen(new Vector(mp.x, mp.y))
            }
        }

        this.components.forEach((component) => {
            component.update()
        })
        if (this.states[STATES.Collidable]) {
            const pos = Map.worldToTilePosition(this, this.game.getTileSize())
            this.hitbox.update(pos.x, pos.y)
        }
    }


    /**
     * Calls draw on each of the Entity's components.
     * Also draws unit information if the entity is a hovered entity.
     */
    draw() {
        if(this.states[STATES.IsHovered]){
            const entityTruePos = this.game.worldToScreen({x: this.x, y: this.y - this.height}) // get position on screen
            this.game.ctx.textAlign = 'center'
            this.game.ctx.font = '14px arcade'
            this.game.ctx.fillStyle = 'red'
            this.game.ctx.fillText(this.name, entityTruePos.x , entityTruePos.y + this.size + (this.size/2))
            this.game.ctx.fillText('HP:' + this.hitPoints, entityTruePos.x , entityTruePos.y + this.size + (this.size))
        }
        this.components.forEach((component) => {
            component.draw()
        })
    }

    //////////// COMPONENT STUFF ////////////

    /**
     * Adds a component to this Entity
     * @param {Component} component The component to add to this Entity
     * @returns {Boolean} whether the component could be added.
     */
    addComponent(component) {
        for (const existingComponent in this.components) {
            if (component.constructor.name === existingComponent.constructor.name) {
                return false
            }
        }
        this.components.push(component)
        return true
    }

    /**
     * Replaces an existing component in this Entity
     * @param {Component} component The component to replace in this Entity
     * @returns {Boolean} whether the component could be replaced
     */
    replaceComponent(component) {
        for (let i = 0; i < this.components.length; i++) {
            if (component.constructor.name === this.components[i].constructor.name) {
                this.components[i] = component
                return true
            }
        }
        return false
    }

    /**
     * 
     * @param {Class} type The component type to get
     * @returns {Component} The component with the specified type
     */
    getComponent(type) {
        for (const component of this.components) {
            if (component instanceof type) return component
        }
        return false
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

    //////////// COLLISION STUFF //////////////

    /**
     * Sets an entities state to be collidable and creates a hitbox from it's dimensions.
     * This may be replaced and moved to attribute component.
     */
    setCollidable(options = {}) {
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
     * Uses the WORLD-TO-SCREEN converter in the game engine to determine if an entity is at a certain location.
     *
     * @param vector
     * @returns {boolean}
     */
    checkCollisionScreen(vector){
        const entityTruePos = this.game.worldToScreen({x: this.x, y: this.y - this.height}) // get position on screen
        const dist = vector.distance(entityTruePos)
        if(dist < this.size){
            //console.log(this.name, ' IN DISTANCE!  ', dist)
            const distY = vector.absdistanceY(entityTruePos)
            const distX = vector.absdistanceX(entityTruePos)

            if(distX < this.width && distY < this.height){
                return true
            }else{
                return false
            }
        }
    }

    /**
     * Uses the SCREEN-TO-WORLD converter in the game engine to determine if an entity is at a certain location.
     *
     * @param vector
     * @returns {boolean}
     */
    checkCollisionWorld(vector){
        let ret = {collides: false, distance: null} //DONT const...this value changes...eslint is dumb
        //let entityTruePos = this.game.screenToWorld(this) // get position on screen
        const dist = vector.distance(this)
        if(dist < this.size){
            ret.distance = dist
            const distY = vector.absdistanceY(this)
            const distX = vector.absdistanceX(this)

            ret.collides = distX < this.width && distY < this.height
        }
        return ret
    }

    /**
     * Helper method for moving to check if the x/y coordinate is good.
     * If there is a collision, x/y is not updated.
     *
     * @param x
     * @param y
     */
    tryMove(x, y) {
        if (this.states[STATES.Collidable]) {

            const isCollided = this.game.sceneManager.collisionLayer.collides(this, new Vector(x, y))

            if (!isCollided) {
                this.x = x
                this.y = y
            }//else, collision happened, don't update x/y

        } else { //not collidable
            this.x = x
            this.y = y
        }
    }

    goTo(x, y) {

        if (this.states[STATES.Collidable]) {

            const isCollided = this.game.sceneManager.collisionLayer.collides(this, new Vector(x, y))

            if (!isCollided) {
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