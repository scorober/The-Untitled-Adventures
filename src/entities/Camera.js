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
        this.xView =  Math.max(-64, this.followedEntity.x - this.game.ctx.canvas.width / 2)
        this.yView =  Math.max(-64, this.followedEntity.y - this.game.ctx.canvas.height / 2)
    }

    update() {
        if (this.followedEntity) {
            this.follow(this.followedEntity)
        }
    }

    draw() {
    }
}

