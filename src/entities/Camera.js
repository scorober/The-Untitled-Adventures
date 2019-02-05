import Entity from './Entity.js'

export default class Camera extends Entity {
    constructor(game) {
        super(game, { x: 0, y: 0 })
        this.xView = 0
        this.yView = 0
    }

    setFollowedEntity(followedEntity) {
        this.followedEntity = followedEntity
    }

    follow() {
        this.xView = this.followedEntity.x - this.game.ctx.canvas.width / 2 + this.followedEntity.width
        this.yView = this.followedEntity.y - this.game.ctx.canvas.height / 2 + (2 * this.followedEntity.height)
    }

    update() {
        if (this.followedEntity) {
            this.follow(this.followedEntity)
        }
    }

    draw() {
    }
}

