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
     */
    addComponent(component) {
        this.components.forEach((existingComponent) => {
            if (component instanceof existingComponent.componentType) {
                console.error('A ' + component.componentType + ' already exists')
            }
        })
        this.components.push(component)
    }

    /**
     * 
     * @param {Class} componentType The component type to get
     */
    getComponent(componentType) {
        this.components.forEach((component) => {
            const equal = component instanceof componentType
            if (equal) return component
        })
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