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
        this.tSize = tileSize
        this.setLength = setLength
        this.dungeon = dungeon
        this.rows = dungeon.size[1]
        this.cols = dungeon.size[0]
        this.tiles = []
        this.buildMap()
    }


    getStart() {
        return this.dungeon.start_pos
    }

    buildMap()  {
        this.map = new Array2D(this.dungeon.size, 0) //0 for empty tile
        const dungeon = this.dungeon
        for (const piece of dungeon.children) {
            //Fill interior, fix so perimeter isn't repeated.
            this.map.set_square(piece.position, piece.size, 4, true)  
            //Fill wall around
            this.map.set_square(piece.position, piece.size, 18)
            for (const exit of piece.exits) {
                this.map.set(piece.global_pos(exit[0]), 67)
            }
        }
    }

    //Update map based on camera view and when entering a new level
    update() {
    }

    draw() { //TODO use Array2D.iter()
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                const tile = this.map.get([c, r])
                if(tile){
                    //Debug tile coordinates
                    const tileX = r * this.tSize - this.game.camera.xView
                    const tileY = c * this.tSize - this.game.camera.yView
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
                    //Debug 
                    this.game.ctx.font = '11px Arial'
                    this.game.ctx.fillStyle = 'white'
                    this.game.ctx.fillText('(' + c + ', ' + r + ')', tileX, tileY)
                }
            }
        }
    }
}