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
            size: [200, 200], 
            // seed: 'abcd', //omit for generated seed
            rooms: {
                initial: {
                    min_size: [8, 8],
                    max_size: [12, 10],
                    max_exits: 2,
                    position: [15, 10] //OPTIONAL pos of initial room 
                },
                any: {
                    min_size: [8, 8],
                    max_size: [15, 15],
                    max_exits: 4
                }
            },
            max_corridor_length: 6,
            min_corridor_length: 3,
            corridor_density: 0, //corridors per room, remove corridors? They'll be tagged as such.
            symmetric_rooms: false, // exits must be in the center of a wall if true. Setting true will make design easier
            interconnects: 0, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
            max_interconnect_length: 10,
            room_count: 20
        })
        
        dungeon.generate()



        this.setBackground(new Background(game, game.getAsset(ASSET_PATHS.Background)))
        this.setMap(new Map(game, game.getAsset(ASSET_PATHS.Dungeon), 64, 16, dungeon))

        const start = this.map.getStartPos()
        const player = new PlayerCharacter(game, game.getAsset(ASSET_PATHS.MikesChar), start)
        game.camera.setFollowedEntity(player)

        const marriott = new Marriott(game, game.getAsset(ASSET_PATHS.Marriott),start)
        marriott.setFollowTarget(player)

        const mage = new Mage(game, game.getAsset(ASSET_PATHS.Mage), start)
        mage.setFollowTarget(player)
   
        this.addEntity(player)
        this.addEntity(game.camera)
        this.addEntity(mage)
        this.addEntity(marriott)


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