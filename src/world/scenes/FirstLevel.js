import Scene from './Scene.js'
import Map from '../Map.js'
import Dungeon from '../generators/Dungeon.js'
import Background from '../Background.js'
import Entity from '../../entities/Entity.js'
import { ASSET_PATHS, SPAWNERS } from '../../utils/Const.js'


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
import SpawnerData from '../../entities/effects/SpawnerDefaultData.js'


export default class FirstLevel extends Scene {

    constructor(game) {
        super(game)
        this.name = 'level1'
        //Initialize a dungeon with options, possibly move to the scene superclass w/ parameters.
        const dungeon = new Dungeon({
            size: [2000, 2000],
            // seed: 'abcd', //omit for generated seed
            rooms: {
                initial: {
                    min_size: [12, 12], //Floor size
                    max_size: [12, 12],
                    max_exits: 4,
                    position: [100, 100] //OPTIONAL pos of initial room 
                },
                any: {
                    min_size: [10, 10],
                    max_size: [25, 25],
                    max_exits: 4
                },
                spawn: {
                    min_size: [15, 15],
                    max_size: [25, 25],
                    max_exits: 4
                },
                empty: {
                    min_size: [15, 15],
                    max_size: [25, 25],
                    max_exits: 4
                },
                exit: {
                    min_size: [15, 15],
                    max_size: [20, 20],
                    max_exits: 1
                },
                treasure: {
                    min_size: [12, 12],
                    max_size: [21, 12],
                    max_exits: 3
                }
            },
            max_corridor_length: 15,
            min_corridor_length: 15,
            corridor_density: 0, //corridors per room, remove corridors? They'll be tagged as such.
            symmetric_rooms: true, // exits must be in the center of a wall if true. Setting true will make design easier
            interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
            max_interconnect_length: 10,
            room_count: 20
        })

        dungeon.generate()

        this.setBackground(new Background(game, game.getAsset(ASSET_PATHS.Background)))


        const map = new Map(game, game.getAsset(ASSET_PATHS.Dungeon), 64, 16, dungeon, this)
        this.setMap(map)

        const start = this.map.getStartPos()

        const playerCharacter = new Entity(game, start, PlayerCharacterData.Attributes)

        playerCharacter.addComponent(new AnimationComponent(playerCharacter, PlayerCharacterData.AnimationConfig))
        playerCharacter.addComponent(new AttributeComponent(playerCharacter, PlayerCharacterData.Attributes))
        playerCharacter.addComponent(new MovementComponent(playerCharacter, PlayerCharacterData.Attributes))
        playerCharacter.addComponent(new CollisionComponent(playerCharacter, PlayerCharacterData.AnimationConfig))
        playerCharacter.addComponent(new PlayerInputComponent(playerCharacter))

        const archer = new Entity(game, start, ArcherData.Attributes)
        archer.addComponent(new MovementComponent(archer, ArcherData.Attributes))
        archer.addComponent(new AttributeComponent(archer, ArcherData.Attributes))
        archer.addComponent(new AnimationComponent(archer, ArcherData.AnimationConfig))
        archer.addComponent(new CollisionComponent(archer, ArcherData.AnimationConfig))
        archer.getComponent(MovementComponent).setFollowTarget(playerCharacter)

        const marriott = new Entity(game, start, MarriottData.Attributes)
        marriott.addComponent(new MarriottMovementComponent(marriott, MarriottData.Attributes))
        marriott.addComponent(new AttributeComponent(marriott, MarriottData.Attributes))
        marriott.addComponent(new AnimationComponent(marriott, MarriottData.AnimationConfig))
        marriott.addComponent(new CollisionComponent(marriott, MarriottData.AnimationConfig))
        marriott.getComponent(MovementComponent).setFollowTarget(playerCharacter)



        this.setPlayer(playerCharacter)
        game.camera.setFollowedEntity(playerCharacter)
        this.addEntity(playerCharacter)
        this.addEntity(game.camera)
        this.addEntity(archer)
        this.addEntity(marriott)

        for (const mapSpawner of map.spawners) {
            const spawner = new Entity(game, mapSpawner.pos)
            spawner.addComponent(new AnimationComponent(spawner, SpawnerData.AnimationConfig))
            spawner.addComponent(new SpawnerBehaviorComponent(spawner, this, SPAWNERS.Mage, mapSpawner.r, 4))
            this.addEntity(spawner)
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

}