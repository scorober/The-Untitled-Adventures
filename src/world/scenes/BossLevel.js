import Scene from './Scene.js'
import Map from '../Map.js'
import Dungeon from '../generators/Dungeon.js'
import Entity from '../../entities/Entity.js'
import { ASSET_PATHS } from '../../utils/Const.js'

import PlayerCharacterData from '../../entities/characters/PlayerCharacterDefaultData.js'
import ArcherData from '../../entities/characters/ArcherDefaultData.js'
import MarriottData from '../../entities/characters/MarriottDefaultData.js'

import MovementComponent from '../../entities/components/MovementComponent.js'
import MarriottMovementComponent from '../../entities/components/MarriottMovementComponent.js'
import PlayerInputComponent from '../../entities/components/PlayerInputComponent.js'
import AnimationComponent from '../../entities/components/AnimationComponent.js'
import SpawnerBehaviorComponent from '../../entities/components/SpawnerBehaviorComponent.js'
import CollisionComponent from '../../entities/components/CollisionComponent.js'
import AttributeComponent from '../../entities/components/AttributeComponent.js'
import CombatComponent from '../../entities/components/CombatComponent.js'
import SpawnerData from '../../entities/effects/SpawnerDefaultData.js'
import EnemyInteractionComponent from '../../entities/components/InteractionComponent/EnemyInteractionComponent.js'
import MarriottInteractionComponent from '../../entities/components/InteractionComponent/MarriottInteractionComponent.js'
import Vector from '../../utils/Vector.js'
import DoorInteractionComponent from '../../entities/components/InteractionComponent/DoorInteractionComponent.js'
import PlayerCharacterCombatComponent from '../../entities/components/PlayerCharacterCombatComponent.js'
import StairInteractionComponent from '../../entities/components/InteractionComponent/StairInteractionComponent.js'
import WolfDefaultData from '../../entities/characters/WolfDefaultData.js'

import EquipmentComponent from '../../entities/components/EquipmentComponent.js'
import EquippedItemsComponent from '../../entities/components/EquippedItemsComponent.js'

export default class BossLevel extends Scene {
    constructor(game) {
        super(game, 2)
        this.name = 'boss'
    
        const dungeon = new Dungeon({
            size: [1000, 500],
            rooms: {
                initial: {
                    min_size: [14, 18], //Floor size
                    max_size: [14, 18],
                    max_exits: 4,
                    position: [100, 100] //OPTIONAL pos of initial room 
                },
                any: {
                    min_size: [15, 15],
                    max_size: [20, 23],
                    max_exits: 4
                }
            },
            max_corridor_length: 0,
            min_corridor_length: 0,
            corridor_density: 0, //corridors per room, remove corridors? They'll be tagged as such.
            symmetric_rooms: true, // exits must be in the center of a wall if true. Setting true will make design easier
            interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
            max_interconnect_length: 10,
            room_count: 3
        })
        dungeon.generate()
        const map = new Map(game, game.getAsset(ASSET_PATHS.Dungeon), 64, 16, dungeon, this)
        this.setMap(map)
        const start = this.map.getStartPos()
        const playerCharacter = this.createPlayerCharacter(game, start)
        this.setPlayer(playerCharacter)
        this.addEntity(playerCharacter)
        this.addEntity(game.camera)
        this.game.camera.setFollowedEntity(playerCharacter)
        //Get player??
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
}