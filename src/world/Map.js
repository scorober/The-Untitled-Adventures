import Entity from '../entities/Entity.js'
import Array2D from '../utils/Array2d.js'

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
        this.tileSize = tileSize
        this.setLength = setLength
        this.dungeon = dungeon
        this.rows = dungeon.size[1]
        this.cols = dungeon.size[0]
        this.tiles = []
        this.buildMap()
    }

    buildMap() {
        this.map = new Array2D(this.dungeon.size, 0) //0 for empty tile
        const dungeon = this.dungeon
        for (const piece of dungeon.children) {

            //Fill interior, fix so perimeter isn't repeated.
            this.map.set_square(piece.position, piece.size, 4, true)
            //Fill wall around
            this.map.set_square(piece.position, piece.size, 18)
            //TODO get correct values for exits...
            for (const exit of piece.exits) {
                this.map.set(piece.global_pos(exit[0]), 38)
                // this.map.set(exit[0], 30)
            }

            //console.log(piece.exits[0])
            // for (const exit of piece.exits)
            // this.map.set_vertical_line(piece.position, piece.size[1], 7)          
            // this.map.set_horizontal_line(piece.position, piece.size[0], 7)
            // console.log([piece.position[0] + piece.size[0], piece.position[1] + piece.size[1]])
            // this.map.set_vertical_line([piece.position[0] + piece.size[0], 
            //     piece.position[1] + piece.size[1]], -piece.size[1], 7)

            // for (const exit of piece.exits) {

            //     // this.map.set(exit.position, 16)
            // }   
            // console.log(this.map)                      
            // for (let i = piece.position[0]; i < piece.position[0] + piece.size[0]; i++) {
            //     for (let j = piece.position[1]; j < piece.position[1] + piece.size[1]; j++) {
            //         if (piece.walls.get([i, j])) {
            //             this.tiles[i + (j * dungeon.size[0])] = 89
            //         } else if (this.tiles[i + (j * dungeon.size[0])] !==89) {
            //             this.tiles[i + (j * dungeon.size[0])] = 4
            //         }
            //     }
            // }
        }
        //console.log(this.map)
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

    get2dArr() {
        const arr = [this.rows][this.cols]
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                arr[r][c] = this.getTile(r, c)
            }
        }
        return arr
    }

    getPathfindingArray() {
        const array = []
        for (let i = 0; i < this.map.rows.length; i++) {
            array[i] = [...this.map.rows[i]]
        }
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[0].length; j++) {
                if (array[i][j] == 38) {
                    array[i][j] = 3
                }
                if (array[i][j] == 0) {
                    array[i][j] = 100
                }
            }
        }
        return array
    }

    //Update map based on camera view and when entering a new level
    update() {
    }

    draw() { //TODO use Array2D.iter()
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const tile = this.map.get([r, c])
                if (tile) {
                    const tileX = r * this.tileSize - this.game.camera.xView
                    const tileY = c * this.tileSize - this.game.camera.yView
                    this.game.ctx.drawImage(
                        this.tileAtlas,
                        ((tile - 1) % this.setLength * this.tileSize),
                        Math.floor((tile - 1) / this.setLength) * this.tileSize,
                        this.tileSize,
                        this.tileSize,
                        tileX - this.tileSize / 2, //Placement on canvas
                        tileY - this.tileSize / 2,
                        this.tileSize,
                        this.tileSize
                    )
                    this.game.ctx.font = '9px Arial'
                    this.game.ctx.fillStyle = 'white'
                    this.game.ctx.fillText(tile + ': (' + r + ', ' + c + ')', tileX, tileY)
                }
            }
        }
    }
}