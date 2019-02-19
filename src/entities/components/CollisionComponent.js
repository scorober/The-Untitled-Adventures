import Component from './Component.js'
import { STATES } from '../../utils/Const.js'
import { HitCircle } from '../../utils/Collision.js'
import Map from '../../world/Map.js'

export default class CollisionComponent extends Component {
    constructor(entity, animationConfig) {
        super(entity)
        this.height = animationConfig.Height
        this.size = animationConfig.Height
        this.width = animationConfig.Width
        // Note: This needs work because offsetY and offsetY, height and width will actually
        // be different for different animations of the same entity.
        this.hitbox = this.setCollidable({
            offset: false,
            xOffset: 0,
            yOffset: 0,
            radius: 32
        })
    }

    update() {
        const pos = Map.worldToTilePosition(this, this.entity.game.getTileSize())
        this.hitbox.update(pos.x, pos.y)
    }

    /**
     * Sets an entities state to be collidable and creates a hitbox from it's dimensions.
     * This may be replaced and moved to attribute component.
     *
     * Depreciated
     */
    setCollidable(options = {}) {
        const defaults = {
            offset: false,
            xOffset: 0,
            yOffset: 0,
            radius: 32
        }
        options = Object.assign({}, defaults, options)
        this.entity.states[STATES.Collidable] = true
        if (options.offset === true) {
            const hitOffsetX = options.xOffset
            const hitOffsetY = options.yOffset
            return new HitCircle(options.radius, this.entity.x + hitOffsetX, this.entity.y + hitOffsetY)
        } else {
            return new HitCircle(this.radius, this.entity.x, this.entity.y)
        }
    }

    /**
     * Uses the WORLD-TO-SCREEN converter in the game engine to determine if an entity is at a certain location.
     *
     * @param vector
     * @returns {boolean}
     */
    checkCollisionScreen(vector) {
        const entityTruePos = this.entity.game.worldToScreen({ x: this.entity.x, y: this.entity.y - this.height }) // get position on screen
        const dist = vector.distance(entityTruePos)
        if (dist < this.size) {
            const distY = vector.absdistanceY(entityTruePos)
            const distX = vector.absdistanceX(entityTruePos)
            return (distX < this.width && distY < this.height)
        }
    }

    /**
     * Uses the SCREEN-TO-WORLD converter in the game engine to determine if an entity is at a certain location.
     *
     * @param vector
     * @returns {boolean}
     */
    checkCollisionWorld(vector) {
        const ret = { collides: false, distance: null }
        const dist = vector.distance(this)
        if (dist < this.size) {
            ret.distance = dist
            const distY = vector.absdistanceY(this)
            const distX = vector.absdistanceX(this)
            ret.collides = distX < this.width && distY < this.height
        }
        return ret
    }
}