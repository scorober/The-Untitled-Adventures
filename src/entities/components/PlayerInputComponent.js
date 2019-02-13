import Component from './Component.js'
import Map from '../../world/Map.js'
import MovementComponent from './MovementComponent.js'
import {STATES, KEYS, ANIMATIONS as ANIMS } from '../../utils/Const.js'
import AnimationComponent from './AnimationComponent.js'
import CombatComponent from './CombatComponent.js'

export default class PlayerInputComponent extends Component {
    /**
     * @param {Entity} entity A reference to the Entity this Component is attached to
     * @param {Object} animationConfig Animation configuration object for this character.
     */
    constructor(entity) {
        super(entity)
    }

    /**
     * Called each update cycle
     */
    update() {
        if (this.entity.game.inputManager.hasRightClick()) {
            const clickPos = this.entity.game.inputManager.getRightClick()
            this.handleRightClick(clickPos)
        }
        if (this.entity.game.inputManager.downKeys[KEYS.KeyD]) {
            const direction = this.entity.getComponent(MovementComponent).direction
            this.entity.getComponent(AnimationComponent).setDirectionalAnimation(direction, {
                north: ANIMS.OversizeNorth,
                east: ANIMS.OversizeEast,
                south: ANIMS.OversizeSouth,
                west: ANIMS.OversizeWest
            })
        }
    }

    /**
     * Called each draw cycle
     */
    draw() { }

    /**
     * Calculates tile index position from click position and informs this Entity's MovementComponent
     * @param {Object} clickPos The click position to pathfind to.
     */
    handleRightClick(clickPos) {
        const cam = this.entity.game.camera
        const tileSize = this.entity.game.sceneManager.currentScene.map.tileSize
        const targetTile = Map.worldToTilePosition({ x: cam.xView + clickPos.x, y: cam.yView + clickPos.y }, tileSize)
        this.entity.getComponent(MovementComponent).setPathfindingTarget(targetTile)

        if(this.entity.states[STATES.Combat_Entity]){
            let entities = this.entity.game.getEntityByXY(targetTile.x, targetTile.y)
            entities = entities.filter( e =>
                e.UUID !== this.entity.UUID
            )
            if(entities.length === 1){
                this.entity.getComponent(CombatComponent).setAttackTarget(entities[0])
            }
        }
    }
}