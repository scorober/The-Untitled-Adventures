import Character from './Character.js'
import Vector from '../utils/Vector.js'

export default class Enemy extends Character {
    constructor(game, pos) {
        if (new.target === Enemy) {
            throw new TypeError('Should not construct Enemy directly')
        }
        super(game, pos)
        this.v = new Vector(pos.x, pos.y)
    }

    update() {
        const player = this.game.sceneManager.currentScene.getPlayer()
        if (this.v.distance(player.v) < 500) {
            this.setFollowTarget(player)
        }
        super.update()
    }

    draw() {
        super.draw()
    }
}