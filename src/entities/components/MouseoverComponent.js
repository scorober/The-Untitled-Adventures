import Component from './Component.js'
import CollisionComponent from './CollisionComponent.js'
import Vector from '../../utils/Vector.js'
import AttributeComponent from './AttributeComponent.js'
import AnimationComponent from './AnimationComponent.js'

export default class MouseoverComponent extends Component {
    constructor(entity) {
        super(entity)
        this.hovered = false
    }

    update() {
        this.checkMouseover()
        if (this.hovered) {
            this.drawMouseover()
        }
    }

    checkMouseover() {
        this.hovered = false
        const mousePosition = this.entity.game.inputManager.mousePosition
        const collisionComponent = this.entity.getComponent(CollisionComponent)
        if (mousePosition && collisionComponent) {
            const mouseVector = new Vector(mousePosition.x, mousePosition.y)
            if (collisionComponent.checkCollisionScreen(mouseVector)) {
                this.hovered = true
            }
        }
    }

    drawMouseover() {
        const attributeComponent = this.entity.getComponent(AttributeComponent)
        const animationComponent = this.entity.getComponent(AnimationComponent)
        if (attributeComponent && animationComponent) {
            const currentAnimation = animationComponent.getCurrentAnimation()
            const entityTruePos = this.entity.game.worldToScreen({ x: this.entity.x, y: this.entity.y }) // get position on screen
            this.entity.game.ctx.textAlign = 'center'
            this.entity.game.ctx.font = '14px arcade'
            this.entity.game.ctx.fillStyle = (attributeComponent.Name === 'MARIOTT') ? 'black' : 'red'
            this.entity.game.ctx.fillText(attributeComponent.Name, entityTruePos.x, entityTruePos.y + currentAnimation.yOffset + currentAnimation.frameHeight / 2)
            this.entity.game.ctx.fillStyle = 'red'
            this.entity.game.ctx.fillText('HP:' + attributeComponent.HP, entityTruePos.x, entityTruePos.y + currentAnimation.yOffset + currentAnimation.frameHeight / 2 + 17)
            this.entity.game.ctx.fillStyle = 'blue'
            //this.game.ctx.fillText('MANA:' + this.attributes.Mana, entityTruePos.x , entityTruePos.y + this.attributes.Size + 2*(this.attributes.Size))
        }
    }
}