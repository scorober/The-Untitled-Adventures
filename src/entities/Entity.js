import { STATES } from '../utils/Const.js'
import { create_UUID } from '../utils/Random.js'
import Vector from '../utils/Vector.js'
import AttributeComponent from './components/AttributeComponent.js'
import CollisionComponent from './components/CollisionComponent.js'
import AnimationComponent from './components/AnimationComponent.js'

export default class Entity {
    constructor(game, pos) {
        this.game = game
        this.x = pos.x
        this.y = pos.y
        this.removeFromWorld = false
        this.states = this.getDefaultStates()
        this.components = []
        this.UUID = create_UUID()
        this.hitOffsetX = 0
        this.hitOffsetY = 0
    }

    /**
     * First determines if entity is hovered based on the mouse's location.
     *
     * Calls update on each of the Entity's components.
     */
    update() {
        this.checkMouseover()
        this.components.forEach((component) => {
            component.update()
        })
    }

    checkMouseover() {
        this.states[STATES.IsHovered] = false
        if (this.game.inputManager.mousePosition && this.UUID.includes('PLAYER') === false) { //don't highlight player
            const mp = this.game.inputManager.mousePosition
            if (mp) {
                const collisionComponent = this.getComponent(CollisionComponent)
                if (collisionComponent) {
                    const mouseVector = new Vector(mp.x, mp.y)
                    if (collisionComponent.checkCollisionScreen(mouseVector)) {
                        this.states[STATES.IsHovered] = true
                    }
                }
            }
        }
    }

    /**
     * Calls draw on each of the Entity's components.
     * Also draws unit information if the entity is a hovered entity.
     */
    draw() {
        this.components.forEach((component) => {
            component.draw()
        })
        if (this.states[STATES.IsHovered]) {
            const attributeComponent = this.getComponent(AttributeComponent)
            const animationComponent = this.getComponent(AnimationComponent)
            if (attributeComponent && animationComponent) {
                const currentAnimation = animationComponent.getCurrentAnimation()
                const entityTruePos = this.game.worldToScreen({ x: this.x, y: this.y }) // get position on screen
                this.game.ctx.textAlign = 'center'
                this.game.ctx.font = '14px arcade'
                this.game.ctx.fillStyle = (attributeComponent.Name === 'MARIOTT') ? 'black' : 'red'
                this.game.ctx.fillText(attributeComponent.Name, entityTruePos.x, entityTruePos.y + currentAnimation.yOffset + currentAnimation.frameHeight / 2)
                this.game.ctx.fillStyle = 'red'
                this.game.ctx.fillText('HP:' + attributeComponent.HP, entityTruePos.x, entityTruePos.y + currentAnimation.yOffset + currentAnimation.frameHeight / 2 + 17)
                this.game.ctx.fillStyle = 'blue'
                //this.game.ctx.fillText('MANA:' + this.attributes.Mana, entityTruePos.x , entityTruePos.y + this.attributes.Size + 2*(this.attributes.Size))
            }
        }
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