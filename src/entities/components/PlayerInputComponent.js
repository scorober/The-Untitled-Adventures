import Component from './Component.js'
import Map from '../../world/Map.js'
import MovementComponent from './MovementComponent.js'
import {
    KEYS
} from '../../utils/Const.js'
import PlayerCharacterAnimationComponent from './PlayerCharacterAnimationComponent.js'
import ProjectileBehaviorComponent from './ProjectileBehaviorComponent.js'
import AnimationComponent from './AnimationComponent.js';
import FireballData from '../effects/FireballDefaultData.js'
import Entity from '../Entity.js'
import MageEffectData from '../effects/MageEffectDefaultData.js'
import ArcherEffectData from '../effects/ArcherEffectDefaultData.js'
import { KEYS, ANIMATIONS as ANIMS } from '../../utils/Const.js'
import AnimationComponent from './AnimationComponent.js'

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
        if (this.entity.game.inputManager.downKeys[KEYS.KeyQ]) {
            const direction = this.entity.getComponent(MovementComponent).direction
            //Offset direction
           
            const fireball = new Entity(this.entity.game, {
                x: this.entity.x,
                y: this.entity.y
            })
            const pos = this.entity.game.inputManager.mousePosition
            const target = this.entity.game.screenToWorld(pos)
            //TODO get screen to world
            fireball.addComponent(new AnimationComponent(fireball, FireballData.AnimationConfig))
            fireball.addComponent(new MovementComponent(fireball))
            fireball.addComponent(new ProjectileBehaviorComponent(fireball, target, true))
            this.entity.game.sceneManager.currentScene.addEntity(fireball)
        }
        if (this.entity.game.inputManager.downKeys[KEYS.KeyW]) {
            const direction = this.entity.getComponent(MovementComponent).direction
            //Offset direction
           
            const mageEffect = new Entity(this.entity.game, {
                x: this.entity.x,
                y: this.entity.y
            })
            const pos = this.entity.game.inputManager.mousePosition
            const target = this.entity.game.screenToWorld(pos)
            console.log(target)
            //TODO get screen to world
            mageEffect.addComponent(new AnimationComponent(mageEffect, MageEffectData.AnimationConfig))
            mageEffect.addComponent(new MovementComponent(mageEffect))
            mageEffect.addComponent(new ProjectileBehaviorComponent(mageEffect, target, false))
            this.entity.game.sceneManager.currentScene.addEntity(mageEffect)
        }
        if (this.entity.game.inputManager.downKeys[KEYS.KeyE]) {
            const direction = this.entity.getComponent(MovementComponent).direction
            //Offset direction
           
            const archerEffect = new Entity(this.entity.game, {
                x: this.entity.x,
                y: this.entity.y
            })
            const pos = this.entity.game.inputManager.mousePosition
            const target = this.entity.game.screenToWorld(pos)
            
            //TODO get screen to world
            archerEffect.addComponent(new AnimationComponent(archerEffect, ArcherEffectData.AnimationConfig))
            archerEffect.addComponent(new MovementComponent(archerEffect))
            archerEffect.addComponent(new ProjectileBehaviorComponent(archerEffect, target, false))
            this.entity.game.sceneManager.currentScene.addEntity(archerEffect)
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