import InteractionComponent from './InteractionComponent/InteractionComponent.js'
import Vector from '../../utils/Vector.js'
import EquippedItemsComponent from './EquippedItemsComponent.js'

export default class EquipmentComponent extends InteractionComponent {
    constructor(entity, config) {
        super(entity)
        const defaults = {
            name: 'Unnamed Helm of Debugging',
            type: 'head',
            atk: 2,
            def: 2,
            matk: 1,
            mdef: 2,
            width: 15,
            height: 15
        }
        Object.assign(this, defaults, config)
    }

    update() {
        super.update()
    }

    draw() {
        super.draw()
        if (this.hovered) {
            this.drawMouseover()
        }
        const screenPos = this.entity.game.worldToScreen(new Vector(this.entity.x, this.entity.y)) // get position on screen
        const ctx = this.entity.game.ctx
        ctx.fillStyle = 'white'
        ctx.fillRect(screenPos.x, screenPos.y, this.width, this.height)
        
    }

    setRightClick() {
        this.entity.game.getCurrentScene().getPlayer().getComponent(EquippedItemsComponent).equip(this)
        this.entity.removeFromWorld = true
    }

    drawMouseover() {
        const mousePos = this.entity.game.inputManager.mousePosition
        const ctx = this.entity.game.ctx
        ctx.fillStyle = 'black'
        let yOffset = 20
        const ySpace = 15
        ctx.fillRect(mousePos.x, mousePos.y, 240, 120)
        ctx.fillStyle = 'white'
        ctx.font = '14px verdana, sans-serif'
        ctx.fillText(this.name, mousePos.x + 5, mousePos.y + yOffset)
        ctx.font = '12px verdana, sans-serif'
        yOffset += ySpace
        ctx.fillText('Type: ' + this.type, mousePos.x + 5, mousePos.y + yOffset)
        yOffset += ySpace
        ctx.fillText('Atk: ' + this.atk, mousePos.x + 5, mousePos.y + yOffset)
        yOffset += ySpace
        ctx.fillText('Def: ' + this.def, mousePos.x + 5, mousePos.y + yOffset)
        yOffset += ySpace
        ctx.fillText('Matk: ' + this.matk, mousePos.x + 5, mousePos.y + yOffset)
        yOffset += ySpace
        ctx.fillText('Mdef: ' + this.mdef, mousePos.x + 5, mousePos.y + yOffset)
    }

    getMatk() {
        return this.matk
    }

    getMdef() {
        return this.mdef
    }

    getAtk() {
        return this.atk
    }

    getDef() {
        return this.def
    }
}