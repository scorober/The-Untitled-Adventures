import Component from './Component.js'
import AStarPathfinding from '../../utils/AStarPathfinding.js'
import Map from '../../world/Map.js'
import { DIRECTIONS } from '../../utils/Const.js'

export default class InteractionComponent extends Component {
    /**
     * @param {Entity} entity A reference to the Entity this Component is attached to
     * @param {Object} 
     */
    constructor(entity, vector) {
        super(entity)
    }

    /**
     * Called each update cycle
     */
    update() {
        if (this.entity.game.inputManager.hasRightClick()) {
            const clickPos = this.entity.game.inputManager.getRightClick()
            
        }
    }

    /**
     * Called each draw cycle
     */
    draw() { }

    checkPos()


}