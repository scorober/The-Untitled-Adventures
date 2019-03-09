import Component from './Component.js'
import Map from '../../world/Map.js'
import MovementComponent from './MovementComponent.js'
import ProjectileBehaviorComponent from './ProjectileBehaviorComponent.js'
import AnimationComponent from './AnimationComponent.js'
import FireballData from '../effects/FireballDefaultData.js'
import Entity from '../Entity.js'
import MageEffectData from '../effects/MageEffectDefaultData.js'
import LightningData from '../effects/LightningEffectDefaultData.js'
import FreezeData from '../effects/FreezeDefaultData.js'
import ArcherEffectData from '../effects/ArcherEffectDefaultData.js'
import {
    KEYS,
    ANIMATIONS as ANIMS,
    DIRECTIONS
} from '../../utils/Const.js'
import LightningBehaviorComponent from './LightningBehaviorComponent.js'
import FreezeBehaviorComponent from './FreezeBehaviorComponent.js'
import CollisionComponent from './CollisionComponent.js'
import InteractionComponent from './InteractionComponent/InteractionComponent.js'
import Vector from '../../utils/Vector.js'
import CombatComponent from './CombatComponent.js'
import PlayerData from '../characters/PlayerCharacterDefaultData.js'
import AttributeComponent from '../components/AttributeComponent.js'
import TeleportData from '../effects/TeleportDefaultData.js'
import TeleportBehaviorComponent from '../components/TeleportBehaviorComponent.js'

export default class PlayerInputComponent extends Component {
    /**s
     * @param {Entity} entity A reference to the Entity this Component is attached to
     * @param {Object} animationConfig Animation configuration object for this character.
     */
    constructor(entity) {
        super(entity)
        this.coolDown = 0
        this.coolEnd = 400
        this.blocked = false
    }

    /**
     * Called each update cycle
     */
    update() {
        if (!this.blocked) {
            if (this.entity.game.inputManager.hasRightClick()) {
                this.handleRightClick()
            }
            if (this.entity.game.inputManager.hasLeftClick()) {
                this.handleLeftClick()
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
            if (this.coolDown >= this.coolEnd) {
                this.checkCastingInput()
                this.testSpells()
            }
        }
        this.coolDown += this.entity.game.clockTick * 500
    }

    handleRightClick() {
        const clickPos = this.entity.game.inputManager.getRightClick()
        const entities = this.entity.game.getCurrentScene().items.concat(this.entity.game.getCurrentScene().entities)
        for (let i = 0; i < entities.length; i++) {
            const collisionComponent = entities[i].getComponent(CollisionComponent)
            const interactionComponent = entities[i].getComponent(InteractionComponent)
            if (collisionComponent && interactionComponent && collisionComponent.checkCollisionScreen(clickPos)) {
                interactionComponent.setRightClick()
                return
            } else if (interactionComponent) {
                interactionComponent.unsetRightClick()
            }
        }
        const combatComponent = this.entity.getComponent(CombatComponent)
        combatComponent.unsetCombatTarget()
        this.handleMoveCommand(clickPos)

    }

    handleLeftClick() {
        const clickPos = this.entity.game.inputManager.getLeftClick()
        const entities = this.entity.game.getCurrentScene().entities
        for (let i = 0; i < entities.length; i++) {
            const collisionComponent = entities[i].getComponent(CollisionComponent)
            if (collisionComponent.checkCollisionScreen(clickPos)) {
                entities[i].setLeftClick()
                return
            } else {
                entities[i].unsetLeftClick()
            }
        }
        // Do something else if the clicked area is not an entity?
    }


    /**
     * Checks if player input creates a new spell and adds it to the current scene.
     */
    checkCastingInput() {
        if (this.entity.game.inputManager.downKeys[KEYS.KeyQ]) {
            const origin = this.getEffectOffsetPos()
            const target = this.getTarget()
            const fireball = new Entity(this.entity.game, origin)
            fireball.addComponent(new AnimationComponent(fireball, FireballData.AnimationConfig))
            fireball.addComponent(new MovementComponent(fireball, FireballData.Attributes))
            fireball.addComponent(new ProjectileBehaviorComponent(fireball, target, true, this.entity))
            fireball.addComponent(new AttributeComponent(fireball, PlayerData.Attributes))
            fireball.addComponent(new CollisionComponent(fireball))
            fireball.addComponent(new CombatComponent(fireball))
            this.entity.game.sceneManager.currentScene.addEntity(fireball)
            this.coolDown = 0
        }
        if (this.entity.game.inputManager.downKeys[KEYS.KeyR]) {
            const origin = this.getEffectOffsetPos()
            const lightningEffect = new Entity(this.entity.game, origin)
            const target = this.getTarget()
            lightningEffect.addComponent(new AnimationComponent(lightningEffect, LightningData.AnimationConfig))
            lightningEffect.addComponent(new MovementComponent(lightningEffect, LightningData.Attributes))
            lightningEffect.addComponent(new LightningBehaviorComponent(lightningEffect, target))
            this.entity.game.sceneManager.currentScene.addEntity(lightningEffect)
            this.coolDown = 0
        }
        if (this.entity.game.inputManager.downKeys[KEYS.KeyT]) {
            const target = this.getTarget()
            const freezeEffect = new Entity(this.entity.game, target)
            freezeEffect.addComponent(new AnimationComponent(freezeEffect, FreezeData.AnimationConfig))
            freezeEffect.addComponent(new FreezeBehaviorComponent(freezeEffect))
            this.entity.game.sceneManager.currentScene.addEntity(freezeEffect)
            this.coolDown = 0
        }
        if (this.entity.game.inputManager.downKeys[KEYS.KeyY]) {
            const origin = this.getEffectOffsetPos()
            const target = this.getTarget()
            const teleportEffect = new Entity(this.entity.game, origin)
            teleportEffect.addComponent(new AnimationComponent(teleportEffect, TeleportData.AnimationConfig))
            teleportEffect.addComponent(new TeleportBehaviorComponent(teleportEffect, this.entity, target))
            this.entity.game.sceneManager.currentScene.addEntity(teleportEffect)
            this.coolDown = 0
        }

    }

    /**
     * Mapped all the current effects to player input keys for testing.
     */
    testSpells() {
        if (this.entity.game.inputManager.downKeys[KEYS.KeyW]) {
            const origin = this.getEffectOffsetPos()
            const target = this.getTarget()
            const mageEffect = new Entity(this.entity.game, origin)
            mageEffect.addComponent(new AnimationComponent(mageEffect, MageEffectData.AnimationConfig))
            mageEffect.addComponent(new MovementComponent(mageEffect, MageEffectData.Attributes))
            mageEffect.addComponent(new ProjectileBehaviorComponent(mageEffect, target, false, this.entity))
            mageEffect.addComponent(new AttributeComponent(mageEffect, PlayerData.Attributes))
            mageEffect.addComponent(new CollisionComponent(mageEffect))
            mageEffect.addComponent(new CombatComponent(mageEffect))
            this.entity.game.sceneManager.currentScene.addEntity(mageEffect)
            this.coolDown = 0
        }
        if (this.entity.game.inputManager.downKeys[KEYS.KeyE]) {
            const origin = this.getEffectOffsetPos()
            const target = this.getTarget()
            const archerEffect = new Entity(this.entity.game, origin)
            archerEffect.addComponent(new AnimationComponent(archerEffect, ArcherEffectData.AnimationConfig))
            archerEffect.addComponent(new MovementComponent(archerEffect, ArcherEffectData.Attributes))
            archerEffect.addComponent(new ProjectileBehaviorComponent(archerEffect, target, false, this.entity))
            archerEffect.addComponent(new AttributeComponent(archerEffect, PlayerData.Attributes))
            archerEffect.addComponent(new CollisionComponent(archerEffect))
            archerEffect.addComponent(new CombatComponent(archerEffect))
            this.entity.game.sceneManager.currentScene.addEntity(archerEffect)
            this.coolDown = 0
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
    handleMoveCommand(clickPos) {

        const cam = this.entity.game.sceneManager.currentScene.camera
        const tileSize = this.entity.game.sceneManager.currentScene.map.tileSize
        const targetTile = Map.worldToTilePosition(new Vector(
            cam.xView + clickPos.x,
            cam.yView + clickPos.y
        ), tileSize)
        this.entity.getComponent(MovementComponent).setPathfindingTarget(targetTile)
    }

    /**
     * Returns an offset off the caster for the spells animation to originate.
     */
    getEffectOffsetPos() {
        const pos = new Vector(
            this.entity.x,
            this.entity.y
        )
        const direction = this.entity.getComponent(MovementComponent).direction
        if (direction === DIRECTIONS.West) {
            pos.x -= 20
        } else if (direction === DIRECTIONS.East) {
            pos.x += 20
        } else if (direction === DIRECTIONS.North) {
            pos.y -= 20
        } else {
            pos.y += 20
        }
        return pos
    }

    /**
     * Get the target based off mouse position.
     */
    getTarget() {
        const pos = this.entity.game.inputManager.mousePosition
        return this.entity.game.screenToWorld(pos)
    }

    /**
     * Set boolean value to block player input.
     */
    setBlocked(bool) {
        this.blocked = bool
    }
}