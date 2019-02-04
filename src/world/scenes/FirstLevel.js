import Scene from './Scene.js'
import Map from '../Map.js'
import PlayerCharacter from '../../entities/characters/PlayerCharacter.js'
import Dungeon from '../generators/Dungeon.js'
import Background from '../Background.js'
import Mage from '../../entities/characters/Mage.js'

export default class FirstLevel extends Scene {

    constructor(game) {
        super(game)
        this.name = 'level1'    
        

        const player = new PlayerCharacter(game, game.getAsset('./assets/img/mikeschar.png'))
        game.camera.setFollowedEntity(player)


        //Initialize a dungeon with options, possibly move to the scene superclass w/ parameters.
        const dungeon = new Dungeon({
            size: [200, 200], 
            // seed: 'abcd', //omit for generated seed
            rooms: {
                initial: {
                    min_size: [6, 6],
                    max_size: [12, 12],
                    max_exits: 2,
                    position: [0, 0] //OPTIONAL pos of initial room 
                },
                any: {
                    min_size: [8, 8],
                    max_size: [15, 15],
                    max_exits: 3
                }
            },
            max_corridor_length: 6,
            min_corridor_length: 2,
            corridor_density: 0.5, //corridors per room
            symmetric_rooms: false, // exits must be in the center of a wall if true
            interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
            max_interconnect_length: 10,
            room_count: 10
        })
        
        dungeon.generate()
        this.setBackground(new Background(game, game.getAsset('./assets/img/background.jpg')))
        this.setMap(new Map(game, game.getAsset('./assets/img/DungeonColor3@64x64.png'), 64, 16, dungeon))
        this.addEntity(player)
        this.addEntity(game.camera)
        
        // const mage = new Mage(game, game.getAsset('./assets/img/mage-full.png'))
        // this.addEntity(mage)

        //dungeon.print() //outputs wall map to console.log

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