import Component from './Component.js'
import AnimationComponent from './AnimationComponent.js'
import AStarPathfinding from '../../utils/AStarPathfinding.js'
import Map from '../../world/Map.js'
import { DIRECTIONS } from '../../utils/Const.js'

export default class MovementComponent extends Component {
    /**
     * @param {Entity} entity A reference to the Entity this Component is attached to
     * @param {Object} animationConfig Animation configuration object for this character.
     */
    constructor(entity) {
        super(entity)
        this.direction = DIRECTIONS.East
        // This needs to be pulled from a future AttributesComponent or StatsComponent
        this.speed = 150
        this.path = []

        this.followTarget = null
        this.followTargetLastPos = null
        this.following = false
        this.moving = false
    }

    /**
     * Called each update cycle
     */
    update() {
        if (this.path.length > 0) {
            this.moving = true
            this.handlePathMovement()
            this.entity.getComponent(AnimationComponent).setMovingAnimation(this.direction)
        } else if (this.moving) {
            this.moving = false
            this.entity.getComponent(AnimationComponent).setStandingAnimation(this.direction)
        }
        if (this.following) {
            const followTargetPos = Map.worldToTilePosition(this.followTarget, this.entity.game.getTileSize())
            if (this.followTargetLastPos == null || this.followTargetLastPos.x != followTargetPos.x || this.followTargetLastPos.y != followTargetPos.y) {
                this.followTargetLastPos = followTargetPos
                this.setPathfindingTarget(this.followTargetLastPos)
            }
        }
    }

    /**
     * Called each draw cycle
     */
    draw() { }

    /**
     * Handles movement according to previously calculated path.
     * Removes a tile from the path array when the Entity is close enough to it.
     * Updates this.direction
     */
    handlePathMovement() {
        const tile = this.path[0]
        const tilePosition = Map.tileToWorldPosition(tile, this.entity.game.sceneManager.currentScene.map.tileSize)
        // dx and dy are the x and y distances between this Entity and the tile in world position (pixels)
        let dx = tilePosition.x - this.entity.x
        let dy = tilePosition.y - this.entity.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 10) {
            if (this.path.length > 0) {
                this.path.splice(0, 1)
            } else {
                this.entity.x = tilePosition.x
                this.entity.y = tilePosition.y
            }
        } else {
            dx = dx / distance
            dy = dy / distance
            this.move({x: dx, y: dy})            
            this.direction = this.calculateDirection(dx, dy)
        }
    }

    /**
     * Moves the Entity according to its speed and the game's clock tick
     * @param {Vector} vec The vector representing the direction to move
     */
    move(vec) {
        this.entity.x += vec.x * this.entity.game.clockTick * this.speed
        this.entity.y += vec.y * this.entity.game.clockTick * this.speed
    }

    /**
     * Calculates the direction of the Entity based on current movement
     * @param {Number} dx The change in x this frame 
     * @param {Number} dy The change in y this frame
     */
    calculateDirection(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                return DIRECTIONS.East
            } else {
                return DIRECTIONS.West
            }
        } else {
            if (dy > 0) {
                return DIRECTIONS.South
            } else {
                return DIRECTIONS.North
            }
        }
    }

    /**
     * Sets the path to the specified tile index
     * @param {Number} x The x index of the tile to pathfind to (x values increase starting from the left going right)
     * @param {Number} y The y index of the tile to pathfind to (y values increase starting from the top going down)
     */
    setPathfindingTarget(tile) {
        const currentTile = this.getCurrentTile()
        const pathfinder = new AStarPathfinding(this.entity.game.getWorld(), [currentTile.x, currentTile.y], [tile.x, tile.y])
        const path = pathfinder.calculatePath()
        this.path = path.map((pathTile) => { return { x: pathTile[0], y: pathTile[1] } })
    }

    /**
     * Sets the follow target and sets following to true
     * @param {Entity} entity The Entity to follow
     */
    setFollowTarget(entity) {
        this.followTarget = entity
        this.following = true
    }

    /**
     * Sets following to false
     */
    stopFollowing() {
        this.following = false
    }

    /**
     * Sets the Entity's current direction
     * @param {Symbol} direction The direction to face the Entity
     */
    setDirection(direction) {
        this.direction = direction
    }

    /**
     * Gets the Entity's current tile position
     * @returns {Object} The current tile position object {x, y}
     */
    getCurrentTile() {
        return Map.worldToTilePosition(this.entity, this.entity.game.sceneManager.currentScene.map.tileSize)
    }

    /**
     * @returns {Symbol} The Entity's current facing
     */
    getDirection() {
        return this.direction
    }

    /**
     * Calculates the tile behind this Entity
     * If that tile is not available, calculates another tile near the Entity
     * Note: Could result in block-ins for the PlayerCharacter
     */
    getTileBehind() {

    }
}