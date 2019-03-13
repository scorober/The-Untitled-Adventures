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
import DefinedMap from '../DefinedMap.js'
import Map from '../Map.js'
import Random from '../../utils/Random.js'
import ArcherData from '../../entities/characters/ArcherDefaultData.js'
import EnemyInteractionComponent from '../../entities/components/InteractionComponent/EnemyInteractionComponent.js'
import CombatComponent from '../../entities/components/CombatComponent.js'
import EnemyBehaviorComponent from '../../entities/components/BehaviorComponent/EnemyBehaviorComponent.js'
import KnightData from '../../entities/characters/KnightDefaultData.js'
import MarriottData from '../../entities/characters/MarriottDefaultData.js'
import MarriottMovementComponent from '../../entities/components/MarriottMovementComponent.js'

export default class BossLevel extends Scene {
    constructor(game) {
        super(game, 2)
        this.name = 'boss'
        const map = new DefinedMap(game, game.getAsset(ASSET_PATHS.Dungeon), 64 , 16, this, DEFINED_MAPS.Boss)
        this.setMap(map)
        const start = this.map.getStartPos()
        const playerCharacter = this.createPlayerCharacter(game, start)
        this.setPlayer(playerCharacter)
        const marriott = this.createMarriott(game, start, playerCharacter)
        this.addEntity(marriott)
        this.addEntity(playerCharacter)
        this.rng = new Random()
        this.setCamera(playerCharacter)
        this.createButtons(game, map)
        this.createMobs(game)
    }

    createPlayerCharacter(game, start) {
        const pc = new Entity(game, start)
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

    createMarriott(game, start, playerCharacter) {
        const marriott = new Entity(game, start, MarriottData.Attributes)
        marriott.addComponent(new AnimationComponent(marriott, MarriottData.AnimationConfig))
        marriott.addComponent(new MarriottMovementComponent(marriott, MarriottData.Attributes))
        marriott.addComponent(new AttributeComponent(marriott, MarriottData.Attributes))
        marriott.addComponent(new CollisionComponent(marriott))
        marriott.addComponent(new MarriottInteractionComponent(marriott))
        marriott.getComponent(MovementComponent).setFollowTarget(playerCharacter)
        // marriott.getComponent(MarriottMovementComponent).handleSitting()

        return marriott
    }


    createMobs(game) {
        const tiles = DEFINED_MAPS.Boss.centerTiles
        for (let i = 0; i < 2; i++) {
            const r = this.rng.int(0, tiles.length - 1)
            const pos = {
                x: tiles[r][0] * 64,
                y: tiles[r][1] * 64
            }
            const archer = new Entity(game, pos)
            archer.addComponent(new AnimationComponent(archer, ArcherData.AnimationConfig))
            archer.addComponent(new MovementComponent(archer, ArcherData.Attributes))
            archer.addComponent(new AttributeComponent(archer, ArcherData.Attributes))
            archer.addComponent(new CollisionComponent(archer))
            archer.addComponent(new EnemyInteractionComponent(archer))
            archer.addComponent(new CombatComponent(archer))
            archer.addComponent(new EnemyBehaviorComponent(archer))
            this.addEntity(archer)
        }

        for (let i = 0; i < 1; i++) {
            const r = this.rng.int(0, tiles.length - 1)
            const pos = {
                x: tiles[r][0] * 64,
                y: tiles[r][1] * 64
            }
            const knight = new Entity(game, pos)
            knight.addComponent(new AnimationComponent(knight, KnightData.AnimationConfig))
            knight.addComponent(new MovementComponent(knight, KnightData.Attributes))
            knight.addComponent(new AttributeComponent(knight, KnightData.Attributes))
            knight.addComponent(new CollisionComponent(knight))
            knight.addComponent(new EnemyInteractionComponent(knight))
            knight.addComponent(new CombatComponent(knight))
            knight.addComponent(new EnemyBehaviorComponent(knight))
            this.addEntity(knight)
        }
    }
    /**
     * Updates this scene.
     */
    update() {
        //NOTE: These two functions were originally done automatically in the super class, but I added them
        //here to reduce confusion, and to allow the order they are updated/rendered to be adjusted.
        this.updateMap()
        this.updateEntities()
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

    enter(){
        this.game.soundManager.playMusic(2)
    }
}