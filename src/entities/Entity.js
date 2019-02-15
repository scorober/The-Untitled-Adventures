import { STATES } from '../utils/Const.js'
import { create_UUID } from '../utils/Random.js'
import { HitCircle } from '../utils/Collision.js'
import Vector from '../utils/Vector.js'
import Map from '../world/Map.js'


export default class Entity {
    constructor(game, params) {
        this.game = game
        this.x = params.x
        this.y = params.y
        this.removeFromWorld = false
        this.states = this.getDefaultStates()
        this.components = []
        this.name = params.name || 'Entity'
        this.UUID = create_UUID() //UUID for identifying this entity instance.
        this.UUID = this.name + '::' + this.UUID
        this.size = 32
        this.radius = 16 //Default values TODO add in constructor
        this.hitOffsetX = 0
        this.hitOffsetY = 0
        this.states[STATES.IsHovered] = false
    }

    /**
     * Calls update on each of the Entity's components.
     */
    update() {
        if(this.states[STATES.IsHovered] ){
            console.log(this.UUID, ' HOVERED')
        }
        if(this.game.inputManager.mousePosition  && !this.UUID.includes('PLAYER')){ //don't highlight player

            let mp = this.game.inputManager.mousePosition
            if(mp) {
                let mouseVec = new Vector(mp.x, mp.y)
                let entityTruePos = Map.trueWorldToTilePosition(this, this.game)
                let dist = mouseVec.distance(entityTruePos)
                if(dist < this.size) {

                    //then check if x/y coords are correct
                    const distY = mouseVec.absdistanceY(entityTruePos)
                    const distX = mouseVec.absdistanceX(entityTruePos)
                    //  console.log('mouse (x,y): ', mouseVec.x, mouseVec.y)
                    //  console.log('entityTruePos (x,y): ', entityTruePos.x, entityTruePos.y)
                    //  console.log('dist: ', dist)//30
                    //   console.log('distX: ', distX)
                    //  console.log('distY: ', distY)


                    if(distX < 15 && distY < 25 && !this.game.hasHoveredEntity()){//TODO: this.W, this.H
                        this.states[STATES.IsHovered] = true
                    }

                } else {
                    this.game.removeEntityHover()
                    this.states[STATES.IsHovered] = false
                }
            }
        }


        //console.log(v1.distance(v2));


        this.components.forEach((component) => {
            component.update()
        })
        if (this.states[STATES.Collidable]) {
            const pos = Map.worldToTilePosition(this, this.game.getTileSize())
            this.hitbox.update(pos.x, pos.y)
        }
    }


    /**
     * Calls draw on each of the Entity's components
     */
    draw() {
        if(this.states[STATES.IsHovered]){
            let entityTruePos = Map.trueWorldToTilePosition(this, this.game)
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

    /**
     * Sets an entities state to be collidable and creates a hitbox from it's dimensions.
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