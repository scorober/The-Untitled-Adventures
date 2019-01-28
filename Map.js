import Entity from './Entity.js'
import Level from './Level.js'

export default class Map extends Entity {
    //This is behavior that can be managed by the scene manager
    constructor(game, tileAtlas) {
        super(game, 0, 0)
        this.level = new Level(game, 64, 16, tileAtlas)
    }

    //Update map based on camera view and when entering a new level
    update() {
        super.update()
    }

    draw() {
        super.draw()
        this.level.drawMap(this.ctx)

    }
}