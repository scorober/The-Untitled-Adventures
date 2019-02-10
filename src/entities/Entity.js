import { STATES } from '../utils/Const.js'

export default class Entity {
    constructor(game, pos) {
        this.game = game
        this.x = pos.x
        this.y = pos.y
        this.states = this.getDefaultStates()
        this.components = []
    }

    /**
     * Calls update on each of the Entity's components.
     */
    update() {
        this.components.forEach((component) => {
            component.update()
        })
    }

    /**
     * Calls draw on each of the Entity's components
     */
    draw() {
        this.game.ctx.fillRect(this.x - this.game.camera.xView, this.y - this.game.camera.yView, 5, 5)
        if (this.game.showOutlines && this.radius) {
            this.game.ctx.beginPath()
            this.game.ctx.strokeStyle = 'green'
            this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            this.game.ctx.stroke()
            this.game.ctx.closePath()
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