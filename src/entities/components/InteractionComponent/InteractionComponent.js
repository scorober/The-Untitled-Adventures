import Component from '../Component.js'
import CollisionComponent from '../CollisionComponent.js'
import Vector from '../../../utils/Vector.js'

export default class InteractionComponent extends Component {
    constructor(entity) {
        super(entity)
        this.hovered = false
        this.leftClick = false
        this.rightClick = false
    }

    update() {
        this.hovered = this.checkMouseover()
    }

    draw() {

    }

    checkMouseover() {
        const inputManager = this.entity.game.inputManager
        const mouseVector = inputManager.mousePosition
        const collisionComponent = this.entity.getComponent(CollisionComponent)
        return mouseVector && collisionComponent && collisionComponent.checkCollisionScreen(mouseVector)
    }

    checkMouseove2() {
        this.hovered = false
        this.leftClick = false
        this.rightClick = false
        const inputManager = this.entity.game.inputManager
        const mousePosition = inputManager.mousePosition
        const collisionComponent = this.entity.getComponent(CollisionComponent)
        if (mousePosition && collisionComponent) {
            const mouseVector = new Vector(mousePosition.x, mousePosition.y)
            if (collisionComponent.checkCollisionScreen(mouseVector)) {
                this.hovered = true
                if (inputManager.hasRightClick()) {
                    inputManager.getRightClick()
                    this.rightClick = true
                }
                if (inputManager.hasLeftClick()) {
                    inputManager.getLeftClick()
                    this.leftClick = true
                }
            }
        }
    }

    setRightClick() {
        this.rightClick = true
    }

    setLeftClick() {
        this.leftClick = true
    }

    unsetRightClick() {
        this.rightClick = false
    }

    unsetLeftClick() {
        this.leftClick = false
    }
}