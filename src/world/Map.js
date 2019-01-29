import Entity from '../entities/Entity.js'
import Dungeon from '../world/generators/Dungeon.js'


export default class Map extends Entity {
    /**
     *
     * @param game a reference ot the game object
     * @param tileAtlas the .png/.jpg whatever file
     * @param tileSize
     * @param setLength Number of tiles wide
     * @param tiles  a reference to the tile array map thing
     */
    constructor(game, tileAtlas, tileSize, setLength, dungeon) {
        super(game, 0, 0)
        this.game = game
        this.tileAtlas = tileAtlas
        this.tSize = tileSize
        this.setLength = setLength
        this.dungeon = dungeon
        this.rows = dungeon.size[1]
        this.cols = dungeon.size[0]
        this.tiles = []
        this.buildMap();

    }

    buildMap()  {
        let dungeon = this.dungeon
        // dungeon.size; // [width, heihgt]
        // dungeon.walls.get([x, y]); //return true if position is wall, false if empty

        
        let count = 0
        for (let piece of dungeon.children) {
            count++
            console.log('Piece: ' + count + '    start_pos: x ' + piece.position[0] + '  y: ' + piece.position[1] + '    Size: ' + piece.size[0] + ', ' + piece.size[1] + '   tag:: '+ piece.tag)

            let exits = []                   
            for (let exit of piece.exits) {
                console.log(exit)
                 exits.push(exit)
            }                         

            for (let i = piece.position[0]; i < piece.position[0] + piece.size[0]; i++) {
                for (let j = piece.position[1]; j < piece.position[1] + piece.size[1]; j++) {

                    if (piece.walls.get([i, j])) {
                        this.tiles[i + (j * dungeon.size[0])] = 89;
                    } else if (this.tiles[i + (j * dungeon.size[0])] !== 89) {
                        this.tiles[i + (j * dungeon.size[0])] = 18 + count;
                    }

                    
                }
            }

            
      
            // console.log( piece.positio n)       //[x, y] position of top left corner of the piece within dungeon
            // console.log(piece.tag)// 'any', 'initial' or any other key of 'rooms' options property
            // // console.log(piece.walls.get([x, y]))  //x, y- local position of piece, returns true if wall, false if empty
     
            
            // for (let exit of piece.exits) {
            //     let {x, y, dest_piece} = exit; // local position of exit and piece it exits to
            //     console.log("GLOBAL LOCATION")
            //     console.log(piece.global_pos([x, y])) // [x, y] global pos of the exit
            // }
        
            // piece.local_pos(dungeon.start_pos); //get local position within the piece of dungeon's global position
        }
        
        console.log(this.tiles)
        // dungeon.initial_room; //piece tagged as 'initial'
        // console.log(dungeon.start_pos) //[x, y] center of 'initial' piece 

    }

    /**
     *
     * @param col
     * @param row
     * @returns {*}
     */
    getTile(row, col) {
        return this.tiles[row * this.cols + col]
    }

    //Update map based on camera view and when entering a new level
    update() {
    }

    draw() {
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                const tile = this.getTile(r, c) //NOTE: When copying this from Level.js, c and r were switched. Was that an error or intentional?
                if(tile){
                    this.game.ctx.drawImage(
                        this.tileAtlas,
                        ((tile-1) % this.setLength * this.tSize),
                        Math.floor((tile-1) / this.setLength) * this.tSize,
                        this.tSize,
                        this.tSize,
                        r * this.tSize - this.game.camera.xView, //Placement on canvas
                        c * this.tSize - this.game.camera.yView,
                        this.tSize,
                        this.tSize
                    )
                }
            }
        }
    }
}