export default class Component {
    constructor(entity) {
        if (new.target == Component) {
            throw new TypeError('Cannot instantiate Component directly')
        }
        this.entity = entity
    }

    update() {
        throw new TypeError('Must override Component\'s update in derived class')
    }
}