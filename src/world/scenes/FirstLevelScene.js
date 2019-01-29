import Scene from './Scene.js'
import Map from '../Map.js'
import PlayerCharacter from '../../entities/characters/PlayerCharacter.js'
import Dungeon from '../generators/dungeon.js'

export default class FirstLevel extends Scene {

    constructor(game) {
        super(game)
        this.name = 'level1'
        const player = new PlayerCharacter(game, game.getAsset('./assets/img/mikeschar.png'))
        game.camera.setFollowedEntity(player)
        this.setMap(new Map(game, game.getAsset('./assets/img/DungeonColor3@64x64.png'), 20, 20, 64, 16, TILES))
        this.addEntity(player)
        this.addEntity(game.camera)

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
                    max_size: [38, 25],
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
        dungeon.print(); //outputs wall map to console.log
        console.log(dungeon.size)
        // dungeon.size; // [width, heihgt]
        // dungeon.walls.get([x, y]); //return true if position is wall, false if empty

        for(let piece of dungeon.children) {
    
            console.log('Piece position below:::')
            console.log( piece.position)       //[x, y] position of top left corner of the piece within dungeon
            console.log(piece.tag)// 'any', 'initial' or any other key of 'rooms' options property
            console.log(piece.size)//[width, height]
            // console.log(piece.walls.get([x, y]))  //x, y- local position of piece, returns true if wall, false if empty
     
            
            for (let exit of piece.exits) {
                let {x, y, dest_piece} = exit; // local position of exit and piece it exits to
                console.log("GLOBAL LOCATION")
                console.log(piece.global_pos([x, y])) // [x, y] global pos of the exit
            }
        
            piece.local_pos(dungeon.start_pos); //get local position within the piece of dungeon's global position
        }
        
        dungeon.initial_room; //piece tagged as 'initial'
        console.log(dungeon.start_pos) //[x, y] center of 'initial' piece 

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