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

    //Buggy, spawns in empty tiles sometimes.
    getStartPos() {
        return {
            x: this.dungeon.start_pos[0] * this.tileSize,
            y: this.dungeon.start_pos[1] * this.tileSize
        }
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
            }
        }
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
                array[i][j] = this.mapValueToPathfindingValue(array[i][j])
            }
        }
        return array
    }

    /**
     * Values in the map coorespond to tileset tiles.
     * i.e. 0 is empty, 38 is door, 4 is regular floor.
     * The pathing algorithm uses a maxWalkable value, so anything above 4 for example
     * is "unwalkable". This method changes walkable tiles (doors which are 38) to
     * a lower value that the algorithm deems "walkable".
     * This is temporary until we have a more robust solution.
     */
    mapValueToPathfindingValue(value) {
        switch (value) {
            case 38:
                return 3
            case 0:
                return 100
            default:
                return value
        }

    }

    //Update map based on camera view and when entering a new level
    update() {
    }

    draw() { //TODO use Array2D.iter()
        const cam = this.game.camera
        const width = this.game.ctx.canvas.width
        const height = this.game.ctx.canvas.height
        const centerTile = Map.worldToTilePosition({ x: cam.xView + width / 2, y: cam.yView + height / 2 }, this.tileSize)
        const tilesWide = Math.ceil(width / this.tileSize)
        const tilesTall = Math.ceil(height / this.tileSize)


        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows; r++) {
                const tileInView = this.tileInView(r, c, centerTile, tilesWide + 2, tilesTall + 2)
                const tile = this.map.get([c, r])
                if (tile && tileInView) {
                    const tileX = c * this.tileSize - this.game.camera.xView
                    const tileY = r * this.tileSize - this.game.camera.yView
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
                    //Debug 
                    // this.game.ctx.font = '11px Arial'
                    // this.game.ctx.fillStyle = 'white'
                    // this.game.ctx.fillText('(' + c + ', ' + r + ')', tileX, tileY)
                }
            }
        }
    }

    tileInView(c, r, centerTile, tilesWide, tilesTall) {
        return (c > centerTile.y - tilesTall / 2 &&
            c < centerTile.y + tilesTall / 2 &&
            r > centerTile.x - tilesWide / 2 &&
            r < centerTile.x + tilesWide / 2)
    }

    static tileToWorldPosition(obj, tileSize) {
        return {
            x: obj.x * tileSize,
            y: obj.y * tileSize
        }
    }

    /**
     * Converts from world coordinates (measured in pixels starting from the top left of the Map)
     * to 
     */
    static worldToTilePosition(obj, tileSize) {
        return {
            x: Math.floor((obj.x + tileSize / 2) / 64),
            y: Math.floor((obj.y + tileSize / 2) / 64)
        }
    }
}