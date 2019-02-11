import Scene from './Scene.js'
import Map from '../Map.js'
import Dungeon from '../generators/Dungeon.js'
import Background from '../Background.js'
import Entity from '../../entities/Entity.js'
import { ASSET_PATHS, SPAWNERS } from '../../utils/Const.js'


import PlayerCharacterData from '../../entities/characters/PlayerCharacterDefaultData.js'
import ArcherData from '../../entities/characters/ArcherDefaultData.js'
import PlayerCharacterAnimationComponent from '../../entities/components/PlayerCharacterAnimationComponent.js'
import MovementComponent from '../../entities/components/MovementComponent.js'
import PlayerInputComponent from '../../entities/components/PlayerInputComponent.js'
import AnimationComponent from '../../entities/components/AnimationComponent.js'
import SpawnerBehaviorComponent from '../../entities/components/SpawnerBehaviorComponent.js'


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
                    min_size: [10, 10], //Floor size
                    max_size: [10, 10],
                    max_exits: 4,
                    position: [100, 100] //OPTIONAL pos of initial room 
                },
                any: {
                    min_size: [10, 10],
                    max_size: [10, 10],
                    max_exits: 4
                },
                spawn: {
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
            room_count: 10
        })

        dungeon.generate()

        this.setBackground(new Background(game, game.getAsset(ASSET_PATHS.Background)))


        const map = new Map(game, game.getAsset(ASSET_PATHS.Dungeon), 64, 16, dungeon, this)
        this.setMap(map)

        const start = this.map.getStartPos()

        const playerCharacter = new Entity(game, start)
        // Most entities should be able to use the basic AnimationBasic, but LPC characters and other characters
        // will need custom methods on their AnimationComponents, (e.x. oversized attacks) thus PlayerCharacterAnimationComponent
        // can just extend AnimationComponent
        playerCharacter.addComponent(new PlayerCharacterAnimationComponent(playerCharacter, PlayerCharacterData.AnimationConfig))
        playerCharacter.addComponent(new MovementComponent(playerCharacter))
        playerCharacter.addComponent(new PlayerInputComponent(playerCharacter))

        const archer = new Entity(game, start)
        archer.addComponent(new MovementComponent(archer))
        archer.addComponent(new AnimationComponent(archer, ArcherData.AnimationConfig))
        archer.getComponent(MovementComponent).setFollowTarget(playerCharacter)

        //const mage = new Entity(game, start)
        //mage.addComponent(new AnimationComponent(mage, )) // Need to make MageData



        this.setPlayer(playerCharacter)
        game.camera.setFollowedEntity(playerCharacter)
        this.addEntity(playerCharacter)
        this.addEntity(game.camera)
        this.addEntity(archer)


        map.spawners.forEach(function(item) {
            const spawner = new Entity(game, item.pos)
            spawner.addComponent(new SpawnerBehaviorComponent(spawner, this, SPAWNERS.Mage, item.r, 8))
            this.addEntity(spawner)
        }.bind(this))
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
    }

}