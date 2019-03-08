import InteractionComponent from './InteractionComponent.js'
import AttributeComponent from '../AttributeComponent.js'
import AnimationComponent from '../AnimationComponent.js'
import Vector from '../../../utils/Vector.js'

export default class MarriottInteractionComponent extends InteractionComponent {
    constructor(entity) {
        super(entity)
    }

    update() {
        super.update()
    }

    draw() {
        super.draw()
        if (this.hovered) {
            this.drawMouseover()
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
            ctx.fillText(attributeComponent.Name, screenPos.x + currentAnimation.offset.x, screenPos.y + height / 2 - currentAnimation.offset.y - 10)
            ctx.fillStyle = 'red'
            ctx.fillText('HP:' + HP, screenPos.x + currentAnimation.offset.x, screenPos.y + height / 2 - currentAnimation.offset.y + fontSize + 3 - 10)
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