import Entity from '../Entity.js'
import Component from './Component.js'
import Vector from '../../utils/Vector.js';

export default class ProjectileComponent extends Component {
    constructor(entity, target) {
        super(entity)
        this.v = new Vector(entity.x, entity.y)
        this.target = new Vector(target.x, target.y)
        this.dir = this.target.subtract(this.v)
        this.dir.normalize()
        this.angle = Vector.getAngle(this.v, this.target)
    }

    update() {
        if (this.v.distance(this.target)) {
            //Do something
        }
    }

    draw() {

    }
}