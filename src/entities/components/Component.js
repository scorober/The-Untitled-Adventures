export default class Component {
    /**
     * 
     * @param {Entity} entity A reference to the Entity this Component is attached to
     */
    constructor(entity) {
        if (new.target === Component) {
            throw new TypeError('Cannot instantiate Component directly ')
        }
        this.entity = entity
    }

    update() {
        throw new TypeError('Must override Component\'s update in derived class')
    }

    draw() {
        //throw new TypeError('Must override Component\'s draw in derived class.... but y tho? ')
    }
}