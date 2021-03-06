import InteractionComponent from './InteractionComponent.js'
import AttributeComponent from '../AttributeComponent.js'
import AnimationComponent from '../AnimationComponent.js'
import CombatComponent from '../CombatComponent.js'
import Vector from '../../../utils/Vector.js'

export default class EnemyInteractionComponent extends InteractionComponent {
    constructor(entity) {
        super(entity)
    }

    update() {
    }

    draw() {
        super.update()
        // if (this.hovered) {
        //     this.drawMouseover()
        // }
        this.drawHealth()
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
            ctx.fillStyle = 'red'
            ctx.fillText(attributeComponent.Name, screenPos.x + currentAnimation.offset.x, screenPos.y + height / 2 - currentAnimation.offset.y)
            ctx.fillText('HP:' + HP, screenPos.x + currentAnimation.offset.x, screenPos.y + height / 2 - currentAnimation.offset.y + fontSize + 3)
        }
    }

    drawHealth() {
        const attributeComponent = this.entity.getComponent(AttributeComponent)
        const animationComponent = this.entity.getComponent(AnimationComponent)
        if (attributeComponent && animationComponent) {
            const ctx = this.entity.game.ctx
            const currentAnimation = animationComponent.getCurrentAnimation()
            const height = currentAnimation.getHeight()
            const screenPos = this.entity.game.worldToScreen(new Vector(this.entity.x, this.entity.y)) // get position on screen
            const HP = attributeComponent.HP.toFixed(1)
            const fullHP = attributeComponent.HPFull.toFixed(1)
            ctx.fillStyle = 'Black'
            ctx.fillRect(screenPos.x -15, screenPos.y - height*3/4, 30, 4)
            ctx.fillStyle = 'Green'
            ctx.fillRect(screenPos.x -15, screenPos.y - height*3/4, 30 * (HP/fullHP),4)
        }
    }

    setAttacking() {
        const enemyCombatComponent = this.entity.getComponent(CombatComponent)
        if (enemyCombatComponent) {
            const player = this.entity.game.getCurrentScene().getPlayer()
            const playerCombatComponent = player.getComponent(CombatComponent)
            playerCombatComponent.setCombatTarget(this.entity)
            enemyCombatComponent.setCombatTarget(player)
        }
    }

    unsetAttacking() {
        const combatComponent = this.entity.getComponent(CombatComponent)
        if (combatComponent) {
            const player = this.entity.game.getCurrentScene().getPlayer()
            const playerCombatComponent = player.getComponent(CombatComponent)
            playerCombatComponent.unsetCombatTarget()
        }
    }

    setRightClick() {
        this.setAttacking()
    }

    unsetRightClick() {
        //this.unsetAttacking()
    }

    setLeftClick() {

    }

    unsetLeftClick() {

    }
}