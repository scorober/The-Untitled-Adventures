import Entity from '../entities/Entity.js'
import Array2D from '../utils/Array2d.js'
import { MAP_ITEMS as MI, ROOMS, RIGHT, LEFT, TOP, BOTTOM } from '../utils/Const.js'
import Vector from '../utils/Vector.js'

export default class Map extends Entity {
    /**
     *
     * @param game a reference ot the game object
     * @param tileAtlas the .png/.jpg whatever file
     * @param tileSize
     * @param setLength Number of tiles wide
     * @param tiles  a reference to the tile array map thing
     */
    constructor(game, tileAtlas, tileSize, setLength, dungeon, scene) {
        super(game, 0, 0)
        this.tileAtlas = tileAtlas
        this.tileSize = tileSize
        this.setLength = setLength
        this.dungeon = dungeon
        this.rows = dungeon.size[1]
        this.cols = dungeon.size[0]
        this.tiles = []
        this.scene = scene
        this.spawners = [] //Array of spawner positions and radii.
        this.exits = [] //Array of door positions and room they enter.
        this.buildMap()
    }

    getStartPos() {
        return new Vector(
            this.dungeon.start_pos[0] * this.tileSize,
            this.dungeon.start_pos[1] * this.tileSize
        )
    }

    buildMap() {
        const rooms = this.dungeon.room_count
        const size = [this.dungeon.size[0] + rooms, this.dungeon.size[1] + rooms]

        /* 
         * Map0: Base layer: floors, empty tiles and walls.
         * Map1: Object layer 1: Doors, most objects
         * Map2: Top object layer: Door ceilings
         */
        this.map0 = new Array2D(size, 0)
        this.map1 = new Array2D(size, 0)
        this.map2 = new Array2D(size, 0)
        this.map3 = new Array2D(size, 0)

        const dungeon = this.dungeon
        for (const piece of dungeon.children) {
            // console.log(piece)
            this.buildWalls(piece)
            this.buildRoom(piece)
            this.buildExits(piece)
            
            // this.removeAllExits()
            this.openRoomExits(1)
        }
    }

    /**
     * 
     * @param {Array2D} map Map layer this object is created in. 
     * @param {Array} pos Map position of upper left corner of object.
     * @param {Array} object 2D array representing the object.
     */
    createObject(map, pos, object) {
        for (let row = 0; row < object.length; row++) {
            for (let col = 0; col < object[0].length; col++) {
                const point = [pos[0] + col, pos[1] + row]
                map.set(point, object[row][col])
            }
        }
    }

    /**
     * Generates corner positions and sizes of a room for wall building.
     * @param {Piece} piece Room that has these properties.
     */
    generateRoomProperties(piece) {
        const pos = piece.position
        const size = piece.size
        const w = size[0]
        const h = size[1]
        const x = pos[0]
        const y = pos[1]
        const outerPos = [x + 1, y + 1]
        const innerSize = [w - 4, h - 4]

        return {
            posNW: outerPos,
            posNE: [outerPos[0] + innerSize[0], outerPos[1]],
            posSW: [outerPos[0], outerPos[1] + innerSize[1]],
            posSE: [outerPos[0] + innerSize[0], outerPos[1] + innerSize[1]],
            outerPos: [x + 1, y + 1],
            innerPos: [x + 2, y + 2],
            innerSize: [w - 4, h - 4]
        }

    }

    /**
     * Builds the default floor and walls on map base layer.
     * @param {Piece} piece Current piece 
     */
    buildWalls(piece) {

        //Corners and sizes
        const p = this.generateRoomProperties(piece)

        //Set floor
        this.map0.set_square(p.innerPos, p.innerSize, 4, true)

        //North
        this.map0.set_horizontal_line(this.alterPos(p.outerPos, 1, 0), p.innerSize[0] - 1, MI.WallNorth[0][0])
        this.map0.set_horizontal_line(p.innerPos, p.innerSize[0] - 1, MI.WallNorth[1][0])
        //East
        this.map0.set_vertical_line(this.alterPos(p.posNE, 1, 2), p.innerSize[1] - 3, MI.WallEast[1])
        this.map0.set_vertical_line(this.alterPos(p.posNE, 0, 2), p.innerSize[1] - 3, MI.WallEast[0])
        //South
        this.map0.set_horizontal_line(this.alterPos(p.posSW, 2, 0), p.innerSize[0] - 3, MI.WallSouth[0][0])
        this.map0.set_horizontal_line(this.alterPos(p.posSW, 2, 1), p.innerSize[0] - 3, MI.WallSouth[1][0])
        //West
        this.map0.set_vertical_line(this.alterPos(p.posNW, 0, 2), p.innerSize[1] - 3, MI.WallWest[0])
        this.map0.set_vertical_line(this.alterPos(p.innerPos, 0, 1), p.innerSize[1] - 3, MI.WallWest[1])

        //Add corners
        this.createObject(this.map0, p.posNE, MI.ICornerNE)
        this.createObject(this.map0, p.posNW, MI.ICornerNW)
        this.createObject(this.map0, p.posSW, MI.ICornerSW)
        this.createObject(this.map0, p.posSE, MI.ICornerSE)
    }

    // eslint-disable-next-line complexity
    /**
     * Builds objects in tagged rooms.
     * @param {Piece} piece Room objects will be built in.
     */
    buildRoom(piece) {
        const center = piece.global_pos(piece.get_center_pos())
        switch (piece.tag) {
            case ROOMS.Initial:
                this.createObject(this.map1, center, MI.ChestClosed)
                break
            case ROOMS.Any:
                this.createObject(this.map1, this.alterPos(center, -1, -1), MI.Rug)
                this.spawners.push({
                    pos: new Vector(
                        center[0] * this.tileSize,
                        center[1] * this.tileSize
                    ),
                    r: this.getRadius(piece)
                })
                break
            case ROOMS.Treasure:
                this.createObject(this.map1, center, MI.ChestOpen)
                break
            case ROOMS.Exit:
                this.createObject(this.map1, center, MI.StairsN)
                break
        }
    }

    
    /**
     * Builds exits for each piece in a room.
     * @param {Piece} piece Room that generates exits.
     */
    // eslint-disable-next-line complexity
    buildExits(piece) {
        for (const exit of piece.exits) {
            const tiles = []
            //Create the floor between rooms
            const exitPos = piece.global_pos(exit[0])
            //Create this exit door
            if (exit[1] === TOP || exit[1] === BOTTOM) {
                const transPos = this.alterPos(exitPos, 0, -2)
                this.createObject(this.map0, transPos, MI.DoorPathV)
                if (exit[1] === TOP) {
                    const doorPos = this.alterPos(piece.global_pos(exit[0]), -1, 1)
                    this.createObject(this.map1, doorPos, MI.Door0)
                    this.createObject(this.map2, this.alterPos(doorPos, 0, 1), MI.Lock0)
                    this.createObject(this.map3, doorPos, MI.Door0Top)
                    tiles.push(this.alterPos(doorPos, 1, 1))
                    tiles.push(this.alterPos(doorPos, 2, 1))
                    this.addExit(exit[2].id, piece.id, tiles, exit[1])
                } else {
                    const doorPos = this.alterPos(piece.global_pos(exit[0]), -1, -2)
                    this.createObject(this.map1, doorPos, MI.Door180)
                    this.createObject(this.map2, doorPos, MI.Lock180)
                    this.createObject(this.map3, doorPos, MI.Door180Top)
                    tiles.push(this.alterPos(doorPos, 1, 0))
                    tiles.push(this.alterPos(doorPos, 2, 0))
                    this.addExit(exit[2].id, piece.id, tiles, exit[1])
                }
            } else {  //East and West
                const transPos = this.alterPos(exitPos, -2, 0)
                this.createObject(this.map0, transPos, MI.DoorPathH)
                if (exit[1] === RIGHT) {
                    const doorPos = this.alterPos(exitPos, 1, -1)
                    this.createObject(this.map1, doorPos, MI.Door90)
                    this.createObject(this.map2, this.alterPos(doorPos, 1, 0), MI.Lock90)
                    this.createObject(this.map3, doorPos, MI.Door90Top)
                    tiles.push(this.alterPos(doorPos, 1, 1))
                    tiles.push(this.alterPos(doorPos, 1, 2))
                    this.addExit(exit[2].id, piece.id, tiles, exit[1])
                }
                if (exit[1] === LEFT) {
                    const doorPos = this.alterPos(piece.global_pos(exit[0]), -2, -1)
                    this.createObject(this.map1, doorPos, MI.Door270)
                    this.createObject(this.map2, doorPos, MI.Lock270)
                    this.createObject(this.map3, doorPos, MI.Door270Top)
                    tiles.push(this.alterPos(doorPos, 0, 1))
                    tiles.push(this.alterPos(doorPos, 0, 2))
                    this.addExit(exit[2].id, piece.id, tiles, exit[1])
                }
            }
        }
    }

    /**
     * Replaces door tiles with floor tiles.
     * @param {Array} tiles Door tiles that need to be replaced with floor
     */
    openExit(tiles) {
        for (let i = 0; i < tiles.length; i++) {
            this.map2.set(tiles[i], 13)
        }
    }

    /**
     * Populates an array of exits for entity creation. Matches pairs with doors.
     * @param {Number} destination ID of the destination room.
     * @param {Number} room ID of the current room.
     * @param {Array} tiles Array of tile positions that represent the exit door.
     */
    addExit(destination, room, tiles) {
        let newExit = true
        this.exits.forEach(function(exit) {
            if (exit.destination === room && exit.room === destination) {
                //push tiles to existing exit
                newExit = false

                for (let i = 0; i < tiles.length; i++) {
                    exit.tiles.push(tiles[i])
                }
    
            }
        })
        if (newExit) {
            //Add new exit
            this.exits.push( 
                {
                    tiles: tiles,
                    room: room,
                    destination: destination,
                }
            )
        } 
    }

    /**
     * Mostly for debugging. Replaces all doors with floor tiles.
     */
    removeAllExits() {
        for (let i = 0; i < this.exits.length; i++) {
            this.openExit(this.exits[i].tiles)
        }
    }

    openRoomExits(id) {
        for (let i = 0; i < this.exits.length; i++) {
            if (this.exits[i].room === id ) {
                this.openExit(this.exits[i].tiles)
            }
        }
    }

    /**
     * Alters a position array for use with Array2D and dungeon generator.
     * @param {Array} pos A map position.
     * @param {Number} dx Change in x.
     * @param {Number} dy Change in y.
     */
    alterPos(pos, dx, dy) {
        return [pos[0] + dx, pos[1] + dy]
    }

    getPathfindingArray() {
        const array = []
        for (let i = 0; i < this.map0.rows.length; i++) {
            array[i] = [...this.map0.rows[i]]
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
    // eslint-disable-next-line complexity
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

    update() { }

    draw() {
        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows; r++) {
                const tile = this.map0.get([c, r])
                const objTile = this.map1.get([c, r])
                const objTile2 = this.map2.get([c,r])
                this.drawTile(c, r, tile)
                this.drawTile(c, r, objTile)
                this.drawTile(c, r, objTile2)
            }
        }
    }

    drawTop() {
        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows; r++) {
                const objTile1 = this.map3.get([c, r])
                this.drawTile(c, r, objTile1)
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
        const centerTile = Map.worldToTilePosition(new Vector(cam.xView + width / 2, cam.yView + height / 2), this.tileSize)
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
        }
    }


    tileInView(r, c, centerTile, tilesWide, tilesTall) {
        return (c > centerTile.y - tilesTall / 2 &&
            c < centerTile.y + tilesTall / 2 &&
            r > centerTile.x - tilesWide / 2 &&
            r < centerTile.x + tilesWide / 2)
    }

    static tileToWorldPosition(obj, tileSize) {
        return new Vector(
            obj.x * tileSize,
            obj.y * tileSize
        )
    }

    /**
     * Converts from world coordinates (measured in pixels starting from the top left of the Map)
     * to 
     */
    static worldToTilePosition(obj, tileSize) {
        return new Vector(
            Math.floor((obj.x + tileSize / 2) / 64),
            Math.floor((obj.y + tileSize / 2) / 64)
        )
    }

    /**
     * Generates a radius for spawners to create an area for mobs to spawn.
     * @param {Object} piece The piece this radius covers. 
     */
    getRadius(piece) {
        const size = Math.min(piece.size[0], piece.size[1])
        return Math.floor((size - 6) / 2 * 64)
    }
}