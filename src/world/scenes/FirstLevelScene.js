import Scene from './Scene.js'
import Map from '../Map.js'
import PlayerCharacter from '../../entities/characters/PlayerCharacter.js'
import Dungeon from '../generators/Dungeon.js'
import Background from '../Background.js'

export default class FirstLevel extends Scene {

    constructor(game) {
        super(game)
        this.name = 'level1'



        // this.addEntity(
        //     new Background(game, game.getAsset('./assets/img/background.jpg'))
        // )
        const player = new PlayerCharacter(game, game.getAsset('./assets/img/mikeschar.png'))
        game.camera.setFollowedEntity(player)


        //Initialize a dungeon with options, possibly move to the scene superclass w/ parameters.
        let dungeon = new Dungeon({
            size: [10000, 7000], 
            // seed: 'abcd', //omit for generated seed
            rooms: {
                initial: {
                    min_size: [5, 5],
                    max_size: [15,15],
                    max_exits: 1,
                    position: [0, 0] //OPTIONAL pos of initial room 
                },
                any: {
                    min_size: [15, 8],
                    max_size: [19, 25],
                    max_exits: 2
                }
            },
            max_corridor_length: 6,
            min_corridor_length: 2,
            corridor_density: 0.5, //corridors per room
            symmetric_rooms: false, // exits must be in the center of a wall if true
            interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
            max_interconnect_length: 10,
            room_count: 10
        });
        
        dungeon.generate();

        this.setMap(new Map(game, game.getAsset('./assets/img/DungeonColor3@64x64.png'), 64, 16, dungeon))
        this.addEntity(player)
        this.addEntity(game.camera)

        dungeon.print(); //outputs wall map to console.log

    }

    /**
     * Updates this scene.
     */
    update() {
        //TODO I see... draw the background here if implemented.
        //NOTE: These two functions were originally done automatically in the super class, but I added them
        //here to reduce confusion, and to allow the order they are updated/rendered to be adjusted.
        this.updateMap()
        this.updateEntities()
    }

    draw() {
        this.drawMap()
        this.drawEntities()
    }

}

/** Mock data. Will eventually be generated */
const TILES = [7, 7, 7, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 10, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 34, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]