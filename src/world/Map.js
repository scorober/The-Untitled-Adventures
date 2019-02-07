import Entity from '../entities/Entity.js'
import Array2D from '../utils/Array2d.js'
import { MAP_ITEMS as MI, ROOMS, RIGHT, LEFT, TOP, BOTTOM } from '../utils/Const.js'

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

    getStartPos() {
        return {
            x: this.dungeon.start_pos[0] * this.tileSize,
            y: this.dungeon.start_pos[1] * this.tileSize
        }
    }

    buildMap() {
        const rooms = this.dungeon.room_count
        const size = [this.dungeon.size[0] + rooms, this.dungeon.size[1] + rooms]
        //Counter to move pieces away from each other... breaks corridors?
        let count = 0
        this.map = new Array2D(size, 0) //0 for empty tile
        this.objectMap = new Array2D(this.dungeon.size, 0)
        const dungeon = this.dungeon
        for (const piece of dungeon.children) {
            console.log(piece)
            
            const pos = piece.position
            const size = piece.size
            const w = size[0]
            const h = size[1]
            const x = piece.position[0]
            const y = piece.position[1]
            const outerPos = [x + 1, y + 1]
            const innerPos = [x + 2, y + 2]
            const outerSize = [w - 2, h - 2]
            const innerSize = [w - 4, h - 4]

            const floorPos = [x + 1, y + 1]
            const floorSize = [w - 4, y - 4]

            //Fill interior, fix so perimeter isn't repeated.
            this.map.set_square(outerPos, outerSize, 4, true)
            this.map.set_square(outerPos, outerSize, 18)
            this.map.set_square(innerPos, innerSize, 18)
            //Fill wall around
            // this.map.set_square(piece.position, piece.size, 18) //REAL Wall. buffer between rooms
            // this.map.set_square([x - 1, y - 1], piece.size, 18)
            for (const exit of piece.exits) {
                this.map.set(piece.global_pos(exit[0]), 38)
                const exitPos = piece.global_pos(exit[0])

                if (exit[1] === RIGHT) {
                    const doorPos = this.alterPos(exitPos, 1, -1)
                    this.createObject(this.objectMap, doorPos, MI.Door90)
                    this.createObject(this.map, doorPos, MI.DoorPrintV)
                }
                if (exit[1] === LEFT) {
                    const doorPos = this.alterPos(piece.global_pos(exit[0]), -2, -1)
                    this.createObject(this.objectMap, doorPos, MI.Door270)
                    this.createObject(this.map, doorPos, MI.DoorPrintV)
                }
                if (exit[1] === TOP) {
                    const doorPos = this.alterPos(piece.global_pos(exit[0]), -1, 1)
                    this.createObject(this.objectMap, doorPos, MI.Door0)
                    this.createObject(this.map, doorPos, MI.DoorPrintH)
                }
                if (exit[1] === BOTTOM) {
                    const doorPos = this.alterPos(piece.global_pos(exit[0]), -1, -2)
                    this.createObject(this.objectMap, doorPos, MI.Door180)
                    this.createObject(this.map, doorPos, MI.DoorPrintH)
                }
            }
            this.buildRoom(piece)
        }
        console.log(this.map)
        console.log(this.objectMap)

    }

    alterPos(pos, dx, dy) {
        return [pos[0] + dx, pos[1] + dy]
    }


    createObject(map, pos, object) {
        for (let row = 0; row < object.length; row++) {
            for (let col = 0; col <object[0].length; col++) {
                const point = [pos[0] + col, pos[1] + row]
                map.set(point, object[row][col])
            }
        }
    }

    buildRoom(piece) {
        const center = piece.global_pos(piece.get_center_pos())
        switch (piece.tag) {
            case ROOMS.Initial:
                this.createObject(this.objectMap, center, MI.ChestClosed)
                break
            case ROOMS.Spawn:
                this.createObject(this.objectMap, center, MI.Rug)
                break
            case ROOMS.Treasure:
                this.createObject(this.objectMap, center, MI.ChestOpen)
                break
            case ROOMS.Exit:
                this.createObject(this.objectMap, center, MI.StairsN)
                break

        }
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
            case 148:
                return 3
            case 149:
                return 3
            case 150:
                return 3
            case 151:
                return 3
            case 162:
                return 3
            case 130:
                return 3
            case 146:
                return 3
            case 178:
                return 3
            case 177:
                return 3
            case 179:
                return 3
            case 147:
                return 3
            case 163:
                return 3
            case 161:
                return 3
            case 0:
                return 100
            default:
                return value
        }
    }

    update() {}
    
    draw() {
         for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows; r++) {
                const tile = this.map.get([c, r])
                const objTile = this.objectMap.get([c, r])
                this.drawTile(c, r, tile)
                this.drawTile(c, r, objTile)
            }
        }
    }

    /**
     * Draw a tile at [c, r]
     * @param {*} c Column 
     * @param {*} r Row
     * @param {*} tile Tile being drawn
     */
    drawTile(c, r, tile) {
        const cam = this.game.camera
        const width = this.game.ctx.canvas.width
        const height = this.game.ctx.canvas.height
        const centerTile = Map.worldToTilePosition({ x: cam.xView + width / 2, y: cam.yView + height / 2 }, this.tileSize)
        const tilesWide = Math.ceil(width / this.tileSize)
        const tilesTall = Math.ceil(height / this.tileSize)
        const tileInView = this.tileInView(c, r, centerTile, tilesWide + 2, tilesTall + 2)
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
            // Debug 
            this.game.ctx.font = '11px Arial'
            this.game.ctx.fillStyle = 'white'
            this.game.ctx.fillText('(' + c + ', ' + r + ')', tileX, tileY)
        }
    }


    tileInView(r, c, centerTile, tilesWide, tilesTall) {
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