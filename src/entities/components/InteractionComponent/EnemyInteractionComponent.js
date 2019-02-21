import InteractionComponent from './InteractionComponent.js'
import AttributeComponent from '../AttributeComponent.js'
import AnimationComponent from '../AnimationComponent.js'
import CombatComponent from '../CombatComponent.js'

export default class EnemyInteractionComponent extends InteractionComponent {
    constructor(entity) {
        super(entity)
    }

    update() {
        if (this.leftClick) {
            // handle left click()
        }
        if (this.rightClick) {
            this.handleAttack()
        }
    }

    draw() {
        super.update()
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
            const screenPos = this.entity.game.worldToScreen({ x: this.entity.x, y: this.entity.y }) // get position on screen
            const fontSize = 14
            ctx.textAlign = 'center'
            ctx.font = fontSize + 'px arcade'
            ctx.fillStyle = 'red'
            ctx.fillText(attributeComponent.Name, screenPos.x, screenPos.y + height / 2 - currentAnimation.yOffset)
            ctx.fillText('HP:' + attributeComponent.HP, screenPos.x, screenPos.y + height / 2 - currentAnimation.yOffset + fontSize + 3)
        }
    }

    handleAttack() {
        const combatComponent = this.entity.getComponent(CombatComponent)
        if (combatComponent) {
            const player = this.entity.game.getCurrentScene().getPlayer()
            const playerCombatComponent = player.getComponent(CombatComponent)
            playerCombatComponent.meleeAttack(combatComponent)
        }
    }
}