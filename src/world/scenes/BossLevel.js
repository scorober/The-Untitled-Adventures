import Scene from './Scene.js'
import Entity from '../../entities/Entity.js'
import { ASSET_PATHS, DEFINED_MAPS } from '../../utils/Const.js'
import PlayerCharacterData from '../../entities/characters/PlayerCharacterDefaultData.js'
import MovementComponent from '../../entities/components/MovementComponent.js'
import PlayerInputComponent from '../../entities/components/PlayerInputComponent.js'
import AnimationComponent from '../../entities/components/AnimationComponent.js'
import CollisionComponent from '../../entities/components/CollisionComponent.js'
import AttributeComponent from '../../entities/components/AttributeComponent.js'
import MarriottInteractionComponent from '../../entities/components/InteractionComponent/MarriottInteractionComponent.js'
import PlayerCharacterCombatComponent from '../../entities/components/PlayerCharacterCombatComponent.js'
import EquippedItemsComponent from '../../entities/components/EquippedItemsComponent.js'
import ProjectileBehaviorComponent from '../../entities/components/BehaviorComponent/ProjectileBehaviorComponent.js'
import DefinedMap from '../DefinedMap.js'
import Vector from '../../utils/Vector.js'
import Map from '../../world/Map.js'
import CombatComponent from '../../entities/components/CombatComponent.js'
import FireballData from '../../entities/effects/FireballDefaultData.js'
import MageDefaultData from '../../entities/characters/MageDefaultData.js'
import EnemyInteractionComponent from '../../entities/components/InteractionComponent/EnemyInteractionComponent.js';

export default class BossLevel extends Scene {
    constructor(game) {
        super(game, 2)
        this.name = 'boss'
        const map = new DefinedMap(game, game.getAsset(ASSET_PATHS.Dungeon), 64, 16, this, DEFINED_MAPS.Boss)
        this.setMap(map)
        const start = this.map.getStartPos()
        const playerCharacter = this.createPlayerCharacter(game, start)
        this.setPlayer(playerCharacter)
        this.addEntity(playerCharacter)
        this.setCamera(playerCharacter)
        this.createButtons(game, map)
        this.mage = this.createMage()
        this.fireballTimer = 0
        this.fireballFreq = 2.3
    }

    createPlayerCharacter(game, start) {
        const pc = new Entity(game, start, PlayerCharacterData.Attributes)
        pc.addComponent(new AnimationComponent(pc, PlayerCharacterData.AnimationConfig))
        pc.addComponent(new AttributeComponent(pc, PlayerCharacterData.Attributes))
        pc.addComponent(new MovementComponent(pc, PlayerCharacterData.Attributes))
        pc.addComponent(new CollisionComponent(pc))
        pc.addComponent(new MarriottInteractionComponent(pc))
        pc.addComponent(new PlayerCharacterCombatComponent(pc))
        pc.addComponent(new PlayerInputComponent(pc))
        pc.addComponent(new EquippedItemsComponent(pc))
        return pc
    }

    createMage() {
        const mage = new Entity(this.game, new Vector(0, 0))
        mage.addComponent(new AnimationComponent(mage, MageDefaultData.AnimationConfig))
        mage.addComponent(new MovementComponent(mage, MageDefaultData.Attributes))
        mage.addComponent(new AttributeComponent(mage, MageDefaultData.Attributes))
        mage.addComponent(new CollisionComponent(mage))
        mage.addComponent(new EnemyInteractionComponent(mage))
        mage.addComponent(new CombatComponent(mage))
        return mage
    }

    createFireball(start, target) {
        const fireball = new Entity(this.game, start)
        fireball.addComponent(new AnimationComponent(fireball, FireballData.AnimationConfig))
        fireball.addComponent(new MovementComponent(fireball, FireballData.Attributes))
        fireball.getComponent(MovementComponent).setSpeed(80)
        fireball.addComponent(new ProjectileBehaviorComponent(fireball, target, true, this.mage))
        fireball.addComponent(new AttributeComponent(fireball, PlayerCharacterData.Attributes))
        fireball.addComponent(new CollisionComponent(fireball))
        fireball.addComponent(new CombatComponent(fireball))
        this.addEntity(fireball)
    }
    /**
     * Updates this scene.
     */
    update() {
        //NOTE: These two functions were originally done automatically in the super class, but I added them
        //here to reduce confusion, and to allow the order they are updated/rendered to be adjusted.
        this.updateMap()
        this.updateEntities()
        const player = this.getPlayer()
        console.log(Map.worldToTilePosition(new Vector(player.x, player.y), this.game.getTileSize()))
        // (20, 22)
        for ()
        if (this.fireballTimer > this.fireballFreq) {
            const startPosition = Map.tileToWorldPosition(new Vector(20, 23), this.game.getTileSize())
            const endPosition = Map.tileToWorldPosition(new Vector(20, 26), this.game.getTileSize())
            this.createFireball(startPosition, endPosition)
            this.fireballTimer = 0
        }
        this.fireballTimer += this.game.clockTick
    }

    /**
     * Draw this scene.
     */
    draw() {
        this.drawBackground()
        this.drawMap()
        this.drawEntities()
        this.drawMapTop()
    }

    enter() {
        this.game.soundManager.playMusic(2)
    }
}