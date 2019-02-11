import Entity from './Entity.js'
import Vector from '../utils/Vector.js'

export default class Spawner extends Entity {
    /**
     * Spawner holds its position
     * @param {*} game 
     * @param {*} pos Global position of spawner.
     * @param {*} type  Holds proportions of mob type
     * @param {*} size Amount of mobs spawner generates
     * @param {*} radius Radius to enclose area where mobs can spawn.
     */
    constructor(game, pos) {
        super(game, pos)
        this.v = new Vector(pos.x, pos.y)
    }


    update() {

    }

    //TODO find animated spawn towers.
    draw() { }
}