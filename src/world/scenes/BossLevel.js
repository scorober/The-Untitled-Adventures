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

export default class BossLevel extends Scene {
    constructor(game) {
        super(game, 2)
        this.name = 'boss'
        const map = new DefinedMap(game, game.getAsset(ASSET_PATHS.Dungeon), 64 , 16, this, DEFINED_MAPS.Boss)
        this.setMap(map)
        const start = this.map.getStartPos()
        const playerCharacter = this.createPlayerCharacter(game, start)
        this.setPlayer(playerCharacter)
        this.addEntity(playerCharacter)
        this.rng = new Random()
        this.setCamera(playerCharacter)
        this.createButtons(game, map)
        this.createMobs(game)
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

    createMobs(game) {
        const tiles = DEFINED_MAPS.Boss.centerTiles
        console.log(tiles)
        for (let i = 0; i < 6; i++) {
            const r = this.rng.int(0, tiles.length - 1)
            const archer = new Entity(game, Map.tileToWorldPosition(tiles[r]))
            archer.addComponent(new AnimationComponent(archer, ArcherData.AnimationConfig))
            archer.addComponent(new MovementComponent(archer, ArcherData.Attributes))
            archer.addComponent(new AttributeComponent(archer, ArcherData.Attributes))
            archer.addComponent(new CollisionComponent(archer))
            archer.addComponent(new EnemyInteractionComponent(archer))
            archer.addComponent(new CombatComponent(archer))
            archer.addComponent(new EnemyBehaviorComponent(archer))
            this.addEntity(archer)
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