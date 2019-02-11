import Component from './Component.js'
import Map from '../../world/Map.js'
import MovementComponent from './MovementComponent.js'
import {
    KEYS
} from '../../utils/Const.js'
import PlayerCharacterAnimationComponent from './PlayerCharacterAnimationComponent.js'
import ProjectileComponent from './ProjectileComponent.js';
import AnimationComponent from './AnimationComponent.js';

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
            this.entity.getComponent(PlayerCharacterAnimationComponent).setOversizedAnimation(direction)
        }
        if (this.entity.game.inputManager.downKeys[KEYS.KeyQ]) {
            const direction = this.entity.getComponent(MovementComponent).direction
            //Offset direction
            const fireball = new Entity(this.entity.game, {
                x: this.entity.x,
                y: this.entity.y
            })
            const target = this.entity.game.inputManager.mousePosition()
            //TODO get screen to world
            fireball.addComponent(new ProjectileComponent(fireball, target))
            fireball.addComponent(new MovementComponent(fireball))
            // fireball.addComponent(new AnimationComponent())
            this.entity.game.sceneManager.currentScene.addEntity(fireball)
        }

    }

    /**
     * Called each draw cycle
     */
    draw() {}

    /**
     * Calculates tile index position from click position and informs this Entity's MovementComponent
     * @param {Object} clickPos The click position to pathfind to.
     */
    handleRightClick(clickPos) {
        const cam = this.entity.game.camera
        const tileSize = this.entity.game.sceneManager.currentScene.map.tileSize
        const targetTile = Map.worldToTilePosition({
            x: cam.xView + clickPos.x,
            y: cam.yView + clickPos.y
        }, tileSize)
        this.entity.getComponent(MovementComponent).setPathfindingTarget(targetTile)
    }



}