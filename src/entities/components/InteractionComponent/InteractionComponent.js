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
        this.checkMouseInteraction()
    }

    draw() {
        
    }

    checkMouseInteraction() {
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
}