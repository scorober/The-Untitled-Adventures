import InteractionComponent from './InteractionComponent.js'
import AttributeComponent from '../AttributeComponent.js'
import AnimationComponent from '../AnimationComponent.js'
import Vector from '../../../utils/Vector.js'

export default class MarriottInteractionComponent extends InteractionComponent {
    constructor(entity) {
        super(entity)
    }

    update() {

    }

    draw() {
        super.update()
        if (this.hovered) {
            this.drawMouseover()
        }
        if (this.leftClick) {
            // handle left click()
        }
        if (this.rightClick) {
            // handle right click()
        }
    }

    drawMouseover() {
        const attributeComponent = this.entity.getComponent(AttributeComponent)
        const animationComponent = this.entity.getComponent(AnimationComponent)
        if (attributeComponent && animationComponent) {
            const ctx = this.entity.game.ctx
            const currentAnimation = animationComponent.getCurrentAnimation()
            const height = currentAnimation.getHeight()
            const screenPos = this.entity.game.worldToScreen(new Vector(this.entity.x, this.entity.y)) // get position on screen
            const fontSize = 14
            const HP = attributeComponent.HP.toFixed(1)
            ctx.textAlign = 'center'
            ctx.font = fontSize + 'px arcade'
            ctx.fillStyle = 'black'
            ctx.fillText(attributeComponent.Name, screenPos.x, screenPos.y + height / 2 - currentAnimation.yOffset - 10)
            ctx.fillStyle = 'red'
            ctx.fillText('HP:' + HP, screenPos.x, screenPos.y + height / 2 - currentAnimation.yOffset + fontSize + 3 - 10)
        }
    }


    setRightClick() {

    }

    unsetRightClick() {

    }

    setLeftClick() {

    }

    unsetLeftClick() {

    }
}