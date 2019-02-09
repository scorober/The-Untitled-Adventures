import Scene from './Scene.js'
import Map from '../Map.js'
import PlayerCharacter from '../../entities/characters/PlayerCharacter.js'
import Dungeon from '../generators/Dungeon.js'
import Background from '../Background.js'
import Mage from '../../entities/characters/Mage.js'
import Marriott from '../../entities/characters/Marriott.js'
import { ASSET_PATHS } from '../../utils/Const.js'
import Robot from '../../entities/characters/Robot.js'
import Archer from '../../entities/characters/Archer.js'

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
                    max_size: [15, 15],
                    max_exits: 4
                },
                spawn: {
                    min_size: [15, 15],
                    max_size: [25, 25],
                    max_exits: 4
                },
                spawn: {
                    min_size: [10, 15],
                    max_size: [25, 25],
                    max_exits: 4
                },
                spawn: {
                    min_size: [15, 15],
                    max_size: [25, 29],
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
        this.setMap(new Map(game, game.getAsset(ASSET_PATHS.Dungeon), 64, 16, dungeon))

        const start = this.map.getStartPos()
        const player = new PlayerCharacter(game, game.getAsset(ASSET_PATHS.ScottsChar), start)
        game.camera.setFollowedEntity(player)


        const archer0 = new Archer(game, game.getAsset(ASSET_PATHS.Archer), start)
        const robot0 = new Robot(game, game.getAsset(ASSET_PATHS.Robot), start)
        const mage = new Mage(game, game.getAsset(ASSET_PATHS.Mage), start)
        const marriott = new Marriott(game, game.getAsset(ASSET_PATHS.Marriott),start)

        marriott.setFollowTarget(player)
        mage.setFollowTarget(player)   
        robot0.setFollowTarget(player)
        archer0.setFollowTarget(player)

        this.addEntity(player)
        this.addEntity(game.camera)
        this.addEntity(mage)
        this.addEntity(marriott)
        this.addEntity(robot0)
        this.addEntity(archer0)
    }

    /**
     * Updates this scene.
     */
    update() {
        //NOTE: These two functions were originally done automatically in the super class, but I added them
        //here to reduce confusion, and to allow the order they are updated/rendered to be adjusted.
        this.updateMap()
        this.updateEntities()
        //Reorders the entities in the correct drawing format
        this.entities.sort((a,b) => a.y - b.y)
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