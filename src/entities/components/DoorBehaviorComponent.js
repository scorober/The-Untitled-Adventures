import Component from './Component.js'
import Entity from '../Entity.js'
import Vector from '../../utils/Vector.js'
import { STATES, RIGHT, LEFT, TOP, BOTTOM } from '../../utils/Const.js';
import Map from '../../world/Map.js'

export default class DoorBehaviorComponent extends Component {
    /**
     * @param {Entity} entity A reference to the Entity this Component is attached to.
     * @param {Object} exit Exit this component is attached to.
     */
    constructor(entity, exit, tiles) {
        super(entity)
        this.tiles = tiles
        this.exit = exit
    }


    /**
     * Called each update cycle.
     */
    update() {
        //TODO this steals right click behavior work on tomorrow....
        // if (this.entity.game.inputManager.hasRightClick()) {
        //     const clickPos = this.entity.game.inputManager.getRightClick()
        //     this.checkDoor(clickPos)
        // }
    }

    

    draw() { }

    /**
     * Checks if the current click is in one of this exits door tiles.
     * @param {Object} pos Position of mouseclick 
     */
    checkDoor(pos) {
        const tile = Map.worldToTilePosition(pos, this.entity.game.getTileSize())
        if (this.tiles.includes(tile)) {
            this.entity.game.sceneManager.currentScene.map.openExit(this.tiles)
            this.entity.removeFromWorld = true
        }
    }

}