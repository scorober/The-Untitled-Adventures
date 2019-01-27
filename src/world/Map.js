import Entity from '../entities/Entity.js'


export default class Map extends Entity {


    /**
     *
     * @param game a reference ot the game object
     * @param tileAtlas the .png/.jpg whatever file
     * @param rows
     * @param cols
     * @param tileSize
     * @param setLength
     * @param tiles  a reference to the tile array map thing
     */
    constructor(game, tileAtlas, rows, cols, tileSize, setLength, tiles) {
        super(game, 0, 0)
        this.game = game
        this.rows = rows
        this.cols = cols
        this.tileAtlas = tileAtlas
        this.tSize = tileSize
        this.setLength = setLength
        this.tiles = tiles //TODO: probably should put this into json later.
        //this.level = new Level(game, 64, 16, tileAtlas)
    }

    /**
     *
     * @param col
     * @param row
     * @returns {*}
     */
    getTile(col, row) {
        return this.tiles[row * this.cols + col]
    }

    //Update map based on camera view and when entering a new level
    update(tick) {
        super.update(tick)
    }

    draw(ctx) {
        super.draw(ctx)
        //this.level.drawMap(ctx) //this + scene = level
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                let tile = this.getTile(c, r) //NOTE: When copying this from Level.js, c and r were switched. Was that an error or intentional?
                if(tile){
                    ctx.drawImage(
                        this.tileAtlas,
                        ((tile-1) % this.setLength * this.tSize),
                        Math.floor((tile-1) / this.setLength) * this.tSize,
                        this.tSize,
                        this.tSize,
                        r * this.tSize - this.game.CAMERA.xView, //Placement on canvas
                        c * this.tSize - this.game.CAMERA.yView,
                        this.tSize,
                        this.tSize
                    )
                }
            }
        }
    }
}