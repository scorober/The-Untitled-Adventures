import Component from './Component.js'
import Map from '../../world/Map.js'
import MovementComponent from './MovementComponent.js'

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
    }
}